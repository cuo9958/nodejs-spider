/**
 * 流程控制
 */
const urls = require('./lib/urls')
const render = require('./lib/render')

let modules = [];

/**
 * 初始化添加的模块
 */
exports.reg = function (module) {
    modules.push(module)
}

/**
 * 运行对象
 * @param {*} app 
 */
exports.run = async function (app) {
    while (modules.length > 0) {
        let module = modules.shift();
        await module.init();
    }

    let limit = 0;
    //循环处理
    while (urls.length > 0) {
        if (limit < 2) {
            limit++;
            await render.start(urls.shift())
        }
    }
}