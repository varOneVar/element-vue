export default {
  data() {
    return {
      paginationObj: { // 分页数据
        total: 0,
        page_size: 10,
        page_num: 1
      }
    }
  },
  methods: {
    // 每页展示数量修改
    sizeChange(size) {
      this.paginationObj.page_num = 1
      this.paginationObj.page_size = size
      this.getTableData()
    },
    // 页面修改
    currentChange(page) {
      this.paginationObj.page_num = page
      this.getTableData()
    }
  }
}
