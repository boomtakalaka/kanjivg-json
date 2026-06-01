# `kanjivg-json`

This repository contains Kanji stroke data from [KanjiVG](https://github.com/KanjiVG/kanjivg) that has been serialized into JSON.

The following data is extracted from the SVG:

- SVG dimensions
- Stroke order and paths

All other data is not extracted. See `src/index.ts` for more details.

The scope of the kanji converted is limited to Joyo kanji, with the default form.

# Licence

This work is a derivative of [KanjiVG](https://kanjivg.tagaini.net/) copyright Ulrich Apel, used under Creative Commons Attribution-Share Alike 3.0 license. This derivative work is also licensed with the same license.

Attribution-Share Alike 3.0 licence:

http://creativecommons.org/licenses/by-sa/3.0/

See the file COPYING for more details.

# Dev quickstart

1. `npm install`
2. `npm run build`
3. `npm run convert -- <args>`

To clean: `npm run clean`, will delete `dist` and `kanji_json` folders

For testing: `npm run dev` will skip compilation and directly execute the converter