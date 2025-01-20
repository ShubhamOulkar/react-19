import { Router } from "express";
const sirv = (await import("sirv")).default;
const base = process.env.BASE || "/";
export const staticFilesRouter = Router();
import process from "process";
import { resolve } from "path";
const __dirname = process.cwd();

// Configure static file serving
const staticOptions = {
  dev: false, // production only
  extensions: [],
  etag: true,
  maxAge: 31536000, // 1 year
  immutable: true,
  gzip: true,
};

// Helper to serve from multiple directories
const serveStatic = (directories) => {
  return (req, res, next) => {
    const tryNext = (i = 0) => {
      if (i >= directories.length) {
        return next();
      }
      const handler = sirv(resolve(__dirname, directories[i]), staticOptions);
      handler(req, res, (err) => {
        if (err) return next(err);
        tryNext(i + 1);
      });
    };
    tryNext();
  };
};

// Serve static files from multiple directories
staticFilesRouter.use(
  base,
  serveStatic([
    "./dist/client", // SSR client assets
    "./dist/server/error", // Error page assets
  ])
);
