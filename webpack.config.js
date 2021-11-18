const path = require('path')
const webpack = require('webpack')
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AirDatepicker = require('air-datepicker')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const fs = require('fs')
const PATHS = {
    src: path.resolve(__dirname, './src'),
    dist: path.resolve(__dirname, './dist'),
    assets: 'assets/'
}
const PAGES_DIR = `${PATHS.src}\\pug\\`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))
module.exports = {
    mode: mode,
    output: {
        assetModuleFilename: 'images/[name][ext][query]'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`,
          })),
        new HtmlWebpackPugPlugin(),
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.pug$/,
                use: [{
                    loader: 'simple-pug-loader?name=[path][name].html'
                }]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset',
                generator: {
                  filename: 'fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader']
                
            }
        ]
    },

    devtool: false,

    devServer: {
        static: './dist',
        hot: true,
    }
}