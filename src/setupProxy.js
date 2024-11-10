const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        '/activiti/process/list',
        createProxyMiddleware({
            target: 'http://localhost:10183/',
            changeOrigin: true
        })
    );
};
