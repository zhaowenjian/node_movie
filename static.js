var http = require('http');
var express = require('express');
var app = express();
app.use("/public", express.static(__dirname + '/public'));

// 创建服务端
http.createServer(app).listen('5000', function() {
    console.log('启动服务器完成');
});