# [快速生成前后端代码]

## [1.下载代码生成器框架]

```sh
git clone https://gitee.com/renrenio/renren-generator.git
```

## [2.添加人人开源后端代码]

czh-project项目

拷贝文件夹renren-fast到czh-project根目录

POM文件 添加依赖

```xml
<module>renren-generator</module>
```

## [3.修改renren-generator服务的配置文件]

（1）修改数据库链接 src/main/resources/application-dev.yml

- 修改数据库连接为自己的mysql数据库连接

- 数据库名改为要生成代码的服务，如czh_qms数据库

  ```xml
  url: jdbc:mysql://127.0.0.1.xxx:3306/czh_qms?useUnicode=true&characterEncoding=UTF-8&useSSL=false
  username: root
  password: root
  ```

（2）修改属性配置文件 src/main/resources/generator.properties

```properties
# 以question微服务为例
mainPath=com.chen
package=com.chen.question
moduleName=question
author=chen
email=
tablePrefix=qms_
```

（3）修改controller 模板文件

src/main/resources/template/Controller.java.vm

删除引入的包，后面再引入

```java
import org.apache.shiro.authz.annotation.RequiresPermissions;
```

注释RequiresPermissions注解，后面再引入

```java
@RequiresPermissions("${moduleName}:${pathName}:list")
```

## [4.启动代码生成器服务]

![启动代码生成器服务](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181540391.png)

浏览器打开localhost，可以看到数据库qms的两张表已经显示在后台了

![mark](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181540522.png)

## [5.生成代码

- 生成代码

![生成代码](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181540645.png)

![代码生成器生成的pms服务代码](img/NM1ApxlLXKKu.png

- 拷贝main文件夹到question模块src目录
- 删除前端代码passjava-question\src\main\resources\src目录

## [7.question模块添加common模块依赖]

pom文件添加依赖

```xml
<dependency>
     <artifactId>czh-project</artifactId>
        <groupId>com.chen.czh</groupId>
        <version>1.0-SNAPSHOT</version>
</dependency>
```

## [8.common模块添加依赖]

- MyBatis-Plus

  ```xml
  <!--mybatis-plus DAO层工具 https://mp.baomidou.com/-->
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus</artifactId>
      <version>3.2.0</version>
  </dependency>
  ```

- lombok依赖

  ```xml
  <!--lombok 不需要写getter,setter方法了-->
  <dependency>
    <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.12</version>
  </dependency>
  ```

- httpcore依赖

  ```xml
  <!--httpcore 依赖-->
  <dependency>
      <groupId>org.apache.httpcomponents</groupId>
      <artifactId>httpcore</artifactId>
      <version>4.4.12</version>
  </dependency>
  ```

- commons-lang依赖

  ```xml
  <!--commons-lang 依赖 -->
  <dependency>
      <groupId>commons-lang</groupId>
      <artifactId>commons-lang</artifactId>
      <version>2.6</version>
  </dependency>
  ```

- servlet依赖

  ```xml
  <!--  导入servlet-api 依赖  -->
  <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>servlet-api</artifactId>
      <version>2.5</version>
      <scope>provided</scope>
  </dependency>
  ```

## [9.common模块添加工具类]

- 添加包com.chen.common.utils

- 从renren-fast项目copy文件

  `Constans.java`、`PageUtils.java`、`Query.java`、`R.java`、`RRException.java`

- 添加包`com.jackson0714.common.xss`

- 从renren-fast项目copy文件

  `HTMLFilter.java`、`SQLFilter.java`

![image-20230418154221346](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181542064.png)

![拷贝renren-fast文件](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181542287.png)
## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)