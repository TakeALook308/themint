//setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://themint-auction.shop',
      changeOrigin: true,
    }),
  );
};
// npmstart 오류
// https://naroforme.tistory.com/entry/React-npm-start%EC%98%A4%EB%A5%98-optionsallowedHosts0-should-be-a-non-empty-string
