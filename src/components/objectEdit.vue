<template>
  <el-form
    ref="form"
    v-bind="$attrs"
    :rules="rules"
    class="form flex"
    :model="formData"
    v-on="$listeners"
  >
    <template v-for="item of formFormat">
      <el-form-item
        v-if="!item.hidden"
        :key="item.value"
        class="form__item"
        :label="item.label"
        :prop="item.value"
      >
        <template v-if="item.template==='slot'" />
        <template v-else-if="item.template==='array'||item.template==='object'">
          <template v-if="item.template==='array'&&!formData[item.value]">
            暂无数据
          </template>
          <template v-else-if="item.template==='array'&&formData[item.value]&&formData[item.value].length===0">
            暂无数据
          </template>
          <el-button v-else type="primary" size="small" @click="dialogClick(item)">修改详情</el-button>
        </template>
        <template v-else-if="item.template==='date'">
          <el-date-picker
            v-model="formData[item.value]"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          />
        </template>
        <template v-else-if="item.template==='textarea'">
          <el-input
            v-model.trim="formData[item.value]"
            type="textarea"
            :rows="3"
            :placeholder="item.message"
            clearable
            size="small"
          />
        </template>
        <template v-else-if="item.template==='tooltipInput'">
          <el-tooltip placement="right" :content="item.extra.tooltip">
            <el-input
              v-model.trim="formData[item.value]"
              :placeholder="item.message"
              clearable
              size="small"
            />
          </el-tooltip>
        </template>
        <template v-else-if="item.template==='onlyShow'">
          <el-tag size="small">{{ formData[item.value] }}</el-tag>
        </template>
        <template v-else>
          <el-input
            v-model.trim="formData[item.value]"
            :placeholder="item.message"
            clearable
            size="small"
          />
        </template>
      </el-form-item>
    </template>
    <!-- 弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :title="dialogTitle"
      :append-to-body="true"
      top="50px"
      width="80vw"
    >
      <template v-if="dialogVisible">
        <objectEdit v-if="isObjectData" :form-format="subConfig" :form-data="subData" label-width="130px" />
        <arrayEdit v-else :form-format="subConfig" :list="subList" :show-cols="subListCols" />
      </template>
      <footer class="dialog-footer">
        <el-button size="small" @click="close">关 闭</el-button>
      </footer>
    </el-dialog>
  </el-form>
</template>

<script>
export default {
  name: 'ObjectEdit',
  props: {
    /**
     * value, label
     */
    formFormat: { // form格式规范
      type: Array,
      required: true
    },
    formData: {
      type: Object,
      required: true // form数据源
    }
  },
  data() {
    return {
      dialogVisible: false, // 弹窗显隐
      dialogTitle: '', // 弹窗title
      isObjectData: true, // 弹窗内容是否是对象
      subConfig: {}, // 弹窗配置
      subData: {}, // 弹窗数据object
      subList: [], // 弹窗数据array
      subListCols: [] // 弹窗数组显示的cols
    }
  },
  methods: {
    dialogClick(row) {
      this.subConfig = row.extra.innerFormat
      this.dialogTitle = row.label
      if (row.template === 'array') {
        this.subListCols = row.extra.showCols
        this.isObjectData = false
        this.subList = this.formData[row.value]
      } else {
        this.isObjectData = true
        this.subData = this.formData[row.value]
      }
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
    },
    validate(fn) {
      return this.$refs.form.validate(valid => {
        fn(valid)
      })
    }
  },
  computed: {
    rules() {
      const result = {}
      this.formFormat.forEach(v => {
        result[v.value] = [{
          message: v.message,
          required: !v.noRule,
          trigger: v.trigger ? v.trigger : 'blur'
        }]
      })
      return result
    }
  },
  components: {
    arrayEdit: () => import('./arrayEdit')
  }
}
</script>

<style lang="scss" scoped>
.form {
  flex-wrap: wrap;
  &__item {
    width: 50%;
    max-width: 338px;
    min-width: 230px;
  }
}
</style>
