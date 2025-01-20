import React from "react";
import { renderToString } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { Counter } from "./Component";

export function renderComponentOnServer(options = undefined) {
  return renderToString(<Counter />, options);
}
