<template>
  <el-tooltip class="item" effect="dark" content="Top Left 提示文字" :placement="placement">
    <div slot="content">{{text}}</div>
    <slot>
      <i class="iconfont icon-message_fill"></i>
    </slot>
  </el-tooltip>
</template>
<script>
export default {
  props: {
    placement: {
      type: String,
      default: 'top-start'
    },
    text: {
      type: String,
      default: '提示信息'
    }
  }
}
</script>
