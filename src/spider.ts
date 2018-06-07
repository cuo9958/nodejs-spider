/**
 * 爬虫主程序
 */
import fetch from 'node-fetch';
import cheerio from 'cheerio';
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
    url = "";
    referer = "";
    async start() {
        if (!this.url) return;
        console.log("开始爬取")
        let res = await fetch(this.url, {
            headers: {
                "Host": "www.qu.la",
                "Referer": this.referer,
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
            }
        });
        let html = await res.text();
        let dom = cheerio.load(html);
        let tit = dom("#wrapper #list dt").text();
        console.log("标题", tit);
        let list = dom("#wrapper #list");
        console.log(list);
        list.find("a").each(function () {
            let dd = dom(this);
            console.log(dd.attr('href'));
            console.log(dd.text());
        });
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
        console.log("执行操作")
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