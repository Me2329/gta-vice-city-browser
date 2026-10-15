# GTA: Vice City — in your browser

Play GTA: Vice City right in your browser: **https://gtavicecitybrowser.netlify.app**

Nothing to install. The game runs on your own device and keeps working offline.

## How to play

1. Get `game.tar.gz` from **your own legitimate copy** of GTA: Vice City
   (this site does not host or distribute the game files).
2. Open **https://gtavicecitybrowser.netlify.app** in Chrome, Edge or Firefox on a computer.
3. Click **Select game.tar.gz** and pick the file. It's about 700 MB, so the import takes a minute or two.
4. The game starts by itself as soon as the import finishes.
5. Next time, just open the link: the game goes straight in, no file needed.
   You only pick the file again if you clear your browser data or switch browser.

Click inside the game once to turn on the sound (browsers block audio until you click).

## Run it on your own computer

Put `game.tar.gz` in the project folder (next to `package.json`), then:

```bash
npm install
npm run dev
```

Open `http://localhost:5173/gta-vice-city-wasm/` — the game files load and the game starts automatically.

## Publish to Netlify

```powershell
$env:VITE_BASE="/"
npm run build
netlify deploy --prod --dir=dist
```

`netlify.toml` sets the cross-origin isolation headers the engine needs.
`game.tar.gz` is git-ignored and never part of `dist`.

## Requirements

- A modern desktop browser with WebAssembly + OPFS + Service Worker support
- Recommended: Chrome 110+, Firefox 111+, or Safari 16.4+
- The `game.tar.gz` game archive (~668 MB compressed)

## Tech stack

- **Vite** — dev server and build tool
- **WebAssembly** — game engine compiled from C++ via Emscripten
- **OPFS** (Origin Private File System) — stores extracted game data locally in the browser
- **Service Worker** — intercepts fetch requests to serve game files from OPFS
- **Web Worker** — extracts the `.tar.gz` archive off the main thread

## Credits

**Browser client port** (OPFS storage, Service Worker, import UI, GitHub Pages deploy):
[@joncodeofficial](https://github.com/joncodeofficial)

**Based on** [reVCDOS](https://github.com/Lolendor/reVCDOS) by [@Lolendor](https://github.com/Lolendor)

**WASM engine port** by the DOS Zone team:
- [@specialist003](https://github.com/okhmanyuk-ev)
- [@caiiiycuk](https://www.youtube.com/caiiiycuk)
- [@SerGen](https://t.me/ser_var)

The game engine is based on the open-source reverse engineering project [re3/reVC](https://github.com/SugaryHull/re3/tree/miami).

## License

This repository's source code is licensed under the [MIT License](LICENSE).

## Disclaimer

This is an unofficial, non-commercial fan project. It is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. "Grand Theft Auto" and "Vice City" are trademarks of their respective owners and are used here only to describe which game this software is compatible with.

The source code in this repository does not include the game's data files (models, textures, audio, maps). It is built on an open-source reimplementation of the game engine, and you need your own legitimate copy of GTA: Vice City to use it. The maintainer does not authorize anyone to redistribute the game's files and is not responsible for how third parties obtain, host, or share them, nor for any consequences of unauthorized use of this project.

This software is provided "as is", without warranty of any kind. See the [LICENSE](LICENSE) file for the full liability disclaimer.
