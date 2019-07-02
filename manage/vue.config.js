module.exports = {
    publicPath:"./",
    devServer:{
        host:"127.0.0.1",
        port:"8080",
        open:true,
        proxy:{
            "/ele":{
                target:"http://127.0.0.1",
                changeOrigin:true,
                pathRewrite:{
                    "^/ele":""
                }
            }
        }
    }
}