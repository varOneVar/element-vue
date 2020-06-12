<!-- 城市级联选择器 -->
<template>
  <div class="flex-align-center flex-wrap">
    <div
      v-for="(select, idx) of selectList"
      :key="select.value"
      class="select-box"
    >
      <span v-if="select.label" class="label">{{ select.label }}</span>
      <el-select
        v-model="data[select.value]"
        class="select"
        placeholder="请选择"
        :style="{width:select.width}"
        @change="Fn_selectChange($event, idx, select)"
      >
        <el-option
          v-for="option of selectData[select.value]"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    selectList: {
      type: Array,
      default() {
        return []
      }
    },
    selectData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    Fn_selectChange(v, idx, key) {
      console.log(v, idx, key)
    }
  },
  created() {

  }
}
</script>
<style lang='stylus' scoped>
.select-box {
  margin-right: 20px;
}
.label {
  margin-right: 10px;
}
</style>
