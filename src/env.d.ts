/// <reference types="astro/client" />

// use a default runtime configuration (advanced mode).
type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Locals extends Runtime {}
}
