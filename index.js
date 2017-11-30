/**
 * 入口
 */

const urls = require('./lib/urls')

//循环处理
while (urls.length>0) {
    console.log(urls.shift())
}



/**
 * 退出监听
 */
process.on('exit', function (code) {
    console.log(`退出程序：${code}`);
});