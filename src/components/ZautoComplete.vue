<!-- 单词联想输入框 -->
<template>
  <el-autocomplete
    v-bind="$attrs"
    :fetch-suggestions="querySearchAsync"
    v-on="$listeners"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    searchStr: {
      type: String,
      default: 'value'
    }
  },
  methods: {
    querySearchAsync(searchWord, cb) {
      const result = searchWord
        ? this.list.filter(this.createStateFilter(searchWord))
        : this.list.slice(0, 800)
      cb(result)
    },
    createStateFilter(queryString) {
      return (state) => {
        return ~(state[this.searchStr].toLowerCase().indexOf(queryString.toLowerCase()))
      }
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
