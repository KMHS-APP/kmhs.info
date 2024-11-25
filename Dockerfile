FROM oven/bun:latest

COPY . .

RUN bun i

CMD bun run dev -- --host 0.0.0.0

EXPOSE 4321
