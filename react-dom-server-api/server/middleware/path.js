import path from "path";

import { fileURLToPath } from "url";
const __dirname = path.dirname(
  path.dirname(path.dirname(fileURLToPath(import.meta.url)))
);

console.log(path.resolve(__dirname, "./dist/client"));
console.log(path.resolve(__dirname, "../dist/client"));
console.log(path.resolve(__dirname, "/dist/client"));
console.log(path.resolve(__dirname, "dist/client"));
console.log(path.resolve("./dist/server/error"));
console.log(path.resolve(`./dist/server/error/.vite/manifest.json`));

/*
without __dirname
E:\React\react api\react-19\react-dom-server-api\dist\client
E:\React\react api\react-19\dist\client
E:\dist\client
E:\React\react api\react-19\react-dom-server-api\dist\client
E:\React\react api\react-19\react-dom-server-api\dist\server\error
E:\React\react api\react-19\react-dom-server-api\dist\server\error\.vite\manifest.json
 */

/*
with __direname 
E:\React\react api\react-19\react-dom-server-api\dist\client
E:\React\react api\react-19\dist\client
E:\dist\client
E:\React\react api\react-19\react-dom-server-api\dist\client
 */
