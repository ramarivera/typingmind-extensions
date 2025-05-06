# typingmind-extensions

Different extensions for typing mind

## Getting Started

1. Install dependencies:

   ```sh
   npm install esbuild --save-dev
   ```

2. Build the project:

   ```sh
   npm run build
   ```

This will bundle `src/ux-toolkit/ux-toolkit.ts` into `dist/ux-toolkit.js` using esbuild.

## Build Process

- Any folder inside `src/` that contains an `index.ts` file will be considered buildable.
- Running `npm run build` will bundle each buildable folder into a single JS file in `dist/`, named after the folder (e.g., `src/foo/index.ts` → `dist/foo.js`).
- The build process is managed by `build.mjs`.
