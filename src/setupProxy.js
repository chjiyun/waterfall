const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://124.221.234.176:8000',
      changeOrigin: true,
    })
  );
};