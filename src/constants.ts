import type { Kana,Kanji } from './types';

export const HIRAGANA: Kana[] = [
    // Vowels
    { romaji: 'a', type: 'hiragana', kana: 'あ' },
    { romaji: 'i', type: 'hiragana', kana: 'い' },
    { romaji: 'u', type: 'hiragana', kana: 'う' },
    { romaji: 'e', type: 'hiragana', kana: 'え' },
    { romaji: 'o', type: 'hiragana', kana: 'お' },

    // K
    { romaji: 'ka', type: 'hiragana', kana: 'か' },
    { romaji: 'ki', type: 'hiragana', kana: 'き' },
    { romaji: 'ku', type: 'hiragana', kana: 'く' },
    { romaji: 'ke', type: 'hiragana', kana: 'け' },
    { romaji: 'ko', type: 'hiragana', kana: 'こ' },

    // G
    { romaji: 'ga', type: 'hiragana', kana: 'が' },
    { romaji: 'gi', type: 'hiragana', kana: 'ぎ' },
    { romaji: 'gu', type: 'hiragana', kana: 'ぐ' },
    { romaji: 'ge', type: 'hiragana', kana: 'げ' },
    { romaji: 'go', type: 'hiragana', kana: 'ご' },

    // S
    { romaji: 'sa', type: 'hiragana', kana: 'さ' },
    { romaji: 'shi', type: 'hiragana', kana: 'し' },
    { romaji: 'su', type: 'hiragana', kana: 'す' },
    { romaji: 'se', type: 'hiragana', kana: 'せ' },
    { romaji: 'so', type: 'hiragana', kana: 'そ' },

    // Z
    { romaji: 'za', type: 'hiragana', kana: 'ざ' },
    { romaji: 'ji', type: 'hiragana', kana: 'じ' },
    { romaji: 'zu', type: 'hiragana', kana: 'ず' },
    { romaji: 'ze', type: 'hiragana', kana: 'ぜ' },
    { romaji: 'zo', type: 'hiragana', kana: 'ぞ' },

    // T
    { romaji: 'ta', type: 'hiragana', kana: 'た' },
    { romaji: 'chi', type: 'hiragana', kana: 'ち' },
    { romaji: 'tsu', type: 'hiragana', kana: 'つ' },
    { romaji: 'te', type: 'hiragana', kana: 'て' },
    { romaji: 'to', type: 'hiragana', kana: 'と' },

    // D
    { romaji: 'da', type: 'hiragana', kana: 'だ' },
    { romaji: 'ji', type: 'hiragana', kana: 'ぢ' },
    { romaji: 'zu', type: 'hiragana', kana: 'づ' },
    { romaji: 'de', type: 'hiragana', kana: 'で' },
    { romaji: 'do', type: 'hiragana', kana: 'ど' },

    // N
    { romaji: 'na', type: 'hiragana', kana: 'な' },
    { romaji: 'ni', type: 'hiragana', kana: 'に' },
    { romaji: 'nu', type: 'hiragana', kana: 'ぬ' },
    { romaji: 'ne', type: 'hiragana', kana: 'ね' },
    { romaji: 'no', type: 'hiragana', kana: 'の' },

    // H
    { romaji: 'ha', type: 'hiragana', kana: 'は' },
    { romaji: 'hi', type: 'hiragana', kana: 'ひ' },
    { romaji: 'fu', type: 'hiragana', kana: 'ふ' },
    { romaji: 'he', type: 'hiragana', kana: 'へ' },
    { romaji: 'ho', type: 'hiragana', kana: 'ほ' },

    // B
    { romaji: 'ba', type: 'hiragana', kana: 'ば' },
    { romaji: 'bi', type: 'hiragana', kana: 'び' },
    { romaji: 'bu', type: 'hiragana', kana: 'ぶ' },
    { romaji: 'be', type: 'hiragana', kana: 'べ' },
    { romaji: 'bo', type: 'hiragana', kana: 'ぼ' },

    // P
    { romaji: 'pa', type: 'hiragana', kana: 'ぱ' },
    { romaji: 'pi', type: 'hiragana', kana: 'ぴ' },
    { romaji: 'pu', type: 'hiragana', kana: 'ぷ' },
    { romaji: 'pe', type: 'hiragana', kana: 'ぺ' },
    { romaji: 'po', type: 'hiragana', kana: 'ぽ' },

    // M
    { romaji: 'ma', type: 'hiragana', kana: 'ま' },
    { romaji: 'mi', type: 'hiragana', kana: 'み' },
    { romaji: 'mu', type: 'hiragana', kana: 'む' },
    { romaji: 'me', type: 'hiragana', kana: 'め' },
    { romaji: 'mo', type: 'hiragana', kana: 'も' },

    // Y
    { romaji: 'ya', type: 'hiragana', kana: 'や' },
    { romaji: 'yu', type: 'hiragana', kana: 'ゆ' },
    { romaji: 'yo', type: 'hiragana', kana: 'よ' },

    // R
    { romaji: 'ra', type: 'hiragana', kana: 'ら' },
    { romaji: 'ri', type: 'hiragana', kana: 'り' },
    { romaji: 'ru', type: 'hiragana', kana: 'る' },
    { romaji: 're', type: 'hiragana', kana: 'れ' },
    { romaji: 'ro', type: 'hiragana', kana: 'ろ' },

    // W
    { romaji: 'wa', type: 'hiragana', kana: 'わ' },
    { romaji: 'wo', type: 'hiragana', kana: 'を' },

    // N
    { romaji: 'n', type: 'hiragana', kana: 'ん' },

    // Yōon (combinations)

    // K
    { romaji: 'kya', type: 'hiragana', kana: 'きゃ' },
    { romaji: 'kyu', type: 'hiragana', kana: 'きゅ' },
    { romaji: 'kyo', type: 'hiragana', kana: 'きょ' },

    // G
    { romaji: 'gya', type: 'hiragana', kana: 'ぎゃ' },
    { romaji: 'gyu', type: 'hiragana', kana: 'ぎゅ' },
    { romaji: 'gyo', type: 'hiragana', kana: 'ぎょ' },

    // S
    { romaji: 'sha', type: 'hiragana', kana: 'しゃ' },
    { romaji: 'shu', type: 'hiragana', kana: 'しゅ' },
    { romaji: 'sho', type: 'hiragana', kana: 'しょ' },

    // Z
    { romaji: 'ja', type: 'hiragana', kana: 'じゃ' },
    { romaji: 'ju', type: 'hiragana', kana: 'じゅ' },
    { romaji: 'jo', type: 'hiragana', kana: 'じょ' },

    // T
    { romaji: 'cha', type: 'hiragana', kana: 'ちゃ' },
    { romaji: 'chu', type: 'hiragana', kana: 'ちゅ' },
    { romaji: 'cho', type: 'hiragana', kana: 'ちょ' },

    // D
    { romaji: 'dya', type: 'hiragana', kana: 'ぢゃ' },
    { romaji: 'dyu', type: 'hiragana', kana: 'ぢゅ' },
    { romaji: 'dyo', type: 'hiragana', kana: 'ぢょ' },

    // N
    { romaji: 'nya', type: 'hiragana', kana: 'にゃ' },
    { romaji: 'nyu', type: 'hiragana', kana: 'にゅ' },
    { romaji: 'nyo', type: 'hiragana', kana: 'にょ' },

    // H
    { romaji: 'hya', type: 'hiragana', kana: 'ひゃ' },
    { romaji: 'hyu', type: 'hiragana', kana: 'ひゅ' },
    { romaji: 'hyo', type: 'hiragana', kana: 'ひょ' },

    // B
    { romaji: 'bya', type: 'hiragana', kana: 'びゃ' },
    { romaji: 'byu', type: 'hiragana', kana: 'びゅ' },
    { romaji: 'byo', type: 'hiragana', kana: 'びょ' },

    // P
    { romaji: 'pya', type: 'hiragana', kana: 'ぴゃ' },
    { romaji: 'pyu', type: 'hiragana', kana: 'ぴゅ' },
    { romaji: 'pyo', type: 'hiragana', kana: 'ぴょ' },

    // M
    { romaji: 'mya', type: 'hiragana', kana: 'みゃ' },
    { romaji: 'myu', type: 'hiragana', kana: 'みゅ' },
    { romaji: 'myo', type: 'hiragana', kana: 'みょ' },

    // R
    { romaji: 'rya', type: 'hiragana', kana: 'りゃ' },
    { romaji: 'ryu', type: 'hiragana', kana: 'りゅ' },
    { romaji: 'ryo', type: 'hiragana', kana: 'りょ' },
];

