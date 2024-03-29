# [Spring Cloud 整合 OpenFeign实现声明式远程调用]
## [1.Feign 概述]

- Feign声明式客的HTTP客户端，让远程调用更简单。
- 提供了HTTP请求的模板，编写简单的接口和插入注解，就可以定义好HTTP请求的参数、格式、地址等信息
- 整合了Ribbon（负载均衡组件）和Hystix（服务熔断组件），不需要显示使用这两个组件
- Spring Cloud Feign 在Netflix Feign的基础上扩展了对SpringMVC注解的支持

## [2. 远程调用示例]

> 示例：查询用户的学习时长

用户微服务czh-member调用学习微服务czh-study的方法

### [1.引入openfeign依赖]
czh-member和czh-study项目的pom文件引入openfeign依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

### [2.StudyTimeController定义远程调用测试方法]

返回某个用户学习题目的总时长

```java
@RequestMapping("/member/list/test")
public R memberStudyTimeTest() {
    StudyTimeEntity studyTimeEntity = new StudyTimeEntity();
    studyTimeEntity.setTotalTime(100); // 学习时长：100分钟
    studyTimeEntity.setQuesTypeId(1L); // 题目类型：1 （javaBasic）

    return R.ok().put("studyTime", Arrays.asList(studyTimeEntity));
}
```

### [3.member目录下创建feign service]
- 创建package: com.chen.member.feign

- 创建StudyTimeFeignService接口

- 添加注解`@FeignClient`。显示声明这个接口用来远程调用`study`服务。

  ```java
  @FeignClient("czh-study")
  public interface StudyTimeFeignService {}
  ```

- 添加远程调用方法

  ```java
  public R memberStudyTime();
  ```

- 给方法添加要远程调用的方法的路径`study/studytime/member/list/test`

  ```java
  @RequestMapping("study/studytime/member/list/test")
  public R getMemberStudyTimeListTest();
  ```

- 添加注解`@EnableFeignClients`开启远程调用服务。

  给类CzhStudyApplication.java添加注解`@EnableFeignClients`。

  basePackages代表自动扫码指定路径下所有带有@FeignClient注解的接口。

  ```java
  @EnableFeignClients(basePackages = "com.chen.member.feign")//远程调用
  @RefreshScope//开启nacos自动刷新
  @EnableDiscoveryClient//开启服务注册与发现功能
  @MapperScan("com.chen.member.mapper")
  @SpringBootApplication(scanBasePackages = "com.chen")
  public class CzhMemberApplication {
  
      public static void main(String[] args) {
          SpringApplication.run(CzhMemberApplication.class, args);
      }
  }
  
  ```

- 测试接口

  - 启动czh-member和czh-study服务

  - 用postman工具或浏览器输入请求地址

    http://localhost:9999/member/member/studytime/list/test

  - 返回结果如下图

  studytime和member都有数据，学习时长：100分钟，昵称：czh

  ![image-20230418160635746](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181606815.png)

### [4.测试OpenFeign传参]

示例：用户id作为参数在服务间传递

MemberController

```java
@RequestMapping("/studytime/list/test/{id}")
public R getMemberStudyTimeListTest(@PathVariable("id") Long id) {
    //mock数据库查到的会员信息
    MemberEntity memberEntity = new MemberEntity();
    memberEntity.setId(id); // 学习时长：100分钟
    memberEntity.setNickname("czh");

    //远程调用拿到该用户的学习时长（学习时长是mock数据）
    R memberStudyTimeList = studyTimeFeignService.getMemberStudyTimeListTest(id);
    return R.ok().put("member", memberEntity).put("studytime", memberStudyTimeList.get("studytime"));
}
```

StudyTimeFeignService

```java
@FeignClient("passjava-study")
public interface StudyTimeFeignService {
    @RequestMapping("study/studytime/member/list/test/{id}")
    public R getMemberStudyTimeListTest(@PathVariable("id") Long id);
}
```

StudyTimeController

```java
@RequestMapping("/member/list/test/{id}")
public R memberStudyTimeTest(@PathVariable("id") Long id) {
    StudyTimeEntity studyTimeEntity = new StudyTimeEntity();
    studyTimeEntity.setTotalTime(100); // 学习时长：100分钟
    studyTimeEntity.setQuesTypeId(1L); // 题目类型：1 （javaBasic）

    return R.ok().put("studytime", Arrays.asList(studyTimeEntity));
}
```

## [3.总结FeignClient使用方法]

- 引入OpenFeign依赖
- 定义FeignClient接口类（注解`@FeignClient`），声明这个接口类是用来远程调用其他服务的
- 接口类中定义要远程调用的接口方法，指定远程服务方法的路径
- Controller类中调用接口方法
- 开启远程调用（注解`@EnableFeignClients`）
- 远程调用的流程：
  - @RequestBody将这个对象转为json
  - 找到czh-study服务，给study/studyTime/member/list/test服务发送请求
  - 将json放到请求体里面，发送请求
  - 对方服务收到请求，请求体里有json数据
  - 将请求体中的json数据转换成对方服务的参数类型。只需要两边的字段名称和类型是一致的。
  ## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)