/**
 * 处理内容
 */
const fetch = require('node-fetch');
const browser = require('./browser');
const cheerio = require('cheerio');

let isEnd = false;

function sleep(time) {
    return new Promise(function (a, b) {
        setTimeout(() => {
            a();
        }, time);
    });
}
function waitNext() {
    return new Promise(function (a, b) {
        let count = 0;
        setInterval(function () {
            if (count > 10) b();
            if (isEnd) a();
            count++;
        }, 200)
    })
}

exports.start = async function start(url) {
    console.log('开始' + url)
    let items = [];

    let page = await browser.page();
    page.on('response', async res => {
        if (res.url.indexOf('jobs/positionAjax.json') > 0) {
            try {
                let json = await res.json();
                if (json.code === 0) {
                    let result = json.content.positionResult.result;
                    result.map(item => {
                        items.push({
                            city: item.city,                     //城市
                            companyFullName: item.companyFullName,//公司长名称
                            businessZones: item.businessZones,   //商业圈
                            companyLabelList: item.companyLabelList,//公司标签
                            companyId: item.companyId,            //公司id
                            company_url: `https://www.lagou.com/gongsi/${item.companyId}.html`,
                            companyLogo: item.companyLogo,           //公司logo
                            companyShortName: item.companyShortName,//公司短名称
                            companySize: item.companySize,       //公司规模
                            createTime: item.createTime,         //
                            district: item.district,             //地区
                            education: item.education,           //本科还是
                            explain: item.explain,               //
                            financeStage: item.financeStage,     //融资情况
                            firstType: item.firstType,           //工作类型
                            formatCreateTime: item.formatCreateTime,//发布日期格式化
                            imState: item.imState,               //字符串类型
                            industryField: item.industryField,   //公司类型
                            industryLables: item.industryLables, //公司标签
                            isSchoolJob: item.isSchoolJob,       //是否校招
                            jobNature: item.jobNature,           //兼职全职
                            lastLogin: item.lastLogin,           //最后登录时间戳
                            linestaion: item.linestaion,         //地铁线路
                            latitude: item.latitude,             //经纬
                            longitude: item.longitude,           //经纬
                            positionAdvantage: item.positionAdvantage,//工作简介
                            positionId: item.positionId,         //id
                            job_url: `https://www.lagou.com/jobs/${item.positionId}.html`,
                            positionLables: item.positionLables, //工作标签
                            positionName: item.positionName,     //工作名称
                            publisherId: item.publisherId,       //id
                            salary: item.salary,                 //薪资
                            score: item.score,                   //number类型
                            secondType: item.secondType,         //分类
                            stationname: item.stationname,       //地铁站
                            subwayline: item.subwayline,         //地铁线路
                            workYear: item.workYear              //工作时间
                        })
                    })
                }
            } catch (e) { }
            isEnd = true;
        }

    });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.item_con_list')
    console.log('第一页结束')
    console.log(items.length)

    while (true) {
        try {
            await waitNext();
            let nextBtn = await page.$eval('.pager_container .pager_next', e => e.className);
            if (nextBtn.indexOf('pager_next_disabled') > 0) break;
            await page.click('.pager_container .pager_next');
            console.log('第x页结束')
            console.log(items.length)
            isEnd = false;
        } catch (e) { break; }
    }

}