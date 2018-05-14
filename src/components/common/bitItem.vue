<template>

  <div class="bitItem clearfix">
      <div class="bitItem-left"><img :src="bitSrc" alt=""></div>
      <div class="bitItem-right">
        <h5 class="bitItem-name">
          {{bitName}}
        </h5>
        <p class="bitItem-price">
          ￥{{bitPrice}}
          <span class="price-add" :class="{priceReduce : rate < 0}">
            <span v-if="rate > 0">+</span>{{rate}}
          </span>
          <!-- <span v-else class="price-reduce">
            -{{rate}}
          </span> -->
        </p>
      </div>
  </div>

</template>

<script>

  export default {
    name: 'bitItem',
    props:{
       bitSrc:{
         type:String,
         default:''
       },
       bitName:{
         type:String,
         default:''
       },
       bitPrice:{
         default:''
       },
       priceInc:{
         type:Number,
         default:1
       },
       rate:{
         type:String,
         default:''
       }
    }
  }

</script>

<style lang="less" scoped>
.bitItem{
  padding: 17px 30px;
  .bitItem-left{
    float: left;
    width: 60px;
    height: 60px;
    img{
      display: block;
       width: 100%;
       height: 100%;
    }
  }
  .bitItem-right{
    margin-left: 20px;
    width:160px;
    float: left;
    color: @title;
    .bitItem-name{
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 33px;
      margin-bottom: 6px;
    }
    .bitItem-price{
      font-size: 18px;
      line-height: 25px;
      .price-add{
        color: @money-up;
      }
      .priceReduce{
        color: @money-down;
      }
    }
  }
}
</style>
