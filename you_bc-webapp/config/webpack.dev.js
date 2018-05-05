const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const dist = './dev-server';

module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: dist,
        port: 8081,
        compress: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});