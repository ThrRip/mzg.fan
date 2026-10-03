import { v7 } from "uuid";

export interface SongLanguageRecord {
  code: string;
  display: string;
}

export const availableSongLanguages: { [key: string]: SongLanguageRecord } = {
  zh_CN: { code: "zh_CN", display: "国语" },
  en_US: { code: "en_US", display: "美语" },
};

export const defaultSongLanguage = availableSongLanguages.zh_CN.code;

export interface Song {
  id: string;
  name: string;
  artist: string;
  language: string;
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

export function createSong(
  name: string,
  artist: string,
  language: string = defaultSongLanguage,
): Song {
  let _id = v7();
  let _name = name;
  let _artist = artist;
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
      _language = newLanguage;
    },
  };

  return song;
}
