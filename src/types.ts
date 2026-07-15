export type KanaType = 'hiragana' | 'katakana';

export type KanjiLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'Hard';
export type Kana = {
    romaji: string;
    kana: string;
    type: KanaType;
};

export type Kanji = {
    kanji: string;
    meaning: string;
    hiragana: string;
    level: KanjiLevel;
}