// src/worker.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
      const resp = await fetch(upstream.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body,
      });

      const text = await resp.text();
      return new Response(text, {
        status: resp.status,
        headers: {
          "Content-Type":
            resp.headers.get("Content-Type") || "application/json",
        },
      });
    }

    // Health check
    if (request.method === "GET" && url.pathname === "/api/healthz") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
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
