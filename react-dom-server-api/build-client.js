import { build } from "vite";
import {
  writeFileSync,
  unlinkSync,
  mkdirSync,
  rmdirSync,
  readdirSync,
} from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Add recursive directory deletion function
function deleteFolderRecursive(path) {
  if (readdirSync(path).length > 0) {
    for (const file of readdirSync(path)) {
      const curPath = resolve(path, file);
      try {
        unlinkSync(curPath);
      } catch (e) {
        deleteFolderRecursive(curPath);
      }
    }
  }
  rmdirSync(path);
}

const generateTemplate = (scriptPath) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
    <!--app-head-->
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="${scriptPath}"></script>
  </body>
</html>
`;

const pages = [
  {
    name: "root",
    entry: "/views/root/entry-client.tsx",
  },
  {
    name: "login",
    entry: "/views/login/entry-client.tsx",
  },
  {
    name: "error",
    entry: "/views/error/entry-client.tsx",
  },
];

async function buildPages() {
  // Create temp directory
  const tempDir = resolve(__dirname, "templates");
  mkdirSync(tempDir, { recursive: true });
  for (const page of pages) {
    // Create temporary HTML file
    const tempHtmlPath = resolve(tempDir, `${page.name}.html`);
    writeFileSync(tempHtmlPath, generateTemplate(page.entry));
  }

  try {
    // Build with Vite
    await build({
      build: {
        rollupOptions: {
          treeshake: true,
          input: {
            root: "./templates/root.html",
            login: "./templates/login.html",
            error: "./templates/error.html",
          },
        },
        assetsDir: "assets",
        outDir: `dist/client`,
        manifest: true,
        ssrManifest: true,
        minify: "esbuild",
      },
    });

    console.log("build is completed");
  } finally {
    for (const page of pages) {
      console.log(`delete temp file ${page.name}.html.`);
      // Create temporary HTML file
      const tempHtmlPath = resolve(tempDir, `${page.name}.html`);
      // Cleanup temp file
      unlinkSync(tempHtmlPath);
    }
    // Cleanup temp directory
    try {
      deleteFolderRecursive(tempDir);
    } catch (e) {
      console.warn("Failed to cleanup temp directory:", e);
    }
  }
}

buildPages().catch(console.error);
