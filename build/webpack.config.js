const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将js引入html模板插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清空打包文件夹
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 拆分到单个css
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 拆分到多个css
// let mainLess = new ExtractTextWebpackPlugin('main.less');
// let indexCss = new ExtractTextWebpackPlugin('index.css');

module.exports = {
    mode: 'development', // 开发模式
    entry: {
        main:["@babel/polyfill", path.resolve(__dirname, '../src/main.js')], // 入口文件
        header:path.resolve(__dirname, '../src/header.js') // 入口文件
    },
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名称
        path: path.resolve(__dirname, '../dist') // 打包后的目录
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 添加cssloader
                // use: ['style-loader', 'css-loader'] // 从右向左解析原则
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader']  // 拆分到多个css
                })
            },
            {
                test: /\.less$/, // 添加lessloader
                // use: ['style-loader', 'css-loader', 'less-loader'] // 从右向左解析原则
                // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 为css添加浏览器前缀
                // use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] // 拆分到单个css
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'media/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'fonts/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            chunks: ['main'] // 与入口文件对应的模块名
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/header.html'),
            filename: 'header.html',
            chunks: ['header']  // 与入口文件对应的模块名      
        }),
        // new MiniCssExtractPlugin({ // 拆分到单个css
        //     filename:'[name].[hash:8].css',
        //     chunkFilename: '[id].css'
        // }),
        new ExtractTextWebpackPlugin('index.css'), // 拆分到多个css
        new CleanWebpackPlugin() // 清空打包文件夹
    ]
}