const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware("/api", { target: "https://localhost:50001/", secure: false }));
  app.use(
    createProxyMiddleware("/node-api", {
      target: "http://localhost:8080/node-api",
      secure: false
    })
  );
};
