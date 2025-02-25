FROM oven/bun:1.2.2-distroless

LABEL org.opencontainers.image.title="mzg.fan"
LABEL org.opencontainers.image.description="洺知-故犯的主页 & 直播点唱歌单"
LABEL org.opencontainers.image.url="https://mzg.fan"
LABEL org.opencontainers.image.source="https://github.com/ThrRip/mzg.fan"
LABEL org.opencontainers.image.version="0.0.0"
LABEL org.opencontainers.image.licenses="MPL-2.0"
LABEL org.opencontainers.image.base.name="docker.io/oven/bun:1.2.2-distroless"
LABEL org.opencontainers.image.base.digest="sha256:c578688b82a68441510d5ae8b34c55bd415b838812ed18892e75b6ad1058b5e0"

WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
