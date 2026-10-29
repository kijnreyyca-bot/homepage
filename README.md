# Elsewhere — your link collection

A responsive, single-page collection site with translucent glass cards, optional custom image previews, category tabs, tag-aware search, and safe external links.

## Make it yours

1. Open `links.js` in any text editor.
2. Replace the sample `title`, `url`, and `description` values with your own.
3. Set `category` to group links into tabs. Add or change `tags` as you like.
4. To show an image on a card, paste a direct image address into `image`. Use the image URL, not the Pinterest Pin page URL. If Pinterest blocks embedding, save the image in an `images` folder and use a relative path.
5. Save the file and open `index.html` in a browser.

Each link entry follows this pattern:

```js
{ title: "My site", url: "https://my-site.com", description: "What visitors will find there.", category: "My Sites", tags: ["personal", "work"], image: "https://example.com/photo.jpg", color: "#31395e", glow: "rgba(150,165,255,.6)", glyph: "✳" }
```

Relative links work too. The Gaming example points to `./sources/eaglercraft26-2.html`. Keep the `sources` folder next to `index.html` when uploading the site, so the deployed layout is:

```
index.html
app.js
links.js
styles.css
sources/eaglercraft26-2.html
```

The 77 MB HTML file is not bundled in this ZIP. Upload that existing file from your `sources` folder alongside the site. GitHub's browser uploader has a 25 MiB per-file limit; use Git from your computer for the 77 MB file (below GitHub's 100 MiB single-file hard limit), not Git LFS, because Pages does not serve LFS objects as pages. No build step or server is required. Google Fonts load when the site has an internet connection; system fonts are used otherwise.
