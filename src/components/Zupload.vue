<!-- 上传图片 -->
<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    :drag="fileType!=='img'"
    :accept="accept"
    :show-file-list="fileType!=='img'"
    :file-list="value"
    :auto-upload="false"
    :http-request="upload"
    :on-change="fileChange"
    :on-exceed="exceedHandler"
    action=""
  >
    <template v-if="fileType!=='img'">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">允许上传{{ params[0] }}文件，且不超过{{ limitSize }}MB</div>
    </template>
    <template v-else>
      <div class="img-box flex-center">
        <img
          v-if="value[0]||img"
          class="img"
          :src="showImg||img"
        >
        <i v-else class="el-icon-plus" />
      </div>
      <div v-if="isLimitImgWidthHeight && blobUrl" class="mask">
        <img ref="client" :src="blobUrl">
      </div>
    </template>
  </el-upload>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    img: {
      type: String,
      default: ''
    },
    fileType: {
      type: String,
      default: 'file',
      validator(v) {
        return ['file', 'img', 'excel', 'zip'].includes(v)
      }
    },
    limitSize: { // 限制大小，单位MB
      type: Number,
      default: 6
    },
    isLimitImgWidthHeight: { // 是否限制分辨率，如果限制传一个宽高的数据
      type: [Boolean, Array],
      default: false
    }
  },
  data() {
    return {
      blobUrl: '',
      showImg: ''
    }
  },
  methods: {
    fileChange(file, fileList) {
      if (this.fileType === 'zip' && file.raw.type !== 'application/zip') {
        this.$message.error('上传文件格式不对，只能上传zip文件')
        this.$emit('input', [])
        return
      }
      if ((file.size / 1024 / 1024) > this.limitSize) {
        this.$message.error(`上传文件大小不能超过${this.limitSize}MB!`)
        this.$emit('input', [])
        return
      }
      if (this.fileType === 'img') {
        if (!['image/jpeg', 'image/png'].includes(file.raw.type)) {
          this.$message.error('上传文件格式不对，只能上传jpeg/png文件')
          this.$emit('input', [])
          return
        }
        this.blobUrl && this.revokeObjectURL(this.blobUrl)
        this.blobUrl = this.createObjectURL(file.raw)
        if (this.isLimitImgWidthHeight) {
          setTimeout(() => {
            const { offsetWidth, offsetHeight } = this.$refs.client
            const [width, height] = this.isLimitImgWidthHeight
            console.log(offsetWidth, offsetHeight)
            if (offsetWidth !== width || offsetHeight !== height) {
              this.$message.error(`上传文件分辨率不对，只能上传${width} * ${height} 大小的文件`)
              this.blobUrl && this.revokeObjectURL(this.blobUrl)
              this.$emit('input', [])
              return
            }
            this.showImg = this.blobUrl
          }, 20)
        }
      }
      console.log(file, 123)
      this.$emit('input', fileList)
    },
    createObjectURL(object) {
      return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
    },
    revokeObjectURL(objectURL) {
      return (window.URL) ? window.URL.revokeObjectURL(objectURL) : window.webkitURL.revokeObjectURL(objectURL)
    },
		exceedHandler(file, fileList) {
			this.$message.warning('最多上传一个文件！')
		},
		uploadFile() {
			this.$refs.upload.submit()
		},
		async upload(fn) {
			const file = this.value[0]
			const data = new FormData()
      data.append('file', file.raw)
      fn && fn()
			// try {
			// 	const { data: { code, result } } = await this.getImportApi(data, {
			// 		headers: {
			// 			'Conten-Type': 'multipart/form-data'
			// 		}
			// 	})
			// } catch (error) {
			// 	console.log(error)
			// }
		}
  },
  beforeDestroy() {
    this.showImg && this.revokeObjectURL(this.showImg)
    this.blobUrl && this.revokeObjectURL(this.blobUrl)
  },
  computed: {
    accept() {
      const obj = {
        zip: 'application/zip',
        // zip: '.zip,.rar,application/x-rar-compressed,application/zip,application/x-zip-compressed,application/octet-stream',
        file: '*',
        img: 'image/jpeg, image/png',
        excel: '.xlsx'
      }
      return obj[this.fileType]
    },
    params() {
       const obj = {
        zip: ['zip'],
        file: ['任意'],
        img: ['jpeg/png'],
        excel: ['xlsx']
      }
      return obj[this.fileType]
    }
  }
}
</script>
<style lang='stylus' scoped>
.img-box {
  width: 100px;
  height: 100px;
  background: #fbfdff;
  border: 1px dashed #c0ccda;
  &:hover {
    border-color: #0071CE;
  }
}
.img {
  width: 100%;
  height: 100%;
  &:hover {
    filter drop-shadow(2px 4px 6px black)
  }
}
.mask {
  position fixed
  z-index 10
  left -999999px
  right -99999px
  opacity 0
  pointer-events: none;
}
</style>
