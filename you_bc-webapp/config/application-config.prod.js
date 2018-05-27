const applicationProdConfig = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.apiServer': JSON.stringify('http://localhost:8080'),
    'process.globalErrorMsgDelay': 2000
};

exports.applicationProdConfig = applicationProdConfig;