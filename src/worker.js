// src/worker.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const reqId = request.headers.get("X-Request-Id") || crypto.randomUUID();

    // Proxy: POST /api/submit -> BACKEND_URL/recommend with X-API-Key
    if (request.method === "POST" && url.pathname === "/api/submit") {
      const body = await request.text();

      const backendUrl = env.BACKEND_URL;
      const apiKey = env.BACKEND_API_KEY;

      if (!backendUrl || !apiKey) {
        return new Response(
          JSON.stringify({
            detail: "Server not configured: missing BACKEND_URL or API key",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      const upstream = new URL("/recommend", backendUrl);
      try {
        const resp = await fetch(upstream.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
            "X-Request-Id": reqId,
          },
          body,
          signal: AbortSignal.timeout(10000), // 10s timeout for cold starts
        });

        const text = await resp.text();
        return new Response(text, {
          status: resp.status,
          headers: {
            "Content-Type": resp.headers.get("Content-Type") || "application/json",
            "X-Request-Id": reqId,
          },
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ detail: "Upstream unavailable. Please try again in a moment.", request_id: reqId }),
          { status: 502, headers: { "Content-Type": "application/json", "X-Request-Id": reqId } }
        );
      }
    }

    // Health check
    if (request.method === "GET" && url.pathname === "/api/healthz") {
      return new Response(JSON.stringify({ ok: true, request_id: reqId }), {
        headers: { "Content-Type": "application/json", "X-Request-Id": reqId },
      });
    }

    // Serve static assets from /site (see wrangler.toml `assets` binding)
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) return assetResponse;
    }

    return new Response("Not found", { status: 404 });
  },
};
