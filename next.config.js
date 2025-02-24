/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    appIsrStatus: false, // Isso desativa o indicador de rota estática
  },
}

module.exports = nextConfig