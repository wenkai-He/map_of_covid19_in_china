const {createProxyMiddleware}=require('http-proxy-middleware')
module.exports=function(app){
    app.use(createProxyMiddleware("/api", {
        target: "http://localhost:5000",//配置你要请求的服务器地址，代理后的请求网址
    }))
}




