FROM oven/bun:1.3.3-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.3.3-slim"
LABEL org.opencontainers.image.base.digest="sha256:a67a3dbf9a9c370d36814fe6d375054bb71f14d6323594e17a7553b593bc12fb"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
