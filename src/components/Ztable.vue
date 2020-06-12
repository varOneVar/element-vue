<template>
  <div class="z-table">
    <el-table
      ref="tabel"
      v-bind="$attrs"
      :data="tableData"
      size="small"
      style="width: 100%"
      v-on="$listeners"
    >
      <el-table-column
        v-if="isShowIndexCol"
        label="编号"
        type="index"
        width="50"
      />
      <el-table-column
        v-if="isShowCheck"
        :is-show-check="isShowCheck"
        type="selection"
        width="55"
      />
      <template v-for="(column, idx) in tableFormat">
        <el-table-column
          v-if="!column.hidden"
          :key="idx"
          :prop="column.prop"
          :header-align="column.headerAlign"
          :show-overflow-tooltip="true"
          :label="column.label"
          :min-width="column.minWidth"
          :width="column.width"
          v-bind="column.other"
        >
          <!-- slot -->
          <template v-if="column.template==='slot'" #default="{row,column:col}">
            <slot :name="column.slotName" :row="row" :column="col" />
          </template>
          <!-- 默认 -->
          <template v-else #default="{row,column:col}">
            <svg-icon v-if="column.svg" :icon-class="column.svg" classs="table-item-icon" />
            <i v-if="column.iconfont" :class="column.iconfont" classs="table-item-icon" />
            <span>{{ row[col.property]||'null' }}</span>
          </template>
        </el-table-column>
      </template>
      <!-- 操作 -->
      <el-table-column
        v-if="isShowOpions"
        :label="optionsLabel"
        header-align="center"
        fixed="right"
        class="options-col"
        :width="optionsWidth"
      >
        <template #default="{row, column}">
          <slot name="options" :row="row" :column="column" />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination flex-align-center">
      <el-pagination
        v-if="isShowPagination"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="paginationObj.page_size"
        :current-page="paginationObj.page_num"
        ::page-sizes="[10, 20, 30, 40]"
        :total="paginationObj.total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: { // table数据
      type: Array,
      required: true
    },
    /**
     * prop：必需
     * label：必需
     * template: 决定column的种类
     * width：宽度
     */
    tableFormat: { // table格式
      type: Array,
      required: true
    },
    isShowIndexCol: { // 是否显示编号列
      type: Boolean,
      default: false
    },
    isShowOpions: { // 是否显示操作列
      type: Boolean,
      default: true
    },
    optionsLabel: { // 操作的label
      type: String,
      default: '操作'
    },
    optionsWidth: { // 操作的宽度
      type: [String, Number],
      default: '160'
    },
    isShowCheck: { // 是否显示多选
      type: Boolean,
      default: false
    },
    isShowPagination: { // 是否显示分页
      type: Boolean,
      default: true
    },
    paginationObj: { // 对象必须包含total, page_size、page_num参数
      type: Object,
      default() {
        return {
          total: 0,
          page_size: 10,
          page_num: 1
        }
      },
      validator(v) {
        if (v === null) throw Error('传参错误，不能为null，需传入对象')
        const keys = Object.keys(v)
        return ['total', 'page_size', 'page_num'].every(key => keys.includes(key))
      }
    }
  },
  methods: {
    toggleSelection() {
      this.tableData.forEach(row => {
        this.$refs.tabel.toggleRowSelection(row)
      })
    },
    clearSelection() {
      this.$refs.tabel.clearSelection()
    },
    sizeChange(page) {
      this.$emit('sizeChange', page)
    },
    currentChange(page) {
      this.$emit('currentChange', page)
    }
  }
}
</script>

<style lang="scss" scoped>
@include utils-pierce {
  .el-table .el-table__header th{
    background-color: #efefef;
    color: #282828;
  }
}
.pagination {
  justify-content: flex-end;
  padding: 16px 0px;
}
</style>
