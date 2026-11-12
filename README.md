<div align="center">

<img src="png/favicon.png" alt="Homepage logo" height="128">

# Homepage.

**A collection of all of kijnreyyca's games and creations.**
*Good things, worth sharing.*

![Hosted on GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-222?logo=github&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?logo=javascript&logoColor=black)
![No dependencies](https://img.shields.io/badge/dependencies-none-c2f28b)

[Features](#-features) · [Themes](#-themes) · [Layouts](#-layouts) · [Project structure](#-project-structure) · [Run it locally](#-run-it-locally) · [Deploy](#-deploy-on-github-pages) · [Customize](#-customize)

</div>

---

## About

Homepage is a small, fast, personal hub that gathers every game and creation in one place. It is a plain static site with no frameworks, no build step, and no dependencies. Open it, search, browse the collections, and jump straight to whatever you want to play.

## ✨ Features

- 🗂️ **Collections:** links are grouped into category tabs, each with a live count.
- 🔎 **Instant search:** filter every link as you type. Press `/` to jump to the search box.
- 🎨 **Four themes:** The Void, Dark, White, and Dark Blue, switchable from the top bar.
- 📐 **Two layouts:** Compact (4 per row) or Comfy (3 per row), your pick.
- 💾 **Remembers you:** your theme and layout are saved in your browser and applied before the page paints, so there is no flash on reload.
- 📱 **Responsive:** works on desktop, tablet, and phone.
- 🖼️ **Card art:** each card gets a colored header, or a custom image when one is set. Images are stored locally as WebP.
- ⌨️ **Keyboard friendly:** visible focus rings, a skip link, arrow-key theme picker, `/` search shortcut and reduced-motion support.
- ⚡ **Self-contained:** DM Sans and all card art are served from this repo — no third-party font or image requests.
- 🔗 **Github Repo:** a link in the footer points back to this repository.

## 🎨 Themes

Switch themes any time from the **Theme** button in the top bar.

| Theme | Look | Text |
| --- | --- | --- |
| **The Void** | Pure black with every fill transparent (`#00000000`). Only text and images remain. | White |
| **Dark** | Dark gray with a lime accent. This is the default. | White |
| **White** | Light gray with white cards. | Black |
| **Dark Blue** | Deep navy with a sky-blue accent. | White |

## 📐 Layouts

Use the **Compact / Comfy** toggle above the cards.

| Mode | Cards per row | Feel |
| --- | :---: | --- |
| **Compact** | 4 | Tight spacing, short card art, more on screen |
| **Comfy** | 3 | Roomy spacing, tall card art, easier to browse |

On phones, both modes show 2 cards per row.

## 🗂️ Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Markup, metadata and the pre-paint theme bootstrap. |
| `styles.css` | Theme tokens, layout, density rules, focus styles and utilities. |
| `app.js` | Theme/density switching, search, tabs and card rendering. |
| `links.js` | The link catalogue — edit this to add or change sites. |
| `images/` | Local WebP card art. |
| `png/` | Favicon, app icons, Apple touch icon and social preview card. |
| `fonts/` | Self-hosted DM Sans (`woff2`, variable weight). |
| `404.html` | Themed not-found page. |
| `manifest.webmanifest` | Installable app metadata and icons. |
| `robots.txt` | Crawler rules: allows search, blocks AI crawlers, points at the sitemap. |
| `xml/sitemap.xml` | Search engine sitemap. |

## 🚀 Run it locally

No build step or dependencies. Serve the folder so `links.js` and the fonts load:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## 📦 Deploy on GitHub Pages

Push to `main`. In the repository settings, open **Pages**, choose **Deploy from a branch**, and select `main` / root. Every push redeploys automatically.

## ✏️ Customize

- **Add a link:** append an object to `window.LINKS` in `links.js` (`title`, `url`, `description`, `category`, `tags`, optional `image`, `color`, `glow`, `glyph`).
- **Change colors:** edit the tokens at the top of `styles.css` and the four `[data-theme="…"]` blocks.
- **Change fonts:** replace `fonts/dm-sans.woff2` and update the `@font-face` rule. Keep the `<link rel="preload">` in `index.html` pointing at the file you use.

## 👤 Author

Made by **kijnreyyca**, for the things worth keeping.
