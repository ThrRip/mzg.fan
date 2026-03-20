FROM oven/bun:1.3.11-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.3.11-slim"
LABEL org.opencontainers.image.base.digest="sha256:49a1dfafe49d774e0b75a17bd596d5a8e49231c1fab76d9a30b6fc690c30f30e"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
