const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://openapi.11st.co.kr',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/openapi/OpenApiService.tmall',
      },
    })
  );
};
