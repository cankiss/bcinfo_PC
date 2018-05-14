<template>
<div class="HBItem">
  <h5>我目前的HBCandy：<span>{{ totalAmount || 0 }}</span></h5>
  <div class="topBar">
    <span style="width: 29%">时间</span>
    <span style="width: 40%">升级任务</span>
    <span style="width: 29%">获得HBCandy</span>
  </div>
<ul>
  <li v-for="(info,i) in hbList" :key="i">
    <span style="width: 29%"> {{ info.createTime | creatTime}}</span>
    <span style="width: 40%">{{ info.typeName }}</span>
    <span style="width: 29%">{{info.plusMinus}}{{ info.amount}}HBCandy</span>
  </li>
</ul>

</div>

</template>
<style lang="less" scoped>
.HBItem{
  width: 673px;
  margin-top: 30px;
  box-sizing: border-box;
  margin-left: 20px;
  height: 760px;
  h5{
    font-size: 22px;
    color: #000;
    margin-bottom: 25px;
    span{
      color: #061D9A;
    }
  }
  .topBar{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #061D9A;
    color: #fff;
    font-size: 14px;
    span{
      display: inline-block;

      text-align: center;
    }

  }
  ul{
    width: 100%;
    li{
      text-align: center;
      border-bottom: 1px solid #EAEAEA;
      box-sizing: border-box;
      padding:20px 0;
      span{
        display: inline-block;
      }
      span:nth-child(2){
       margin-left: -7px;
      }
      span:nth-child(3){
        color: #061D9A;
      }
    }
    li:nth-child(even){
      background-color: #FCFCFC;
    }
  }
}

</style>

<script>
  export default {
    props: {
      hbList: {
        type: Array,
        default: []
      },
      totalAmount:{
        type:[String,Number],
        default:''
      }

    }
  }

</script>
