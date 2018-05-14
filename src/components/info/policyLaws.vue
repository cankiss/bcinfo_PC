<template>
  <div class="inner clearfix">
    <info-tips :tips="tips" />
    <div class="left-container">
      <info-swiper :linecolor="'#425DF1'" :data="data1"/>
      <div style="padding:10px 0 0 10px;">
        <ul>
          <li v-for="(info,i) in infoList" :key="i">
            <router-link :to="'/article/'+ info.id">
              <info-item
            :imgSrc="info.deployImage"
            :title="info.title"
            :content="info.introduction"
            :source="info.author"
            :datetime="info.releaseTime"
            :num="info.falseBrowse"
            :message="info.num"
            :index="i"
            :id="info.id"
            :zan="`${info.approve}`" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-container">
      <div class="right-view">
        <p>视角</p>
        <ul>
          <li v-for="(item,i) in data2" :key="i">
            <!-- ~assets/images/info/view-pic-270x140.png -->
            <router-link :to="'/article/'+ item.id">
              <img :src="item.deployImage" alt="">
              <span>{{item.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right-hot right-policy">
        <p>国内政策</p>
        <ul>
          <li class="clearfix" v-for="(item,i) in policies" :key="i">
            <!-- ~assets/images/info/policy-pic-80x60.png -->
            <router-link :to="'/article/'+ item.id">
              <img :src="item.deployImage" alt="">
              <div class="font-12">
                <p>{{item.title}}</p>
                <span>{{item.releaseTime}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import infoSwiper from './element/infoSwiper'
  import infoTips from './element/tips'
  import infoItem from '~/common/infoItem'
  export default {
    data() {
      return {
        data1:null,
        data2:null,
        infoList:null,
        policies:null,
        tips: {
          content: "政策法规",
          backgroundImg: "linear-gradient(-180deg, #3459F1 0%, #89A0FF 100%)"
        },
        params:[
          {
            columns:'policy',
            plate:'LeftBottom',
            type:1,
            pageSize:0,
            pageNum:1
          },
          {
            columns:'policy',
            plate:'policies',
            type:1,
            pageSize:0,
            pageNum:1
          }
        ]
      }
    },
    components: {
      infoSwiper,
      infoTips,
      infoItem
    },
    created(){
      this.$post('article/findPolicyBanner').then(({model}) => {
        this.data1 = model.articlesOne
        this.data2 = model.articlesTwo
      })
      this.params.forEach(item => {
        this.$post('article/findInformation',item).then(({model}) => {
          if(item.plate === 'LeftBottom'){
            this.infoList = model.articles
          }else {
            this.policies = model.articles
          }
        })
      })
    }
  }
</script>

<style lang="less" scoped>
  @import './masterView.less';
  .right-policy {
    ul {
      li {
        padding: 10px 24px 10px 30px;
        box-sizing: border-box;
        img {
          display: block;
          width: 80px;
          height: 60px;
          float: left;
        }
        div {
          width: 156px;
          margin-left: 10px;
          float: left;
          p,
          span {
            line-height: 18px;
          }
          span {
            display: inline-block;
            margin-top: 6px;
            color: #aaa;
          }
        }
      }
    }
  }
</style>
