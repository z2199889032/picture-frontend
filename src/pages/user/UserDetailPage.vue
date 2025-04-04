<template>
  <div id="userDetailPage" v-if="visible" @click.self="closeModal">
    <div class="modal-container">
      <a-card title="个人详情" style="width: 100%; max-width: 800px; margin: 20px auto">
        <a-spin :spinning="loading">
          <template v-if="loginUserStore.loginUser.id">
            <div class="info-container">
              <div class="info-item">
                <span class="label">头像</span>
                <div class="avatar-wrapper">
                  <a-avatar :size="64" :src="loginUserStore.loginUser.userAvatar" />
                </div>
              </div>
              <div class="info-item">
                <span class="label">用户名</span>
                <span>{{ loginUserStore.loginUser.userName }}</span>
              </div>
              <div class="info-item">
                <span class="label">账号</span>
                <span>{{ loginUserStore.loginUser.userAccount }}</span>
              </div>
              <div class="info-item">
                <span class="label">角色</span>
                <span>{{ loginUserStore.loginUser.userRole === 'admin' ? '管理员' : '普通用户' }}</span>
              </div>
              <div class="info-item">
                <span class="label">创建时间</span>
                <span>{{ loginUserStore.loginUser.createTime }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <a-empty description="暂无用户信息" />
          </template>
        </a-spin>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'

const loginUserStore = useLoginUserStore()
const loading = ref(true)
const visible = ref(false)

// 在组件挂载时获取用户信息
onMounted(async () => {
  try {
    await loginUserStore.fetchLoginUser()
  } catch (error) {
    message.error('获取用户信息失败')
  } finally {
    loading.value = false
  }
})

// 打开模态框
const openModal = () => {
  visible.value = true
  // 确保每次打开模态框时都刷新用户信息
  loading.value = true
  loginUserStore.fetchLoginUser().finally(() => {
    loading.value = false
  })
}

// 关闭模态框
const closeModal = () => {
  visible.value = false
}

// 暴露函数给父组件
defineExpose({
  openModal,
  closeModal
})
</script>

<style scoped>
#userDetailPage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
  overflow-y: auto;
}

.modal-container {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-container {
  padding: 0 16px;
}

.info-item {
  display: flex;
  margin-bottom: 24px;
  align-items: center;
}

.label {
  width: 80px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: normal;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
}

/* 卡片样式优化 */
:deep(.ant-card) {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
