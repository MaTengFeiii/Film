const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, // 暂时关闭代码格式检测
    //别名配置 
    configureWebpack: {
        resolve: {
            alias: {
                // 别名设置 el：'components':'@/components
            }
        }
    },
    // 配置反向代理
    devServer: {
        proxy: {
            '/MTF': {
                //https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=4468414
                target: 'https://m.maizuo.com',
                changeOrigin: true,
                // 路径重写
                pathRewrite: {
                    '^/MTF': ''
                }
            },
            '/api': {
                target: 'http://10.12.34.41:8080',
                changeOrigin: true,
                // 路径重写
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})