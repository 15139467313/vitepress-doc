/**
 * 侧边栏菜单
 *
 * @see sidebar https://vitepress.vuejs.org/guide/theme-sidebar#sidebar
 */
export const sidebar = {
  '/docs/': [
    {
      text: '小程序快速上手',
      collapsible: true,
      link: '/docs/hello',
      items: [
        { text: '介绍', link: '/docs/introduce' },
        { text: '开始', link: '/docs/hello' },
        { text: '作者博客', link: 'https://znunwm.top/' },
        
      ]
    },
    {
      text: '微服务快速上手',
      collapsible: true,
      link: '/docs/microservices/microservices',
      items: [
        { text: '项目简介', link: '/docs/microservices/back' ,
      
        items: [
          { text: '项目架构图', link: '/docs/microservices/back' },
          { text: '项目前置要求', link: '/docs/microservices/ask' },
          { text: 'java学习路线', link: '/docs/microservices/study' },
  
        ]
      
      },
        { text: 'czh-project架构', link: '/' ,
      
        items: [
          { text: '创建项目和添加模块', link: '/docs/microservices/project' },
          { text: '创建数据库和表', link: '/docs/microservices/database' },
          { text: '搭建管理后台', link: '/docs/microservices/admin' },
          { text: '自动生成前端后端代码', link: '/docs/microservices/generator' },
          { text: '整合MyBatis-Plus实现CRUD', link: '/docs/microservices/generator' },
          { text: 'SpringCloudAlibaba 简介', link: '/docs/microservices/sc' },
          { text: 'SpringCloudAlibabaNacos', link: '/docs/microservices/nacos' },
          { text: 'SpringCloud整合OpenFeign', link: '/docs/microservices/openfeign' },
          { text: '整合 Nacos配置中心', link: '/docs/microservices/conf' },
          { text: '整合Gateway网关', link: '/docs/microservices/gateway' },
          { text: '整合OSS对象存储', link: '/docs/microservices/oss' },
          { text: 'SpringCloud整合统一异常', link: '/docs/microservices/exception' },
          { text: 'Elasticsearch上篇(原理)', link: '/docs/microservices/elasticsearch'},
          { text: 'Elasticsearch中篇(实战)', link: '/docs/microservices/es'},
          { text: 'es中文分词', link: '/docs/microservices/ik' },
          { text: '链路追踪', link: '/docs/microservices/lsk' },
          { text: '性能压测', link: '/docs/microservices/jvm' },
          { text: '缓存实战（一）', link: '/docs/microservices/cache1' },
          { text: '缓存实战（二）', link: '/docs/microservices/cache2' },
          { text: '缓存实战（三）', link: '/docs/microservices/cache3' },
          { text: '缓存实战（四）', link: '/docs/microservices/cache4' },
          { text: '深入理解Gateway', link: '/docs/microservices/gate' },
          { text: '唐玄奘把JWT令牌玩到了极致', link: '/docs/microservices/jwt' },
          { text: '管理后台-题目类型功能', link: '/docs/microservices/test' },
        
        ]
      
      },

      { text: '分布式协议', link: '/' ,
      
        items: [
          { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },
          // { text: '分布式基础概念', link: '/docs/distributed/distributed' },

        
        
        ]
      
      },
        { text: '架构设计', link: '/docs/microservices/hello' },
        { text: '并发多线程', link: '/docs/microservices/hello' },
        { text: 'redis进阶', link: '/docs/microservices/hello' },
        { text: 'elasticsearch', link: '/docs/microservices/hello' },


        
      ]
    }
  ]
}
