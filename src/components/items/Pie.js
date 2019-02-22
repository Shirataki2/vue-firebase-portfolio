import { Doughnut } from 'vue-chartjs'
export default {
  name: 'PieChart',
  extends: Doughnut,
  props: {
    chartId: String,
    highlightColor: String,
    nonHighLightColor: String,
    per: Number,
    size: String,
    label: String
  },
  mounted () {
    this.renderChart({
      datasets: [{
        backgroundColor: [this.highlightColor, this.nonHighLightColor + 'bb'],
        data: [this.per, 100 - this.per]
      }]
    }, {
      responsive: false,
      tooltips: {enabled: false},
      hover: {mode: null},
      cutoutPercentage: 85
    })
  }
}
