# czh-project 初始化项目和添加微服务]

## [1.Gitee上创建一个空的仓库](https://www.undcfqn.cn/docs/microservices/microservices.html)

![image-20230418144356290](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181504720.png)

![image-20230418150604638](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181506770.png)

## [2.从Gitee上引入空的项目]

![image-20230418150736678](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181507726.png)

## [3.添加内容服务](

czh-content


![image-20230418150845684](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181508765.png)

| 序号 | 字段        | 内容             |
| ---- | ----------- | ---------------- |
| 1    | group       | com.chen         |
| 2    | Artifact    | czh-content      |
| 3    | Name        | czh-content      |
| 4    | Description | czh-内容服务     |
| 5    | Package     | com.chen.content |

- 添加依赖组件SpringWeb, OpenFeign



## [3.添加其他微服务]

| 序号 | 服务描述   | 服务名       |
| ---- | ---------- | ------------ |
| 1    | 内容微服务 | czh-content  |
| 2    | 会员微服务 | czh-member   |
| 3    | 题目微服务 | czh-question |
| 4    | 学习微服务 | czh-study    |
| 5    | 渠道微服务 | czh-channel  |

![image-20230418151104562](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181511609.png)

## [4czh-project添加Pom.xml文件]

![image-20230418151140742](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181511791.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.chen.czh</groupId>
    <artifactId>czh-project</artifactId>
    <name>czh-project</name>
    <version>1.0-SNAPSHOT</version>
    <description>czh-聚合</description>
    <packaging>pom</packaging>

    <modules>
        <module>czh-channel</module>
        <module>czh-content</module>
        <module>czh-member</module>
        <module>czh-question</module>
        <module>czh-study</module>
        <module>renren-fast</module>
        <module>czh-common</module>
        <module>czh-jwt</module>
        <module>czh-gateway</module>
        <module>renren-generator</module>
    </modules>



</project>

```

## [5.添加根目录Maven 配置]



Maven操作根项目就可以了，试下clean

![image-20230418151259356](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181512404.png)

![image-20230418151324406](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181513506.png)

## [6. 配置.gitignore文件]

提交代码时，忽略某些文件

```json
### gradle ###
.gradle
/build/
!gradle/wrapper/gradle-wrapper.jar

### STS ###
.settings/
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
bin/

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr
rebel.xml

### NetBeans ###
nbproject/private/
build/
nbbuild/
dist/
nbdist/
.nb-gradle/

### maven ###
target/
*.war
*.ear
*.zip
*.tar
*.tar.gz
**/mvnw
**/mvnw.cmd
**/.mvn

### logs ####
/logs/
*.log

### temp ignore ###
*.cache
*.diff
*.patch
*.tmp
*.java~
*.properties~
*.xml~

### system ignore ###
.DS_Store
Thumbs.db
Servers
.metadata
upload
gen_code

### database ###

db/db_back_dir/

### redis ###
/redis/复制复制失败复制成功
```

删除子项目的.gitignore文件

## [7.提交代码]

可以用IDEA的git工具提交，也可以用git bash命令行提交

```sh
git add .
git commit -m 'xxx'
git push origin master
```

## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)