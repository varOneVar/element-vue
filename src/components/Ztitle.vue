<!-- 标题 -->
<template>
  <div class="flex-sb-c ztitle">
    <div class="left">
      <span
        class="title"
        :style="{fontSize:`${fontSize}px`, fontWeight:bold?'bold':'500', ...titleStyle}"
      >{{ title }}</span>
      <span v-if="subTitle" class="sub-title" :style="subTitleStyle">{{ subTitle }}</span>
    </div>
    <slot name="right" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '标题'
    },
    subTitle: {
      type: String,
      default: ''
    },
    titleStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    subTitleStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    fontSize: {
      type: [String, Number],
      default: '18'
    },
    bold: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang='stylus' scoped>
.ztitle {
  border-left: 4px solid #0071CE;
  text-align: left;
  line-height 1.4286
  padding: 0 8px;
}
.sub-title {
  font-size: 80%;
}
</style>
