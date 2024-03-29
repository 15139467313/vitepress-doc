通过本实战您可以学到如下知识点：

- Spring Boot 如何整合 ES。
- 微服务中 ES 的 API 使用。
- 项目中如何使用 ES 来达到全文检索。

本篇主要内容如下：

![主要内容](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201444968.png)

## [一、Elasticsearch 组件库介绍]
在讲解之前，我在这里再次提下全文检索是什么：

**全文检索：** 指以全部文本信息作为检索对象的一种信息检索技术。而我们使用的数据库，如 Mysql，MongoDB 对文本信息检索能力特别是中文检索并没有 ES 强大。所以我们来看下 ES 在项目中是如何来代替 SQL 来工作的。

我使用的 Elasticsearch 服务是 7.4.2 的版本，然后采用官方提供的 Elastiscsearch-Rest-Client 库来操作 ES，而且官方库的 API 上手简单。

该组件库的官方文档地址：

```
https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high.html
```

另外这个组件库是支持多种语言的：

![支持多语言](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201444336.png)

注意：`Elasticsearch Clients` 就是指如何用 API 操作 ES 服务的组件库。

可能有同学会提问，Elasticsearch 的组件库中写着 JavaScript API，是不是可以直接在前端访问 ES 服务？可以是可以，但是会暴露 ES 服务的端口和 IP 地址，会非常不安全。所以我们还是用后端服务来访问 ES 服务。

我们这个项目是 Java 项目，自然就是用上面的两种：`Java Rest Client` 或者 `Java API`。我们先看下 Java API，但是会发现已经废弃了。如下图所示：

![Java API 已经废弃了](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201444381.png)

所以我们只能用 Java REST Client 了。而它又分成两种：高级和低级的。高级包含更多的功能，如果把高级比作MyBatis的话，那么低级就相当于JDBC。所以我们用高级的 Client。

![高级和低级 Client](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201448439.png)

## [二、整合检索服务]

我们把检索服务单独作为一个服务。就称作 czh-search 模块吧。

### [1.1 添加搜索服务模块]

- 创建 czh-search 模块。

首先我们在 czh-project模块创建一个 搜索服务模块 czh-search。然后勾选 spring web 服务。如下图所示。

第一步：选择 Spring Initializr，然后点击 Next。


第二步：选择 模块信息，然后点击 Next。

![image-20230420145013067](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201450168.png)

第步：选择 Web->Spring Web 依赖，然后点击 Next。



### [1.2 配置 Maven 依赖]

- 参照 ES 官网配置。

进入到 ES 官方网站，可以看到有低级和高级的 Rest Client，我们选择高阶的（High Level Rest Client）。然后进入到高阶 Rest Client 的 Maven 仓库。官网地址如下所示：

```sh
https://www.elastic.co/guide/en/elasticsearch/client/java-rest/7.9/index.html
```

![Rest Client 官方文档](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201451736.png)

- 加上 Maven 依赖。

  对应文件路径：\czh-search\pom.xml

```xml
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch-rest-high-level-client</artifactId>
    <version>7.4.2</version>
</dependency>
```

- 配置 elasticsearch 的版本为7.4.2

  因加上 Maven 依赖后，elasticsearch 版本为 7.6.2，所以遇到这种版本不一致的情况时，需要手动改掉。

  对应文件路径：\czh-search\pom.xml

```XNK
<properties>
    <elasticsearch.version>7.4.2</elasticsearch.version>
</properties>
```

刷新 Maven Project 后，可以看到引入的 elasticsearch 都是 7.4.2 版本了，如下图所示：

![image-20230420161535886](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201615356.png)

- 引入 czh-project的 Common 模块依赖。

  Common 模块是 PassJava 项目独立的出来的公共模块，引入了很多公共组件依赖，其他模块引入 Common 模块依赖后，就不需要单独引入这些公共组件了，非常方便。

  对应文件路径：\czh-search\pom.xml

