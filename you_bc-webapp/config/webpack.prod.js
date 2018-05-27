const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const applicationProdConfig = (require("./application-config.prod")).applicationProdConfig;

module.exports = merge(common, {
    plugins: [
        new UglifyJsPlugin(),
        new webpack.DefinePlugin(applicationProdConfig)
    ]
});