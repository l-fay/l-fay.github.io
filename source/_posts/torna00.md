---
title: 使用Smart-Doc + Torna生成和管理接口文档
date: 2022-11-30 19:32:10
tags: [Torna, smart-doc, Java]
categories:
  - [Java, 常用库, smart-doc]
  - [Java, 工具, Torna]
---

在开发spring项目的时候，接口文档承担着向其他开发人员说明接口相关信息的重要任务，因此，一份清晰而又相近的接口文档至关重要。

但是，写接口文档的痛苦想必各位开发人员都体验过，明明写接口的时候那么丝滑，写接口文档的时候像要老命一样各种核对数据格式、文档格式，最后还有可能漏掉那么一些示例导致调用不成功，继续和其他开发沟通……还有接口文档的更新问题，一旦要更新接口文档，就意味着要给所有用着接口文档的同事一一联系，想想就令人摸不着头发……

<!-- more -->

以上这些让人头秃的痛点驱使着我寻找一个可以自动生成文档，并且可以将文档展示在线上的工具。一来可以省去大量编写接口文档的时间，在不受折磨的情况下生成高可靠性的文档；二来在更新接口文档之后，使用的还是同一个链接，不用再一一通知，对于我这样的社恐来说简直再好不过。

那么闲言少叙，进入今天的正题，Smart-Doc + Torna的生成和管理接口文档解决方案。

## Smart-Doc

首先放[项目地址](https://gitee.com/smart-doc-team/smart-doc)和[文档](https://smart-doc-group.github.io/#/zh-cn/?id=smart-doc)。

smart-doc是一款同时支持JAVA REST API和Apache Dubbo RPC接口文档生成的工具，smart-doc在业内率先提出基于JAVA泛型定义推导的理念， 完全基于接口源码来分析生成接口文档，不采用任何注解侵入到业务代码中。你只需要按照java-doc标准编写注释， smart-doc就能帮你生成一个简易明了的Markdown、HTML5、Postman Collection2.0+、OpenAPI 3.0+的文档。

简单来说，在简单配置之后，只要代码写的规范、注释写的够全，就能自动生成文档，无需对项目逻辑做修改、也不用添加额外注解。

配置方法[在这](https://smart-doc-group.github.io/#/zh-cn/start/quickstart)。

## Torna

还是先放[项目地址](https://gitee.com/durcframework/torna)和[文档](https://torna.cn/dev/)。

接口文档解决方案，目标是让接口文档管理变得更加方便、快捷。Torna采用团队协作的方式管理和维护接口文档，将不同形式的文档纳入进来统一维护。

Torna弥补了传统文档生成工具（如swagger）的不如之处，在保持原有功能的前提下丰富并增强了一些实用的功能。

使用方法和配置方法[在这](https://gitee.com/durcframework/torna#%E4%BD%BF%E7%94%A8%E6%AD%A5%E9%AA%A4)。

## Smart-Doc和Torna配合使用

### 前置条件

配合使用的基础是：

1、Smart-Doc已经配置好了，至少成功生成本地文档。

2、Torna配置好了，成功登录服务端。

满足以上两点，就可以着手将两个模块接一起了，Torna在官方文档中也给出了详细的方法步骤，[点这](https://torna.cn/dev/smart-doc.html#整合smart-doc)。

### 踩过的坑

文档上的东西还是很细的，但是在配置和使用过程中仍然会踩坑，这里说一下踩过的每一个坑。

#### appKey

在Smart-Doc的[文档](https://smart-doc-group.github.io/#/zh-cn/torna/tornaIntegration)中提到`Torna从1.11.0版本开始，使用smart-doc推送文档数据已经不再需要配置appKey和secret， 仅需要配置appToken即可，因此建议升级Torna版本。`。我用的版本组合是Smart-Doc:2.5.3+Torna:1.16.3，按文档的说法是不需要配置appKey的，但是在实际使用中发现文档生成后网Torna上推送的时候怎么都不成功。

后来在调试的时候发现，推送还是验证了appKey，不过只要不是null就能通过验证，所以在每个模块的`smart-doc.json`中都配置了`"appKey":"xxx"`，然后就推送成功了。

#### appToken

这个倒不是跟文档描述不一致，只是理解出现了偏差。

当子模块有多个的时候，需要在torna中新建对应的模块，每个模块有一个单独的appToken，然后给不同的子模块配置不同的appToken。

我刚开始不知道需要给每个子模块单独配appToken，导致我的文档推送的时候，后一个子模块就把前一个子模块的文档覆盖了，只有最后一个子模块的文档能看到。

## 效果展示

最终的效果就和Torna文档里展示的一样，为了方便起见，我直接用文档的示例做说明。

比如有一个接口定义如下：

```
/**
 * 产品模块
 *
 * @author thc
 */
@RestController
@RequestMapping("shop/product")
public class ProductController {

    /**
     * 查询产品
     *
     * @param productNo 产品id|123
     * @return
     */
    @GetMapping
    public Result<ProductVO> get(@RequestParam Integer productNo) {
        ProductVO productVO = new ProductVO();
        productVO.setProductNo(String.valueOf(productNo));
        return Result.ok(productVO);
    }

}
```

其中ProductVO的结构是：
```
public class ProductVO {
    /**
     * 产品id
     *
     * @mock aa
     */
    private String productNo;

    /**
     * 备注
     *
     * @mock xxx
     */
    private String remark;

    /**
     * 产品详情
     *
     * @mock
     */
    private ProductDetailVO productDetailVO;
    
    ... 省略getter setter   
}
```

那么生成的接口文档效果如下：

<img src="/images/torna00/img1.jpg" width="100%">

对照着看一下，可以发现Smart-Doc + Torna的方案生成的接口文档，请求参数和响应参数的描述和示例都非常详尽，在方便接口对接的同时，也大大减轻了开发人员的负担。

## 总结

Smart-Doc + Torna的生成和管理接口文档解决方案只需写好注释、规范代码，就能通过对注释和实体类的解析来生成示例详尽的接口文档，适用范围很大；由于其对代码零侵入的特性，不用改动业务代码就能使用，对旧代码也很友好。

并且根据我这俩月的使用体验来说，非常丝滑，还能鞭策我在写代码的时候注意代码规范、好好写注释，使我的代码质量有了提升。

总之就是非常不错，嗯。