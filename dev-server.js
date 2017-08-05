var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.dev.js');

//First we fire up Webpack an pass in the configuration we
//created
var bundleStart = null;
var compiler = Webpack(webpackConfig);

// We give notice in the terminal when it starts bundling and
// set the time it started
compiler.plugin('compile', function() {
    /*eslint-disable no-console*/
    console.log('Bundling...');
    /*eslint-enable */
    bundleStart = Date.now();
});

// We also give notice when it is done compiling, including the
// time it took. Nice to have
compiler.plugin('done', function() {
    /*eslint-disable no-console*/
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    /*eslint-enable */
});

var bundler = new WebpackDevServer(compiler, {

    // We need to tell Webpack to serve our bundled application
    // from the build path. When proxying:

    // Configure hot replacement
    // hot: true,

    // The rest is terminal configurations
    quiet: false,
    noInfo: false,
    stats: {
        colors: true
    }
    // ,
    // proxy: {
    //     '/jersey/*': {
    //         target: 'http://localhost:8080',
    //         secure: false
    //     },
    //     '*': {
    //         target: 'http://localhost:8080',
    //         secure: false
    //     }
    // }
});

// We fire up the development server and give notice in the terminal
// that we are starting the initial bundle
bundler.listen(8080, 'localhost', function () {
    /*eslint-disable no-console*/
    console.log('Bundling project, please wait...');
    /*eslint-enable */
});
