const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { optimize } = require('webpack');
const { join, resolve } = require('path');

let prodPlugins = [];
if (process.env.NODE_ENV === 'production') {
    prodPlugins.push(
        new optimize.AggressiveMergingPlugin(),
        new optimize.OccurrenceOrderPlugin()
    );
}
module.exports = {
    stats: {
        logging: "verbose",
        loggingDebug: true,
        loggingTrace: true,
        reasons: true
    },
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',
    entry: {
        contentscript: join(__dirname, 'src/contentscript/contentscript.ts'),
        background: join(__dirname, 'src/background/background.ts'),
    },
    output: {
        path: join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
            },
            {
                test: /\.scss$/,
                include: [
                  resolve(__dirname, 'src/contentscript')
                ],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CheckerPlugin(),
        ...prodPlugins,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            debug: true
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};