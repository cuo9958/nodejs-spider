/**
 * 拉勾的爬虫策略
 */
const iSource = require('../source_interface')
const browser = require('../lib/browser')

function sleep(time) {
    return new Promise(function (a, b) {
        setTimeout(() => {
            a();
        }, time);
    });
}

class Daling extends iSource {

    async start() {
        this.count=0;
        this.loop();
    }

    async loop() {
        this.count++;
        this.page = await browser.page();
        await this.page.goto('https://dalingjia.com/subject/0c9c949', {
            waitUntil: 'domcontentloaded'
        });
        // await sleep(1000);
        let html = await this.page.content();
        if (html.length < 100) {
            console.log(html);
            throw new Error("页面加载无内容")
        }
        if(this.count>10000){
            throw new Error("执行再多也不行啊")
        }
        console.log(`已经执行${this.count}次.`);
        await this.page.close();
        // await sleep(1000);
        this.loop();
    }
}

module.exports = Daling;