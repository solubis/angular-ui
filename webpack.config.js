
var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        demo: ['./demo/index.ts', 'webpack-dev-server/client?http://localhost:3000'],
        lib: ['./src/js/index.js'],
        vendors: ['./src/js/vendors.js'],
    },
    output: {
        path: './build/',
        publicPath: '/',
        filename: '[name].js'
    },
    debug: true,
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts' },
            { test: /\.coffee$/, loader: 'coffee' },
            { test: /\.(png|jpg|gif)$/, loader: 'url' },
            { test: /\.jsx?$/, loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                    cacheDirectory: true,
                    plugins: ['transform-runtime']
                },
                exclude: /node_modules/,
            },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap') },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap') },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[\s\S]+)?$/, loader: 'url' }
        ]
    },
    devServer: {
        contentBase: './demo'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin("[name].css", { allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin('vendors', '[name].js')
    ]
};