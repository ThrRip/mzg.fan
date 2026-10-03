export interface PlaylistSong {
  id: string;
  name: string;
  artist: string;
  language: string;
  paymentRequired: boolean;
  paymentAmount?: number;
}

export const playlist: PlaylistSong[] = [
  { id: "s01", name: "晴天", artist: "周杰伦", language: "国语", paymentRequired: false },
  { id: "s02", name: "稻香", artist: "周杰伦", language: "国语", paymentRequired: false },
  { id: "s03", name: "夜曲", artist: "周杰伦", language: "国语", paymentRequired: false },
  { id: "s04", name: "告白气球", artist: "周杰伦", language: "国语", paymentRequired: false },
  { id: "s05", name: "红豆", artist: "王菲", language: "粤语", paymentRequired: false },
  { id: "s06", name: "海阔天空", artist: "Beyond", language: "粤语", paymentRequired: false },
  {
    id: "s07",
    name: "浮夸",
    artist: "陈奕迅",
    language: "粤语",
    paymentRequired: true,
    paymentAmount: 50,
  },
  { id: "s08", name: "光年之外", artist: "邓紫棋", language: "国语", paymentRequired: false },
  { id: "s09", name: "消愁", artist: "毛不易", language: "国语", paymentRequired: false },
  { id: "s10", name: "起风了", artist: "买辣椒也用券", language: "国语", paymentRequired: false },
  { id: "s11", name: "演员", artist: "薛之谦", language: "国语", paymentRequired: false },
  { id: "s12", name: "后来", artist: "刘若英", language: "国语", paymentRequired: false },
  {
    id: "s13",
    name: "想见你想见你想见你",
    artist: "八三夭",
    language: "国语",
    paymentRequired: true,
    paymentAmount: 30,
  },
  { id: "s14", name: "Lemon", artist: "米津玄师", language: "日语", paymentRequired: false },
  { id: "s15", name: "First Love", artist: "宇多田光", language: "日语", paymentRequired: false },
  {
    id: "s16",
    name: "红莲华",
    artist: "LiSA",
    language: "日语",
    paymentRequired: true,
    paymentAmount: 100,
  },
];