```xml
 <dependency>
         <artifactId>czh-project</artifactId>
        <groupId>com.chen.czh</groupId>
        <version>1.0-SNAPSHOT</version>
</dependency>
```

添加完依赖后，我们就可以将搜索服务注册到 `Nacos` 注册中心了。 Nacos 注册中心的用法在前面几篇文章中也详细讲解过，这里需要注意的是要先启动 Nacos 注册中心，才能正常注册 passjava-search 服务。

### [1.3 注册搜索服务到注册中心]

修改配置文件：src/main/resources/application.properties。配置应用程序名、注册中心地址、注册中心的命名中间。

```properties
spring.application.name=czh-search
spring.cloud.nacos.config.server-addr=127.0.0.1:8848
spring.cloud.nacos.config.namespace=czh-search
```

给`启动类`添加服务发现注解：`@EnableDiscoveryClient`。这样 czh-search 服务就可以被注册中心发现了。

因 Common 模块依赖数据源，但 search 模块不依赖数据源，所以 search 模块需要移除数据源依赖：

```java
exclude = DataSourceAutoConfiguration.class
```

以上的两个注解如下所示：

```java
@EnableDiscoveryClient
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class CzhSearchApplication {
    public static void main(String[] args) {
        SpringApplication.run(CzhSearchApplication.class, args);
    }
}
```

接下来我们添加一个 ES 服务的专属配置类，主要目的是自动加载一个 ES Client 来供后续 ES API 使用，不用每次都 new 一个 ES Client。

### [1.4 添加 ES 配置类]

配置类：CzhElasticsearchConfig.java

核心方法就是 RestClient.builder 方法，设置好 ES 服务的 IP 地址、端口号、传输协议就可以了。最后自动加载了 RestHighLevelClient。

```java
package com.chen.search.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CzhElasticsearchConfig {

    @Bean
    // 给容器注册一个 RestHighLevelClient，用来操作 ES
    // 参考官方文档：https://www.elastic.co/guide/en/elasticsearch/client/java-rest/7.9/java-rest-high-getting-started-initialization.html
    public RestHighLevelClient restHighLevelClient() {
        return new RestHighLevelClient(
                RestClient.builder(
                        new HttpHost("192.168.56.10", 9200, "http")));
    }
}

```

接下来我们测试下 ES Client 是否自动加载成功。

### [1.5 测试 ES Client 自动加载]

```java

```

运行结果如下所示，打印出了 RestHighLevelClient。说明自定义的 ES Client 自动装载成功。

![ES 测试结果](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618619.png)

### [1.6 测试 ES 简单插入数据
测试方法 testIndexData，省略 User 类。users 索引在我的 ES 中是没有记录的，所以期望结果是 ES 中新增了一条 users 数据。

```java
/**
 * 测试存储数据到 ES。
 * */
@Test
public void testIndexData() throws IOException {
    IndexRequest request = new IndexRequest("users");
    request.id("1"); // 文档的 id
    
    //构造 User 对象
    User user = new User();
    user.setUserName("PassJava");
    user.setAge("18");
    user.setGender("Man");
    
    //User 对象转为 JSON 数据
    String jsonString = JSON.toJSONString(user);
    
    // JSON 数据放入 request 中
    request.source(jsonString, XContentType.JSON);

    // 执行插入操作
    IndexResponse response = client.index(request, RequestOptions.DEFAULT);

    System.out.println(response);
}
```

执行 test 方法，我们可以看到控制台输出以下结果，说明数据插入到 ES 成功。另外需要注意的是结果中的 result 字段为 updated，是因为我本地为了截图，多执行了几次插入操作，但因为 id = 1，所以做的都是 updated 操作，而不是 created 操作。

我们再来到 ES 中看下 users 索引中数据。查询 users 索引：

```sh
GET users/_search
```

结果如下所示：

![查询 users 索引结果](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618105.png)

可以从图中看到有一条记录被查询出来，查询出来的数据的 _id = 1，和插入的文档 id 一致。另外几个字段的值也是一致的。说明插入的数据没有问题。

```json
"age" : "18",
"gender" : "Man",
"userName" : "PassJava"
```

