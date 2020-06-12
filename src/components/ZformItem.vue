<!-- form item -->
<template>
  <el-form-item
    :label="v.label"
    :prop="v.value"
    :label-width="v.labelWidth"
    :rules="v.rules"
  >
    <template v-if="v.template === 'slot'">
      <slot :name="v.slotName" :item="v" />
    </template>
    <template v-else-if="v.template === 'textarea'">
      <el-input
        v-model="formModel[v.value]"
        class="textarea"
        size="small"
        :rows="v.rows||4"
        type="textarea"
        :style="{width: v.width}"
        clearable
        :placeholder="v.message||`请输入${v.label}`"
      />
    </template>
    <template v-else-if="v.template === 'number'">
      <el-input-number
        v-model.trim="formModel[v.value]"
        class="number-input"
        size="small"
        :style="{width: v.width}"
        controls-position="right"
        :disabled="v.disabled"
        :min="v.min==null?1:v.min"
        :max="v.max"
        clearable
        :placeholder="v.message||`请输入${v.label}`"
      />
    </template>
    <template v-else-if="v.template === 'singleDate'">
      <el-date-picker
        v-model="formModel[v.value]"
        :style="{width: v.width}"
        type="date"
        placeholder="选择日期"
      />
    </template>
    <template v-else-if="v.template === 'checkBox'">
      <el-checkbox-group v-model="formModel[v.value]">
        <el-checkbox
          v-for="check of v.list"
          :key="check.value"
          class="check"
          :class="{block:v.isColum}"
          :disabled="check.disabled"
          :label="check.value"
        >{{ check.label }}</el-checkbox>
      </el-checkbox-group>
    </template>
    <template v-else-if="v.template === 'select'">
      <Zselect
        v-model="formModel[v.value]"
        :placeholder="v.message||`请选择${v.label}`"
        :option-list="v.list"
        :width="v.width"
        :mr="v.mr"
      />
    </template>
    <template v-else-if="v.template === 'autoComplate'">
      <ZautoComplete
        v-model="formModel[v.value]"
        :list="v.list"
        :search-str="v.searchStr"
        :value-key="v.valueKey"
        :style="{width: v.width}"
        :disabled="v.disabled"
        :placeholder="v.message||`请选择${v.label}`"
        clearable
      />
    </template>
    <template v-else-if="v.template === 'radio'">
      <el-radio-group v-model="formModel[v.value]" :placeholder="v.message||`请选择${v.label}`">
        <el-radio
          v-for="radio of v.list"
          :key="radio.value"
          :label="radio.value"
        >{{ radio.label }}</el-radio>
      </el-radio-group>
    </template>
    <template v-else>
      <el-input
        v-model.trim="formModel[v.value]"
        class="input"
        size="small"
        :maxlength="v.maxlength"
        :show-word-limit="v.showWordLimit"
        :style="{width: v.width}"
        :disabled="v.disabled"
        clearable
        :placeholder="v.message||`请输入${v.label}`"
      />
    </template>
    <template v-if="v.suffix">
      <slot :name="v.suffix" />
    </template>
  </el-form-item>
</template>

<script>
import Zselect from '@/views/components/Zselect'
import ZautoComplete from '@/views/components/ZautoComplete'
export default {
  props: {
    formModel: {
      type: Object,
      default() {
        return {}
      }
    },
    v: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    v: {
      handler(v) {
        if (v.template === 'select') {
          console.log(v, v.list, 'formitem')
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: { Zselect, ZautoComplete }
}
</script>
<style lang="stylus">
  .check {
    margin-right: 20px;
  }
  .block {
    display: block;
  }
</style>
