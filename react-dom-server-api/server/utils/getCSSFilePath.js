import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(
  path.dirname(path.dirname(fileURLToPath(import.meta.url)))
);

export default async function getCSSFilePath(componentName) {
  try {
    // Read the manifest.json created by Vite build
    const manifest = JSON.parse(
      await fs.readFile(
        path.resolve(
          __dirname,
          `./dist/server/${componentName}/.vite/manifest.json`
        ),
        "utf-8"
      )
    );

    return path.resolve(
      __dirname,
      `./dist/server/${componentName}/${
        manifest[`views/${componentName}/entry-server.tsx`].css[0]
      }`
    );
  } catch (err) {
    console.error("Error in reading manifest.json: ", err.message);
  }
}