export const KATAKANA: Kana[] = [
    // Vowels
    { romaji: 'a', type: 'katakana', kana: 'ア' },
    { romaji: 'i', type: 'katakana', kana: 'イ' },
    { romaji: 'u', type: 'katakana', kana: 'ウ' },
    { romaji: 'e', type: 'katakana', kana: 'エ' },
    { romaji: 'o', type: 'katakana', kana: 'オ' },

    // K
    { romaji: 'ka', type: 'katakana', kana: 'カ' },
    { romaji: 'ki', type: 'katakana', kana: 'キ' },
    { romaji: 'ku', type: 'katakana', kana: 'ク' },
    { romaji: 'ke', type: 'katakana', kana: 'ケ' },
    { romaji: 'ko', type: 'katakana', kana: 'コ' },

    // G
    { romaji: 'ga', type: 'katakana', kana: 'ガ' },
    { romaji: 'gi', type: 'katakana', kana: 'ギ' },
    { romaji: 'gu', type: 'katakana', kana: 'グ' },
    { romaji: 'ge', type: 'katakana', kana: 'ゲ' },
    { romaji: 'go', type: 'katakana', kana: 'ゴ' },

    // S
    { romaji: 'sa', type: 'katakana', kana: 'サ' },
    { romaji: 'shi', type: 'katakana', kana: 'シ' },
    { romaji: 'su', type: 'katakana', kana: 'ス' },
    { romaji: 'se', type: 'katakana', kana: 'セ' },
    { romaji: 'so', type: 'katakana', kana: 'ソ' },

    // Z
    { romaji: 'za', type: 'katakana', kana: 'ザ' },
    { romaji: 'ji', type: 'katakana', kana: 'ジ' },
    { romaji: 'zu', type: 'katakana', kana: 'ズ' },
    { romaji: 'ze', type: 'katakana', kana: 'ゼ' },
    { romaji: 'zo', type: 'katakana', kana: 'ゾ' },

    // T
    { romaji: 'ta', type: 'katakana', kana: 'タ' },
    { romaji: 'chi', type: 'katakana', kana: 'チ' },
    { romaji: 'tsu', type: 'katakana', kana: 'ツ' },
    { romaji: 'te', type: 'katakana', kana: 'テ' },
    { romaji: 'to', type: 'katakana', kana: 'ト' },

    // D
    { romaji: 'da', type: 'katakana', kana: 'ダ' },
    { romaji: 'ji', type: 'katakana', kana: 'ヂ' },
    { romaji: 'zu', type: 'katakana', kana: 'ヅ' },
    { romaji: 'de', type: 'katakana', kana: 'デ' },
    { romaji: 'do', type: 'katakana', kana: 'ド' },

    // N
    { romaji: 'na', type: 'katakana', kana: 'ナ' },
    { romaji: 'ni', type: 'katakana', kana: 'ニ' },
    { romaji: 'nu', type: 'katakana', kana: 'ヌ' },
    { romaji: 'ne', type: 'katakana', kana: 'ネ' },
    { romaji: 'no', type: 'katakana', kana: 'ノ' },

    // H
    { romaji: 'ha', type: 'katakana', kana: 'ハ' },
    { romaji: 'hi', type: 'katakana', kana: 'ヒ' },
    { romaji: 'fu', type: 'katakana', kana: 'フ' },
    { romaji: 'he', type: 'katakana', kana: 'ヘ' },
    { romaji: 'ho', type: 'katakana', kana: 'ホ' },

    // B
    { romaji: 'ba', type: 'katakana', kana: 'バ' },
    { romaji: 'bi', type: 'katakana', kana: 'ビ' },
    { romaji: 'bu', type: 'katakana', kana: 'ブ' },
    { romaji: 'be', type: 'katakana', kana: 'ベ' },
    { romaji: 'bo', type: 'katakana', kana: 'ボ' },

    // P
    { romaji: 'pa', type: 'katakana', kana: 'パ' },
    { romaji: 'pi', type: 'katakana', kana: 'ピ' },
    { romaji: 'pu', type: 'katakana', kana: 'プ' },
    { romaji: 'pe', type: 'katakana', kana: 'ペ' },
    { romaji: 'po', type: 'katakana', kana: 'ポ' },

    // M
    { romaji: 'ma', type: 'katakana', kana: 'MA' },
    { romaji: 'mi', type: 'katakana', kana: 'MI' },
    { romaji: 'mu', type: 'katakana', kana: 'MU' },
    { romaji: 'me', type: 'katakana', kana: 'ME' },
    { romaji: 'mo', type: 'katakana', kana: 'MO' },

    // Y
    { romaji: 'ya', type: 'katakana', kana: 'YA' },
    { romaji: 'yu', type: 'katakana', kana: 'YU' },
    { romaji: 'yo', type: 'katakana', kana: 'YO' },

    // R
    { romaji: 'ra', type: 'katakana', kana: 'ラ' },
    { romaji: 'ri', type: 'katakana', kana: 'リ' },
    { romaji: 'ru', type: 'katakana', kana: 'ル' },
    { romaji: 're', type: 'katakana', kana: 'レ' },
    { romaji: 'ro', type: 'katakana', kana: 'ロ' },

    // W
    { romaji: 'wa', type: 'katakana', kana: 'ワ' },
    { romaji: 'wo', type: 'katakana', kana: 'ヲ' },

    // N
    { romaji: 'n', type: 'katakana', kana: 'ン' },

    // Yōon (combinations)

    // K
    { romaji: 'kya', type: 'katakana', kana: 'キャ' },
    { romaji: 'kyu', type: 'katakana', kana: 'キュ' },
    { romaji: 'kyo', type: 'katakana', kana: 'キョ' },

    // G
    { romaji: 'gya', type: 'katakana', kana: 'ギャ' },
    { romaji: 'gyu', type: 'katakana', kana: 'ギュ' },
    { romaji: 'gyo', type: 'katakana', kana: 'ギョ' },

    // S
    { romaji: 'sha', type: 'katakana', kana: 'シャ' },
    { romaji: 'shu', type: 'katakana', kana: 'シュ' },
    { romaji: 'sho', type: 'katakana', kana: 'ショ' },

    // Z
    { romaji: 'ja', type: 'katakana', kana: 'ジャ' },
    { romaji: 'ju', type: 'katakana', kana: 'ジュ' },
    { romaji: 'jo', type: 'katakana', kana: 'ジョ' },

    // T
    { romaji: 'cha', type: 'katakana', kana: 'チャ' },
    { romaji: 'chu', type: 'katakana', kana: 'チュ' },
    { romaji: 'cho', type: 'katakana', kana: 'チョ' },

    // D
    { romaji: 'dya', type: 'katakana', kana: 'ヂャ' },
    { romaji: 'dyu', type: 'katakana', kana: 'ヂュ' },
    { romaji: 'dyo', type: 'katakana', kana: 'ヂョ' },

    // N
    { romaji: 'nya', type: 'katakana', kana: 'ニャ' },
    { romaji: 'nyu', type: 'katakana', kana: 'ニュ' },
    { romaji: 'nyo', type: 'katakana', kana: 'ニョ' },

    // H
    { romaji: 'hya', type: 'katakana', kana: 'ヒャ' },
    { romaji: 'hyu', type: 'katakana', kana: 'ヒュ' },
    { romaji: 'hyo', type: 'katakana', kana: 'ヒョ' },

    // B
    { romaji: 'bya', type: 'katakana', kana: 'ビャ' },
    { romaji: 'byu', type: 'katakana', kana: 'ビュ' },
    { romaji: 'byo', type: 'katakana', kana: 'ビョ' },

    // P
    { romaji: 'pya', type: 'katakana', kana: 'ピャ' },
    { romaji: 'pyu', type: 'katakana', kana: 'ピュ' },
    { romaji: 'pyo', type: 'katakana', kana: 'ピョ' },

    // M
    { romaji: 'mya', type: 'katakana', kana: 'ミャ' },
    { romaji: 'myu', type: 'katakana', kana: 'ミュ' },
    { romaji: 'myo', type: 'katakana', kana: 'ミョ' },

    // R
    { romaji: 'rya', type: 'katakana', kana: 'リャ' },
    { romaji: 'ryu', type: 'katakana', kana: 'リュ' },
    { romaji: 'ryo', type: 'katakana', kana: 'リョ' },
];


export const N5: Kanji[] = [
    {
        kanji: '日',
        meaning: 'day, sun',
        hiragana: 'にち',
        level: 'N5',
    },
];

export const N4: Kanji[] = [
    {
        kanji: '泳',
        meaning: 'to swim',
        hiragana: 'およぐ',
        level: 'N4',
    },
];

export const N3: Kanji[] = [
    {
        kanji: '続',
        meaning: 'continue',
        hiragana: 'つづく',
        level: 'N3',
    },
];

export const N2: Kanji[] = [
    {
        kanji: '援',
        meaning: 'aid, support',
        hiragana: 'えん',
        level: 'N2',
    },
];

export const N1: Kanji[] = [
    {
        kanji: '鬱',
        meaning: 'depression, gloom',
        hiragana: 'うつ',
        level: 'N1',
    },
];

export const Hard: Kanji[] = [
    {
        kanji: '薔',
        meaning: 'rose',
        hiragana: 'しょう',
        level: 'Hard',
    },
    {
        kanji: '謄',
        meaning: 'copy, transcript',
        hiragana: 'とうほん',
        level: 'Hard',
    },
];