import type { Kana } from '../types/Kana';

const HIRAGANA: Kana[] = [
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

export default HIRAGANA;