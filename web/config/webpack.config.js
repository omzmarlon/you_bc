const path = require('path');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const dist = '../../src/main/resources/public';

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: [
        // 'babel-polyfill',
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        path: helpers.root('..', 'src', 'main', 'resources', 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: dist,
        port: 8081,
        compress: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin([dist]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};