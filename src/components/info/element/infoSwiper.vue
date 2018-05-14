<template>
  <div>
    <div class="swiper-container" :style="{width:width}">
      <el-carousel trigger="click" arrow="never" :autoplay="autoplay" :interval="interval" :height="height">
        <el-carousel-item v-for="(item,index) in data" :key="index">
          <router-link v-bind="{to:'/article/'+ item.id}">
            <img :src="item.deployImage" alt="" :style="{width:width,height:height}">
            <div class="carousel-tips">
              <span :style="{background:linecolor}"></span><p>{{ item.title }}</p>
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import { Carousel,CarouselItem } from 'element-ui'
  export default {
    props:{
      autoplay:{
        type:Boolean,
        default:true
      },
      interval:{
        type:Number,
        default:3000
      },
      height:{
        type:String,
        default:"300px"
      },
      width:{
        type:String,
        default:"820px"
      },
      linecolor:{
        type:String,
        default:'#A40BB7'
      },
      data:{
        type:[Number,Array],
        default:3
      }
    },
    components: {
      ElCarousel:Carousel,
      ElCarouselItem:CarouselItem
    }
  }
</script>

<style lang="less">
  .swiper-container {
    position: relative;
    .carousel-tips {
      display: flex;
      align-items: center;
      height: 40px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 3;
      span {
        width: 3px;
        height: 16px;
        margin-left: 20px;
        margin-right: 10px;
      }
    }
    .el-carousel__indicators{
      left: 88%;
      z-index: 4;
    }
    .el-carousel__indicator{
      padding: 16px 4px;
    }
    .el-carousel__button {
      width: 6px;
      height: 6px;
      border-radius: 10px;
    }
    .el-carousel__indicator.is-active button{
      width: 28px;
      opacity: .8;
      transition:width 0.4s ease-in-out;
    }
  }

</style>
