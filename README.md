<div align="center">

<img src="favicon.png" alt="Homepage logo" height="64">

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
- 🖼️ **Card art:** each card gets a colored header, or a custom image when one is set.
- 🔐 **Sign-in screen:** a lightweight password gate on load (see the [note](#-a-note-on-the-sign-in-screen)).
- ⚡ **Zero build:** edit a file, push, and it's live.

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

## 📁 Project structure

```text
.
├── index.html                    # Page skeleton, sign-in screen, theme and layout switchers
├── styles.css                    # All styling, themes, and layout modes
├── links.js                      # The data: your links, categories, and descriptions
├── app.js                        # Builds the tabs and cards, runs search and counters
├── favicon.png                   # Browser tab icon and the on-page logo
├── SF-Pro-Rounded-Semibold.otf   # Display font used for headings
└── README.md                     # You are here
```

## 🖥️ Run it locally

No install needed. You can open `index.html` directly in a browser, or serve the folder for a more realistic test:

```bash
# from the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🚀 Deploy on GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select your main branch and the `/ (root)` folder.
4. Save. In a minute or two the site is live. Every push to that branch redeploys it automatically.

`index.html` must sit at the root of the published folder so it loads as the homepage.

## 🛠️ Customize

**Add or edit links:** open `links.js` and change the entries (URLs, titles, descriptions, categories). The counters and tabs update on their own.

**Tweak the look:** colors live in CSS variables at the top of `styles.css`. Each theme overrides them in the `THEMES` section near the bottom, so adding a fifth theme is mostly a new block of variables plus one more button in the theme menu in `index.html`.

| Variable | What it controls |
| --- | --- |
| `--bg` | Page background |
| `--ink`, `--ink-2` | Main and strong secondary text |
| `--muted`, `--faint` | Dimmer text |
| `--accent` | Highlights, active tabs, links on hover |
| `--card`, `--card-hover` | Card backgrounds |
| `--fx` | Overlay channel (white on dark themes, black on light) |

**Change the logo:** replace `favicon.png`. It is used for both the browser tab and the logo on the page, and it is drawn pixel-crisp, so small pixel art looks best.

## 🔐 A note on the sign-in screen

The sign-in screen is a convenience, not real security. GitHub Pages only serves static files, so the password check runs in the visitor's browser and the password is visible in the page source. Anyone who views the source can see it, and `links.js` is publicly downloadable regardless. If you ever need genuine privacy, use something like [StatiCrypt](https://github.com/robinmoisson/staticrypt) or put the site behind real authentication.

## 🧰 Built with

- Plain **HTML, CSS, and JavaScript**
- Fonts: **DM Sans**, **Manrope**, and **Fira Code** from Google Fonts, plus **SF Pro Rounded** for headings
- **GitHub Pages** for hosting

## 👤 Author

Made by **kijnreyyca**, for the things worth keeping.
