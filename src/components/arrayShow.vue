<template>
  <div class="array-show">
    <Ztable
      :table-data="list"
      options-label="操作"
      max-height="670px"
      :is-show-pagination="false"
      :table-format="tableFormat"
    >
      <template #options="{row,column}">
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
      <objectShow v-if="dialogVisible" :config="itemConfig" :data="subData" />
      <footer class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">关 闭</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
import Ztable from './Ztable'
export default {
  name: 'ArrayShow',
  props: {
    list: {
      type: Array,
      required: true
    },
    itemConfig: { // 查看详情完成配置
      type: Object,
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
    }
  },
  created() {
    if (this.showCols.length) {
      this.showCols.forEach(v => {
        const obj = {
          prop: v,
          label: this.itemConfig[v]
        }
        this.tableFormat.push(obj)
      })
    } else {
      for (const [key, value] of Object.entries(this.itemConfig)) {
        if (typeof value === 'string') {
          const obj = {
            prop: key,
            label: value
          }
          this.tableFormat.push(obj)
        }
      }
    }
  },
  components: { Ztable,
    objectShow: () => import('./objectShow')
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>
