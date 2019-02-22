<template>
  <div class="w-100">
    <div
      style="width: 100%; height: 50%; position: absolute; top: 48%; left: 0; margin-top: -3px; line-height:19px; text-align: center; z-index: 999999999999999">
      <h5>{{ label }}</h5>
    </div>
    <PieChart :per="per"
              :chartId="chartId"
              :highlight-color="highlightColor"
              :non-high-light-color="nonHighLightColor"
              :width="parseInt(width)"
              :height="parseInt(height)"
              :label="label"
              class=""/>
  </div>
</template>

<script>
import PieChart from '@/components/items/Pie'

export default {
  name: 'Skill',
  props: {
    chartId: String,
    highlightColor: String,
    nonHighLightColor: String,
    per: Number,
    size: String,
    label: String,
    width: Number,
    height: Number
  },
  components: {PieChart}
}
</script>

<style scoped>

</style>
