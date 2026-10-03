import type { ParentProps } from "solid-js";
import { HydrationScript } from "@solidjs/web";

// The document shell (the index.html replacement), picked up by the
// src/Document.* convention; it must render the full <html> and ships no
// client JS. <HydrationScript /> is stripped from the prerendered shell in
// client mode and activates under `ssr: true`. Delete this file to fall
// back to the plugin's built-in shell.
export default function Document(props: ParentProps) {
  return (
    <html lang="zh">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>洺知-故犯</title>
        <meta
          name="description"
          content="洺知-故犯的主页 & 直播点唱歌单 | 哔哩哔哩 UID:32159860 直播间号:1267105"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#89c1cf" />
        <link rel="icon" href="/favicon.ico" sizes="48x48 32x32 16x16" />
        <link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
