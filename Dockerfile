FROM oven/bun:1.2.17-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.2.17-slim"
LABEL org.opencontainers.image.base.digest="sha256:b6d49b7a0acaab3dcc3c7e33299a48ae5b1a68b8674a7428073b6f13bdf0b79a"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
