/*
 * @Author: your name
 * @Date: 2020-10-14 15:24:16
 * @LastEditTime: 2021-04-26 17:39:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\vue.config.js
 */
const setting = require('./src/setting')
const webpack = require('webpack')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
let scssVariables = require('./src/styles/variables.scss.js')

module.exports = {
  publicPath: '/',
  productionSourceMap: false,

  devServer: {
    proxy: {
      '/api': {
        // target: 'http://106.14.195.115/',
        target: 'http://localhost:3000/',
        ws: true,
        changeOrigin: true
      },
      '/h5': {
        // target: 'http://106.14.195.115/',
        target: 'https://h5api.m.tmall.com/',
        ws: true,
        changeOrigin: true
      }
    }
  },

  chainWebpack: (config) => {
    config.plugin('define').use(webpack.DefinePlugin, [
      {
        VE_ENV: {
          MODE: JSON.stringify(process.env.NODE_ENV)
        }
      }
    ])
    // config.plugins.delete("prefetch");
    // config.plugins.delete("preload");
    // config.optimization.delete("splitChunks");
  },

  configureWebpack: () => {
    let baseConfig = {}
    let envConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      envConfig = {
        optimization: {
          splitChunks: {
            chunks: 'all',
            // enforceSizeThreshold: 20000,
            cacheGroups: {
              echarts: {
                name: 'chunk-echarts',
                priority: 20,
                test: /[\\/]node_modules[\\/]_?echarts(.*)/
              },
              elementPlus: {
                name: 'chunk-elementPlus',
                priority: 20,
                test: /[\\/]node_modules[\\/]_?element-plus(.*)/
              }
            }
          }
        },
        externals: {
          // lodash: "_"
        },
        plugins: [
          // new UglifyJsPlugin({
          //   // uglifyOptions: {
          //   // 	output: {
          //   // 		comments: false // 去掉注释
          //   // 	},
          //   // 	warnings: false,
          //   // 	compress: {
          //   // 		drop_console: true,
          //   // 		drop_debugger: true,
          //   // 		// pure_funcs: ["console.log"] //移除console
          //   // 	}
          //   // }
          // }),
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            // test: /\.js$|\.html$|\.json$|\.css/,
            test: /\.js$|\.json$|\.css/,
            threshold: 10240, // 只有大小大于该值的资源会被处理
            minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
            // deleteOriginalAssets: true // 删除原文件
          })
        ]
      }
    }
    return Object.assign(baseConfig, envConfig)
  },

  css: {
    loaderOptions: {
      scss: {
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        // additionalData: `@import "~@/styles/imports.scss";`
        additionalData: Object.keys(scssVariables)
          .map((k) => `$${k.replace('_', '-')}: ${scssVariables[k]};`)
          .join('\n')
      }
    }
  }
}
