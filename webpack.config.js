
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        demo: ['./demo/index.ts', 'webpack-dev-server/client?http://localhost:3000'],
        lib: ['./src/js/index.js'],
        vendors: ['./src/js/vendors.js']
    },
    output: {
        path: './build/',
        publicPath: 'http://localhost:3000/',
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
            { test: /\.(png|jpg)$/, loader: 'file' },
            { test: /\.jsx?$/, loader: 'babel', query: { presets: ['es2015'] }, exclude: /node_modules/, },
            { test: /\.scss$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap'] },
            { test: /\.css$/, loaders: ['style', 'css?sourceMap'] },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[\s\S]+)?$/, loader : 'url-loader'}
        ]
    },
    devServer: {
        contentBase: './demo'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};