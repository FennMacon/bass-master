# bass-master


## Interactive scales page

Open `scales-interactive.html` directly, or serve this directory with
`python3 -m http.server 8765 --bind 127.0.0.1` and visit
`http://127.0.0.1:8765/scales-interactive.html`.

- `scales-interactive.css`: page styling, responsive layouts, and focus indicators.
- `scales-data.js`: scale definitions, note lists, colors, and pitch calculations.
- `scales-interactive.js`: instrument rendering, controls, note details, and URL state.
- `vendor/jquery-4.0.0.min.js`: the official jQuery release, including its license header; only this page uses it.

Tap a note or focus it with Tab to read its details. Enter/Space selects it;
Escape clears the details. Control buttons expose their selected state to assistive technology.
The existing note lists intentionally exclude E♯, F♭, B♯, and C♭.

Selections update the URL without reloading. Bookmark or copy “Link to this view”
to retain `root`, `scale`, `spelling`, `instrument`, `chord`, and `shape`.
Root/chord accidentals use ASCII `#` in URLs (encoded as `%23`); invalid values
fall back to defaults. Staff views redraw when their container width changes.

## Shared lesson styles and controls

Edit `input.scss`, then run `node build-styles.cjs` to refresh `output.css`.
The source uses plain CSS (also valid SCSS), so this build needs no dependencies.
Commit both files together. The historical source map is no longer used.

The lesson pages use `script.js` without jQuery. Navigation remains available on
small screens; reference diagrams include written descriptions, expanded states,
and Escape-to-close. The reference toolbar flows after the content on smaller
screens and reserves its measured height when fixed on wider screens.
