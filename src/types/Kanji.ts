export type KanjiLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'Hard';

export type Kanji = {
  kanji: string;
  strokes: number;
  meaning: string[];
  kunyomi: string[];
  onyomi: string[];
  level: KanjiLevel;
};
