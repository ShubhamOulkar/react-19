import express from "express";
import morgan from "morgan";
import renderReact from "./server/react SSR functions/renderReact.js";
import renderToString from "./server/SSG/renderToString.js";
import { throwError } from "./server/utils/throwError.js";
import { productionMiddlewares } from "./server/middleware/productionMiddlewares.js";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const ABORT_DELAY = 10000;

// Create http server
const app = express();

// logging middleware
app.use(morgan(isProduction ? "combined" : "dev"));

// Add request timeout middleware
app.use((req, res, next) => {
  const timeout = setTimeout(() => {
    res.status(408);
    res.set({
      "Content-Type": "text/html",
    });
    res.send(`Request Timeout ${ABORT_DELAY}ms for ${req.originalUrl}`);
  }, ABORT_DELAY);

  res.on("finish", () => clearTimeout(timeout));
  next();
});

// Add Vite development or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  app.use(productionMiddlewares);
}

// Routes
app.use("/login", async (req, res, next) => {
  try {
    const url = req.originalUrl.replace("/", "");
    await renderReact(req, res, url, vite);
  } catch (error) {
    next(error);
  }
});

app.use("*all", async (req, res, next) => {
  try {
    const url = req.originalUrl.replace("/", "");
    console.log("url :", url);
    const comp =
      url === ""
        ? "root"
        : throwError(`Invalid page requested for url: /${url}`, 500);
    await renderReact(req, res, comp, vite);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use(async (err, req, res, next) => {
  // log error on server
  console.error(`${err.status} : `, err.message);
  try {
    const htmlData = await renderToString(err, "error", vite);
    res.set({
      "Content-Type": "text/html",
    });
    res.status(500).send(htmlData);
  } catch (err) {
    console.error("Error rendering error page on server:", err.stack);
    res
      .status(500)
      .send("Internal Server Error : Error rendering error page on the server");
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
