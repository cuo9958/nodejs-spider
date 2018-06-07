/**
 * 爬虫主程序
 */
/**
 * mysql默认配置
 */
const myql_default = {
    /**
     * 数据库名称
     */
    database: "test",
    /**
     * 主机地址
     */
    host: "127.0.0.1",
    /**
     * 端口号
     */
    port: "3306",
    /**
     * 用户名
     */
    user: "root",
    /**
     * 密码
     */
    pwd: ""
}

/**
 * 爬虫要访问的网站对象
 */
exports.WebSite = class WebSite {

    start() {
        console.log("开始爬取")
    }
}
/**
 * 执行操作的容器
 */
exports.Container = class {

    conf_mysql = null;
    _list: any[] = [];
    /**
     * 设置mysql数据库的连接对象
     * @param options 
     */
    mysql(options) {
        console.log("mysql配置", options)
        this.conf_mysql = Object.assign(myql_default, options);
    }
    /**
     * 注册要爬取的对象
     * @param Model 
     */
    reg(Model) {
        this._list.push(new Model());
    }
    /**
     * 启动执行程序
     */
    run() {
        if (this._list.length === 0) return;
        console.log("执行注入的操作")
        let jiange = 500 / this._list.length;
        if (jiange < 100) jiange = 100;
        console.log("间隔", jiange);
        let index = 0;
        setTimeout(() => {
            this._list[index].start();
            index++;
            if (index >= this._list.length) index = 0;
        }, jiange);
    }
}