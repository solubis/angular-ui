
var path = require('path');
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var precss       = require('precss');

module.exports = {
    entry: {
        demo: ['./demo/index.ts', 'webpack-dev-server/client?http://localhost:3000'],
        page: ['./page/index.ts', 'webpack-dev-server/client?http://localhost:3000'],
        components: ['./src/components'],
        core: ['./src/core'],
        vendors: ['./src/vendors.js'],
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: '[name]'
    },
    cache: true,
    debug: false,
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts' },
            { test: /\.html$/, loader: 'ngtemplate!html'},
            { test: /\.coffee$/, loader: 'coffee' },
            { test: /\.jade/, loader: 'jade' },
            { test: /\.(png|jpg|gif)$/, loader: 'url' },
            { test: /\.jsx?$/, loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                    cacheDirectory: true,
                    plugins: ['transform-runtime']
                },
                exclude: /(node_modules|angular-components)/,
            },
            { test: /\.scss$/, loaders: ['style','css?sourceMap','sass?sourceMap'] },
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[\s\S]+)?$/, loader: 'url' }
        ]
    },
      postcss: function () {
        return [autoprefixer, precss];
    },
    devServer: {
        contentBase: './page'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', '[name].js')
    ]
};