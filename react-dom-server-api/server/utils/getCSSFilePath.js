import fs from "node:fs/promises";
import { resolve } from "path";
const __dirname = process.cwd();

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
