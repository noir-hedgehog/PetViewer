# Codex Pet Viewer

[English](README.md) | [简体中文](README.zh-CN.md)

A tiny static browser for Codex pet atlases. It loads `pet.json` plus `spritesheet.webp` or `spritesheet.png`, previews each animation row, and checks the basic atlas contract. Noir, Manqu, and Miki are bundled as presets, with Noir shown by default.

## Use

Open `index.html` in a browser.

- Paste a `pet.json` URL and load it online. `spritesheetPath` is resolved relative to that JSON URL.
- Choose a pet folder that contains `pet.json` and a spritesheet.
- Or drag loose `.json`, `.webp`, and `.png` files into the import area.
- Move the mouse over the preview stage to inspect all 16 v2 look directions directly.
- Trigger the default Codex actions manually from the action panel or number keys `1` through `9`.
- Switch the full interface between Chinese and English from the header; the choice is remembered locally.
- Open the GitHub repository directly from the header to leave a Star.
- Use the state picker, frame strip, row-based atlas inspector, playback speed, zoom, and checkerboard toggle for manual inspection.
- Transparent trailing slots are detected and excluded from playback. If pixel inspection is blocked by a remote host, the Codex standard frame counts are used instead.

## GitHub Pages

This is a zero-build static app. The included GitHub Actions workflow deploys the repository root to Pages whenever `main` is pushed.

If Pages is not enabled yet, open repository Settings -> Pages and select GitHub Actions as the source.

You can deep-link a pet with:

```text
https://<user>.github.io/PetViewer/?pet=https://raw.githubusercontent.com/<user>/<repo>/<branch>/<pet-dir>/pet.json
```

Remote loading depends on the host allowing the browser to fetch the JSON and image.

## Codex Pet Contract

The viewer assumes Codex cells are `192 x 208`.

- v1 atlas: `8 x 9`, `1536 x 1872`
- v2 atlas: `8 x 11`, `1536 x 2288`
- v2 rows 9 and 10 contain the 16 look directions from `000` through `337.5`

Standard animation rows use their Codex frame counts and timing, including shorter waving, jumping, waiting, working, and review rows. Imported atlases can still use additional populated cells; the viewer detects them automatically when browser security permits pixel inspection.

This tool only previews and validates dimensions; it does not generate, repair, or package pets.

## Bundled Pets

- Noir is bundled from [noir-hedgehog/about-noir](https://github.com/noir-hedgehog/about-noir) under `assets/noir/`.
- Manqu is bundled from the local Codex custom pet package under `assets/manqu/`.
- Miki is a chibi interpretation of the VirtuaReal character 弥希, packaged under `assets/miki/` with all standard actions and 16 v2 look directions.

All three remain regular Codex v2 packages and are loaded through the same manifest and atlas paths used by imported pets.
