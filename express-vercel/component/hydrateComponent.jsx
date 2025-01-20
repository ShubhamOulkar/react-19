import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Counter } from "./Component";

hydrateRoot(document.getElementById("root"), <Counter />);
