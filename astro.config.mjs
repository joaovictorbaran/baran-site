import { defineConfig } from 'astro/config';

// Site estático. `format: 'file'` gera crediario.html, que a Vercel serve em /crediario por causa do
// `cleanUrls` do vercel.json. As páginas e o CSS ficam como estavam: sem compressão do HTML e com o CSS inline.
export default defineConfig({
  site: 'https://barantecnologia.com.br',
  output: 'static',
  compressHTML: false,
  build: { format: 'file', inlineStylesheets: 'always' },
  vite: { build: { assetsInlineLimit: 0 } },
});
