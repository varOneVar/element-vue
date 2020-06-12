<!-- 百度地图 -->
<template>
  <baidu-map
    class="bm-view"
    :style="{height}"
    :center="{lng, lat}"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    ak="xHgXRGyHeAfxfq8ArbGdCpNs31mpae2T"
    @click="mapClickHandler"
  >
    <slot name="mapTop" />
    <bm-view class="map" />
    <slot name="mapBottom" />
    <bm-local-search
      :keyword="keyword"
      :auto-viewport="true"
      @infohtmlset="infohtmlset"
    />
    <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT" />
    <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT" />
    <bm-marker
      :position="{lng: lng, lat: lat}"
      :dragging="true"
      animation="BMAP_ANIMATION_BOUNCE"
      title="当前位置"
      @dragend="dragend"
    />
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmView, BmNavigation, BmLocalSearch, BmCityList, BmMarker } from 'vue-baidu-map'
export default {
  props: {
    lng: {
      type: [String, Number],
      default: 114.017236
    },
    lat: {
      type: [String, Number],
      default: 22.550643
    },
    zoom: {
      type: [String, Number],
      default: 18
    },
    height: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  methods: {
    mapClickHandler({ point }) {
      this.$emit('mapClickHandler', point)
    },
    infohtmlset({ point }) {
      this.$emit('infohtmlset', point)
    },
    dragend({ point }) {
      this.$emit('makerDragend', point)
    }
  },
  watch: {
    keyword(v) {
    }
  },
  components: { BaiduMap, BmView, BmNavigation, BmLocalSearch, BmCityList, BmMarker }
}
</script>
<style lang='stylus' scoped>
.bm-view, .map {
  width: 100%;
  height: 100%;
}

</style>
