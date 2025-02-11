FROM oven/bun:distroless
WORKDIR /app
COPY .output .

CMD ["server/index.mjs"]
EXPOSE 3000
