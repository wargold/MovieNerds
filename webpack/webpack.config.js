const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (options) => {
    const ExtractSASS = new ExtractTextPlugin(`/styles/${options.cssFileName}`);

    const webpackConfig = {
        devtool: options.devtool,
        entry: [
            `webpack-dev-server/client?http://localhost:${+options.port}`,
            'webpack/hot/dev-server',
            Path.join(__dirname, '../src/js/index.js'),
        ],
        output: {
            path: Path.join(__dirname, '../dist'),
            filename: `/scripts/${options.jsFileName}`,
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
        },
        module: {
            loaders: [
                {test: /.jsx?$/, include: Path.join(__dirname, '../src'), loader: 'babel',},
                {test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel'},
                {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
                {test: /\.css$/, loader: 'style-loader!css-loader'},
                {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
                {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
                {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
                {
                    test: /\.(gif|svg|jpg|png)$/,
                    loader: "file-loader",
                }
            ],
        },
        plugins: [
            new Webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development'),
                },
            }),
            new HtmlWebpackPlugin({
                template: Path.join(__dirname, '../public/index.html'),
            }),
        ],
    };

    if (options.isProduction) {
        webpackConfig.entry = [Path.join(__dirname, '../src/js/index')];

        webpackConfig.plugins.push(
            new Webpack.optimize.OccurenceOrderPlugin(),
            new Webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false,
                },
            }),
            ExtractSASS
        );

        webpackConfig.module.loaders.push({
            test: /\.scss$/,
            loader: ExtractSASS.extract(['css', 'sass']),
        });
    } else {
        webpackConfig.plugins.push(
            new Webpack.HotModuleReplacementPlugin()
        );

        webpackConfig.module.loaders.push({
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
        })

        webpackConfig.devServer = {
            contentBase: Path.join(__dirname, '../'),
            hot: true,
            port: options.port,
            inline: true,
            progress: true,
            historyApiFallback: true,
        };
    }

    return webpackConfig;
};