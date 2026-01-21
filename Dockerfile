FROM oven/bun:1.3.6-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.3.6-slim"
LABEL org.opencontainers.image.base.digest="sha256:766690ef3be36b73288435428c638e47b8500d01f8fa1c298c4b09dc29841197"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
