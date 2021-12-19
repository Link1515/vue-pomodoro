<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object
    },
    options: {
      type: Object,
      default () {
        return {
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: '#E8E8E8',
                fontSize: 16,
                stepSize: 2
              },
              gridLines: {
                zeroLineColor: '#E8E8E8',
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: '#E8E8E8',
                fontSize: 16
              },
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          }
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
