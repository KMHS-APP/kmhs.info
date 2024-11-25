FROM oven/bun:latest

COPY . .

RUN bun i

RUN bun run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD bunx astro preview --host 0.0.0.0 --port 4321
