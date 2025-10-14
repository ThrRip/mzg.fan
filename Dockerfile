FROM oven/bun:1.3.0-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.3.0-slim"
LABEL org.opencontainers.image.base.digest="sha256:337866545ababba9c5b7432e0b446eaba25621a55d2757df1f933f6f609714c7"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
