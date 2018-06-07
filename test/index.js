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

}
container.reg(Daling);
//
container.run();