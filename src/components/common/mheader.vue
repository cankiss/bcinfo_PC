<template>

  <header id="header">
    <div class="inner clearfix">
      <h1 id="logo" class="fl">
        <img src="@/assets/images/common/logo.png" alt="">
      </h1>
      <nav id="nav" class="fl">
        <ul class="clearfix">
          <li :class="{active: activeMenuName == 'home'}">
            <router-link to="/">首页</router-link>
          </li>
          <li :class="{active: activeMenuName == 'market'}">
            <router-link to="/market">行情</router-link>
          </li>
          <li :class="{active: activeMenuName == 'info'}">
            <router-link to="/info">资讯</router-link>
          </li>
        </ul>
      </nav>
      <div id="topBar" class="fr">
        <div id="loginBar" v-if="!userId">
          <router-link to="/login">登录</router-link>
          <a href="../../../static/src/html/register.html">注册</a>
        </div>
        <div id="userBar" v-else>
          <span class="userPic">
            <img :src="userPic" alt="">
          </span>
          <span class="userName font-14" @mouseover="mouseover" @mouseout="mouseout">
            {{ userName }}
            <img :class="{router:upDown}" src="@/assets/images/common/icon-user-arrow-down.svg" alt="">
            <ul v-if="upDown">
              <li>
                <a href="../../../static/src/html/findPassword.html">账户安全</a>
              </li>
              <li v-if="authenState == 0 || authenState == 3">
                <a href="../../../static/src/html/identityAuthentication.html">身份认证</a>
              </li>
              <li>
                <router-link to="/member">个人主页</router-link>
              </li>
            </ul>
          </span>
          <span class="font-white font-14">{{ authenState | getStatus }}</span>
          <span class="notice">
            <router-link to="/sysNotice">
              <img src="@/assets/images/common/icon-notice.svg" alt="">
              <i v-if="unread"></i>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </header>

</template>

<script>

  export default {
    data() {
      return {
        userName: "",//用户名
        userPic: require("@/assets/images/common/icon-user.svg"),//默认头像
        upDown: false,//箭头方向
        unread: false,//是否有未读信息 
        authenState: "",//认证状态
        userId: this.$session.get("id")//判断用户是否已登录
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      mouseover() {
        this.upDown = true;
      },
      mouseout() {
        this.upDown = false;
      },
      getUserInfo() {
        let userInformation = this.$session.get("userInformation");
        if (userInformation) {
          if (userInformation.news == "1") {
            this.unread = true;
          };
          this.userName = userInformation.weixinNickname;
          this.authenState = userInformation.status;
          if (userInformation.picUrl) {
            this.userPic = userInformation.picUrl;
          };
        };
      }
    },
    filters: {
      getStatus(val) {
        // 0 未审核 1：审核中  2：审核通过  3：审核未通过
        let arr = ["未审核", "审核中", "审核通过", "审核未通过"];
        return arr[val];
      }
    },
    name: 'mheader',
    props: {
      activeMenuName: {
        type: String,
        default: 'home'
      }
    }
  }

</script>

<style scoped>
  #header {
    background-color: #1c294c;
  }

  #logo {
    font-size: 46px;
    color: #fff;
    line-height: 80px;
    width: 140px;
    height: 60px;
    margin-top: 10px;
  }

  #logo img {
    width: 140px;
    height: 60px;
  }

  #nav {
    margin-left: 50px;
  }

  #nav ul {}

  #nav ul li {
    float: left;
  }

  #nav ul li+li {
    margin-left: 45px;
  }

  #nav ul li a {
    position: relative;
    display: block;
    padding: 0 8px;
    font-size: 18px;
    color: #fff;
    line-height: 80px;
  }

  #nav ul li:last-child a {
    padding-right: 24px;
  }

  #nav ul li:last-child a:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 8px;
    width: 0;
    height: 0;
    margin-top: -3px;
    border: 6px solid transparent;
    border-top-color: #fff;
  }

  #nav ul li a:hover:after,
  #nav ul li.active a:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 14px;
    height: 4px;
    background-color: #fff;
    border-radius: 2px;
  }

  #topBar {
    padding-top: 25px;
  }

  #loginBar {}

  #loginBar a {
    display: inline-block;
    box-sizing: border-box;
    width: 60px;
    height: 30px;
    border: 1px solid #fff;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    line-height: 28px;
    text-align: center;
    background-color: transparent;
  }

  #loginBar a+a {
    margin-left: 14px;
  }

  #loginBar a:first-child {
    color: #033593;
    background-color: #fff;
  }

  #userBar span {
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
  }

  #userBar span.userPic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
  }

  #userBar span.userPic img {
    width: 30px;
    height: 30px;
  }

  #userBar span.userName,
  #userBar span.notice {
    position: relative;
    cursor: pointer;
  }

  #userBar span.userName {
    width: 160px;
    height: 36px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    color: #FFFFFF;
    line-height: 36px;
    text-indent: 10px;
  }

  #userBar span.userName img {
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -10px;
    transition: all .5s;
  }

  #userBar span.userName img.router {
    transform: rotate(-180deg)
  }

  #userBar span.userName ul {
    background: #fff;
    border: 1px solid #EBEBEB;
    box-shadow: 0 2px 4px 0 rgba(213, 213, 213, 0.50);
    position: absolute;
    top: 36px;
    left: -1px;
    width: 100%;
    z-index: 99;
  }

  #userBar span.userName li {
    font-size: 14px;
    color: #232323;
    line-height: 40px;
    border-bottom: 1px solid #F2F2F2;
  }

  #userBar span.userName li a {
    color: #232323;
    display: block;
    width: 100%;
    height: 100%;
  }

  #userBar span.userName li:last-child {
    border-bottom: 0;
  }

  #userBar span.notice i {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #EA0540;
    border-radius: 50%;
    top: 0;
    right: -5px;
  }
</style>