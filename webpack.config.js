const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
//提取css模块
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
//提供公共（第三方）依赖
const webpack = require('webpack')
//丑化压缩code
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry : {
        main: './src/main.js',
        //vendors : ['vue','vue-router','vue-preview','axios','moment']
    },
    output : {
        //filename : './js/[name].[chunkhash:6].js',
        filename : './build.js',
        //publicPath : '/',
        path: path.join(__dirname,"dist")
    },
    module : {
        loaders : [
            {
                test : /\.css$/,
                loader : "style-loader!css-loader!autoprefixer-loader"
                //打包提取css
                /* use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!autoprefixer-loader"
                }) */
            },
            {
                test : /\.less$/,
                loader : "less-loader"
            },
            {
                test : /\.jpg|.svg|.woff|.png|.gif|.jpeg|.ttf$/,
                loader : "url-loader",
                options : {
                    limit : 4096,//4096以上生成文件，否则base64
                    //name : '/assets/[name].[ext]'
                    name : '[name].[ext]'
                }
            },
            {
                test : /\.vue$/,
                loader : 'vue-loader'
            },
            {
                test : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/,
                //多次使用options可以使用.babelrc文件进行配置
                /* options: {
                    presets: ['es2015'], //关键字
                    plugins: ['transform-runtime'], //函数
                } */
            },
            //解析vue-preview的es6代码
            {
                test : /vue-preview.src.*?js$/,
                loader : 'babel-loader'
            }
        ]
    },
    plugins : [
        //new ExtractTextPlugin("/css/[name].[contenthash:6].css"),
        //new ExtractTextPlugin("styles.css"),
        new htmlwebpackplugin({
            template : "./src/index.html"
        }),
        /* new webpack.optimize.CommonsChunkPlugin({
            //manifest清单，用来记录使用者和第三方包的依赖关系
            names: ['vendors','manifest']
        }),
        new UglifyJsPlugin() */
        //去除console的告警信息
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}