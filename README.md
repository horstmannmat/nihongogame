# Japanese Stroke Order Game

A small React game for practicing Japanese kana and kanji stroke order. Choose the scripts or kanji levels you want to study, then read the prompt before the character's stroke animation is revealed.

## How it works

- Choose Hiragana, Katakana, or one or more kanji levels on the setup screen.
- Kana rounds show a romaji prompt and count down from 3 seconds.
- Kanji rounds show the hiragana reading and count down from 8 seconds.
- Each selected character is removed from the active pool after its animation plays, so a round does not repeat characters.

## Run locally

```bash
npm install
npm start
```

Create a production build with:

```bash
npm run build
```

## SVG assets and attribution

Kanji stroke-order SVG files were copied from [parsimonhi/animCJK](https://github.com/parsimonhi/animCJK). The complete Japanese SVG set is stored in `public/kanjistrokes-dist/undefined` until it is organized by level; currently selected level assets are in the matching `N5`, `N4`, `N3`, `N2`, `N1`, and `Hard` folders.

Hiragana and katakana stroke-order SVG files were copied from [zhengkyl/strokesvg](https://github.com/zhengkyl/strokesvg/tree/main) and are stored in `public/kanastrokes-dist`.

Please review and comply with the upstream projects' licensing terms when redistributing these assets.
