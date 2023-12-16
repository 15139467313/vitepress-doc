# [整合Spring Cloud Alibaba Nacos组件]

> [Nacos](https://github.com/alibaba/Nacos) 是阿里巴巴开源的一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

## [1.引入Nacos 服务发现组件]

passjava-common模块的pom.xml文件引入Nacos 服务发现组件

```xml
<!-- nacos discovery 服务发现组件-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

## [2.下载Nacos Server并启动]

### [2.2 DIY 方案]

如果你想全部自己配置一遍 Nacos，深度学习 Nacos 怎么玩的，可以参考这篇 Nacos 配置教程：

[6000 字｜20 图｜Nacos 手摸手教程](https://mp.weixin.qq.com/s?__biz=MzAwMjI0ODk0NA==&mid=2451962038&idx=1&sn=fd97b0d0a3b1138aeff36080bd19f31b&chksm=8d1c0129ba6b883fb3f2aa68ffd9107dfc39df9798271d8f40382a1be52bd10a06b566071fc4&token=1269576934&lang=zh_CN#rd)

- 下载Nacos Server 压缩包

https://github.com/alibaba/nacos/releases

启动 Server，进入解压后文件夹或编译打包好的文件夹，找到如下相对文件夹 nacos/bin，并对照操作系统实际情况之下如下命令。

1. Linux/Unix/Mac 操作系统，执行命令 `sh startup.sh -m standalone`
2. Windows 操作系统，执行命令 `cmd startup.cmd`

windows执行startupm.cmd遇到问题：

```
λ startup.cmd                                                      
 Please set the JAVA_HOME variable in your environment, We need java(x64)! jdk8 or later is better! 
```

解决方案：

修改startup.cmd文件中的%JAVA_HOME%

```sh
%JAVA_HOME% 替换为 C:\Program Files\Java\jdk1.8.0_131
```

启动成功：

## [3.每个微服务都配置Nacos Server 地址]

- 配置Nacos Server 地址

在czh-question、czh-channel、czh-content、czh-member、czh-study 应用的 /src/main/resources/application.yml配置文件中配置 Nacos Server 地址

```yaml
spring:
   cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
```

## [4.添加注解]
为每个服务使用 @EnableDiscoveryClient 注解开启服务注册与发现功能

```java
@EnableDiscoveryClient
@MapperScan("com.chen.question.mapper")
@SpringBootApplication
public class CzhQuestionApplication {

    public static void main(String[] args) {
        SpringApplication.run(PassjavaQuestionApplication.class, args);
    }

}
```

## [5.配置微服务的名称]

```yaml
spring:
  application:
    name: czh-question
```

## [6.访问nacos server后台]

- 登录后台

http://localhost:8848/nacos/index.html#/login

用户名：nacos

密码：nacos

![img](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181602266.png))

- 查看已注册的服务

  ```json
  czh-channel 渠道微服务
  czh-member 用户微服务
  czh-study 学习微服务
  czh-question 问题微服务
  czh-content 内容微服务
  ```

  ![image-20230418155950015](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181559008.png)

## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)