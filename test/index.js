/**
 * 配一个数据源,然后测试爬虫的能力
 */
const {
    Container,
    WebSite
} = require("../index");

let container = new Container({

});

//设置mysql数据库对象
container.mysql({
    // database: "test",
    host: "120.78.57.59",
    user: "guest",
    pwd: "Zixiao521@"
});

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
    constructor() {
        super();
        this.url = "http://www.qu.la/book/1/";
        this.referer = "http://www.qu.la";
        this.host = "www.qu.la";
        this.db = {

        };
    }
    //拿到源,比较更新,更新结果
    async start() {
        console.log("开始爬取")
        //从数据库中拿到一本书,返回书号,标题,首页地址
        //getOne("shu");

        //从首页地址
        let dom = await this.load(this.url);

        // let tit = dom("#wrapper #list dt").text();
        // console.log("标题", tit);

        //从数据库中拿到已有章节列表的长度和最后一章
        //拿到章节列表
        let list = dom("#wrapper #list").find("a");
        console.log(list.length);
        //如果长度一样,比较最后一条,也一样就退出
        let zhangs = [];
        list.each(function () {
            let dd = dom(this);
            zhangs.push({
                href: dd.attr('href'),
                txt: dd.text()
            });
        });
        console.log(zhangs.length);
        //将多出来的章节保存到数据库
    }
    //从数据库中拿到一条数据
    getOne() {

    }
}
/**
 * 1.从全局拿到链接
 * 2.加载网页并返回解析结果
 * 3.将结果存入数据库
 * 4.全局变量删除刚才的链接
 */
class BiquSave extends WebSite {
    constructor() {
        super();
    }
}

container.reg(Biqu);
//
container.run();