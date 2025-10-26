import { defineConfig } from 'vite'
import {resolve} from 'path'
const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')


// Export an async config and dynamically import @vitejs/plugin-react
// This avoids esbuild trying to require an ESM-only package during config bundling.
export default defineConfig(async () => {
  const reactPlugin = (await import('@vitejs/plugin-react')).default

  return {
    plugins: [reactPlugin()],
    root,
    base: '/UPlate/',
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
            input: {
                index: resolve(root, 'index.html')
            }
      }
    },
    server: {
      port: 3000
    }
  }
})
