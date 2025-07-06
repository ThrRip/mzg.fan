FROM oven/bun:1.2.18-slim

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.2.18-slim"
LABEL org.opencontainers.image.base.digest="sha256:996d02ce00f6ce8fa0857a300b02adcb105b8ea4d9566827b49a8e1f4d26210d"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
