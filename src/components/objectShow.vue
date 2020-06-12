<template>
  <div class="object-show flex">
    <p
      v-for="(value, key) of data"
      :key="key"
      class="object-show__p"
    >
      <!-- config配置文件中值是array需要弹窗打开子项，子项是数组的，array -->
      <template v-if="typeCheck(config[key])==='Array'">
        <el-tag size="small" type="primary">{{ config[key][0] }}</el-tag>
        <el-button v-if="value&&value.length" size="mini" @click="arrayClick(config[key][0], value, config[key][1], config[key][2])">查看详情</el-button>
        <span v-else>{{ value||'null' }}</span>
      </template>
      <!-- config配置文件中值是object需要弹窗打开子项，子项也是对象的，object -->
      <template v-else-if="typeCheck(config[key])==='Object'&&config[key]._object_">
        <el-tag size="small" type="primary">{{ config[key]._object_ }}</el-tag>
        <el-button v-if="value" size="mini" @click="objectClick(config[key]._object_, value, config[key]._value_)">查看详情</el-button>
        <span v-else>{{ value||'null' }}</span>
      </template>
      <!-- config配置文件中值是object需要hover显示注释的，object -->
      <template v-else-if="typeCheck(config[key])==='Object'&&config[key].d">
        <el-tooltip effect="dark" :content="config[key].t" placement="top">
          <el-tag size="small" type="primary">{{ config[key].d }}</el-tag>
        </el-tooltip>
        <span>{{ value||'null' }}</span>
      </template>
      <!-- config配置文件中值是对照中文的，string -->
      <template v-else-if="typeCheck(config[key])==='String'">
        <el-tag size="small" type="primary">{{ config[key] }}</el-tag>
        <span>{{ value||'null' }}</span>
      </template>
      <!-- config配置文件中没配置的，没有中文，原样输出 -->
      <template v-else>
        <el-tag size="small" type="primary">{{ key }}</el-tag>
        <span v-if="typeof value==='object'">{{ JSON.stringify(value) }}</span>
        <span v-else>{{ value || 'null' }}</span>
      </template>
    </p>
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
        <objectShow v-if="isObjectData" :config="subConfig" :data="subData" />
        <arrayShow v-else :item-config="subConfig" :list="subList" :show-cols="subListCols" />
      </template>
      <footer class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">关 闭</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
import { typeCheck } from '@/utils'
export default {
  name: 'ObjectShow',
  props: {
    config: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
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
    arrayClick(title, list, subConfig, subListCols) {
      this.dialogTitle = title
      this.subConfig = subConfig
      this.subList = list
      this.subListCols = subListCols
      this.isObjectData = false
      this.dialogVisible = true
    },
    objectClick(title, data, subConfig) {
      this.dialogTitle = title
      this.subConfig = subConfig
      this.subData = data
      this.isObjectData = true
      this.dialogVisible = true
    },
    typeCheck
  },
  components: {
    arrayShow: () => import('./arrayShow')
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
.object-show {
  flex-wrap: wrap;
  &__p {
    width: 50%;
    max-width: 338px;
    min-width: 230px;
  }
}
</style>
