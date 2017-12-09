/**
 * 浏览器初始化
 */
const puppeteer = require('puppeteer');

const browser =  puppeteer.launch({
    headless: false, //显示浏览器
    timeout: 10000, //超时时间
    devtools: true //自动打开调试
});

exports.page =  function () {
    
}