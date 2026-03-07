FROM oven/bun:1.3.10-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.3.10-slim"
LABEL org.opencontainers.image.base.digest="sha256:9f4f6b0237cbc56908aa1b4cadcfc07f6ffc2b0e5ce28c1d03293a6d5f958daa"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
