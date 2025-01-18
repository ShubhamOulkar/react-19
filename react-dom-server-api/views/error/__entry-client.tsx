import Error from "./Error";
import { hydrateRoot } from "react-dom/client";

const rootElement = document.getElementById("root") as HTMLElement;
const error = JSON.parse(rootElement?.dataset.error || "{}");

hydrateRoot(rootElement, <Error error={error} />);
