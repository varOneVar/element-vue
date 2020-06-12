<template>
  <div class="array-show">
    <Ztable
      :table-data="list"
      options-label="操作"
      max-height="670px"
      :is-show-pagination="false"
      :table-format="tableFormat"
    >
      <template #options="{row}">
        <div class="text-center">
          <span class="blue pointer" @click="checkDetail(row)">查看详情</span>
        </div>
      </template>
    </Ztable>
    <!-- 弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :title="dialogTitle"
      :append-to-body="true"
      top="50px"
      width="80vw"
    >
      <objectEdit v-if="dialogVisible" ref="form" :form-format="formFormat" :form-data="subData" label-width="130px" />
      <footer class="dialog-footer">
        <el-button size="small" @click="close">关 闭</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
// import Ztable from './Ztable'
export default {
  name: 'ArrayEdit',
  props: {
    list: {
      type: Array,
      required: true
    },
    formFormat: { // 查看详情完成配置
      type: Array,
      required: true
    },
    showCols: { // table展示的条目
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false, // 弹窗显隐
      subData: {}, // 弹窗数据
      tableFormat: [],
      dialogTitle: '查看详情'
    }
  },
  methods: {
    // 打开弹窗
    checkDetail(row) {
      this.subData = row
      this.dialogVisible = true
    },
    close() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogVisible = false
        } else {
          this.$message.error('必填项请填写完整！')
          return false
        }
      })
    }
  },
  created() {
    if (this.showCols.length) {
      const arr = this.showCols.slice()
      this.formFormat.some((v, i) => {
        const index = arr.indexOf(v.value)
        if (index > -1) {
          const obj = {
            prop: v.value,
            label: v.label
          }
          this.tableFormat.push(obj)
          arr.splice(index, 1)
        }
        return !arr.length
      })
    } else {
      this.formFormat.some((v, i) => {
        const obj = {
          prop: v.value,
          label: v.label
        }
        this.tableFormat.push(obj)
        return i > 9
      })
    }
  },
  components: {
    Ztable: () => import('./Ztable'),
    objectEdit: () => import('./objectEdit')
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
