# Codex Pet Viewer

A tiny static browser for Codex pet atlases. It loads `pet.json` plus `spritesheet.webp` or `spritesheet.png`, previews each animation row, and checks the basic atlas contract.

## Use

Open `index.html` in a browser.

- Paste a `pet.json` URL and load it online. `spritesheetPath` is resolved relative to that JSON URL.
- Choose a pet folder that contains `pet.json` and a spritesheet.
- Or drag loose `.json`, `.webp`, and `.png` files into the import area.
- Move the mouse over the preview stage to inspect v2 look-direction cells directly.
- Trigger the default Codex actions manually from the action panel or number keys `1` through `9`.
- Use the state picker, frame strip, atlas cells, playback speed, zoom, and checkerboard toggle for manual inspection.

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

This tool only previews and validates dimensions; it does not generate, repair, or package pets.
