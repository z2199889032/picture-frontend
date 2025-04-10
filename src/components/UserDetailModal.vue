<template>

  <a-modal
    v-model:visible="visible"
    title="个人详情"
    :footer="false"
    @cancel="closeModal"
    :width="650"
    :mask-style="{ backdropFilter: 'blur(10px)' }"
    :body-style="{ padding: '24px 0', position: 'relative', overflow: 'hidden' }"
    :title-style="{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }"
    class="meteor-modal"
    centered
  >
    <!-- 流星雨背景 -->
    <div class="meteor-container">
      <div class="meteor" v-for="n in 30" :key="n"></div>
    </div>
    <a-card style="width: 100%; border: none; box-shadow: none; background-color: transparent; position: relative; z-index: 2;">
      <a-spin :spinning="loading">
        <template v-if="loginUserStore.loginUser.id">
          <div class="info-container">
            <a-button
              type="primary"
              shape="circle"
              class="edit-button"
              @click="handleEdit"
            >
              <template #icon><EditOutlined /></template>
            </a-button>
            <div class="info-item">
              <span class="label">头像</span>
              <div class="avatar-wrapper">
                <a-avatar :size="80" :src="loginUserStore.loginUser.userAvatar" style="border: 3px solid #1890ff; box-shadow: 0 0 10px rgba(24, 144, 255, 0.3);" />
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
          <a-empty description="暂无用户信息" style="margin: 40px 0;" />
        </template>
      </a-spin>
    </a-card>
  </a-modal>

  <UserInfoEditModal
    v-model:visible="showEditModal"
    @success="handleEditSuccess"
  />
</template>

<script lang="ts" setup>
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { EditOutlined } from '@ant-design/icons-vue'
import UserInfoEditModal from './UserInfoEditModal.vue'

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

// 打开弹窗
const openModal = () => {
  visible.value = true
  // 确保每次打开模态框时都刷新用户信息
  loading.value = true
  loginUserStore.fetchLoginUser().finally(() => {
    loading.value = false
  })
}

// 关闭弹窗
const closeModal = () => {
  visible.value = false
}

// 编辑用户信息
const showEditModal = ref(false)
const handleEdit = () => {
  showEditModal.value = true
}

const handleEditSuccess = () => {
  // 刷新用户信息
  loading.value = true
  loginUserStore.fetchLoginUser().finally(() => {
    loading.value = false
  })
}

// 暴露函数给父组件
defineExpose({
  openModal,
})
</script>

<style scoped>
/* 流星雨容器样式 */
.meteor-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
  border-radius: 8px;
  background: linear-gradient(to bottom, rgba(15, 32, 39, 0.6), rgba(32, 58, 67, 0.6), rgba(44, 83, 100, 0.6));
  backdrop-filter: blur(8px);
}

/* 模态框流星雨样式 */
:deep(.meteor-modal .ant-modal-content) {
  background: linear-gradient(to bottom, rgba(15, 32, 39, 0.8), rgba(32, 58, 67, 0.8), rgba(44, 83, 100, 0.8));
  overflow: hidden;
  position: relative;
  z-index: 0;
}

:deep(.meteor-modal .ant-modal-header) {
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

:deep(.meteor-modal .ant-modal-title) {
  color: #1890ff !important;
}

:deep(.meteor-modal .ant-modal-close) {
  color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

:deep(.meteor-modal .ant-modal-close:hover) {
  color: #1890ff;
}

/* 确保流星雨效果覆盖整个模态框 */
:deep(.meteor-modal .ant-modal-content) {
  background: transparent !important;
}

:deep(.meteor-modal .ant-modal-content::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(15, 32, 39, 0.6), rgba(32, 58, 67, 0.6), rgba(44, 83, 100, 0.6));
  backdrop-filter: blur(8px);
  z-index: 0;
  border-radius: 8px;
}

/* 流星样式 */
.meteor {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  transform: rotate(-45deg);
  animation: meteor-fall linear infinite;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.9), 0 0 20px 2px rgba(70, 131, 180, 0.7), 0 0 30px 3px rgba(24, 144, 255, 0.5);
  border-radius: 50%;
  opacity: 1;
  z-index: 2;
}

