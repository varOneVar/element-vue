<template>
  <el-form
    ref="form"
    :model="formModel"
    v-bind="$attrs"
    :rules="rules"
    :label-width="labelWidth"
    v-on="$listeners"
  >
    <template v-for="(v, idx) of formFormat">
      <div v-if="v.template === 'object'" :key="idx" class="flex-align-center flex-wrap">
        <ZformItem
          v-for="single of v.children"
          :key="single.value"
          :style="{marginRight:(v.marginRight||'20px')}"
          :form-model="formModel"
          :v="single"
        >
          <template v-for="slot of objectSlotList" v-slot:[slot.slotName||slot.suffix]="{item: vs}">
            <slot v-if="slot.value===single.value" :name="slot.slotName" :item="vs" />
          </template>
        </ZformItem>
      </div>
      <ZformItem v-else :key="idx" :form-model="formModel" :v="v">
        <template v-for="slot of slotList" v-slot:[slot.slotName||slot.suffix]="{item: vs}">
          <slot v-if="slot.value===v.value" :name="slot.slotName" :item="vs" />
        </template>
      </ZformItem>
    </template>
  </el-form>
</template>

<script>
import ZformItem from './ZformItem'
export default {
  name: 'Zform',
  props: {
    formFormat: { // 格式
      type: Array,
      default() {
        return []
      }
    },
    formModel: { // 结果
      type: Object,
      default() {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    resetFields() {
      this.$refs.form.resetFields()
    },
    inner_disposeRules(list = []) {
      let resule = {}
      list.forEach(v => {
        const key = v.value
        if (key) {
          resule[key] = [{
            required: !v.noRequired,
            message: v.message || `请输入${v.label}`,
            trigger: v.trigger || 'blur'
          }]
        } else if (v.children) {
          const b = this.inner_disposeRules(v.children)
          resule = { ...b }
        }
      })
      return resule
    }
  },
  computed: {
    rules() {
      return this.inner_disposeRules(this.formFormat)
    },
    slotList() {
      if (!this.formFormat) return []
      return this.formFormat.filter(v => v.template === 'slot' || v.suffix)
    },
    objectSlotList() {
      if (!this.formFormat) return []
      let result = []
      this.formFormat.forEach(v => {
        if (v.children) {
          const arr = v.children.filter(c => c.template === 'slot' || c.suffix)
          result = [...result, ...arr]
        }
      })
      return result
    }
  },
  components: { ZformItem }
}
</script>

