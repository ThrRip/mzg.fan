FROM oven/bun:1.3.1-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.3.1-slim"
LABEL org.opencontainers.image.base.digest="sha256:59fa276fb6d88bb610b9a40217a50215e87a51688a7c473f5b080260cd69ae47"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
