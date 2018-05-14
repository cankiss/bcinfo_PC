<template>
    <div>
        <div class="head">
            <span class="authors">作者简介</span>
            <span v-if="haveFollow" class="havefollow" ref="havefollow" @mouseover="mouseIn" @mouseout="mouseOut" @click="follow(2)">√ 已关注</span>
            <span v-else class="follow" @click="follow(1)">+ 关注</span>
            <div class="pic">
                <div class="head_img">
                    <img :src="autherPicUrl" alt="">
                </div>
                <span class="head_name">{{ authorName }}</span>
            </div>
            <p class="msg">{{ autherIntroduction }}</p>
        </div>
        <div class="head">
            <h1 class="oth_title">作者其他文章</h1>
            <div class="others" v-for="(item,index) in elseArticle" :key="index">
                <router-link v-bind="{to:'/article/' + item.id}">
                    <div class="other_img">
                        <img :src="item.deployImage" alt="">
                    </div>
                    <ul>
                        <li>{{ item.title }}</li>
                        <li>{{ item.releaseTime | momentTime }}</li>
                    </ul>
                </router-link>
            </div>
        </div>
        <!-- <div class="advertisement">
            广告位
        </div> -->
    </div>
</template>


<script>
    export default {
        data() {
            return {
                haveFollow: false,//是否关注
                authorName:"",//作者姓名
                autherIntroduction:"",//作者简介
                autherPicUrl:"",//作者头像
                elseArticle:[],//作者相关文章
                publisherId:"",
                userId:this.$session.get("id"),//用户id
            }
        },
        created(){
        },
        methods: {
            follow(type) {//关注作者功能
                if(!this.userId){
                    this.$router.push("/login");
                    return false;
                };
                let data = {
                    userId:this.userId,
                    fansId:this.publisherId,
                    type:type
                };
                this.$post("user/followOrCancel",data).then( res => {
                    if(type == 1){
                        this.haveFollow = true;
                    }else if(type == 2){
                        this.$refs.havefollow.innerHTML = "+ 关注";
                        this.haveFollow = false;
                    };
                }).catch(err => {
                    this.$message.error({
                        message: err.msg,
                        center: true
                    })
                });
            },
            mouseIn() {//鼠标移入
                this.$refs.havefollow.innerHTML = "取消关注";
            },
            mouseOut() {//鼠标移出
                this.$refs.havefollow.innerHTML = "√ 已关注";
            }
        }
    }
</script>

<style scoped>
    .advertisement {
        width: 240px;
        height: 80px;
        background: blue;
        font-size: 20px;
        line-height: 80px;
        text-align: center;
        color: #fff;
        margin: 20px auto
    }

    .oth_title {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #000000;
        letter-spacing: 0;
        margin-bottom: 20px
    }

    .others ul {
        float: left;
        margin-left: 10px;
        width: 156px;
    }

    .others ul li:nth-of-type(1) {
        font-family: PingFangSC;
        font-size: 12px;
        color: #000000;
        letter-spacing: 0;
        line-height: 18px;
        height:36px;
        overflow:hidden;
    }

    .others ul li:nth-of-type(2) {
        font-family: PingFangSC;
        font-size: 12px;
        color: #AAAAAA;
        letter-spacing: 0;
        line-height: 18px;
        margin-top: 6px;
    }

    .others {
        height: 80px;
        cursor: pointer;
    }

    .other_img {
        width: 80px;
        height: 60px;
        background: brown;
        float: left;
    }
    .other_img img{
        width: 80px;
        height: 60px;
    }

    .msg {
        margin-top: 20px;
    }

    .pic {
        margin-top: 24px;
        height: 60px;
    }

    .head {
        padding: 25px 24px 0 30px;
    }

    .head_img {
        height: 60px;
        width: 60px;
        float: left;
    }

    .head_img img{
        width:60px;
        height:60px;
    }

    .head_name {
        margin-left: 11px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #000000;
        letter-spacing: 0;
        float: left;
        font-weight: 500
    }

    .authors {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #000000;
        letter-spacing: 0;
        font-weight: 700;

    }

    .follow,
    .havefollow {
        text-align: center;
        line-height: 30px;
        float: right;
        width: 80px;
        height: 30px;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        letter-spacing: 0;
        cursor: pointer
    }

    .follow {
        background-image: linear-gradient(90deg, #435EF2 0%, #071E9C 100%);
        color: #FFFFFF;
    }

    .havefollow {
        color: #061D9A;
        background: transparent;
        border: solid 1px #D4D8DC;
    }

    .havefollow:hover {
        background: #D4D8DC;
        color: #fff;
    }

    .follow:hover {
        background-image: linear-gradient(124deg, #1933C1 0%, #04136A 100%);
    }
</style>