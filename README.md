# Japanese Stroke Animation Game

For a demo, see [https://math.eus/nihongo](https://math.eus/nihongo)

You can see the project source at [horstmannmat/nihongogame](https://github.com/horstmannmat/nihongogame).

A small React game for practicing Japanese kana and kanji stroke animations. Choose the scripts or kanji levels you want to study, then write the prompted kana or kanji on a sheet of paper before the character's stroke animation is revealed.

## Why I built this

In the process of learning Japanese I realised that recognising and reading the characters was not enough. When I had to write them, my mind went blank because I had not built the muscle memory to write them quickly.

Most flashcard apps show you hiragana or katakana and ask you to read it. This game reverses that process: it gives you the reading and asks you to physically write the character on paper before revealing the stroke animations. The goal is to build the muscle memory needed to write Japanese accurately and without hesitation.

## How it works

- Choose Hiragana, Katakana, or one or more kanji levels on the setup screen.
- Kana rounds show a romaji prompt and count down from 3 seconds.
- Kanji rounds show the kunyomi and onyomi readings and count down from 8 seconds.
- Tap or click the countdown to reveal the stroke animations early.
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

## Study data

Kana datasets are stored as JSON in `public/kana/data`, and kanji datasets are stored by level in `public/kanji/data`. The app loads these files at runtime.

## SVG assets and attribution

Kanji stroke-animation SVG files were copied from [parsimonhi/animCJK](https://github.com/parsimonhi/animCJK)

Hiragana and katakana stroke-animation SVG files were copied from [zhengkyl/strokesvg](https://github.com/zhengkyl/strokesvg/) and are stored in `public/kanastrokes-dist`.

Please review and comply with the upstream projects' licensing terms when redistributing these assets.

## Other references

Although I did not copy content directly from the following projects, I used them as references and as secondary sources when cross-checking kanji information. They are also valuable resources for further study:

- [The Kanji Map](https://thekanjimap.com/about)
- [Jisho.org](https://jisho.org/about)
- [Kanji alive](https://kanjialive.com/)

## Copyright

This site is an open-source project maintained under the [GNU Affero General Public License](LICENSE). Feel free to fork, contribute, or share it with other learners.
