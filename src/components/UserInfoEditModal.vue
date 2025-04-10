<template>
  <a-modal
    :visible="visible"
    @update:visible="(val) => emit('update:visible', val)"
    title="编辑个人信息"
    @ok="handleOk"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading"
    :centered="true"
  >
    <a-form :model="formState" name="userInfoForm">
      <a-form-item label="用户名" name="userName">
        <a-input v-model:value="formState.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="头像" name="userAvatar">
        <a-upload
          v-model:file-list="fileList"
          :max-count="1"
          :before-upload="beforeUpload"
        >
          <a-button>选择头像</a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        label="旧密码"
        name="oldPassword"
        :rules="[{ required: formState.newPassword, message: '请输入旧密码' }]"
      >
        <a-input-password v-model:value="formState.oldPassword" placeholder="请输入旧密码" />
      </a-form-item>
      <a-form-item
        label="新密码"
        name="newPassword"
        :rules="[{ min: 8, message: '密码长度不能小于 8 位' }]"
      >
        <a-input-password v-model:value="formState.newPassword" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="[
          { required: formState.newPassword, message: '请确认新密码' },
          { validator: validateCheckPassword }
        ]"
      >
        <a-input-password v-model:value="formState.checkPassword" placeholder="请确认新密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { updateMyInfoUsingPost } from '@/api/userController'
import type { UploadProps } from 'ant-design-vue'

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
  userName: '',
  oldPassword: '',
  newPassword: '',
  checkPassword: ''
})

const fileList = ref([])

// 监听visible属性，当模态框打开时更新表单数据
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    formState.userName = loginUserStore.loginUser.userName || ''
    formState.userAvatar = ''
    formState.oldPassword = ''
    formState.newPassword = ''
    formState.checkPassword = ''
  }
})

const validateCheckPassword = async (_rule: any, value: string) => {
  if (value && value !== formState.newPassword) {
    return Promise.reject('两次输入的密码不一致')
  }
  return Promise.resolve()
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('只能上传图片文件！')
  }
  return false
}

const handleOk = async () => {
  confirmLoading.value = true
  try {
    // 如果用户名为空，使用当前登录用户的用户名
    const userName = formState.userName.trim() || loginUserStore.loginUser?.userName || ''
    if (!userName) {
      message.error('用户名不能为空')
      confirmLoading.value = false
      return
    }
    const res = await updateMyInfoUsingPost({
      userName,
      userPassword: formState.newPassword || undefined,
      oldUserPassword: formState.oldPassword || undefined
    }, fileList.value[0]?.originFileObj)
    if (res.data.code === 0 && res.data.data) {
      loginUserStore.setLoginUser({
        ...loginUserStore.loginUser,
        userName: formState.userName,
        userAvatar: formState.userAvatar,
      })
      message.success('更新成功')
      emit('success')
      emit('update:visible', false)
    } else {
      message.error('更新失败：' + res.data.message)
    }
  } catch (error) {
    message.error('更新失败，请稍后重试')
  } finally {
    confirmLoading.value = false
  }
}

const handleCancel = () => {
  emit('update:visible', false)
}
</script>

<style scoped>
.user-info-edit-modal {
  max-width: 500px;
  margin: 0 auto;
}
</style>