### [1.7 测试 ES 查询复杂语句]

> 示例：搜索 bank 索引，address 字段中包含 big 的所有人的年龄分布 ( 前 10 条 ) 以及平均年龄，以及平均薪资。

#### [1.7.1 构造检索条件]

我们可以参照官方文档给出的示例来创建一个 SearchRequest 对象，指定要查询的索引为 bank，然后创建一个 SearchSourceBuilder 来组装查询条件。总共有三种条件需要组装：

- address 中包含 road 的所有人。
- 按照年龄分布进行聚合。
- 计算平均薪资。

代码如下所示，需要源码请到我的 Github/CZH上下载。

![查询复杂语句示例](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618036.png)

将打印出来的检索参数复制出来，然后放到 JSON 格式化工具中格式化一下，再粘贴到 ES 控制台执行，发现执行结果是正确的。

![打印出检索参数](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618021.png)

用在线工具格式化 JSON 字符串，结果如下所示：

![格式化 JSON 字符串](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618103.png)

然后我们去掉其中的一些默认参数，最后简化后的检索参数放到 Kibana 中执行。

Kibana Dev Tools 控制台中执行检索语句如下图所示，检索结果如下图所示：

![控制台中执行检索语句](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618281.png)

找到总记录数：29 条。

第一条命中记录的详情如下：

> 平均 balance：13136。
>
> 平均年龄：26。
>
> 地址中包含 Road 的：263 Aviation Road。

和 IDEA 中执行的测试结果一致，说明复杂检索的功能已经成功实现。

#### [17.2 获取命中记录的详情]
而获取命中记录的详情数据，则需要通过两次 getHists() 方法拿到，如下所示：

```
// 3.1）获取查到的数据。
SearchHits hits = response.getHits();
// 3.2）获取真正命中的结果
SearchHit[] searchHits = hits.getHits();
```

我们可以通过遍历 searchHits 的方式打印出所有命中结果的详情。

```java
// 3.3）、遍历命中结果
for (SearchHit hit: searchHits) {
    String hitStr = hit.getSourceAsString();
    BankMember bankMember = JSON.parseObject(hitStr, BankMember.class);
}
```

拿到每条记录的 hitStr 是个 JSON 数据，如下所示：

```json
{
    "account_number": 431,
    "balance": 13136,
    "firstname": "Laurie",
    "lastname": "Shaw",
    "age": 26,
    "gender": "F",
    "address": "263 Aviation Road",
    "employer": "Zillanet",
    "email": "laurieshaw@zillanet.com",
    "city": "Harmon",
    "state": "WV"
}
```

而 BankMember 是根据返回的结果详情定义的的 JavaBean。可以通过工具自动生成。在线生成 JavaBean 的网站如下：

```sh
https://www.bejson.com/json2javapojo/new/
```

把这个 JavaBean 加到 PassjavaSearchApplicationTests 类中：

```java
@ToString
@Data
static class BankMember {
    private int account_number;
    private int balance;
    private String firstname;
    private String lastname;
    private int age;
    private String gender;
    private String address;
    private String employer;
    private String email;
    private String city;
    private String state;
}
```

然后将 bankMember 打印出来：

```java
System.out.println(bankMember);
```

![bankMember](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618735.png)

得到的结果确实是我们封装的 BankMember 对象，而且里面的属性值也都拿到了。

#### [1.7.3 获取年龄分布聚合信息]

ES 返回的 response 中，年龄分布的数据是按照 ES 的格式返回的，如果想按照我们自己的格式来返回，就需要将 response 进行处理。

如下图所示，这个是查询到的年龄分布结果，我们需要将其中某些字段取出来，比如 buckets，它代表了分布在 21 岁的有 4 个。

下面是代码实现：

```java
Aggregations aggregations = response.getAggregations();
Terms ageAgg1 = aggregations.get("ageAgg");
for (Terms.Bucket bucket : ageAgg1.getBuckets()) {
    String keyAsString = bucket.getKeyAsString();
    System.out.println("用户年龄： " + keyAsString + " 人数：" + bucket.getDocCount());
}
```

