# [SpringCloud Alibaba 组件简介]

## [1.SpringCloud Alibaba概述]

> Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用微服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。
>
> 依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里微服务解决方案，通过阿里中间件来迅速搭建分布式应用系统。

Github:https://github.com/alibaba/spring-cloud-alibaba

**Spring Cloud的几大痛点**

- 部分组件停止维护和更新，有问题也不易解决
- 部分环境搭建起来比较复杂，没有非常友好的可视化界面
- 配置相对来说复杂，需要较高的学习成本

**Spring Cloud Alibaba的优势**

- 阿里经历过了时间的考验
- 设计合理
- 拥有不错的可视化界面，方便运维监控和排查问题
- 环境搭建和配置简单，学习成本低

**PassJava项目搭配SpringCloud Alibaba技术的搭配方案**

| 描述         | Spring Cloud                   | Spring Cloud Alibaba | 组合选用                        |
| ------------ | ------------------------------ | -------------------- | ------------------------------- |
| 服务发现组件 | Eureka（停止维护）服务发现组件 | Nacos 注册中心       | Spring Cloud Alibaba - Nacos    |
| 配置中心组件 | Spring Cloud Config 配置中心   | Nacos 配置中心       | Spring Cloud Alibaba - Nacos    |
| 断路保护组件 | Hystrix 断路保护               | Sentinel 服务容错    | Spring Cloud Alibaba - Sentinel |
| 链路追踪组件 | Sleuth 调用链监控              | /                    | Spring Cloud - Sleuth           |
| 负载均衡组件 | Ribbon                         | /                    | Spring Cloud - Ribbon           |
| 远程调用组件 | OpenFeign （HTTP+JSON）        | Dubbo（RPC框架）     | Spring Cloud - OpenFeign        |
| 分布式事务   | /                              | Seata 分布式事务     | Spring Cloud Alibaba - Seata    |
| API 网关     | Gateway                        | /                    | Spring Cloud - Gateway          |

**最后技术选型：**

```json
Spring Cloud Alibaba - Nacos 实现注册中心
Spring Cloud Alibaba - Nacos 实现配置中心
Spring Cloud Alibaba - Sentinel  实现服务容错
Spring Cloud Alibaba - Seata 实现分布式事务

Spring Cloud - Ribbon 实现负载均衡
Spring Cloud - Feign 实现远程调用
Spring Cloud - Gateway API网关
Spring Cloud - Sleuth 实现调用链监控
```

## [2.Spring Cloud Alibaba版本]

项目的版本号格式为 x.x.x 的形式，其中 x 的数值类型为数字，从 0 开始取值，且不限于 0~9 这个范围。项目处于孵化器阶段时，第一位版本号固定使用 0，即版本号为 0.x.x 的格式。

由于 Spring Boot 1 和 Spring Boot 2 在 Actuator 模块的接口和注解有很大的变更，且 spring-cloud-commons 从 1.x.x 版本升级到 2.0.0 版本也有较大的变更，因此阿里采取跟 SpringBoot 版本号一致的版本:

- 1.5.x 版本适用于 Spring Boot 1.5.x
- 2.0.x 版本适用于 Spring Boot 2.0.x
- 2.1.x 版本适用于 Spring Boot 2.1.x
- 2.2.x 版本适用于 Spring Boot 2.2.x

Spring Cloud Alibaba 版本和Spring Cloud 和Spring Boot 版本兼容性列表

| Spring Cloud 版本       | Spring Cloud Alibaba 版本 | Spring Boot 版本 |
| ----------------------- | ------------------------- | ---------------- |
| Spring Cloud Hoxton.SR3 | 2.2.x.RELEASE             | 2.2.x.RELEASE    |
| Spring Cloud Greenwich  | 2.1.x.RELEASE             | 2.1.x.RELEASE    |
| Spring Cloud Finchley   | 2.0.x.RELEASE             | 2.0.x.RELEASE    |
| Spring Cloud Edgware    | 1.5.x.RELEASE             | 1.5.x.RELEASE    |

我们采用`Spring Cloud Hoxton.SR3`, `Spring Cloud Alibaba 2.2.0.RELEASE`, `Spring Boot 2.2.6 RELEASE`

PassJava-Common的pom.xml文件引入Spring Cloud Alibaba依赖

```xml
<dependencyManagement>
    <dependencies>
        <!--  Spring Cloud Alibaba 依赖  -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```


## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)