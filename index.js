/**
 * 入口
 */
const spider = require('./spider');
const config = require('./config')
const browser = require('./lib/browser')

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
/**
 * 初始化
 */
spider.reg(browser)

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