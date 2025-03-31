import { build } from 'esbuild';

build({
  entryPoints: ['src/preload/index.ts'],
  outfile: 'lib/preload/index.cjs',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
  target: ['node20'],
  external: ['electron'],
}).catch(() => process.exit(1));