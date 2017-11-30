/**
 * 入口
 */
const config = require('./config')
const urls = require('./lib/urls')
const render = require('./lib/render')

let limit = 0;
//循环处理
while (urls.length > 0) {
    if (limit < 2) {
        limit++;
        render.start(urls.shift())
    }
}


/**
 * 退出监听
 */
process.on('exit', function (code) {
    console.log(`退出程序：${code}`);
});