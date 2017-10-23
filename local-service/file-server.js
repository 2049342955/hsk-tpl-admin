/**
 * Created by joyer on 17/8/14.
 * 静态文件服务器
 *
 */

var connect = require("connect");
var serveStatic = require("serve-static");
const path = require('path');

var app = connect();

const resolve = function (dir) {
    return path.join(process.cwd(), ...dir.split("/"));
};
app.use(serveStatic(resolve("/dist")));

app.listen(10086);