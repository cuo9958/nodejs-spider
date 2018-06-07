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

});

class Daling extends WebSite {
    constructor() {
        super();
        this.url = "http://www.qu.la/book/1/";
        this.referer = "http://www.qu.la";
    }


}
container.reg(Daling);
//
container.run();