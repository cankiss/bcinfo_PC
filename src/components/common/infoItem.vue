<template>
  <div class="infoItem clearfix" v-bind:class="{oddBg:index%2==1}">
    <div class="infoItem-left">
      <img :src="imgSrc" alt="">
    </div>
    <div class="infoItem-right">
      <h6 class="infoItem-tl">
        {{title}}
      </h6>
      <p class="infoItem-content">
        {{content | cutout}}
        <router-link v-if="content.length > 90" :to='`/article/${id}`'>...点击查看更多</router-link>
      </p>
      <div class="infoItem-tips">
        <span>来源：{{source}}</span> <span>{{ datetime | momentTime }}</span>
        <span v-if="num!=''" class="icon">
          <i class="icon-eye"></i>
          {{num || 0}}
        </span>
        <span v-if="message!=''" class="icon">
          <i class="icon-message"></i>
          {{message || 0}}
        </span>
        <span v-if="zan!=''" class="icon">
          <i class="icon-zan"></i>
          {{zan || 0}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'infoItem',
    props: {
      imgSrc: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      source: {
        type: String,
        default: ''
      },
      datetime: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      },
      num: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      },
      zan: {
        type: String,
        default: ''
      },
      id:{
        type:[String,Number],
        default:''
      }
    },
    filters: {
      cutout(val) {
        if (val.length > 90) {
          return val.substr(0, 90);
        } else {
          return val;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .infoItem {
    padding: 22px 0;
    .infoItem-left {
      float: left;
      width: 180px;
      height: 135px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .infoItem-right {
      padding: 11px 20px;
      box-sizing: border-box;
      width: 630px;
      height: 135px;
      float: left;
      .infoItem-tl {
        font-size: 16px;
        color: @title;
        margin-bottom: 10px;
        line-height: 22px;
      }
      .infoItem-content {
        font-size: 12px;
        color: @word;
        line-height: 18px;
        height: 51px;
        position: relative;
        a {
          display: inline-block;
          line-height: 22px;
          color: #666;
          position: absolute;
          bottom: 12px;
          right: 0;
        }
        a:hover{
          text-decoration: underline;
        }
      }
      .infoItem-tips {
        font-size: 12px;
        color: @source;
        span+span {
          margin-left: 30px;
        }
        .icon {
          position: relative;
          padding-left: 22px;
          .icon-eye,
          .icon-message,
          .icon-zan {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url(../../assets/images/home/icon-yulan-16x16.svg);
            position: absolute;
            left: 0px;
            top: 0;
            bottom: 0;
            margin: auto;
          }
          .icon-message {
            background: url(../../assets/images/home/icon-pinglun-16x16.svg);
          }
          .icon-zan {
            background: url(../../assets/images/home/icon-dianzan-16x16.svg);
          }
        }
      }
    }
  }
  .oddBg {
    background: #F8FBFF;
  }
</style>
