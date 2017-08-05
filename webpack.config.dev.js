var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var buildDir = path.resolve(__dirname, 'build/server');
module.exports = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        './src/main.js'
    ],
    output: {
        path: buildDir,
        filename: 'dev_bundle.js',
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
            ReactDOM: 'react-dom',
            React: 'react'
        }),
        new HtmlWebpackPlugin({
            title: 'Book Store',
            template: 'dev-template.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    devServer: {
        contentBase: buildDir
    },
    devtool: 'source-map'
};
