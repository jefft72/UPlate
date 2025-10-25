import { defineConfig } from 'vite'

// Export an async config and dynamically import @vitejs/plugin-react
// This avoids esbuild trying to require an ESM-only package during config bundling.
export default defineConfig(async () => {
  const reactPlugin = (await import('@vitejs/plugin-react')).default

  return {
    plugins: [reactPlugin()],
    server: {
      port: 3000
    }
  }
})
