# [搭建管理后台]

> 管理后台使用人人开源的后台管理框架，完成快速搭建。

## [1.下载人人开源后台管理框架

- renren-fast

https://gitee.com/renrenio/renren-fast.git

- renren-fast-vue

https://gitee.com/renrenio/renren-fast-vue.git

## [2.添加人人开源后端代码]

czh-project项目

拷贝文件夹renren-fast到czh-project根目录

POM文件 添加依赖

```xml
<module>renren-fast</module>
```

## [3.初始化后台管理数据库]

- 创建数据库：czh_admin
- 执行renren-fast/db/mysql.sql脚本

## [4.修改renren-fast 服务的配置文件]

文件路径：src/main/resources/application-dev.yml

- 修改数据库连接为自己的mysql数据库连接

![mark](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181531694.png)

## [5.启动renren-fast服务]

- 配置SDK为1.8

  

![image-20230418153300228](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181537007.png)

![image-20230418153406454](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181534182.png)

- 运行renren-fast后台

  ![mark](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181531737.png)

出现错误：com.mysql.cj.jdbc.exceptions.PacketTooBigException: Packet for query is too large...

解决方案：修改mysql容器的配置文件

```sh
cd /mydata/mysql/conf
sudo vim my.cnf

添加配置，[mysqld_safe]如果有，则不需要添加
[mysqld_safe]
max_allowed_packet=32M
```

- 执行结果

![image-20230418153537921](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181535338.png)

- 测试服务运行状态

  浏览器输入：http://localhost:8080/renren-fast/

  显示结果：

  ```json
  {"msg":"invalid token","code":401}
  ```

  结果如上所示，则表示服务运行正常。另外结果里面的invalid token说明权限不足，不是指服务不正常。

## [6.启动前端项目]

- 配置cnpm

  ```sh
  npm install -g cnpm --registry=https://registry.npm.taobao.org

- 安装node_modules依赖包

  ```sh
  cnpm install
  ```

- 打包前端项目

  ```sh
  npm run dev
  ```

- 浏览后台

  [http://localhost:8002](http://localhost:8002/)

  ![mark](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181536508.png)

## [7.前后端联调登录]

- 登录后台

  账号：admin

  密码：admin

  登录成功

  ![mark](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181536798.png)

- 查看后端服务日志

  ![mark](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181536755.png)

说明前端登录请求发送到了后端服务，并验证了用户名和密码是否正确。
## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)