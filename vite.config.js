import { resolve } from 'path'

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist'
  },
  publicDir: '../public',
  server: {
    port: 5173
  }
}