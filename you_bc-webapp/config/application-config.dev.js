const applicationDevConfig = {
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.apiServer': JSON.stringify('http://localhost:8080'),
    'process.globalErrorMsgDelay': 2000
};

exports.applicationDevConfig = applicationDevConfig;