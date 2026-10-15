import { createReadStream, statSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// Vite's static server labels .gz files "Content-Encoding: gzip", so the
// browser unzips the archive in transit and the extract worker then fails to
// gunzip it again. Serve the local archive as plain bytes instead.
function serveRawGameArchive() {
  const archivePath = resolve(__dirname, "game.tar.gz");
  return {
    name: "serve-raw-game-archive",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.split("?")[0].endsWith("/game.tar.gz")) {
          return next();
        }
        let size;
        try {
          size = statSync(archivePath).size;
        } catch {
          return next();
        }
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Length", size);
        res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
        if (req.method === "HEAD") return res.end();
        createReadStream(archivePath).pipe(res);
      });
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE || "/gta-vice-city-wasm/",
  plugins: [serveRawGameArchive()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
