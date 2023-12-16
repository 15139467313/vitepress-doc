<script lang="ts" setup>
  // code……
</script>

<template>
  <f-main>
    <f-text align="center" line-height="70px" bold block size="25px">
         小陈子的开发文档
    </f-text>

    <f-text align="center"  class="texts">
      <f-button round type="primary" class="start" href="/docs/hello.html" style="margin: 20px;">
        😊 快速开始
      </f-button>
      <f-button round type="primary" class="start" href="/docs/microservices/microservices.html" style="margin: 20px;">
        🚀 微服务快速开始(学习版本)
      </f-button>
      <f-button round href="https://gitee.com/wenroudoubinanhai/czh-uni.git" target="_blank">
        Gitee
      </f-button>
    </f-text>

    <f-divider margin="40px" color="#eef" />

    <f-text bold block>欢迎使用</f-text>
    <f-text block>⚡ 欢迎使用 wp-uniHello</f-text>
    <f-text block>🌲 基于 uni-app + tm-vuetify + Halo 1.x API</f-text>


    <f-divider margin="40px" color="#eef" />

    <f-text bold block>特性</f-text>
    <f-text>📌 开箱即用</f-text>
    <f-text>
      🚀 和
      <f-link href="https://github.com/FightingDesign/fighting-design" type="primary">
        uni-halo
      </f-link>
      完美结合
    </f-text>
    <f-text>💪最新流行技术栈基于 uni-app 跨端技术栈开发</f-text>
    <f-text>🐆 较标准的代码规范代码规范完善、结构清晰，易于上手二次开发</f-text>
    <f-text>🖍️ 可多端编译多端编译，一套源码实现多个应用端编译</f-text>
    <f-text>✔️ 漂亮的UI风格精心设计前端和后台交互，更贴合用户审美</f-text>
    <f-text>🚩 后台管理功能相对完善的后台管理功能，与PC端相差无几</f-text>
    <f-text>📃 第三方组件库支持</f-text>
  </f-main>
</template>

<style scoped>
.f-main {
  max-width: 680px;
  margin: 10px auto;
  box-sizing: border-box;
  padding: 40px;
  padding-bottom: 0;
}

.f-button-default {
  margin-left: 10px;
}

.f-text {
  display: block;
  line-height: 40px;
}
</style>
