/**
 * 配一个数据源,然后测试爬虫的能力
 */
const {
    Container,
    WebSite
} = require("../index");

// class Biqukan extends WebSite {
//     constructor() {
//         super();
//         this.url = "http://www.biqukan.com/0_790/";

//     }
// }

/**
 * 1.加载网页并返回解析结果
 * 2.从结果中拿到链接等存入全局变量
 * ----怎么区分已经使用过的链接
 */
class Biqu extends WebSite {
    constructor(props) {
        super(props);
        this.base = "http://www.qu.la";
        this.url = "http://www.qu.la/book/1/";
        this.referer = "http://www.qu.la";
        this.host = "www.qu.la";
    }
    //拿到源,比较更新,更新结果
    async start() {
        console.log("开始爬取")
        //从数据库中拿到一本书,返回书号,标题,首页地址
        //getOne("shu");

        //从首页地址
        let dom = await this.load(this.url);

        //拿到章节列表
        let list = dom("#wrapper #list").find("a");
        console.log("爬取的数据:", list.length);
        //从数据库中拿到已有章节列表的长度和最后一章
        let clist = await this.db.query("select * from t_chapter where bid=1;");
        console.log("已有的数据", clist.length);

        //如果长度一样,
        //TODO:比较最后一条,也一样就退出
        if (clist.length === list.length) return;
        let obj = this;
        list.each(async function () {
            let dd = dom(this);
            let href = dd.attr('href');
            let text = dd.text();
            if (href.indexOf("/") != 0) {
                href = obj.url + href;
            } else {
                href = obj.base + href;
            }
            let has = false;
            for (let i = 0; i < clist.length; i++) {
                if (clist[i].href == href) {
                    has = true;
                    break;
                }
            }
            //将多出来的章节保存到数据库
            if (!has) {
                await obj.db.query("insert into t_chapter (title,href,bid,create_time) values(?,?,?,?);", [text, href, 1, Date.now()]);
            }
        });
        dom = null;
        console.log("爬完一次");
    }

}
/**
 * 1.从全局拿到链接
 * 2.加载网页并返回解析结果
 * 3.将结果存入数据库
 * 4.全局变量删除刚才的链接
 */
class BiquSave extends WebSite {
    constructor(props) {
        super(props);
        this.base = "http://www.qu.la";
        this.url = "http://www.qu.la/book/1/";
        this.referer = "http://www.qu.la";
        this.host = "www.qu.la";
    }
    async start() {
        //从数据库拿到一条链接
        let one = await this.db.query("select * from t_chapter where state=0 limit 1");
        if (one.length != 1) return;
        one = one[0];
        this.db.query("update t_chapter set state=? where id=?", [1, one.id]);

        let dom = await this.load(one.href);
        let html = dom("#content").html();

        html = unescape(html.replace(/&nbsp;/g, " ").replace(/&#x/g, "%u").replace(/;/g, "").replace(/%uA0/g, ""));
        this.db.query("update t_chapter set content=?,state=? where id=?", [html, 1, one.id]);
        console.log("爬更新完成", one.title);
    }
}

new Container()
    //设置mysql数据库对象
    .mysql({
        database: "test",
        host: "120.78.57.59",
        user: "guest",
        password: "Zixiao521@"
    })
    //注册对象
    // .reg(Biqu)
    .reg(BiquSave)
    //启动
    .run();