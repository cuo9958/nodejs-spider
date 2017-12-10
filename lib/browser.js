/**
 * 浏览器初始化
 */
const puppeteer = require('puppeteer');

let browser;

/**
 * 初始化
 */
exports.init = async function () {
    browser = await puppeteer.launch({
        headless: !process.env.NODE_ENV !== 'development', //显示浏览器
        timeout: 10000, //超时时间
        // devtools: true //自动打开调试
    });
    console.log('初始化浏览器')
}
exports.page = function () {
    return browser.newPage();
}