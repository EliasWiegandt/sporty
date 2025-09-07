// src/worker.js
export default {
  async fetch(request, env, ctx) {
    // Serve files from /site (configured in wrangler.toml via `assets = { directory = "./site" }`)
    return env.ASSETS.fetch(request);
  },
};
