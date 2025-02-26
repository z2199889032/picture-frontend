<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <BasicLayout />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
// import { healthUsingGet } from '@/api/mainController'
// import {useLoginUserStore} from '@/stores/useLoginUserStore'
// const loginUserStore = useLoginUserStore()
// loginUserStore.fetchLoginUser()
//已改为校验文件中获取
// healthUsingGet().then((res) => {
//   console.log(res)
// })
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import {ref} from 'vue'
dayjs.locale('zh-cn')
const locale = ref(zhCN)

</script>


<style scoped>

</style>
