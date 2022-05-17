const { createProxyMiddleware } = require('http-proxy-middleware');

const onError = (err, req, res) => {
  response = {message: "An error occured on the server. Please try your request again", status: 500};
  res.json(response);
}

const options = {
  target: 'http://localhost:3001',
  onError: onError,
  changeOrigin: true
};

const proxyMiddleware = createProxyMiddleware(options);

module.exports = function(app) {
  app.use('/api', proxyMiddleware);
}
