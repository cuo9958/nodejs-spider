const spider = require("../src/index")


function geMintNumber(text) {
    if (text === "十") return "10";
    return text.replace(/一/g, "1").replace(/二/g, "2").replace(/三/g, "3").replace(/四/g, "4").replace(/五/g, "5").replace(/六/g, "6").replace(/七/g, "7").replace(/八/g, "8").replace(/九/g, "9")
        .replace(/零/g, "0").replace(/十/g, "0");
}

function getNumber(text) {
    return text.replace(/一/g, "1").replace(/二/g, "2").replace(/三/g, "3").replace(/四/g, "4").replace(/五/g, "5").replace(/六/g, "6").replace(/七/g, "7").replace(/八/g, "8").replace(/九/g, "9")
        .replace(/零/g, "0").replace(/十/g, "").replace(/百/g, "").replace(/千/g, "");

}

async function task() {
    let dom = await spider.loadHtml("http://www.qu.la/book/1/", {
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
            if (juan.length <= 2) {
                juan = geMintNumber(juan);
            } else {
                juan = getNumber(juan);
            }
        } else {
            juan = 0;
        }
        let zhang = test2.match(/第[\W0-9]{0,}章/);
        if (zhang) {
            zhang = zhang[0].replace("第", "").replace("章", "");
            if (zhang.length <= 2) {
                zhang = geMintNumber(zhang);
            } else {
                zhang = getNumber(zhang);
            }
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