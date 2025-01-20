import express from "express";
import fs from "node:fs/promises";
import path from "path";
import sirv from "sirv";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const assets = sirv("../dist/client", {
  maxAge: 31536000, // 1Y
  immutable: true,
});

// static assets
app.use(assets);

// React page
app.get("*", async (req, res) => {
  try {
    let template = await fs.readFile(
      path.resolve(__dirname, "../dist/client/templates/component.html"),
      "utf-8"
    );
    const render = (
      await import("../dist/server/component/renderComponentOnServer.js")
    ).renderComponentOnServer;
    const html = render();
    template = template.replace("<!--app-html-->", html);
    res.setHeader("Content-Type", "text/html");
    res.send(template);
  } catch (err) {
    console.error(err.stack);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

export default app;
