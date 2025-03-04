<template>
  <!-- 主要布局容器 -->
  <div id="basicLayout">
    <!-- 使用Ant Design的Layout组件构建页面布局 -->
    <a-layout style="min-height: 100vh">
      <!-- 头部区域 -->
      <a-layout-header class="header">
        <!-- 引入全局头部组件 -->
        <GlobalHeader />
      </a-layout-header>
      <!-- 内容区域 -->
      <a-layout-content class="content">
        <!-- 使用Vue Router的View组件作为路由出口 -->
        <router-view />
      </a-layout-content>
      <!-- 底部区域 -->
      <a-layout-footer class="footer">
        <!-- 云影图库的版权信息和开发者链接 -->
        <a href="https://github.com/z2199889032" target="_blank">
          云影图库 ©2023 Created by z2199889032
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
// 引入全局头部组件
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style scoped>
/* 布局的头部样式 */
#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}

/* 布局的内容样式 */
#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 20px;
}

/* 布局的底部样式 */
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
