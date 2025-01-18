import { Router } from "express";
import { xssRouter } from "./xssMiddleware.js";
import { staticFilesRouter } from "./serverMutipleStaticDirectories.js";
const compression = (await import("compression")).default;
export const productionMiddlewares = Router();

productionMiddlewares.use(xssRouter, compression(), staticFilesRouter);
