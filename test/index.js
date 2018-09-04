const spider = require("../src/test")

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
    console.log(dom("#wrapper"))
    console.log("爬取的数据:", list.length);
    let url = "http://www.qu.la/book/1/";
    let base = "http://www.qu.la"
    list.each(async function () {
        let dd = dom(this);
        let href = dd.attr('href');
        let text = dd.text();
        if (href.indexOf("/") != 0) {
            href = url + href;
        } else {
            href = base + href;
        }
        //将多出来的章节保存到数据库
        console.log(text, href, 1, Date.now())
    });
    console.log("爬完一次");
}

task();