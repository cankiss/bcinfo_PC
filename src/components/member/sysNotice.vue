<template>
  <div>
    <m-header/>
    <div class="inner">
      <nav>
        <p>通知</p>
      </nav>
      <div class="collapse-container">
        <header>
          <div>
            <el-radio v-model="checkAll" label="1">全部已读</el-radio>
          </div>
          <p>主题</p>
          <p>时间</p>
        </header>
        <div>
          <ul class="collapse-content">
            <li v-for="(item,i) in items" :key="i" @click="show(item)">
              <p>
                <a style="margin-left:15px;"
                :class="(checkAll==='1' || item.status)?'already-reader':'not-reader'"
                href="javascript:;">{{(item.status === '1' || item.isAlready)? '已读':'未读'  }}</a>
              </p>
              <div>
                <p :class="item.toggle ? 'collapse-down' : 'collapse-up'" style="width:692px">
                  {{ item.content }}</p>
              </div>
              <p> {{ item.releaseTime | creatTime }}</p>
              <i :class="item.toggle ? 'icon-down' : 'icon-up'" ></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <m-footer/>
  </div>
</template>

<script>
  import MHeader from '~/common/mheader.vue'
  import MFooter from '~/common/mfooter.vue'
  import {
    Collapse,
    CollapseItem,
    Radio
  } from "element-ui";
  export default {
    data() {
      return {
        checkAll: '',
        content:'',
        releaseTime:'',
        userId:this.$session.get('id'),
        items:[]
      }
    },
    components: {
      MHeader,
      MFooter,
      ElCollapse: Collapse,
      ElCollapseItem: CollapseItem,
      ElRadio: Radio
    },
    methods:{
      show(item) {
        item.toggle = !item.toggle
        this.checkAll === '' && (item.status = true)
        this.items.every(_ => _.status) && (this.checkAll = '1')
      },
      //通知
      noticeList(){
        this.$post("notice/findNoticeList",{userId:this.userId}).then(res => {
//          this.items = res.model.notices;
          res.model.notices.every(_ => _.status) && (this.checkAll = '1');
          res.model.notices.forEach(item => {
            this.items.push(Object.assign(item,{toggle:false}));
           
          })
        })
      }
      
    },
    created(){
      this.noticeList();
    }
    
  }
</script>

<style lang="less">
  .collapse-container .el-radio {
    color: @source;
  }
  .collapse-container {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #F23030;
      background: #fff;
    }
    .el-radio__input.is-checked+.el-radio__label {
      color: @source;
    }
    .el-radio__inner::after {
      width: 6px;
      height: 6px;
      background-color: #F23030;
    }
  }
</style>


<style lang="less" scoped>
  @flex-1: 12%;
  @flex-2: 73%;
  @flex-3: 15%;
  @padding:40px;
  .inner {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(231, 231, 231, 0.50);
    min-height: 800px;
    nav {
      width: 1130px;
      margin: 0 auto;
      background: #F9F9F9;
      height: 50px;
      p {
        width: 110px;
        line-height: 47px;
        font-size: 24px;
        color: #061D9A;
        margin-left: 23px;
        border-bottom: 3px solid #061D9A;
        text-align: center;
      }
    }
    header {
      height: 40px;
      padding: 0 @padding;
      display: flex;
      align-items: center;
      color: @source;
      div {
        color: @source;
        flex-basis: @flex-1
      }
      p:nth-of-type(1) {
        flex-basis: @flex-2
      }
      p:nth-of-type(2) {
        flex-basis: @flex-3
      }
    }
    .collapse-container {
      width: 1107px;
      margin: 20px auto 0;
      min-height: 400px;
      border: 1px solid #f2f2f2;
      .collapse-content>li:nth-child(even){
        background-color: #f8fbff;
      }
      .collapse-content>li:nth-child(odd) {
        border-top:1px solid #f2f2f2;
        border-bottom:1px solid #f2f2f2;
      }
      .collapse-content>li {
        display: flex;
        align-items: center;
        padding: 0 @padding;
        min-height: 48px;
        overflow: hidden;
        cursor: pointer;
        p{
          line-height:28px;
          // transition: line-height .2s;
          a {
            display: inline-block;
            width: 40px;
            line-height:20px;
            font-size:12px;
            text-align:center;
            border-radius: 4px;
            color:#fff;
          }
          a.not-reader{
            background:#EA0540;
          }
          a.already-reader{
            background:#D8D8D8;
          }
        }
        p.collapse-up {
          height: 48px;
          overflow: hidden;
          line-height: 48px;
        }
        p.collapse-down {
          overflow: unset;
          line-height:28px;
        }
        p:nth-child(1) {
          flex-basis: @flex-1;
        }
        p:nth-child(2) {
          flex-basis: @flex-2;
        }
        p:nth-child(3) {
          flex-basis: @flex-3;
          text-align:center;
        }
        i{
          display: block;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        i.icon-up {
          background:url('~assets/images/member/icon-notice-zhankai-16x16.svg') no-repeat center;
        }
        i.icon-down {
          background:url('~assets/images/member/icon-notice-shouqi-16x16.svg') no-repeat center;
        }
      }
    }
  }
</style>
