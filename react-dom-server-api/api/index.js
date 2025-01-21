import { app } from "../server/server.js";
import path from "path";
import sirv from "sirv";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assets = sirv(path.resolve(__dirname, "../dist"), {
  maxAge: 31536000, // 1Y
  immutable: true,
});

// static assets
//app.use(assets);

export default app;
