import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import generateHype from './api/generate-hype.js'

function localApi() {
  return {
    name: 'ambiora-local-api',
    configureServer(server) {
      server.middlewares.use('/api/generate-hype', async (req, res) => {
        const response = { setHeader: res.setHeader.bind(res) }
        response.status = code => { res.statusCode = code; return response }
        response.json = value => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)); return response }
        if (req.method !== 'POST') return generateHype(req, response)
        let raw = ''
        for await (const chunk of req) {
          raw += chunk
          if (raw.length > 16000) {
            res.statusCode = 413
            res.end(JSON.stringify({ error: 'Request is too large.' }))
            return
          }
        }
        try { req.body = JSON.parse(raw || '{}') } catch {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'Invalid JSON request.' }))
          return
        }
        await generateHype(req, response)
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, process.cwd(), '')
  for (const key of ['OPENAI_API_KEY', 'OPENAI_MODEL']) {
    if (!process.env[key] && localEnv[key]) process.env[key] = localEnv[key]
  }
  return { plugins: [react(), localApi()] }
})
