/*创建web服务器*/
//引入http模块
var http = require("http");
//引入express模块
var express = require("express");
//引入path模块
const path = require('path');

//创建express实例
var app = express();
//添加静态文件目录，方便express找到css,js等静态文件
app.use(express.static(path.join(__dirname, '')));

//监听9090端口，端口可以自己设置
app.listen(9090, () => {
  console.log(`cesium listening at port 9090`)
})

