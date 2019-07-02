module.exports = {
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    },
    devServer: {
        host: "127.0.0.1",
        port: "8000",
        open: true,
        proxy: {
            "/ele": {
                target: "http://127.0.0.1",
                changeOrigin: true,
                pathRewrite: {
                    "^/ele": ""
                }
            }
        }
    }
}
