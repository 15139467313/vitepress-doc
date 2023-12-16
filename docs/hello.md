# 开始

本文会帮助你从头启动项目

## 作者建议

温馨提示
```
uni-halo 后台文章管理功能模块，暂时不推荐使用，因为文章编辑功能和 PC 端的功能没办法同步，
在 uni-halo 中对文章进行编辑后，可能会丢失 PC 端编辑的样式！

重要的事情说三遍：请您务必详细阅读并且知晓该提示内容！！！
重要的事情说三遍：请您务必详细阅读并且知晓该提示内容！！！
重要的事情说三遍：请您务必详细阅读并且知晓该提示内容！！！
```
## 环境准备

- [Halo 1.x](https://halo.run/) 版本的程序 提供的 API 服务

## 工具准备

本项目推荐使用以下工具进行开发调试，当然也可以使用其他 IDEA

- [HBuilder X](https://www.dcloud.io/hbuilderx.html) 进行开发。
- [微信小程序开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)进行部署（非必要）。

## 源代码获取

### 从 Gitee 获取

bash

```
# 克隆前端代码
git clone https://gitee.com/wenroudoubinanhai/czh-uni.git
```
# 克隆后端代码
git clone https://gitee.com/wenroudoubinanhai/czh-springboot.git
```



注意

最新版本的代码以 Gitee 仓库为准。

## 运行和启动项目

### 安装项目依赖和运行

- 1、通过 HBuilderX 导入前端项目；
- 2、命令行执行 npm i 安装依赖；
- 3、配置运行信息，找到项目根目录 config 目录，将`halo.config.template.js`修改为 `halo.config.js` 并设置相关信息 [halo.config.js 文件说明](https://uni-halo.925i.cn/guide/settings.html)；
- 4、点击 HBuilderX 工具 右上角预览、或者点击工具栏 运行-内置浏览器运行；
- 5、项目调试：参考 [uni-app 运行和调试](https://uniapp.dcloud.net.cn/tutorial/run-and-debug.html)；
- 6、通过idea导入后端项目
- 7、配置properties mysql链接信息更改为直接数据库
- 8、导入sql文件  czh.sql 为数据库结构+数据,czh_test.sql仅有数据库表结构,请自行选择
- 9、启动后端项目

