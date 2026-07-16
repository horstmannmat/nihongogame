import type { Kana } from '../types/Kana';

const KATAKANA: Readonly<Kana[]> = [
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
    { romaji: 'ma', type: 'katakana', kana: 'マ' },
    { romaji: 'mi', type: 'katakana', kana: 'ミ' },
    { romaji: 'mu', type: 'katakana', kana: 'ム' },
    { romaji: 'me', type: 'katakana', kana: 'メ' },
    { romaji: 'mo', type: 'katakana', kana: 'モ' },

    // Y
    { romaji: 'ya', type: 'katakana', kana: 'ヤ' },
    { romaji: 'yu', type: 'katakana', kana: 'ユ' },
    { romaji: 'yo', type: 'katakana', kana: 'ヨ' },

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

export default KATAKANA;