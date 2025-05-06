import { readdir, stat } from 'fs/promises';
import { join, basename } from 'path';
import { exec } from 'child_process';

const SRC_DIR = 'src';
const DIST_DIR = 'dist';

const isWatch = process.argv.includes('--watch');

async function findBuildableFolders(srcDir) {
  const entries = await readdir(srcDir, { withFileTypes: true });
  const buildable = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexTs = join(srcDir, entry.name, 'index.ts');
      try {
        const stats = await stat(indexTs);
        if (stats.isFile()) {
          buildable.push(entry.name);
        }
      } catch {}
    }
  }
  return buildable;
}

async function build() {
  const buildableFolders = await findBuildableFolders(SRC_DIR);
  if (buildableFolders.length === 0) {
    console.log('No buildable folders found.');
    return;
  }
  for (const folder of buildableFolders) {
    const entry = join(SRC_DIR, folder, 'index.ts');
    const outfile = join(DIST_DIR, `${folder}.js`);
    const baseCmd = `npx esbuild ${entry} --bundle --outfile=${outfile}`;
    if (isWatch) {
      const { spawn } = await import('child_process');
      const watchCmd = baseCmd + ' --watch';
      console.log(`Watching ${folder}: ${watchCmd}`);
      const child = spawn(watchCmd, { shell: true, stdio: 'inherit' });
      // Don't await, let it run
    } else {
      console.log(`Building ${folder}: ${baseCmd}`);
      await new Promise((resolve, reject) => {
        exec(baseCmd, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error building ${folder}:`, stderr);
            reject(error);
          } else {
            console.log(stdout);
            resolve();
          }
        });
      });
    }
  }
  if (isWatch) {
    // Keep process alive
    process.stdin.resume();
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
