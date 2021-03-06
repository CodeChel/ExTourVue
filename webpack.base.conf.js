const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')



// Store .html file names in src/ in an array
const pages =
    fs
        .readdirSync(path.resolve(__dirname, 'src'))
        .filter(fileName => fileName.endsWith('.html'))

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },

            {
                test: /\.svg$/, //  icons directory
                include: path.resolve(__dirname, 'src/img/svg-sprites'),
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'icons.svg', // this is the destination of  sprite sheet
                    runtimeCompat: true
                }
            },
            {
                test: /\.(jpg|png|svg)$/,
                exclude: /svg-sprites/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            useRelativePath: true
                        }
                    }

                ]
            },
            {
                test: /\.(mp4|webm|ogv)$/,
                use: 'file-loader?name=videos/[name].[ext]',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]

            },

            {
                test:  /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,

                    },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
        // Use .map() on the array of file names to map each file name
        // to the plugin instance, then spread the mapped array into
        // the plugins array.
        ...pages.map(page => new HtmlWebpackPlugin({
            template: 'src/' + page,
            filename: page
        })),

        new CleanWebpackPlugin({
            path: './dist/*.*'
        }),

        new MiniCssExtractPlugin({
                filename: '[name].css'
            }
        ),
        new VueLoaderPlugin()

    ]
}