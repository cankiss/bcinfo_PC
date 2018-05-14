<template>

  <footer id="footer">

    <div id="footerNav">
      <div class="inner">
        <p class="clearfix">
          <img src="@/assets/images/common/logo.png" alt="" class="logo">
          <router-link to="/about">关于我们</router-link>
          <a href="javascript:;">版权说明</a>
          <!-- <a href="javascript:;">我要投稿</a> -->
        </p>
      </div>
    </div>

    <div id="copyright">
      <div class="inner">
        <p>Copyright © {{ fullYear }} HuoBC.com - 沪ICP备18007723号-1</p>
      </div>
    </div>

  </footer>

</template>

<script>

  export default {
    data(){
      return{
        fullYear:new Date().getFullYear()
      }
    },
    name: 'mfooter'
  }

</script>

<style scoped>

  #footer {
  }

  #footerNav {
    height:120px;
    background-color: #152c5e;
  }

  #footerNav img.logo{
    float:left;
    width:140px;
    height:60px;
    margin-top:30px;
    margin-right:80px;
    margin-left:30px;
  }

  #footerNav p {
  }

  #footerNav p a {
    float: left;
    font-size: 20px;
    color: #fff;
    line-height: 120px;
  }

  #footerNav p span {
    margin-left: 70px;
    margin-right: 100px;
  }

  #footerNav p a + a {
    margin-left: 30px;
  }

  #copyright {
    background-color: #06194b;
  }

  #copyright p {
    font-size: 12px;
    color: #fff;
    line-height: 60px;
    text-align: center;
  }

</style>
