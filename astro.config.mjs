import { defineConfig } from 'astro/config';

// GitHub Pages serves this repo at https://luciojacobo00.github.io/east-texas-concrete-coating/
// `site` + `base` make every link, image, and canonical URL resolve under that path.
// Moving to a custom domain later: set site to the domain and delete `base`.
// https://astro.build/config
export default defineConfig({
  site: 'https://luciojacobo00.github.io',
  base: '/east-texas-concrete-coating',
});
