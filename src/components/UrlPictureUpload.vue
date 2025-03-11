<template>
  <div class="url-picture-upload">
    <a-input-group compact>
      <a-input
        v-model:value="fileUrl"
        style="width: calc(100% - 120px)"
        placeholder="请输入图片地址"
      />
      <a-button type="primary" style="width: 120px" :loading="loading" @click="handleUpload">
        提交
      </a-button>
    </a-input-group>
    <div class="img-wrapper">
      <img v-if="picture?.url" :src="picture?.url" alt="avatar" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { uploadPictureByUrlUsingPost, uploadPictureUsingPost } from '@/api/pictureController'

interface Props {
  picture?: API.PictureVO
  spaceId?: number
  onSuccess?: (newPicture: API.PictureVO) => void
}

const props = defineProps<Props>()
const fileUrl = ref<string>()
const loading = ref<boolean>(false)

/**
 * 上传图片
 */
const handleUpload = async ({ file }: any) => {
  loading.value = true

  try {
    // 构建上传参数
    const params: API.PictureUploadRequest = props.picture ? { id: props.picture.id } : {}
    params.spaceId = props.spaceId

    // 调用上传接口
    const res = await uploadPictureUsingPost(params, {}, file)

    if (res.data.code === 0 && res.data.data) {
      // 上传成功
      message.success('图片上传成功')

      // 将上传成功的图片信息传递给父组件
      props.onSuccess?.(res.data.data)
    } else {
      // 上传失败
      message.error('图片上传失败，' + res.data.message)
    }
  } catch (error) {
    // 捕获上传错误
    console.error('图片上传失败', error)
    message.error('图片上传失败，' + error.message)
  }

  loading.value = false
}
</script>
<style scoped>
.url-picture-upload {
  margin-bottom: 16px;
}

.url-picture-upload img {
  max-width: 100%;
  max-height: 480px;
}

.url-picture-upload .img-wrapper {
  text-align: center;
  margin-top: 16px;
}
</style>
