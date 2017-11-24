const path = require('path');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const dist = '../../src/main/resources/public';

module.exports = {
    devtool: 'eval-source-map',
    entry: [
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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader'
                },{
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: {
                    loader: 'file-loader?name=assets/[name].[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([dist]),
        new HtmlWebpackPlugin({
            title: 'Development',
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