# Cloudflare Pages production build

Set the Cloudflare Pages **Production** build environment variable to:

```text
SITE_URL=https://la-piazza-wismar.de
```

Build with `npm run build` and publish the generated `out/` directory. `SITE_URL` is read at build time to generate the canonical URL, indexable metadata, `robots.txt`, and `sitemap.xml`; keep the production value configured for every production build. Do not hardcode the domain in application components or commit local environment files.
