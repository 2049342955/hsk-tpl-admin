# 本地化脚本
在项目启动时,对一些插件,工具进行本地化的脚本

该目录的`index.js`会自动生成

该目录的其它文件清使用`export default`导出一个对象,该对象可以有`before:Function()`,`after:Function({vue,router,store})`两个属性,会分别在程序启动前和启动后执行。
