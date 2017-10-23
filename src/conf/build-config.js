/**
 * Created by joyer on 17/10/10.
 *
 * 构建代码的配置
 *
 */
const outAssetsDirectory = 'static';
const Path = require('path');
const Const = require('@hasaki-ui/hsk-nocturne');

module.exports = {
    indexGenerator: [
        {
            targetPath: 'src/conf/custom'
        }
    ],
    iconGenerator: {
        enable: true,
        list:[{
            aliUrl:Const.JINX_ICON_ALI_URL,
            dir:'node_modules/@hasaki-ui/hsk-jinx/src/component/icon'
        }]
    },
    wrapperGenerator: [
        {
            sourcePath: 'node_modules/@hasaki-ui/hsk-sona/lib',
            targetPath: 'src/common/lib',
            suffix: 'utl'
        }
    ],
    libraryWrapper:[{
        name:'@hasaki-ui/hsk-jinx',
        wrapperDir:['lib/component','lib/mixin'],
        targetDir:['src/component/lib','src/mixin/lib'],
        prefix:['jx']
    }],
    apiMockGenerator: {enable: false},
    builder: {
        outAssetsDirectory,
        sourceMap: true,
        imgMinSize: 10000,
        fontMinSize: 10000,
        entry: {
            app: '/src/main.js'
        },
        output: {
            path: "dist",
        },
        alias: {
            '@': 'src',
            'api@': 'src/api',
            'com@': 'src/common',
            'comp@': 'src/component',
            'conf@': 'src/conf',
            'mixin@': 'src/mixin',
            'dire@': 'src/directive',
            'page@': 'src/page'
        },
        html: {
            filename: 'index.html',
            template: "index.html",
            title: 'hsk空白模版',
            favicon: 'static/image/favicon.ico',
            inject: true
        },
        babel: {
            include: [
                // 使用cnpm时
                'node_modules/_@hasaki-ui',
                // 正常使用npm时
                'node_modules/@hasaki-ui'
            ]
        },
        vue: {},
        css: {
            sourceMap: true
        },
        postcss: {
            sourceMap: true
        },
        less: {
            sourceMap: true
        },
        scss: {
            includePaths: ['src/asset/scss'],
            //  src/assets/scss中必须有个base的样式文件
            data: "@import 'base';",
            sourceMap: true
        },
        stylus: {
            sourceMap: true
        }
    },
    env: {
        dev: {
            nodeEnv: 'development',
            builder: {
                model: 'browser',
                output: {
                    filename: '[name].js',
                    publicPath: '/'
                },
                extractCss: false,
                port: '10086',
                autoOpenBrowser: true
            }
        },
        test: {
            nodeEnv: 'development',
            builder: {
                model: 'test',
                output: {
                    filename: '[name].js',
                    publicPath: '/'
                },
                extractCss: false,
                karma: {
                    files: [
                        'test/unit/*.spec.js'
                    ],
                    port: 10010,
                    browsers: ['Chrome'],
                    concurrency: 0
                }
            }
        },
        prod: {
            nodeEnv: 'production',
            builder: {
                model: 'file',
                entry: {
                    vendor: ['vue', 'vue-router', 'vuex', 'moment']
                },
                output: {
                    filename: Path.join(outAssetsDirectory, 'js/[name].[chunkhash].js'),
                    chunkFilename: Path.join(outAssetsDirectory, 'js/[id].[chunkhash].js'),
                    publicPath: '/'
                },
                html: {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true
                    },
                    chunksSortMode: 'dependency'
                },
                extractCss: true,
                uglify:true,
                css: {
                    minimize: true,
                },
                gzip: {
                    enable: true,
                    extensionList: ['js', 'css']
                },
                bundleAnalyzerReport: false
            }
        }
    },
};