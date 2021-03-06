# 杭州 FreeCodeCamp 第一次编程活动

## 问卷调查项目后端代码

**技术选型**：[NestJS](http://nestjs.org) + [TypeORM](http://typeorm.io)

## 前置条件：

1.  数据库：请确认本地环境已经安装并配置了 MySQL 数据库。下载链接：[传送门](https://dev.mysql.com/downloads/mysql/5.7.html#downloads)
2.  NodeJS：请确认本地环境已经安装并配置了 NodeJS。下载链接：[传送门](https://nodejs.org/en/download/)

*注意：*MySQL 安装完成之后请在 mysql 环境下运行命令`show variables like "sql_mode";`查看是否有`NO_ZERO_DATE`，如果有，请修改你的`sql_mode`将它去掉，不然 typeorm 在初始化数据库时会出现报错！！

## 启动项目：

1.  安装依赖：

    `npm install` 或者`yarn install`

2.  启动命令：

    `npm start`或者`yarn start`

3.  启动开发模式：

    `npm run start:dev`或者`yarn start:dev`

## 关于 API

在你成功运行项目之后，你可以前往`http://localhost:8787/api`查看本项目响应的接口文档。文档采用`Swagger`生成。

## 关于 FreeCodeCamp 中国

![](fcc.cn.jpg)

_如果发现有任何问题，欢迎前往杭州 FCC 社区微信群提问，我们将耐心问你解答。_

杭州 FCC 社区微信群群主二维码：（验证口号：FreeCodeCamp）

![](qrcode.jpg)
