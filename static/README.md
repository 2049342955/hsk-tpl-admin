# 静态文件存放目录
存放公共的css文件,js文件。

`static`跟`src/asset`的区别是,这里放的是一些在index.html页面直接引用的js,而不通过webpack。
比如某些垫片(基础垫片)文件就需要走这种方式。
