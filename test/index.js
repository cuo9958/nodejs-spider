const Spider = require("../src/index");
const utils = Spider.utils;

async function task() {
    let dom = await Spider.loadHtml("http://www.qu.la/book/1/", {
        headers: {
            "Host": "www.qu.la",
            "Referer": "http://www.qu.la",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
        }
    });
    //拿到章节列表
    let list = dom("#wrapper #list").find("a");
    console.log("爬取的数据:", list.length);
    let url = "http://www.qu.la/book/1/";
    let base = "http://www.qu.la"
    let books = [];
    list.each(async function (item, index) {
        let dd = dom(this);
        let href = dd.attr('href');
        let text = dd.text();

        let juan = text.match(/第\W+卷/);
        let test2 = text;

        if (juan) {
            test2 = test2.replace(juan[0], "");
            juan = juan[0].replace("第", "").replace("卷", "");
            juan = utils.getNumber(juan);
        } else {
            juan = 0;
        }
        let zhang = test2.match(/第[\W0-9]{0,}章/);
        if (zhang) {
            zhang = zhang[0].replace("第", "").replace("章", "");
            zhang = utils.getNumber(zhang);
        } else {
            zhang = 0;
        }
        // console.log(juan, zhang, text);
        books.push({
            juan: juan * 1,
            index: zhang * 1,
            title: text,
            href: href,
        });
    });
    books.sort(function (a, b) {
        if (a.index < b.index) return -1;
        if (a.index > b.index) return 1;
        return 0;
    })
    // console.log(books);
    console.log("爬完一次");
}

task();