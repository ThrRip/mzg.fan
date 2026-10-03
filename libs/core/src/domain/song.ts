import { v7 } from "uuid";

export type SongLanguage = "zh-Hans" | "yue" | "ja" | "en";

export interface SongLanguageRecord {
  code: SongLanguage;
  display: string;
}

export const availableSongLanguages: Record<SongLanguage, SongLanguageRecord> = {
  "zh-Hans": { code: "zh-Hans", display: "国语" },
  yue: { code: "yue", display: "粤语" },
  ja: { code: "ja", display: "日语" },
  en: { code: "en", display: "英语" },
};

export const defaultSongLanguage: SongLanguage = availableSongLanguages["zh-Hans"].code;

export interface Song {
  id: string;
  name: string;
  artist: string;
  language: SongLanguage;
}

export function validateSongName(name: string) {
  if (name.length === 0 || name.length > 15) {
    throw new Error("Validate song name: Input length must be between 1 and 15 characters.");
  }
}

export function validateSongArtist(artist: string) {
  if (artist.length === 0 || artist.length > 12) {
    throw new Error("Validate song artist: Input length must be between 1 and 12 characters.");
  }
}

export function validateSongLanguage(language: string) {
  if (!(language in availableSongLanguages)) {
    throw new Error("Validate song language: Unsupported language code.");
  }
}

export function createSong(
  name: string,
  artist: string,
  language: SongLanguage = defaultSongLanguage,
): Song {
  let _id = v7();
  let _name = name;
  let _artist = artist;
  validateSongLanguage(language);
  let _language = language;

  const song = {
    get id() {
      return _id;
    },

    get name() {
      return _name;
    },

    set name(newName) {
      _name = newName;
    },

    get artist() {
      return _artist;
    },

    set artist(newArtist) {
      _artist = newArtist;
    },

    get language() {
      return _language;
    },

    set language(newLanguage) {
      validateSongLanguage(newLanguage);
      _language = newLanguage;
    },
  };

  return song;
}
