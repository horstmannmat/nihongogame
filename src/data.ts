import type { Kana, KanaType } from "./types/Kana";
import type { Kanji, KanjiLevel } from "./types/Kanji";

export type GameData = {
  kana: Record<KanaType, Kana[]>;
  kanji: Record<KanjiLevel, Kanji[]>;
};

const KANA_FILES: Record<KanaType, string> = {
  hiragana: "hiragana.json",
  katakana: "katakana.json",
};

const KANJI_FILES: Record<KanjiLevel, string> = {
  N5: "n5.json",
  N4: "n4.json",
  N3: "n3.json",
  N2: "n2.json",
  N1: "n1.json",
  Hard: "hard.json",
};

async function fetchDataset<T>(url: string, signal: AbortSignal): Promise<T[]> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new TypeError(`Invalid dataset at ${url}`);
  }

  return data as T[];
}

export async function loadGameData(publicBase: string, signal: AbortSignal): Promise<GameData> {
  const [hiragana, katakana, N5, N4, N3, N2, N1, Hard] = await Promise.all([
    fetchDataset<Kana>(`${publicBase}/kana/data/${KANA_FILES.hiragana}`, signal),
    fetchDataset<Kana>(`${publicBase}/kana/data/${KANA_FILES.katakana}`, signal),
    fetchDataset<Kanji>(`${publicBase}/kanji/data/${KANJI_FILES.N5}`, signal),
    fetchDataset<Kanji>(`${publicBase}/kanji/data/${KANJI_FILES.N4}`, signal),
    fetchDataset<Kanji>(`${publicBase}/kanji/data/${KANJI_FILES.N3}`, signal),
    fetchDataset<Kanji>(`${publicBase}/kanji/data/${KANJI_FILES.N2}`, signal),
    fetchDataset<Kanji>(`${publicBase}/kanji/data/${KANJI_FILES.N1}`, signal),
    fetchDataset<Kanji>(`${publicBase}/kanji/data/${KANJI_FILES.Hard}`, signal),
  ]);

  return {
    kana: { hiragana, katakana },
    kanji: { N5, N4, N3, N2, N1, Hard },
  };
}
