FROM oven/bun:1.2.23-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.2.23-slim"
LABEL org.opencontainers.image.base.digest="sha256:449fd5b830d2ee15b2eced5c54467ef47c049a1eb4d13df4065644a9da8717c9"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
