# [SpringCloud整合统一异常处理]

## [一、缘起]

> 我们在写代码的时候，通常会在方法里面添加各种try catch来捕获异常，会发现有很多重复的代码，所以我们可以整合统一异常处理来优化代码结构。

拦截异常并统一处理我们可以用到`@RestControllerAdvice`注解

## [二、自定义异常处理类]

- 添加统一异常处理类注解`@RestControllerAdvice`
- 添加日志注解`@Slf4j`
- 添加异常处理方法注解`@ExceptionHandler`

```java
package com.chen.question.exception;

import com.chen.common.exception.BizCodeEnum;
import com.chen.common.utils.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/*
* 集中处理所有异常
 */
@Slf4j
@RestControllerAdvice(basePackages = "com.chen.question.controller")
public class CzhExceptionControllerAdvice {

    @ResponseBody
    @ExceptionHandler(value= MethodArgumentNotValidException.class)
    public R handleValidException(MethodArgumentNotValidException e) {
        //log.error("数据校验出现问题{}，异常类型：{}", e.getMessage(), e.getClass());
        System.out.println(e.getMessage());
        BindingResult bindingResult = e.getBindingResult();
        Map<String, String> errorMap = new HashMap<>();
        bindingResult.getFieldErrors().forEach((fieldError)->{
            errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
        });

        return R.error(BizCodeEnum.VALID_EXCEPTION.getCode(), BizCodeEnum.VALID_EXCEPTION.getMsg()).put("data", errorMap);
    }

    @ExceptionHandler(value=Throwable.class)
    public R handleException(Throwable throwable) {
        //log.error("未知异常{}，异常类型：{}", throwable.getMessage(), throwable.getClass());
        System.out.println(throwable.getMessage());
        return R.error(BizCodeEnum.UNKNOWN_EXCEPTION.getCode(), BizCodeEnum.UNKNOWN_EXCEPTION.getMsg());
    }
}

```

## [三、推荐的系统错误码]

### [1.错误码和错误信息定义类]
- 1.错误码长度：5个数字
- 2.前两位：业务场景
- 3.后三位：错误码

```json
10：通用业务
    001：参数格式校验错误（10001）
11：会员业务
12：题目业务
13：内容业务
14：学习业务
```

### [2.错误码枚举类]

com.chen.common.exception.BizCodeEnum

定义了两种异常枚举：系统未知异常、参数格式校验失败

```java
package com.chen.common.exception;

/***
 * .错误码和错误信息定义类
 *
 * - 1.错误码长度：5个数字
 * - 2.前两位：业务场景
 * - 3.后三位：错误码
 *
 *     10：通用业务
 *     	001：参数格式校验错误（10001）
 *     11：会员业务
 *     12：题目业务
 *     13：内容业务
 *     14：学习业务
 ***/
public enum BizCodeEnum {
    UNKNOWN_EXCEPTION(10000, "系统未知异常"),
    VALID_EXCEPTION(10001, "参数格式校验失败"),
    QUESTION_SAVE_EXCEPTION(12001, "题目保存异常");

    private int code;
    private String msg;
    BizCodeEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}

```

## [四、测试代码]

> **测试场景1：校验参数displayOrder必须为正整数，如果displayOrder不为正整数，则会抛出异常**

- 1.实体类上添加校验注解`@Positive`

```java
/**
 * 排序
 */
@Positive
private Integer displayOrder;
```

- 2.controller类里面添加save方法，并添加校验参数注解@Valid

```java
/**
* 保存
*/
@RequestMapping("/save")
public R save(@Valid @RequestBody QuestionEntity question){
    questionService.save(question);

    return R.ok();
}
```

测试：

用Postman工具调用save方法

请求地址：

```javascript
http://192.168.10.160:8060/api/question/v1/admin/question/save
```

请求参数：

```json
{
    "displayOrder": 0.2
}
```

返回结果：

```json
{
    "msg": "参数格式校验失败",
    "code": 10001,
    "data": {
        "displayOrder": "必须是正数"
    }
}
```

> **测试场景2：对于代码里面直接抛出的异常，也可以handle**

1.controller类里面添加查询题目的方法，并抛出Exception异常

```java
/**
* 信息
*/
@RequestMapping("/info/{id}")
//@RequiresPermissions("question:question:info")
public R info(@PathVariable("id") Long id) throws Exception {
    QuestionEntity question = questionService.getById(id);
    throw new Exception("test");

    //return R.ok().put("question", question);
}
```

测试：

用Postman工具调用save方法

请求地址：

```javascript
http://192.168.10.160:8060/api/question/v1/admin/question/save
```

返回结果：

```json
{
    "msg": "系统未知异常",
    "code": 10000
}
```

证明统一处理方法被调用了：

```java
@ExceptionHandler(value=Throwable.class)
public R handleException(Throwable throwable) {
    return R.error(BizCodeEnum.UNKNOWN_EXCEPTION.getCode(), BizCodeEnum.UNKNOWN_EXCEPTION.getMsg());
}
```
## [小程序]
![image-20230418154513499](https://czh-wp.oss-cn-hangzhou.aliyuncs.com/img/202304181545557.png)