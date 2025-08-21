FROM oven/bun:1.2.20-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.2.20-slim"
LABEL org.opencontainers.image.base.digest="sha256:4ace8a7935e99050dbb94a0faace51b0ba900b78309f816e535d4929e0bbe5f2"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
