/**
 * 处理内容
 */
const fetch = require('node-fetch');
const browser = require('./browser');


exports.start = async function (url) {
    console.log('开始' + url)
    let page = await browser.page();
    // await page.setUserAgent('');
    await page.goto(url)
    await page.click(".switch-type")
    await page.type('#usernameUser','15600266712',{delay: 100})
    await page.type('#passwordUserText','zixiao521',{delay: 100})
    await page.click("#btnSubmitUser")
}