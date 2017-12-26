/**
 * 入口
 */
const spider = require('./spider');
const config = require('./config')
const browser = require('./lib/browser')
const path = require('path');
const fs = require('fs');


if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
/**
 * 初始化
 */
spider.reg(browser)

/**
 * 加载文件夹下的源
 */
var dirList = fs.readdirSync('./source');
for (const item of dirList) {
    if (path.extname(item) !== '.js') continue;
    let name = item.replace('.js', '');
    let dir = path.resolve(__dirname, "./source/" + item)
    spider.add(name,require(dir))
}
/**
 * 运行整个程序
 */
spider.run();
/**
 * 退出监听
 */
process.on('exit', function (code) {
    console.log(`退出程序：${code}`);
});