<template>

  <div id="container">

    <mheader activeMenuName="home"></mheader>

    <div id="homeNews">
      <div class="home-inner">
        <p class="caption">新闻与热点</p>
        <div class="newsList clearfix">
          <ul class="fl clearfix">
            <li v-for="(item,index) in hotNewsList" :key="index">
              <router-link v-bind="{to:'/article/' + item.id}">
                <p class="pic">
                  <img :src="item.deployImage" width="250">
                </p>
                <p class="title">{{ item.title }}</p>
                <p class="info clearfix">
                  <span class="source fl">来源：{{ item.author }}</span>
                  <span class="time fr">{{ item.releaseTime | momentTime}}</span>
                </p>
              </router-link>
            </li>
          </ul>
          <p class="more fr">
            <router-link to="/info/hotnews">
              <img src="../../assets/images/home/homeNewsMore.svg" width="50">
            </router-link>
          </p>
        </div>
      </div>
    </div>

    <div id="main" style="margin-bottom:40px;">

      <div class="inner clearfix">
        <div class="infoList">
          <p class="caption">政策与法规
            <router-link to="/info/policyLaws" class="font-000">更多 ></router-link>
          </p>
          <ul>
            <li v-for="(info,index) in infoList" :key="index">
              <router-link v-bind="{to:'/article/' + info.id}">
                <infoItem :imgSrc="info.deployImage" :title="info.title" :content="info.introduction" :source="info.author" :datetime="info.releaseTime"
                  :index="index"></infoItem>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="right-list">
          <p class="list-tile">
            精选币种
            <router-link to="/market" class="font-000">更多 ></router-link>
          </p>
          <ul>
            <li v-for="(bit,index) in bitList" :key="index">
              <router-link v-bind="{to:'/market/' + bit.symbol}">
                <bitItem :bitSrc="bit.iconUrl" :rate="bit.degree" :bitName="bit.species" :bitPrice="bit.closeCny" :priceInc="bit.priceInc"></bitItem>
              </router-link>
            </li>
          </ul>
          <p class="list-tile">
            热度
          </p>
          <ul>
            <li v-for="(hot,index) in hotList" :key="index">
              <router-link v-bind="{to:'/article/' + hot.id}">
                <hot :hotSrc="hot.deployImage" :name="hot.title" :url="hot.linkUrl" :num="hot.falseBrowse"></hot>
              </router-link>
            </li>
          </ul>
          <p class="list-tile">
            火链网白皮书
          </p>
          <div class="white-book clearfix">
            <a class="font-000" href="../../../static/src/source/houbcwhitebook.pdf" target="_blank">
              <div class="white-book-left">
                <img src="../../assets/images/home/main-icon-download-60x60.svg">
              </div>
              <div class="white-book-right font-000">
                下载白皮书
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>

    <mfooter></mfooter>

  </div>

</template>

<script>

  import mheader from '../common/mheader.vue';
  import mfooter from '../common/mfooter.vue';
  import infoItem from '../common/infoItem.vue';
  import bitItem from '../common/bitItem.vue';
  import hot from '../common/hot.vue';
  export default {
    components: { mheader, mfooter, infoItem, bitItem, hot },
    data() {
      return {
        hotNewsList: [],//新闻与热点
        infoList: [],//政策与法规
        bitList: [],//精选币种
        hotList: [
          {
            hotSrc: require("assets/images/home/avatar.png"),
            name: "比特大佬刘老师",
            url: "http://huobc.com／author112",
            num: 3345
          },
          {
            hotSrc: require("assets/images/home/avatar.png"),
            name: "比特大佬刘老师",
            url: "http://huobc.com／author112",
            num: 3345
          },
          {
            hotSrc: require("assets/images/home/avatar.png"),
            name: "比特大佬刘老师",
            url: "http://huobc.com／author112",
            num: 3345
          }
        ]//热度
      }
    },
    created() {
      this.getHotNews();
      this.getInfoList();
      this.getbitList();
      this.getHotList();
    },
    methods: {
      getCommon(columns,pageSize) {
        let data = {
          columns: columns,
          type: 1,
          pageSize: pageSize,
          pageNum: 1
        };
        this.$post("article/findInformation", data).then(res => {
          if (columns == "news") {
            this.hotNewsList = res.model.articles
          } else {
            this.infoList = res.model.articles;
          };
        }).catch(err => {
          this.$message.error({
            message: err.msg,
            center: true
          })
        })
      },
      getbitList(){
        this.$post("market/getChoiceMarketInfo").then( res => {
          console.log(res);
          this.bitList = res.model;
        }).catch( err => {
          this.$message.error({
            message: err.msg,
            center: true
          })
        })
      },
      getHotNews() {//获取新闻与热点
        this.getCommon("news",4);
      },
      getInfoList() {//获取政策法规
        this.getCommon("policy",6);
      },
      getHotList(){
        let data = {
          columns:"viewpoint",
          type:1,
          plate:"Heat",
          pageSize:5
        };
        this.$post("article/findHot",data).then( res => {
          this.hotList = res.model.articles;
        }).catch( err => {
          this.$message.error({
            message: err.msg,
            center: true
          });
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  #homeNews {
    padding-top: 10px;
    padding-bottom: 45px;
    background-color: #fafbfd;
  }

  #homeNews .caption {
    font-size: 28px;
    color: #000;
    line-height: 102px;
  }

  #homeNews .newsList {}

  #homeNews .newsList ul {
    width: 1080px;
  }

  #homeNews .newsList ul li {
    float: left;
    width: 250px;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 2px 1px #e5e4e5;
  }

  #homeNews .newsList ul li a {
    display: block;
  }

  #homeNews .newsList ul li a .pic {}

  #homeNews .newsList ul li a .pic img {
    display: block;
    width: 250px;
    height: 188px;
    max-width: 100%;
  }

  #homeNews .newsList ul li a:hover .pic img {
    transform: scale(1.1);
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -o-transform: scale(1.1);
    -moz-transform: scale(1.1);
    transition: transform .5s;
    -ms-transition: transform .5s;
    -webkit-transition: transform .5s;
    -o-transition: transform .5s;
    -moz-transition: transform .5s;
  }

  #homeNews .newsList ul li a .title {
    padding: 10px 20px;
    height: 42px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 14px;
    color: #333;
    line-height: 20px;
  }

  #homeNews .newsList ul li a .info {
    padding: 0 20px;
    font-size: 12px;
    color: #bcbcbc;
    line-height: 39px;
  }

  #homeNews .more {
    width: 50px;
  }

  #homeNews .more a {
    display: block;
  }

  #homeNews .more a img {
    display: block;
  }

  .infoList {
    width: 860px;
    float: left;
  }

  .infoList .caption {
    font-size: 28px;
    color: #000;
    line-height: 102px;
    a {
      float: right;
      font-size: 14px;
      margin-right: 40px;
    }
  }

  .right-list {
    float: left;
    margin-top: 30px;
    width: 300px;
    border-left: 1px solid @white-border;
    .list-tile {
      font-size: 20px;
      line-height: 38px;
      padding-left: 28px;
      color: @title;
      a {
        float: right;
        font-size: 14px;
        margin-right: 40px;
      }
    }
  }

  .white-book {
    padding-left: 28px;
    .white-book-left {
      float: left;
      width: 60px;
      height: 60px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .white-book-right {
      float: left;
      padding-left: 20px;
      line-height: 60px;
    }
  }
</style>