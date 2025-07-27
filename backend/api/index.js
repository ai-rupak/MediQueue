// api/index.js
// api/index.js
import app from '../server.js'
import { createServer } from 'http'

// Required for serverless to hook into Express
export default function handler(req, res) {
  const server = createServer(app)
  server.emit('request', req, res)
}
