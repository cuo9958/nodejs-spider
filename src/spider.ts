/**
 * 爬虫主程序
 */
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import mysql from 'mysql';

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
    password: ""
}

/**
 * 爬虫要访问的网站对象
 */
exports.WebSite = class WebSite {
    constructor(db) {
        this.db = db;
    }
    db;
    /**
     * 来源网站,假冒机器人
     */
    referer = "http://www.baidu.com";
    /**
     * 当前网站的主域名
     */
    host = "";
    /**
     * 加载链接地址并返回处理结果
     */
    async load(url) {
        try {
            let res = await fetch(url, {
                headers: {
                    "Host": this.host,
                    "Referer": this.referer,
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
                }
            });
            let html = await res.text();
            return cheerio.load(html);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    /**
     * 开始执行的方法,必须实现这个才能开始
     */
    start() { }

    async data() {
        let result = await this.db.query("select * from t_user");
        console.log(result);
    }
}
/**
 * 数据库操作类
 */
class DB_mysql {
    constructor(options) {
        console.log("mysql配置", options)
        this.conf = Object.assign(myql_default, options);
        this.db = mysql.createPool(this.conf);
    }
    conf = {};
    db: mysql.Pool;

    async query(sql, params = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.getConnection(function (err, connection) {
                if (err) return reject(err);
                connection.query(sql, params, function (err, results, fields) {
                    connection.release();
                    if (err) return reject(err);
                    // resolve({ results, fields });
                    //RowDataPacket
                    resolve(results);
                });
            });
        });
    }
}
/**
 * 执行操作的容器
 * 1.初始化数据库操作对象
 */
exports.Container = class {

    _list: any[] = [];
    mysql_db: any = null;
    /**
     * 设置mysql数据库的连接对象
     * @param options 
     */
    mysql(options) {
        this.mysql_db = new DB_mysql(options);
        return this;
    }
    /**
     * 注册要爬取的对象
     * @param Model 
     */
    reg(Model) {
        this._list.push(new Model(this.mysql_db));
        return this;
    }
    /**
     * 启动执行程序
     */
    run() {
        if (this._list.length === 0) return;
        console.log("执行操作")
        let jiange = 1000 / this._list.length;
        if (jiange < 300) jiange = 300;
        console.log("间隔", jiange);
        let index = 0;
        setInterval(() => {
            this._list[index].start();
            index++;
            if (index >= this._list.length) index = 0;
        }, jiange);
    }
}