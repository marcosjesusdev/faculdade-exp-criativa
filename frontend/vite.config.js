import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,  // Permite que o React Router lide com a navegação de rotas diretamente no navegador
  },
})
