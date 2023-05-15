/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  swcMinify: true,
  env: {
    DEPLOY_MODE: process.env.DEPLOY_MODE,
    BASE_MAIN_SITE_URL: 'https://explorer.v.systems',
    BASE_TEST_SITE_URL: 'https://testexplorer.v.systems',
    BASE_DEV_SITE_URL: 'https://devexplorer.v.systems',
  }
}

module.exports = nextConfig
