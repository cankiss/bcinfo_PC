<template>
  <div class="inner clearfix">
    <info-tips :tips="tips" />
    <div class="left-container">
      <info-swiper :data="data1.slice(0,3)"/>
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
          <li v-for="(item,i) in data2.slice(0,3)" :key="i">
            <!-- ~assets/images/info/view-pic-270x140.png -->
            <router-link :to="'/article/'+ item.id">
              <img :src="item.deployImage" alt="">
              <span>{{item.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right-hot">
        <p>热度</p>
        <ul>
          <li v-for="(hot,i) in hots" :key="i">
            <router-link :to="'/article/'+ hot.id">
              <info-hot :hotSrc="hot.deployImage" :name="hot.title" :url="hot.linkUrl" :num="hot.falseBrowse"/>
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
  import infoHot from '~/common/hot'
  import CalcTime from '@/utils/bundle'
  export default {
    data() {
      return {
        data1:[],
        data2:[],
        hots: [],
        infoList: null,
        tips: {
          content: "大咖视点",
          backgroundImg: "linear-gradient(-180deg, #A40AB7 0%, #D180E9 100%)"
        },
        params:[
         {
            columns:'viewpoint',
            plate:'TopBanner',
            type:1,
            pageSize:0,
            pageNum:1
          },
          {
            columns:'viewpoint',
            plate:'Perspective',
            type:1,
            pageSize:0,
            pageNum:1
          },
          {
            columns:'viewpoint',
            plate:'LeftBottom',
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
      infoItem,
      infoHot
    },
    created(){
      this.params.forEach(item => {
        this.$post('article/findInformation',item).then(({model}) => {
          item.plate === 'TopBanner' && (this.data1 = model.articles)
          item.plate === 'Perspective' && (this.data2 = model.articles)
          item.plate === 'LeftBottom' && (this.infoList = model.articles)
        })
      })

      this.$post('article/findHot',{columns:'viewpoint',type:'1',plate:'Heat',pageSize:0})
        .then(({model}) => {
          this.hots = model.articles
        })
    },
    destroyed(){
      instence.stop()
    }
  }
  let instence = new CalcTime({
        timespan: 15,
        callback: function() {
          console.log("~~~~")
        }
      })
</script>
<style>

</style>

<style lang="less" scoped>
  @import './masterView.less';
</style>
