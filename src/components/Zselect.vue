<!-- 下拉选择 -->
<template>
  <el-select
    v-bind="$attrs"
    :data-da="width"
    :style="{width, marginRight: `${mr}px`}"
    v-on="$listeners"
  >
    <el-option
      v-for="item of optionList"
      :key="item[valueStr]"
      :label="item[labelStr]"
      :value="item[valueStr]"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    optionList: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: String,
      default: ''
    },
    mr: {
      type: [String, Number],
      default: 10
    },
    labelStr: {
      type: String,
      default: 'label'
    },
    valueStr: {
      type: String,
      default: 'value'
    }
  }
}
</script>

