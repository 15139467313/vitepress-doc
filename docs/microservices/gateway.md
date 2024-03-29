# [Spring Cloud 整合Gateway网关]

## [1.Gateway网关介绍]
- 网关:流量的入口
- 网关常用功能:路由转发,权限校验,限流控制
- Spring Cloud Gateway是Spring Cloud官方推出的第二代网关框架
- Spring Cloud Gateway取代了netflix的Zuul网关

## [2.Gateway原理]

PassJava项目中,小程序和管理后台请求先访问到API网关.

API网关通过注册中心实时感知微服务的状态的路由地址,准确地将请求路由到各个服务.

![Spring Cloud Gateway](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181617113.png)

官方文档:https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.2.RELEASE/reference/html/

![Gateway原理](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181617121.png)

- 请求到达网关后,先经过断言Predicate,是否符合某个路由规则
- 如果符合,则按路由规则路由到指定地址
- 请求和响应都可以通过过滤器Filter进行过滤

## [3.创建Gateway 模块]

- 适用Spring 初始化器创建Gateway module
![Spring 初始化器](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181620783.png)


- 选择Gateway依赖

![选择Gateway依赖](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181620520.png)

- 引入Gateway模块

```
<module>czh-gateway</module
```

## [4.配置Gateway]

- 引入Nacos组件

因common模块引入了nacos注册中心组件,所以我们可以直接引用common模块

```xml
<dependency>
           <artifactId>czh-project</artifactId>
        <groupId>com.chen.czh</groupId>
        <version>1.0-SNAPSHOT</version>
</dependency>
```

- 应用类上添加注解`@EnableDiscoveryClient`

```java
@RefreshScope
@EnableDiscoveryClient
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class CzhGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(CzhGatewayApplication.class, args);
    }
}
```

## [5.使用Gateway demo]

- 新建application.yml文件

  ```yml
  spring:
    cloud:
      gateway:
        routes:
          - id: route_qq
            uri: http://www.qq.com
            predicates:
              - Query=url,qq
          - id: route_baidu
            uri: http://www.baidu.com
            predicates:
              - Query=url,baidu
  ```

  第一条路由规则:当请求路径中包含url=qq,则跳转到[http://www.qq.com](http://www.qq.com/)

  第二条路由规则:当请求路径中包含url=baidu,则跳转到[http://www.baidu.com](http://www.baidu.com/)

后续在项目中使用Gateway的强大功能.



## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)