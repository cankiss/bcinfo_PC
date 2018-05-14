<template>
  
  <div class="concernItem clearfix">
    <div class="concernItem-left clearfix">
      <img :src="imgSrc" alt="" class="fl">
      <div class="txt fr">
        <p><a href="javascript:;">{{ link }} </a></p>
        <p class="txt-word"> {{ txtWord }}</p>
      </div>
    </div>
    
    <div class="concernItem-right fr">
      <div class="follow" v-show="isShow"> 已关注 </div>
      <div class="check" @click="checkId(encryptionId)"> 查看 </div>
    </div>
  </div>

</template>

<script>
  
  export default {
    name: 'concernItem',
    props: {
      imgSrc: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      },
      txtWord: {
        type: String,
        default: ''
      },
      encryptionId:{
        type: String,
        default: ''
      },
      isShow:{
        type:Boolean,
        default: true
      },
      flag:{
        type: String,
        default: ''
      }
    },
    methods: {
      checkId(encryptionId){
        this.$session.set('encryptionId',encryptionId);
        if(this.flag == '1'){
          this.$router.push('/member');
        }else{
          this.$router.push('/otherMember');
        }
      }
    }
  }

</script>

<style lang="less" scoped>
  .concernItem{
    width: 400px;
    height: 120px;
    margin-bottom: 20px;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    .concernItem-left{
      float: left;
      width: 280px;
      height: 120px;
      border-right: 1px dashed  #F2F2F2;
      box-sizing: border-box;
      padding: 18px 20px;
      img{
        display: block;
        width: 80px;
        height: 80px;
      }
      .txt{
        font-size: 12px;
        width: 150px;
        margin-top: 10px;
        a{
          color: #061D9A;
          font-size: 14px;
        }
        .txt-word{
          margin-top: 5px;
          color: #666666;
          height: 51px;
          /*display: -webkit-box;*/
          /*-webkit-box-orient: vertical;*/
          /*-webkit-line-clamp: 3;*/
          overflow: hidden;
        }
      }
    }
    .concernItem-right{
      width: 120px;
      height: 120px;
      text-align: center;
      padding:25px 25px;
      box-sizing: border-box;
      .follow,.check{
        width: 60px;
        height: 24px;
        line-height: 24px;
        border:1px solid #EAEAEA;
        border-radius: 4px;
        font-size: 12px;
        color: #000;
      }
      .check{
        margin-top: 15px;
      }

    }
  }


</style>
