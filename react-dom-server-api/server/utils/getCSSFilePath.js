import fs from "node:fs/promises";
import { dirname } from "node:path";
import { resolve, dirname } from "path";

const __dirname = dirname(dirname(dirname(import.meta.url)));

export default async function getCSSFilePath(componentName) {
  try {
    // Read the manifest.json created by Vite build
    const manifest = JSON.parse(
      await fs.readFile(
        resolve(
          __dirname,
          `./dist/server/${componentName}/.vite/manifest.json`
        ),
        "utf-8"
      )
    );

    return resolve(
      __dirname,
      `./dist/server/${componentName}/${
        manifest[`views/${componentName}/entry-server.tsx`].css[0]
      }`
    );
  } catch (err) {
    console.error("Error in reading manifest.json: ", err.message);
  }
}
