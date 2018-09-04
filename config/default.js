module.exports = {
    name: "default",
    //数据库基础配置
    db: {
        database: "test",
        user: "root",
        pwd: "123"
    },
    //数据库配置项
    dbConfig: {
        host: '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
}