最后打印的结果如下，21 岁的有 4 人，26 岁的有 4 人，等等。

![打印结果：用户年龄分布](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618047.png)

#### [1.7.4 获取平均薪资聚合信息]

现在来看看平均薪资如何按照所需的格式返回，ES 返回的结果如下图所示，我们需要获取 balanceAvg 字段的 value 值。


代码实现：

```java
Avg balanceAvg1 = aggregations.get("balanceAvg");
System.out.println("平均薪资：" + balanceAvg1.getValue());
```

打印结果如下，平均薪资 28578 元。

![打印结果：平均薪资](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618465.png)

## [三、实战：同步 ES 数据]

### [3.1 定义检索模型]

PassJava 这个项目可以用来配置题库，如果我们想通过关键字来搜索题库，该怎么做呢？

类似于百度搜索，输入几个关键字就可以搜到关联的结果，我们这个功能也是类似，通过 Elasticsearch 做检索引擎，后台管理界面和小程序作为搜索入口，只需要在小程序上输入关键字，就可以检索相关的题目和答案。

首先我们需要把题目和答案保存到 ES 中，在存之前，第一步是定义索引的模型，如下所示，模型中有 `title` 和 `answer` 字段，表示题目和答案。

```json
"id": {
    "type": "long"
},
"title": {
    "type": "text",
    "analyzer": "ik_smart"
},
"answer": {
    "type": "text",
    "analyzer": "ik_smart"
},
"typeName": {
    "type": "keyword"
}
```

### [3.2 在 ES 中创建索引]

上面我们已经定义了索引结构，接着就是在 ES 中创建索引。

在 Kibana 控制台中执行以下语句：

```sh
PUT question
{
    "mappings" : {
        "properties": {
              "id": {
                  "type": "long"
              },
              "title": {
                  "type": "text",
                  "analyzer": "ik_smart"
              },
              "answer": {
                  "type": "text",
                  "analyzer": "ik_smart"
              },
              "typeName": {
                  "type": "keyword"
              }
        }
  }
}
```

执行结果如下所示：

![创建 question 索引](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201618406.png)

我们可以通过以下命令来查看 question 索引是否在 ES 中：

```sh
GET _cat/indices
```

执行结果如下图所示：

![查看 ES 中所有的索引](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201619245.png)

### [3.3 定义 ES model]

上面我们定义 ES 的索引，接着就是定义索引对应的模型，将数据存到这个模型中，然后再存到 ES 中。

ES 模型如下，共四个字段：id、title、answer、typeName。和 ES 索引是相互对应的。

```java
@Data
public class QuestionEsModel {
    private Long id;
    private String title;
    private String answer;
    private String typeName;
}
```

### [3.4 触发保存的时机]

当我们在后台创建题目或保存题目时，先将数据保存到 mysql 数据库，然后再保存到 ES 中。

如下图所示，在管理后台创建题目时，触发保存数据到 ES 。



第一步，保存数据到 mysql 中，项目中已经包含此功能，就不再讲解了，直接进入第二步：保存数据到 ES 中。

而保存数据到 ES 中，需要将数据组装成 ES 索引对应的数据，所以我用了一个 ES model，先将数据保存到 ES model 中。

### [3.5 用 model 来组装数据]

这里的关键代码时 `copyProperties`，可以将 `question` 对象的数据取出，然后赋值到 ES model 中。不过 ES model 中还有些字段是 question 中没有的，所以需要单独拎出来赋值，比如 typeName 字段，question 对象中没有这个字段，它对应的字段是 question.type，所以我们把 type 取出来赋值到 ES model 的 typeName 字段上。如下图所示：

![用 model 来组装数据](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201619747.png)

### [3.6 保存数据到 ES]

我在 passjava-search 微服务中写了一个保存题目的 api 用来保存数据到 ES 中。

![保存数据到 ES](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201619286.png)

