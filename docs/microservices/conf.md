# [Spring Cloud 整合 Nacos配置中心]

## [1.传统配置方式]

- application.properties文件中定义两个配置：

```properties
member.nickname = "czh"
member.age = "18"
```

- 示例控制器中定义私有变量nickname和age，@value代表从配置中取值

```java
@Value("${member.nickname}")
private  String nickname;

@Value("$member.age")
private  Integer age;
```

- 示例控制器中定义方法：获取nick和age的值

```java
@RequestMapping("/test-local-config")
public R testLocalConfig() {
    return R.ok().put("nickname", nickname).put("age", age);
}
```

总结：从配置文件中获取配置。

这种方式的缺点是什么呢？如果要修改配置参数，则需要重新启动服务。如果服务很多，则需要重启所有服务，非常不方便。

有没有什么办法不停服务修改配置而且使其生效呢？

答案：有的，用Spring Cloud Alibaba的Nacos 组件就可以完成。

## [2.引入Nacos依赖]

czh-common项目的pom.xml文件引入Spring Cloud Alibaba Nacos Config依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

## [3.配置Nacos元数据]

- passjava-member 添加 /src/main/resources/bootstrap.properties 配置文件（注意：bootstrap.properties 是系统级的，优先级高于其他配置文件， application.properties 是应用级别的，加载比较晚，所以引入 Nacos 组件时，需要配置 bootstrap.properties）
- 配置 Nacos Config 元数据



```properties
spring.application.name=passjava-member
spring.cloud.nacos.config.server-addr=127.0.0.1:8848
```

![img](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181615816.png)

## [4.Nacos后台新增配置]

**Data ID:** czh-member.properties

**Group:** DEFAULT_GROUP

**配置格式:**

```properties
member.nick="czh"
member.age=10
```

## [5.开启动态刷新配置功能

添加注解@RefreshScope开启动态刷新配置功能

```java
@RefreshScope
@RestController
@RequestMapping("member/sample")
public class SampleController {}
```

```properties

```

## [6.测试结果]

结果：nickname和age和Nacos后台配置一致

结论：只用在Nacos后台改配置即可实时修改配置。

注意：Nacos的配置项优先级高于application.propertite里面的配置。

## [7.命名空间]

我们现在有5个微服务，每个微服务用到的配置可能都不一样，那不同微服务怎么样获取自己微服务的配置呢？

这里可以用到命名空间，我们针对每个微服务，都创建一个命名空间。

```json
# 创建5个命名空间
czh-channel
czh-content
czh-member
czh-question
czh-study
```

#### [更多配置项]

| 配置项                   | key                                       | 默认值        | 说明                                                         |
| ------------------------ | ----------------------------------------- | ------------- | ------------------------------------------------------------ |
| 服务端地址               | spring.cloud.nacos.config.server-addr     |               |                                                              |
| DataId前缀               | spring.cloud.nacos.config.prefix          |               | spring.application.name                                      |
| Group                    | spring.cloud.nacos.config.group           | DEFAULT_GROUP |                                                              |
| dataID后缀及内容文件格式 | spring.cloud.nacos.config.file-extension  | properties    | dataId的后缀，同时也是配置内容的文件格式，目前只支持 properties |
| 配置内容的编码方式       | spring.cloud.nacos.config.encode          | UTF-8         | 配置的编码                                                   |
| 获取配置的超时时间       | spring.cloud.nacos.config.timeout         | 3000          | 单位为 ms                                                    |
| 配置的命名空间           | spring.cloud.nacos.config.namespace       |               | 常用场景之一是不同环境的配置的区分隔离，例如开发测试环境和生产环境的资源隔离等。 |
| AccessKey                | spring.cloud.nacos.config.access-key      |               |                                                              |
| SecretKey                | spring.cloud.nacos.config.secret-key      |               |                                                              |
| 相对路径                 | spring.cloud.nacos.config.context-path    |               | 服务端 API 的相对路径                                        |
| 接入点                   | spring.cloud.nacos.config.endpoint        | UTF-8         | 地域的某个服务的入口域名，通过此域名可以动态地拿到服务端地址 |
| 是否开启监听和自动刷新   | spring.cloud.nacos.config.refresh-enabled | true          |                                                              |

## [10.使用Nacos总结]

- 1.引入Nacos依赖
- 2.配置Nacos数据源
- 3.配置中心配置数据集`DataId`和配置内容
- 4.开启动态刷新配置`@RefreshScope`
- 5.获取配置项的值`@value`
- 6.优先使用配置中心的配置
- 7.使用命名空间`namespace`来创建各服务的配置
- 8.使用分组`group`来区分不同环境
- 9.使用多配置集`extension-configs`区分不同类型的配置

## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)