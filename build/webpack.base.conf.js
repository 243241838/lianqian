var path = require('path')
var config = require('../config')
var utils = require('./utils')
var glob = require('glob')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV
//
var webpack = require('webpack');
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd


var projectRoot = path.resolve(__dirname, '../')
var srcDir = path.resolve(__dirname, '../src')
var entries = utils.getEntries(srcDir + '/html/**/*.js')

var autoprefixerConf = autoprefixer({ browsers: ['last 2 versions','Android >= 4.0','iOS >= 6'] });


module.exports = {
    entry: entries,

    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },

    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'images': path.resolve(__dirname, '../src/assets/images'),
            'js': path.resolve(__dirname, '../src/assets/js'),
            'components': path.resolve(__dirname, '../src/components'),
            'scss': path.resolve(__dirname, '../src/assets/scss'),
            'json': path.resolve(__dirname, '../src/assets/json')
        }
    },

    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    externals: {
        //'jquery': 'jQuery'  // 使用cdn资源，暴露jquery
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.vue$/,
        //         loader: 'eslint',
        //         include: projectRoot,
        //         exclude: /node_modules/
        //     },
        //     {
        //         test: /\.js$/,
        //         loader: 'eslint',
        //         include: projectRoot,
        //         exclude: /node_modules/
        //     }
        // ],

        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            // {
            //     test: /\.(css|scss)$/,
            //     loader: "style!css!postcss!sass"
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    // js 中引入的样式处理
    postcss: [autoprefixerConf],
    // eslint: {
    //     formatter: require('eslint-friendly-formatter')
    // },
    vue: {
        // .vue 中的样式处理
        loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
        postcss: [autoprefixerConf]
    },
    plugins:[
        new webpack.ProvidePlugin({$: 'webpack-zepto'})
    ]
}
var pages = utils.getEntries('./src/html/**/*.html',1);

for (var pathname in pages) {
    // console.log(pathname, pages[pathname])
    // 生成html相关配置
    var conf = {
        filename: pathname + '.html', // html文件输出路径
        template: pages[pathname],   // 模板路径
        inject: true,                // js插入位置
        minify: {
            //压缩设置
            removeComments: true,
            //   collapseWhitespace: false,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    };
    // 去掉html
    var arr = pathname.split("/");
    arr.splice(0, 1);
    pathname = arr.join('/')
    if (pathname in module.exports.entry) {
        conf.inject = 'body';
        //如果每个html没有进入这里的话，那么全部js将会插入html
        conf.chunks = [pathname, 'vendor', 'manifest'],
        conf.hash = false;// 后面是否加hash值 .js?876876876
    }
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
