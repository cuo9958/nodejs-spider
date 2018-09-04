/**
 * 1.提供各种库
 * 2.加载html
 * 3.或者加载dom
 * 4.执行逻辑
 * 5.执行存储,提供db库
 */

const config = require("config");
const Sequelize = require('sequelize');
const db = require("./db");
const utils = require("./utils");
const axios = require("axios");
const cheerio = require('cheerio');

async function loadHtml(url, config) {
    let html = await axios(url, config);
    return cheerio.load(html.data);
}
module.exports = {
    /**
     * 加载方法
     */
    curl: axios,
    /**
     * 本地配置
     */
    config,
    /**
     * 加载html对象
     */
    loadHtml,
    loadDom: "",
    /**
     * 初始化之后的数据库
     */
    DB: db,
    /**
     * 数据库的ORM对象
     */
    Sequelize,
    /**
     * 工具
     */
    utils,
}