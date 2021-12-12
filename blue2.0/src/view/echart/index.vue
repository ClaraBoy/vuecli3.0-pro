<template>
  <div>
<div id="main" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import * as echarts from "echarts"
const animationDuration = 3000
export default {
  name: "index",
  props: {
    id:"",
    menu:Object
  },
  data(){
    return{
      chart:null,
      menudate:"",
      menured:"",
      menucomment:""
    }
  },
  watch:{
    id(){
      this.menu.list.forEach(value=>{
        if(this.id===value.menuid){
            this.menudate=value.menudate;
            this.menured=value.menured;
            this.menucomment=value.menucomment;
        }
      })
      this.init(this.menured,this.menucomment,0);
    }
  },
  methods:{
      init(a,b){
        this.chart = echarts.init(document.getElementById("main"))
        let menured=this.menured;
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          radar: {
            radius: '66%',
            center: ['50%', '42%'],
            splitNumber: 8,
            splitArea: {
              areaStyle: {
                color: 'rgba(127,95,132,.3)',
                opacity: 1,
                shadowBlur: 45,
                shadowColor: 'rgba(0,0,0,.5)',
                shadowOffsetX: 0,
                shadowOffsetY: 15
              }
            },
            indicator: [
              { name: '阅读量', max: 500 },
              { name: '评论量', max: 500 },
            ]
          },
          legend: {
            left: 'center',
            bottom: '10',
            color: 'rgba(127,95,132,.3)',
            data: ['数据统计']
          },
          series: [{
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            data: [
              {
                value: [a,b],
                name: '数据统计'
              },
            ],
            animationDuration: animationDuration
          }]
        })
      }
  },
  mounted() {
        this.init(0,0);
      }
}
</script>

<style scoped>
#main{
  position: absolute;
  top: 20%;
  color: black;
}
</style>
