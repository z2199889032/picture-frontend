<template>
  <a-modal
    v-model:visible="visible"
    title="编辑个人信息"
    @ok="handleOk"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading"
  >
    <a-form :model="formState" name="userInfoForm">
      <a-form-item label="用户名" name="userName">
        <a-input v-model:value="formState.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="头像" name="userAvatar">
        <a-input v-model:value="formState.userAvatar" placeholder="请输入头像URL" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore'

const loginUserStore = useLoginUserStore()

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'success'): void
}>()

const confirmLoading = ref(false)

const formState = reactive({
  userName: loginUserStore.loginUser.userName,
  userAvatar: loginUserStore.loginUser.userAvatar,
})

const handleOk = async () => {
  confirmLoading.value = true
  try {
    loginUserStore.setLoginUser({
      ...loginUserStore.loginUser,
      userName: formState.userName,
      userAvatar: formState.userAvatar,
    })
    message.success('更新成功')
    emit('success')
    emit('update:visible', false)
  } catch (error) {
    message.error('更新失败')
  } finally {
    confirmLoading.value = false
  }
}

const handleCancel = () => {
  emit('update:visible', false)
}
</script>
