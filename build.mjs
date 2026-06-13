import { build } from 'esbuild';

const common = {
  bundle: true,
  minify: true,
  target: 'es2017',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  jsx: 'automatic',
};

await build({ ...common, entryPoints: ['src/app.jsx'], outfile: 'app.js' });
console.log('✓ app.js compiled');

await build({ ...common, entryPoints: ['src/admin.jsx'], outfile: 'admin.js' });
console.log('✓ admin.js compiled');
