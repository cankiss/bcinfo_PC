<template>
  <div id="container">
    <mheader></mheader>
    <div id="main">
      <div class="inner clearfix">
        <div class="myPage fl">
          <div class="photo clearfix">
            <div class="myPhoto fl">
              <input type="file" accept="image/png,image/jpeg,image/gif" @change="imgUrl">
              <!--<img src="~assets/images/member/photo.png" alt="">-->
            </div>
            <div class="resume">
              <P class="name">{{ userName }}<img src="~assets/images/member/bianji.svg" alt="" @click="handleOpen('close')"></P>
              <p class="summary">
                {{  summary }}
              </p>
              <p>HBCandy {{ userCount || 0 }}</p>
            </div>
            <div class="resumeCont">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label='`我的收藏(${ collectionCount || 0 })`' name="first">
                  <ul>
                    <li v-for="(info,i) in infoList" class="carceCollect" :key="i">
                      <router-link :to='`/article/${info.id}`'>
                      <infoItem :id="info.id" :imgSrc="info.deployImage" :title="info.title" :content="info.introduction" :source="info.author" :datetime="info.releaseTime" :num="info.falseBrowse" :message="info.num" :zan="`${info.approve}`"></infoItem></router-link>
                      <a href="javascript:;" class="carceCollect1" @click ="carceMycollect(info.id)"> X </a>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane :label='`我的关注(${ followCount || 0 })`' name="second">
                  <ul class="myConcern clearfix">
                    <li v-for="(info,i) in concernList" :key="i">
                      <myConcern :imgSrc="info.picUrl" :link="info.weixinNickname" :txtWord="info.introduction" :encryptionId="info.encryptionId"></myConcern>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="我的HBCandy" name="third">
                  <myHB :hbList="hbList" :totalAmount="totalAmount"></myHB>
                </el-tab-pane>
                <el-tab-pane :label='`我的粉丝(${ fansCount || 0  })`' name="fourth">
                  <ul class="myConcern clearfix">
                    <li v-for="(info,i) in concernList1" :key="i">
                      <myFans :imgSrc="info.picUrl" :link="info.weixinNickname" :txtWord="info.introduction" :encryptionId="info.encryptionId"></myFans>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="pageConten">
            <div class="pageBox" v-if="pageNum > 0">
              <el-pagination
                background
                layout="prev, pager, next"
                :total='pageNum'
                :current-page='currentPage'
                @current-change = "currentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="notice fr">
          <div class="top clearfix">
            <p class="fl">通知</p>
            <p class="more fr"><a :href="'#/sysNotice'" > 更多 > </a></p>
          </div>
          <ul>
            <li class="clearfix" v-for="(info,i) in noticeList" :key="i">
              <div v-html ="info.content"></div>
              <span class="fr"> {{ info.releaseTime |creatTime}} </span>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <!-- dialog -->
    <div>
      <div class="my-dialog-wrapper" v-show="close">
        <div class="my-dialog clearfix">
          <div class="close">
            <img @click="handleClose('close')" src="~assets/images/member/close.svg">
          </div>
          <div class="my-dialog-content">
            <p class="font-20">修改个人资料</p>
            <form>
              <label id="name" class="clearfix">
                <span>昵称</span>
                <input name="name" type="text" v-model="form.weixinNickname" maxlength="8" placeholder="必填">
              </label>
              <label id="intro" style="margin-top:30px" class="clearfix">
                <span>个人简介</span>
                <textarea name="intro" v-model="form.introduction" maxlength="50" placeholder="必填"></textarea>
              </label>
            </form>
            <div class="my-dialog-btn">
              <button class="hb-btn hb-btn-primary" @click="save">保存</button>
              <button class="hb-btn hb-btn-primary" @click="handleClose('close')">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--头像弹框-->
    <div>
      <div class="my-dialog-wrapper" v-show="photo">
        <div class="my-dialog clearfix">
          <div class="close">
            <img @click="handleClose('photo')" src="~assets/images/member/close.svg">
          </div>
          <div class="my-dialog-content">
            <p class="font-20">修改个人头像</p>
            <div class="photo-wrapper">
              <vueCropper
                ref="cropper3"
                :img="example3.img"
                :autoCrop="example3.autoCrop"
                :autoCropWidth="example3.autoCropWidth"
                :autoCropHeight="example3.autoCropHeight"
                :fixedBox="example3.fixedBox"
                :outputType="'jpeg'"
              ></vueCropper>
            </div>
            <div class="my-dialog-btn">
              <button class="hb-btn hb-btn-primary" @click="photoSave">保存</button>
              <button class="hb-btn hb-btn-primary" @click="handleClose('photo')">取消</button>
            </div>
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
  import myConcern from './myConcern.vue';
  import myFans from './myFans.vue';
  import myHB from './myHB.vue';
  import VueCropper from 'vue-cropper';
  import { Tabs, TabPane,Pagination } from 'element-ui';
  export default {
    components: {
      mheader,
      mfooter,
      infoItem,
      myConcern,
      myFans,
      myHB,
      VueCropper,
      ElTabs: Tabs,
      ElTabPane: TabPane,
      ElPagination:Pagination
    },
    data() {
      return {
        activeName: 'first',
        picURL:"",
        userId:this.$session.get('id'),
        summary:"",
        userName:"",
        userCount:"",
        totalAmount:"",
        infoList: [],
        concernList: [],
        concernList1:[],
        hbList: [],
        collectionCount:'',
        fansCount:'',
        followCount:'',
        noticeList:[],
        pagesize: 9 ,//每页展示页数
        pageNum: 0,//总页数
        currentPage: 1,//当前页数
        infoId:'',
        example3: {
          img: '',
          autoCrop: true,
          autoCropWidth: 120,
          autoCropHeight: 120,
          fixedBox: true
        },
        form:{
          weixinNickname:"",
          introduction:""
        },
        close: false,
        photo:false,
        currentTab:'0',
        status:{
          0:{
            pageSize:9,//分页数
            fn:this.myCollect,
            pageNum:null//总页数
          },
          1:{
            pageSize:10,
            fn:this.myFollow,
            pageNum:null
          },
          2:{
            pageSize:10,
            fn:this.myHb,
            pageNum:null
          },
          3:{
            pageSize:10,
            fn:this.myFans,
            pageNum:null
          }
        }
      };
    },
    methods: {
      handleClick(tab) {
        this.currentTab = tab.index
        this.status[this.currentTab]['fn'](1,this.status[this.currentTab]['pageSize'])
        // inital page_num = 1
        // render pageniation every time swich;
        this.pageNum = false;
        setTimeout(() => {
          this.pageNum = this.status[this.currentTab]['pageNum']
          this.pagesize = this.status[this.currentTab]['pageSize']
        }, 0);
      },
      handleOpen(val){
        this[val] = true;
        document.body.style.overflow = 'hidden'
      },
      handleClose(val){
        this[val] = false;
        document.body.removeAttribute('style')
      },
      save(){
        if(this.form.weixinNickname && this.form.introduction){
          this.summaryInfo();
        }
      },
      photoSave(){
        this.$refs.cropper3.getCropBlob((data) => {
          console.log(data);
          let fd = new FormData();
          fd.append("file",data,'.png');
          fd.append("userId",this.userId);
          this.$http.post("user/upload",fd).then(res => {
            this.handleClose('photo');
            this.picURL = res.model.url;
            this.picSave(res.model.url);
          }).catch( res =>{
            this.$message.error(res.msg);
          })
        })
      },
      userInfo(){
        this.$post("user/getPersonalInformation",{userId:this.userId}).then(res => {
          //回填头像

          this.$session.set('userInformation',res.model)

          document.querySelector(".myPhoto").style.background = `url(${res.model.picUrl || "~assets/images/member/default.png"}) no-repeat 100% 100%`;
          //回填个人简介内容
          this.userCount = res.model.amount
          this.userName = res.model.weixinNickname
          this.summary = res.model.introduction
          //回填收藏、粉丝总量
          this.collectionCount = res.model.collectionCount
          this.followCount = res.model.followCount
          this.fansCount = res.model.followCount
          this.status[0]['pageNum'] = res.model.collectionCount - 0
          this.status[1]['pageNum'] = res.model.followCount - 0
          this.status[3]['pageNum'] = res.model.followCount - 0

          this.status[0]['fn'](1,9);
          this.pageNum = this.status[0]['pageNum']
          this.pagesize = this.status[0]['pageSize']
        })
      },
      picSave(picUrl){
        this.$post("user/addOrUpdateUserImg",{userId:this.userId,picUrl}).then(res => {
          this.$router.go(0);
        })
      },
      imgUrl(e){
        // this.example3.img=URL.createObjectURL(e.target.files[0]); //IE11 no support!
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.addEventListener('load',() => {
          this.handleOpen('photo');
          this.example3.img = reader.result
          e.target.value = null
        },false)
      },
      summaryInfo(){
        this.$post("user/addUserInformatian",Object.assign(this.form,{userId:this.userId})).then(res => {
          this.handleClose('close');
          this.$router.go(0);
        }).catch(res =>{
          this.$message.error(res.msg)
        })
      },
      //我的收藏
      myCollect(currentPage,pageSize){
        this.$post("user/getUserCollection",{userId:this.userId,pageSize:pageSize,pageNum:currentPage}).then(res => {
          this.infoList = res.model.list;
        })
      },
      //我的HB
      myHb(currentPage,pageSize){
        this.$post("user/getMyAmount",{userId:this.userId,pageSize:pageSize,pageNum:currentPage}).then(({model}) => {
           this.hbList = model.list;
           this.totalAmount = model.totalAmount;
           this.pageNum = model.totalCount;
           this.pagesize = pageSize;
        })
      },
      //我的关注
      myFollow(currentPage,pageSize){
        this.$post("user/getUserFollow",{userId:this.userId,pageSize:pageSize,pageNum:currentPage}).then(res => {
          this.concernList = res.model.list;
        })
      },
      //我的粉丝
      myFans(currentPage,pageSize){
        this.$post("user/getUserFans",{userId:this.userId,pageSize:pageSize,pageNum:currentPage}).then(res => {
          this.concernList1 = res.model.list;
        })

      },
      //通知
      notice(){
        this.$post("notice/findNoticeList",{userId:this.userId,pageSize:'1',pageNum:'1'}).then(res => {
          this.noticeList = res.model.notices;
        })
      },
      currentChange(pageNum){
        this.status[this.currentTab]['fn'](pageNum,this.status[this.currentTab]['pageSize'])

      },
      carceMycollect(infoId){
      this.$post("article/collectionArticle",{userId:this.userId,articleId:infoId}).then( res =>{
//        this.$router.go(0);
//        this.infoList.splice(index,1)
        this.collectionCount--;
        let index;
        for(let i = 0;i < this.infoList.length;i++){
          if(this.infoList[i].id === infoId) index = i
          break;
        }
        this.infoList.splice(index,1)

      }).catch(res =>{
        this.$message.error(res.msg)
      })
      }
    },
    created(){
      this.userInfo();
      this.notice();
    },
  }