/* 为每个流星设置不同的动画时间和位置 */
.meteor:nth-child(1) { top: 10%; left: 10%; animation-duration: 3s; animation-delay: 0s; }
.meteor:nth-child(2) { top: 15%; left: 20%; animation-duration: 4s; animation-delay: 0.2s; }
.meteor:nth-child(3) { top: 5%; left: 30%; animation-duration: 3.5s; animation-delay: 0.4s; }
.meteor:nth-child(4) { top: 20%; left: 40%; animation-duration: 4.5s; animation-delay: 0.6s; }
.meteor:nth-child(5) { top: 25%; left: 50%; animation-duration: 3.2s; animation-delay: 0.8s; }
.meteor:nth-child(6) { top: 30%; left: 60%; animation-duration: 4.2s; animation-delay: 1s; }
.meteor:nth-child(7) { top: 35%; left: 70%; animation-duration: 3.7s; animation-delay: 1.2s; }
.meteor:nth-child(8) { top: 40%; left: 80%; animation-duration: 4.7s; animation-delay: 1.4s; }
.meteor:nth-child(9) { top: 45%; left: 90%; animation-duration: 3.3s; animation-delay: 1.6s; }
.meteor:nth-child(10) { top: 50%; left: 5%; animation-duration: 4.3s; animation-delay: 1.8s; }
.meteor:nth-child(11) { top: 55%; left: 15%; animation-duration: 3.8s; animation-delay: 2s; }
.meteor:nth-child(12) { top: 60%; left: 25%; animation-duration: 4.8s; animation-delay: 2.2s; }
.meteor:nth-child(13) { top: 65%; left: 35%; animation-duration: 3.4s; animation-delay: 2.4s; }
.meteor:nth-child(14) { top: 70%; left: 45%; animation-duration: 4.4s; animation-delay: 2.6s; }
.meteor:nth-child(15) { top: 75%; left: 55%; animation-duration: 3.9s; animation-delay: 2.8s; }
.meteor:nth-child(16) { top: 80%; left: 65%; animation-duration: 4.9s; animation-delay: 3s; }
.meteor:nth-child(17) { top: 85%; left: 75%; animation-duration: 3.5s; animation-delay: 3.2s; }
.meteor:nth-child(18) { top: 90%; left: 85%; animation-duration: 4.5s; animation-delay: 3.4s; }
.meteor:nth-child(19) { top: 95%; left: 95%; animation-duration: 3.6s; animation-delay: 3.6s; }
.meteor:nth-child(20) { top: 5%; left: 5%; animation-duration: 4.6s; animation-delay: 3.8s; }
.meteor:nth-child(21) { top: 12%; left: 88%; animation-duration: 3.3s; animation-delay: 0.5s; }
.meteor:nth-child(22) { top: 22%; left: 78%; animation-duration: 4.1s; animation-delay: 1.1s; }
.meteor:nth-child(23) { top: 32%; left: 68%; animation-duration: 3.7s; animation-delay: 1.7s; }
.meteor:nth-child(24) { top: 42%; left: 58%; animation-duration: 4.3s; animation-delay: 2.3s; }
.meteor:nth-child(25) { top: 52%; left: 48%; animation-duration: 3.5s; animation-delay: 2.9s; }
.meteor:nth-child(26) { top: 62%; left: 38%; animation-duration: 4.2s; animation-delay: 3.5s; }
.meteor:nth-child(27) { top: 72%; left: 28%; animation-duration: 3.9s; animation-delay: 0.7s; }
.meteor:nth-child(28) { top: 82%; left: 18%; animation-duration: 4.5s; animation-delay: 1.3s; }
.meteor:nth-child(29) { top: 92%; left: 8%; animation-duration: 3.4s; animation-delay: 1.9s; }
.meteor:nth-child(30) { top: 8%; left: 92%; animation-duration: 4.0s; animation-delay: 2.5s; }

/* 流星动画 */
@keyframes meteor-fall {
  0% {
    transform: translateX(-150px) translateY(-150px) rotate(-45deg);
    opacity: 0;
    width: 4px;
    height: 4px;
  }
  3% {
    opacity: 0.3;
  }
  5% {
    opacity: 1;
  }
  15% {
    opacity: 1;
    width: 120px;
    height: 4px;
  }
  100% {
    transform: translateX(1000px) translateY(1000px) rotate(-45deg);
    opacity: 0;
    width: 300px;
    height: 4px;
  }
}

.info-container {
  padding: 16px 24px;
  background-color: rgba(15, 32, 39, 0.5);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(24, 144, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(5px);
  color: white;
}

.info-container:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.info-item {
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: background-color 0.2s ease;
}

.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.info-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.label {
  width: 100px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 15px;
  position: relative;
  padding-left: 12px;
}

.label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background-color: #1890ff;
  border-radius: 2px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.avatar-wrapper:hover {
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
  transform: scale(1.05);
}

.edit-button {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  transition: all 0.3s ease;
}

.edit-button:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
}
</style>
