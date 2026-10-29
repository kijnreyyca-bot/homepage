# Elsewhere — your link collection

A responsive, single-page collection site with translucent glass cards, optional custom image previews, category tabs, tag-aware search, and safe external links.

## Make it yours

1. Open `links.js` in any text editor.
2. Replace the sample `title`, `url`, and `description` values with your own.
3. Set `category` to group links into tabs. Add or change `tags` as you like.
4. To show an image on a card, paste a direct image address into `image`, for example `image: "https://example.com/photo.jpg"`. Use the image URL, not the Pinterest Pin page URL. On Pinterest, open the image itself and use **Copy image address** if available. If Pinterest blocks embedding, save the image and upload it alongside the site, then use a relative path such as `images/my-photo.jpg`.
5. Save the file and open `index.html` in a browser.

Each link entry follows this pattern:

```js
{ title: "My site", url: "https://my-site.com", description: "What visitors will find there.", category: "My Sites", tags: ["personal", "work"], image: "https://example.com/photo.jpg", color: "#31395e", glow: "rgba(150,165,255,.6)", glyph: "✳" }
```

Leave `image` as an empty string to use the built-in color artwork. Keep URLs starting with `https://` or `http://`. No build step or server is required. Google Fonts load when the site has an internet connection; system fonts are used otherwise.
