# [整合MyBatis-Plus实现CRUD]

## [1.添加Mybatis-Plus依赖]

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.2.0</version>
</dependency>
```

## [2.配置数据源]

- 导入数据库的驱动
  - 查看mysql版本 5.7.29

到maven仓库查看适用的mysql驱动，5.7的没有，8.0兼容5.7的，所以选择8.0的驱动

```xml
<!--添加mysql驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.17</version>
</dependency>
```

## [3.配置MyBatis-Plus]

- 添加application.yml 文件配置数据源

  文件路径：/passjava-question/src/main/resources/application.yml

  ```yaml
  spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://xxxxx.xxx:3306/passjava_admin?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
        username: root
        password: xxx
  ```

- 配置mapper映射文件路径

  ![配置mabatis-plus时的智能提示](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181550968.png)

  ```yxml
  mybatis-plus:
    mapper-locations: classpath:/mapper/**/*.xml
    global-config:
      db-config:
        id-type: auto
  ```

- 添加MapperScan注解

  ```java
  @MapperScan("com.chen.question.dao")
  @SpringBootApplication
  public class CzhQuestionApplication {
      public static void main(String[] args) {
          SpringApplication.run(PassjavaQuestionApplication.class, args);
      }
  }
  ```

## [4.测试mybatis-plus的CRUD方法

- 创建类型为javaBasic的type表数据

  ```java
  @Autowired
  TypeService typeService;
  
  // 创建题目类型
  @Test
  void testCreateType() {
      TypeEntity typeEntity = new TypeEntity();
      typeEntity.setType("javaBasic");
      typeService.save(typeEntity);
      System.out.println("创建成功");
  }
  ```

 

- 更新id=1的表数据

  ```java
  // 更新type=jvm
  @Test
  void testUpdateType() {
      TypeEntity typeEntity = new TypeEntity();
      typeEntity.setId(1L);
      typeEntity.setType("jvm");
      typeService.updateById(typeEntity);
      System.out.println("修改成功");
  }
  ```



- 查询id=1的表数据

  ```
  // 查询题目类型
  @Test
  void testSelectType() {
      List<TypeEntity> typeEntityList = typeService.list(new QueryWrapper<TypeEntity>().eq("id",1L));
      typeEntityList.forEach((item)-> {
          System.out.println(item);
      });
      System.out.println("查询成功");
  }
  ```



- 删除id=1的表数据

  ```java
  // 删除题目类型记录
  @Test
  void testRemoveType() {
      typeService.removeById(1L);
      System.out.println("删除成功");
  }
  ```



## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)