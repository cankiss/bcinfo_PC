<template>
  <div class="hot clearfix">
      <div class="hot-left">
          <img :src="hotSrc">
      </div>
      <div class="hot-right">
          <p class="hot-name">
            {{name}}
          </p>
          <p class="hot-page">
            {{url}}
          </p>
          <p class="hot-num">
            <span class="icon-eye"></span>
            <span>{{num || 0}}</span>
          </p>
      </div>
  </div>
</template>
<script>
export default {
  name:"hot",
  props:{
    hotSrc:{
      type:String,
      default:""
    },
    name:{
      type:String,
      default:""
    },
    url:{
      type:String,
      default:""
    },
    num:{
      type:Number,
      default:0
    }
  }
}
</script>
<style lang="less" scoped>
.hot{
  padding: 10px 30px;
  .hot-left{
    float: left;
    width: 60px;
    height: 60px;
    img{
      display: block;
       width: 100%;
       height: 100%;
    }
  }
  .hot-right{
    float: left;
    padding:10px 0 0 20px;
    font-size: 12px;
    color: @title;
    .hot-num{
      color: @source;
      position: relative;
      padding-left:20px;
      line-height: 16px;
    }
    .icon-eye{
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(../../assets/images/home/icon-yulan-16x16.svg);
      position: absolute;
      left: 0px;
      top:0;
      bottom: 0;
      margin: auto;
    }
    span+span{
      margin-left: 6px;
    }
  }
}
</style>
