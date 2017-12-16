/**
 * 实现source下文件需要的接口
 */
class iSource {
    constructor(next) {
        this.next = next;
    }
    start() {
        console.log('开始执行')
    }
}

module.exports = iSource;