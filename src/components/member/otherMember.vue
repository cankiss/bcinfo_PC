<template>

  <div id="container">
    <mheader></mheader>
    <div id="main">
      <div class="inner clearfix">
        <div class="myPage fl">
          <div class="photo clearfix">
            <button class="hb-btn hb-btn-small"  @click="followOrCancel(1)">
            + 关注
            </button>
            <button class="hb-btn hb-btn-small havafollow1" v-if="haveFollow"  ref="hasfollow" @mouseover="mouseIn" @mouseout="mouseOut"  @click="followOrCancel(2)">
           √ 已关注
            </button>
            <div class="myPhoto fl">
              <!--<img src="~assets/images/member/default.png"  alt="">-->
            </div>
            <div class="resume">
              <P class="name">{{ userName }}</P>
              <p class="summary"> {{  summary }}</p>
              <p>HBCandy {{ userCount || 0 }}</p>
            </div>
            <div class="resumeCont">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="TA的收藏" name="first">
                  <ul>
                    <li v-for="info in infoList">
                      <infoItem :imgSrc="info.imgSrc" :title="info.title" :content="info.content" :source="info.source" :datetime="info.datetime"></infoItem>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="TA的关注" name="second">
                  <ul class="myConcern clearfix">
                    <li v-for="info in concernList">
                      <myConcern :imgSrc="info.picUrl" :link="info.weixinNickname" :txtWord="info.introduction" :isShow=false :flag="info.flag"></myConcern>`
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="TA的粉丝" name="fourth">
                  <ul class="myConcern clearfix">
                    <li v-for="info in concernList1">
                      <myFans :imgSrc="info.picUrl" :link="info.weixinNickname" :txtWord="info.introduction" :encryptionId="info.encryptionId"></myFans>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>

          </div>
          <div class="pageConten">
            <div class="pageBox">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="200">
              </el-pagination>
            </div>
          </div>
        </div>
      
        <div class="notice fr">
          <div class="top clearfix">
            <p class="fl">通知</p>
            <p class="more fr"><a :href="'#/sysNotice'"> 更多 > </a></p>
          </div>
          <ul>
            <li class="clearfix" v-for="info in noticeList"><div v-html ="info.content"></div> <span class="fr"> {{ info.releaseTime |creatTime}} </span></li>
          </ul>
          
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
  import myConcern from './myConcern.vue';
  import myFans from './myFans.vue';
  import myHB from './myHB.vue';
  import { Tabs, TabPane,Pagination } from 'element-ui';

  export default {
    components: {
      mheader,
      mfooter,
      infoItem,
      myConcern,
      myFans,
      myHB,
      ElTabs:Tabs,
      ElTabPane:TabPane,
      ElPagination:Pagination
    },

    data() {
      return {
        activeName: 'first',
        userId:this.$session.get('encryptionId'),
        sourceId:"",
        summary:"",
        userName:"",
        userCount:"",
        infoList:[],
        isFollow:'',
        haveFollow:false,
        concernList:[],
        concernList1:[],
        noticeList:[]
      };
    },
    methods: {
      handleClick(tab) {
        console.log(tab.index);
        switch(tab.index) {
          case '0':
            this.heCollect();
            break;
          
          case '1':
            this.heFollow();
            break;
    
          case '2':
            this.heFans();
            break;
          
        }
      },
      userInfo(){
        this.$post("user/getPersonalInformation",{userId:this.userId,sourceId:this.$session.get('id')}).then(res => {
          //回填头像
          document.querySelector(".myPhoto").style.background = `url(${res.model.picUrl || "~assets/images/member/default.png"}) no-repeat 100% 100%`;
          //回填个人简介内容
          this.userCount = res.model.amount
          this.userName = res.model.weixinNickname
          this.summary = res.model.introduction
          this.isFollow = res.model.isFollow
          if( this.isFollow == '1'){
            this.haveFollow = true;
          }else if(this.isFollow == '0'){
            this.haveFollow = false;
          }
        })
      },
      //TA的收藏
      heCollect(){
        this.$post("user/getUserCollection",{userId:this.userId,pageSize:'1',pageNum:'1'}).then(res => {
          this.infoList = res.model.list;
        })
      },
  //    TA的关注
      heFollow(){
        this.$post("user/getUserFollow",{userId:this.userId,sourceId:this.$session.get('id'),pageSize:'1',pageNum:'1'}).then(res => {
          this.concernList = res.model.list;
        })
      },
      //TA的粉丝
      heFans(){
        this.$post("user/getUserFans",{userId:this.userId,sourceId:this.$session.get('id'),pageSize:'1',pageNum:'1'}).then(res => {
          this.concernList1 = res.model.list;
        })
      },
      //操作关注
      followOrCancel(type){
      this.$post("user/followOrCancel",{userId:this.$session.get('id'),fansId:this.userId,type:type}).then( res =>{
        if(type == '1'){
         
          this.haveFollow = true;
        }else if(type == '2'){
        
          this.haveFollow = false;
        }
      })
      },
      mouseIn() {//鼠标移入
        this.$refs.hasfollow.innerHTML = "取消关注";
        this.$refs.hasfollow.style.background = "#D4D8DC";
        this.$refs.hasfollow.style.color = "#fff";
      },
      mouseOut() {//鼠标移出
        this.$refs.hasfollow.innerHTML = "√ 已关注";
        this.$refs.hasfollow.style.backgroundImage = "none"
        this.$refs.hasfollow.style.color = "#061D9A";
      },
      //通知
      notice(){
        this.$post("notice/findNoticeList",{userId:this.userId,pageSize:'1',pageNum:'1'}).then(res => {
          this.noticeList = res.model.notices;
        })
      }
      
    },
    created(){
      this.userInfo();
      this.notice();
      this.heCollect();
    },

  }

</script>
<style>

  .resumeCont .el-tabs__item.is-active {
    color: #061D9A;

  }
  .resumeCont .el-tabs__active-bar{
    background-color: #061D9A;
    font-weight: 700;
  }
  .resumeCont .el-tabs__nav-wrap::after{
    background-color: #F9F9F9;
  }
  .resumeCont .el-tabs__item{
    font-size: 16px;
    font-weight: 700;
    width: 130px;
    height: 50px;
    line-height:50px;
    text-align: center;
  }
  .resumeCont .el-tabs__content{
    min-height: 740px;
  }
  .resumeCont  .el-tabs__item:focus.is-active.is-focus:not(:active){
    box-shadow: none;
  }
  .resumeCont  .el-tabs__nav-scroll{
    width: 100%;
    background: #F9F9F9;
  }

  .pageConten .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #061D9A;
    color: #fff;
  }

</style>
<style scoped>
  .inner{

  }
  .myPage{
    width: 890px;
  }
  .photo{
    box-sizing: border-box;
    padding: 30px 15px;
    position: relative;
  }
  .photo .resume{
    margin-left: 160px;
    width: 480px;
  }
.photo .hb-btn-small{
  position: absolute;
  top: 30px;
  right: 0;
}
.photo  .havafollow1 {
  background-image:none;
  background-color: #ccc;
  color: #061D9A;
}

  .photo .myPhoto{
    width: 120px;
    height: 120px;
    /*background: url("../../assets/images/member/default.png") no-repeat 100% 100%;*/
  }
  .resume .name{
    font-size: 20px;
    font-weight: 700;
  }
  .resume p{
    margin-bottom: 12px;
  }
  .resume p:nth-child(2){
    color: #666;
    font-size: 12px;
  }
  .resume p:nth-child(3){
    font-size: 14px;
    color: #000;
  }
  .resume .name img{
    vertical-align: baseline;
    margin-left:25px;
  }
  .resume .summary{
    height: 50px;
  }
  .resumeCont{
    width: 100%;
    margin-top: 28px;
  }
  .resumeCont .myConcern{
    width: 820px;
  }
  .resumeCont .myConcern li{
    width: 402px;
    height: 120px;
    margin-bottom: 20px;
  }
  .resumeCont .myConcern li:nth-child(2n+1){
    float: left;
  }
  .resumeCont .myConcern li:nth-child(2n){
    float: right;
  }
  .notice{
    width: 300px;
    box-sizing: border-box;
    padding: 30px 30px;
  }
  .notice .top .fl{
    font-size: 20px;
    font-weight: 700;
  }
  .notice .top .more a{
    font-size: 14px; ;
    color: #000;
  }
  .notice ul{
    margin-top: 10px;
  }
  .notice ul li{
    line-height: 20px;
    padding: 10px 0;
    border-bottom: 1px dashed #ccc;
  }

  .notice  li span{
    font-size: 12px;
    color: #aaa;
  }

  .pageConten{
    width: 100%;
    position: relative;
  }
  .pageConten .pageBox{
    width: 400px;
    margin: 30px auto;
    position: absolute;
    bottom: -15px;
    left: 222px;
  }
</style>
