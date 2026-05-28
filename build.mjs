import { build } from 'esbuild';

await build({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  minify: true,
  target: 'es2017',
  outfile: 'app.js',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  jsx: 'automatic',
});

console.log('✓ app.js compiled');
