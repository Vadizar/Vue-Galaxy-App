const
    webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    { VueLoaderPlugin } = require('vue-loader'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    IconFontPlugin = require('icon-font-loader').Plugin;

module.exports = {
    mode: 'development',
    entry: [
        './src/main.js'
    ],
    devServer: {
        hot: true,
        watchOptions: {
            poll: true
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                    {
                        loader: 'webpack-atomizer-loader'
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
                    'vue-style-loader',
                    'css-loader',
                    'icon-font-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist:[
                                        '> 5%',
                                        'last 4 versions',
                                    ]
                                })
                            ],
                            // sourceMap: true
                        }
                    },
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
                        loader: 'file-loader?name=/src/assets/fonts/[name].[ext]'
                    }
                ]
            }
        ]
    },
    plugins: [
        new IconFontPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    import: [
                        '../src/css/vars.styl',
                        '../src/css/func.styl'
                    ]
                }
            }
        })
    ]
};