</script>

<style>
  .resumeCont .el-tabs__item.is-active {
    color: #061D9A;
  }
  .resumeCont .el-tabs__active-bar {
    background-color: #061D9A;
    font-weight: 700;
  }
  .resumeCont .el-tabs__nav-wrap::after {
    background-color: #F9F9F9;
  }
  .resumeCont .el-tabs__item {
    font-size: 16px;
    font-weight: 700;
    width: 130px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .resumeCont .el-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: none;
  }
  .resumeCont .el-tabs__nav-scroll {
    width: 100%;
    background: #F9F9F9;
  }
  .resumeCont .el-tabs__content{
    min-height: 740px;
  }
  .photo-wrapper .vue-cropper{
    background-image: none;
  }
  .photo-wrapper .cropper-modal{
    background: 0;
  }
  .pageConten .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #061D9A;
    color: #fff;
  }
</style>
<style lang="less" scoped>
  @import './myDialog.less';
</style>


<style scoped>
  .inner {}
  .myPage {
    width: 890px;
  }
  .photo {
    box-sizing: border-box;
    padding: 30px 15px;
  }
  .photo .myPhoto{
    width: 120px;
    height: 120px;
    position: relative;
    /*background: url("../../assets/images/member/default.png") no-repeat 100% 100%;*/
  }
  .photo .myPhoto input{
    width: 120px;
    height: 120px;
    cursor: pointer;
    position: absolute;
    opacity: 0;
  }
  .photo .resume {
    margin-left: 160px;
    width: 480px;
  }
  .resume .name {
    font-size: 20px;
    font-weight: 700;
    width: -1px;
  }
  .resume p {
    margin-bottom: 12px;
  }
  .resume p:nth-child(2) {
    color: #666;
    font-size: 12px;
  }
  .resume p:nth-child(3) {
    font-size: 14px;
    color: #000;
  }
  .resume .summary{
    height: 50px;
  }
  .resume .name img {
    vertical-align: baseline;
    margin-left: 25px;
  }
  .resumeCont {
    width: 100%;
    margin-top: 28px;
  }
  .resumeCont .carceCollect{
    /*border:2px solid red;*/
    position: relative;
  }
  .resumeCont .carceCollect1{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border:1px solid #ccc;
    border-radius: 50%;
    font-size: 14px;
    text-align: center;
    color: #ccc;
    position: absolute;
    top: 20%;
    right: 0;
  }
  .resumeCont .carceCollect1:hover{
    cursor: pointer;
  }
  .resumeCont .myConcern {
    width: 820px;
  }
  .resumeCont .myConcern li {
    width: 402px;
    height: 120px;
    margin-bottom: 20px;
  }
  .resumeCont .myConcern li:nth-child(2n+1) {
    float: left;
  }
  .resumeCont .myConcern li:nth-child(2n) {
    float: right;
  }
  .notice {
    width: 300px;
    box-sizing: border-box;
    padding: 30px 30px;
  }
  .notice .top .fl {
    font-size: 20px;
    font-weight: 700;
  }
  .notice .top .more a {
    font-size: 14px;
    ;
    color: #000;
  }
  .notice ul {
    margin-top: 10px;
    overflow: hidden;
  }
  .notice ul li {
    line-height: 20px;
    padding: 10px 0;
    border-bottom: 1px dashed #ccc;
  }
  .notice li span {
    font-size: 12px;
    color: #aaa;
  }
  .photo-wrapper{
    width: 260px;
    height: 260px;
    margin: 0 auto;
  }

  .pageConten{
    width: 100%;
    display: flex;
    justify-content: center;
    padding:10px 0 20px 0;
  }
</style>
