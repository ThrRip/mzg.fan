FROM oven/bun:1.2.5-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.2.5-slim"
LABEL org.opencontainers.image.base.digest="sha256:9c2edfaaf7d7df220a0af80d95aa5924463ae350f25eda3484f0bf376769b766"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
