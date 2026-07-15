import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        // Never "prerender" binary assets (e.g. the CV PDF): the crawler
        // re-encodes them as text and corrupts the served file.
        filter: ({ path }) => !/\.[a-z0-9]+$/i.test(path),
      },
    }),
    viteReact(),
  ],
})

export default config
