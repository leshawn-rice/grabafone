const { createProxyMiddleware } = require('http-proxy-middleware');

const onError = (err, req, res) => {
  response = {
    message: 'An error occured on the server. Please try your request again',
    status: 500,
  };
  res.json(response);
};

const proxyTarget = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const options = {
  target: proxyTarget,
  onError: onError,
  changeOrigin: false,
};

const proxyMiddleware = createProxyMiddleware(options);

module.exports = function (app) {
  app.use('/api', proxyMiddleware);
};
