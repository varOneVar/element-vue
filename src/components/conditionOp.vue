<template>
  <div class="condition-query flex-sb-c">
    <div class="flex-align-center">
      <section v-for="(F, i) of format" :key="i" class="condition-query__section flex-align-center">
        <el-tooltip v-if="F.tip" placement="top" :content="F.tip">
          <span :style="{minWidth:F.labelWidth}" class="condition-query__span bold">{{ F.title }}：</span>
        </el-tooltip>
        <span v-else :style="{minWidth:F.labelWidth}" class="condition-query__span bold">{{ F.title }}：</span>
        <template v-if="F.template==='slot'">
          <slot :item="F" :name="F.slotName" />
        </template>
        <template v-else-if="F.template === 'autoComplate'">
          <ZautoComplete
            v-model="data[F.value]"
            :list="F.list"
            :search-str="F.searchStr"
            :value-key="F.valueKey"
            :style="{width: F.width}"
            :disabled="F.disabled"
            :placeholder="F.placeholder||`请输入${F.title}`"
            clearable
          />
        </template>
        <template v-else-if="F.template==='select'">
          <Zselect
            v-model="data[F.value]"
            :placeholder="F.placeholder||`请选择${F.title}`"
            :option-list="F.list"
            :width="F.width"
            :mr="F.mr"
          />
        </template>
        <el-input
          v-else
          v-model.trim="data[F.value]"
          class="condition-query__input"
          :style="{width: F.width}"
          size="small"
          :placeholder="F.placeholder||`请输入${F.title}`"
          :prefix-icon="F.prefixIcon"
          clearable
        />
      </section>
      <slot name="leftBtn">
        <el-button v-if="isShowSearchBtn" class="btn" type="primary" size="small" @click="$emit('btnClick')">{{ btnStr }}</el-button>
        <el-button v-if="isShowCleanBtn" class="btn" type="primary" size="small" @click="$emit('cleanClick')">{{ clearBtnStr }}</el-button>
      </slot>
    </div>
    <slot name="right">
      <el-button v-if="isShowRightBtn" class="btn" type="primary" size="small" @click="$emit('rightBtnClick')">{{ rightBtnStr }}</el-button>
    </slot>
  </div>
</template>

<script>
import Zselect from '@/views/components/Zselect'
import ZautoComplete from '@/views/components/ZautoComplete'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    format: {
      type: Array,
      required: true
    },
    btnStr: {
      type: String,
      default: '查询'
    },
    isShowSearchBtn: {
      type: Boolean,
      default: true
    },
    isShowRightBtn: {
      type: Boolean,
      default: true
    },
    rightBtnStr: {
      type: String,
      default: '新增'
    },
    clearBtnStr: {
      type: String,
      default: '重置'
    },
    isShowCleanBtn: {
      type: Boolean,
      default: false
    }
  },
  components: { Zselect, ZautoComplete }
}
</script>

<style lang="scss" scoped>
.condition-query {
  margin-bottom: 10px;
  flex-wrap: wrap;
  &__section {
    margin-right: 16px;
    margin-bottom: 16px;
  }
  &__span {
    margin-right: 8px;
    min-width: 40px;
  }
  &__select,
  &__input {
    width: 160px;
  }
  &__button {
    margin-left: 10px;
  }
}
.btn {
  margin-bottom: 16px;
}
</style>
