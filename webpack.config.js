const
    webpack = require('webpack'),
    path = require('path'),
    { VueLoaderPlugin } = require('vue-loader'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    IconFontPlugin = require('icon-font-loader').Plugin,
    { CleanWebpackPlugin } = require('clean-webpack-plugin')

require('dotenv').config()

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        filename: 'script.[hash].js',
        publicPath: process.env.APP_PATH
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '#': path.resolve(__dirname, './src/pages'),
            '@': path.resolve(__dirname, './src/partials')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: path.resolve(__dirname, './acssConf.js')
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'icon-font-loader'
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'icon-font-loader',
                    'postcss-loader',
                    {
                        loader: 'stylus-loader',
                        options: {
                            indentedSyntax: true
                        }
                    }
                ]
            },
            {
                test: /\.(svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader?name=src/assets/fonts/[name].[ext]'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new IconFontPlugin(),
        new webpack.DefinePlugin({
            APP_API_URL: JSON.stringify(process.env.APP_API_URL),
            APP_PATH: JSON.stringify(process.env.APP_PATH),
            APP_PORT: JSON.stringify(process.env.APP_PORT)
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    import: [
                        path.resolve(__dirname, './src/assets/styles/vars.styl'),
                        path.resolve(__dirname, './src/assets/styles/func.styl')
                    ]
                }
            }
        })
    ]
};