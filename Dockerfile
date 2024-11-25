FROM oven/bun:latest

COPY . .

RUN bun i

RUN bun run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD bun run dev -- --host 0.0.0.0
