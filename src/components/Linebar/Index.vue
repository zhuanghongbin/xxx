<!-- line component -->
<template>
  <div class='line-component'>
    <hr :class="[size, status]"/>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'default' // 三种size: default small big
    },
    status: {
      type: String,
      default: 'default' // 五种状态： default success warning danger primary
    }
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/style/variables.scss";
// size
.small{
  height:3px;
  border-width: 3px;
  margin:8px 0;
}
.big{
  height:5px;
  border-width: 5px;
  margin:10px 0;
}
// color status
.success{
  border-color: $--color-success
}
.warning{
  border-color: $--color-warning
}
.danger{
  border-color: $--color-danger
}
.primary{
  border-color: $--color-primary
}
</style>
