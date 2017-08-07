var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var lib = path.resolve(__dirname, 'node_modules');
var buildDir = path.resolve(__dirname, 'build');
module.exports = {
    entry: [
        'whatwg-fetch',
        'babel-polyfill',
        './src/main.js'
    ],
    output: {
        path: buildDir,
        filename: 'index.js',
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'stage-2']
            }
        }, { 
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, { 
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, { 
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        }, { 
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpg|svg|jpeg|gif)$/,
            loader: 'file-loader?name=[path][name].[ext]'
        }]
    },
    resolve: {
        alias: {
            'bootstrap.css': path.resolve(lib, 'bootstrap/dist/css/bootstrap.min.css')
        },
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Book Store',
            template: 'dev-template.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'API_KEY': JSON.stringify('AIzaSyCsr3E5xGrp2EkeYTfuO4m9T0BHgPZTxc0')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
