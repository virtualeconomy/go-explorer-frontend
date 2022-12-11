/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  swcMinify: true,
  env: {
    DEPLOY_MODE: process.env.DEPLOY_MODE,
    BASE_TEST_SITE_URL: 'http://devexplorer.v.systems',
    BASE_MAIN_SITE_URL: 'http://mainnetexplorer.v.systems',
    BASE_API_URL: process.env.DEPLOY_MODE === 'prod' ? process.env.MAIN_BACKEND : process.env.TEST_BACKEND,
  }
}

module.exports = nextConfig
