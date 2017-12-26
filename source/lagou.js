/**
 * 拉勾的爬虫策略
 */
const iSource = require('../source_interface')

class Lagou extends iSource {

    start() {
        console.log('开始执行logo')
        this.next();
    }
}

module.exports = Lagou;