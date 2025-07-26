FROM oven/bun:1.2.19-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.2.19-slim"
LABEL org.opencontainers.image.base.digest="sha256:7f587bc8d4de26c7eb2b73739878fe1ca9bac9b7e5f33005ecc2c3764d88b9b2"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
