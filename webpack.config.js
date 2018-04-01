var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000,
        historyApiFallback: true
    },
    devtool: 'inline-source-map',
    entry: ['babel-polyfill','./src/js/index.js'],
    module: {
        loaders: [
            {test: /\.js$/ , loader:'babel-loader', exclude: '/node_modules/'},
            {test: /\.jsx$/ , loader:'babel-loader', exclude: '/node_modules/'},
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader'}
        ]
    },
    output: {
        path: 'src',
        filename: 'js/bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