然后在 passjava-question 微服务中调用 search 微服务的保存 ES 的方法就可以了。

```java
// 调用 czh-search 服务，将数据发送到 ES 中保存。
searchFeignService.saveQuestion(esModel);
```

### [3.7 检验 ES 中是否创建成功]

我们可以通过 kibana 的控制台来查看 question 索引中的文档。通过以下命令来查看：

```sh
GET question/_search
```

执行结果如下图所示，有一条记录：



另外大家有没有疑问：可以重复更新题目吗？

答案是可以的，保存到 ES 的数据是幂等的，因为保存的时候带了一个类似数据库主键的 id。

## [四、实战：查询 ES 数据]

我们已经将数据同步到了 ES 中，现在就是前端怎么去查询 ES 数据中，这里我们还是使用 Postman 来模拟前端查询请求。

### [4.1 定义请求参数]

请求参数我定义了三个：

- **keyword**：用来匹配问题或者答案。
- **id**：用来匹配题目 id。
- **pageNum**：用来分页查询数据。

这里我将这三个参数定义为一个类：

```java
@Data
public class SearchParam {
    private String keyword; // 全文匹配的关键字
    private String id; // 题目 id
    private Integer pageNum; // 查询第几页数据
}
```

### [4.2 定义返回参数]

返回的 response 我也定义了四个字段：

- **questionList**：查询到的题目列表。
- **pageNum**：第几页数据。
- **total**：查询到的总条数。
- **totalPages**：总页数。

定义的类如下所示：

```java
@Data
public class SearchQuestionResponse {
    private List<QuestionEsModel> questionList; // 题目列表
    private Integer pageNum; // 查询第几页数据
    private Long total; // 总条数
    private Integer totalPages; // 总页数
}
```

### [4.3 组装 ES 查询参数]

调用 ES 的查询 API 时，需要构建查询参数。

组装查询参数的核心代码如下所示：

![组装查询参数](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201619026.png)

- 第一步：创建检索请求。
- 第二步：设置哪些字段需要模糊匹配。这里有三个字段：title，answer，typeName。
- 第三步：设置如何分页。这里分页大小是 5 个。
- 第四步：调用查询 api。

### [4.4 格式化 ES 返回结果]

ES 返回的数据是 ES 定义的格式，真正的数据被嵌套在 ES 的 response 中，所以需要格式化返回的数据。

核心代码如下图所示：

![格式化 ES 返回结果](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201619460.png)

- 第一步：获取查到的数据。
- 第二步：获取真正命中的结果。
- 第三步：格式化返回的数据。
- 第四步：组装分页参数。

### [4.5 测试 ES 查询]

#### [4.5.1 实验一：测试 title 匹配]

我们现在想要验证 title 字段是否能匹配到，传的请求参数 keyword = 111，匹配到了 title = 111 的数据，且只有一条。页码 pageNum 我传的 1，表示返回第一页数据。如下图所示：

![测试匹配 title](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201619761.png)

#### [4.5.2 实验二：测试 answer 匹配]
我们现在想要验证 answer 字段是否能匹配到，传的请求参数 keyword = 测试答案，匹配到了 title = 测试答案的数据，且只有一条，说明查询成功。如下图所示：

![测试匹配 answer](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201619203.png)

#### [4.5.2 实验三：测试 id 匹配]

我们现在想要匹配题目 id 的话，需要传请求参数 id，而且 id 是精确匹配。另外 id 和 keyword 是取并集，所以不能传 keyword 字段。

请求参数 id = 5，返回结果也是 id =5 的数据，说明查询成功。如下图所示：

![测试 id 匹配](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304201620048.png)

## [五、总结]

本文通过我的开源项目 czh-project来讲解 ES 的整合，ES 的 API 使用以及测试。非常详细地讲解了每一步该如何做，相信通过阅读本篇后，再加上自己的实践，一定能掌握前后端该如何使用 ES 来达到高效搜索的目的。

当然，ES API 还有很多功能未在本文实践，有兴趣的同学可以到 ES 官网进行查阅和学习。
## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)