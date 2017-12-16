/**
 * 流程控制
 */
const urls = require('./lib/urls')
// const render = require('./lib/render')

let modules = [];

let resource = []
/**
 * 添加需要初始化的模块
 */
exports.reg = function (module) {
    modules.push(module)
}
/**
 * 添加需要执行的
 * @param {*} module 
 */
exports.add = function (name, module) {
    resource.push({
        name,
        module
    })
}
/**
 * 运行对象
 * @param {*} app 
 */
exports.run = async function (app) {
    //执行模块的初始化
    while (modules.length > 0) {
        let module = modules.shift();
        await module.init();
    }
    //执行下一个逻辑
    function next() {
        if (resource.length == 0) return;
        let source = resource.shift();
        console.log('开始执行:' + source.name)
        new source.module(next).start()
    }
    next();
}