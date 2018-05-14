<template>
    <div class="temp">
        <mHeader activeMenuName="info"></mHeader>
        <div class="inner">
            <div class="articale">
                <div class="articaleTitle">
                    <h6 class="font-24 font-000" ref="articaleTitle">{{ infoArticle.title }}</h6>
                    <div class="articaleInfo">
                        <span>作者：{{ infoArticle.author }}</span>
                        <span v-if="infoArticle.source">来源：{{ infoArticle.source }}</span>
                        <span>{{ infoArticle.releaseTime | momentTime }}</span>
                        <span>
                            <img src="@/assets/images/info/icon-yulan.svg" alt=""> {{ infoArticle.falseBrowse || 0 | numberFormat }}
                        </span>
                        <span>
                            <img src="@/assets/images/info/icon-pinglun.svg" alt=""> {{ infoArticle.commentCount || 0 | numberFormat }}
                        </span>
                        <span ref="collection" class="cursor" @click="collection" style="display:inline-block;width:70px;">
                            <img v-if="componentNum" src="@/assets/images/info/btn-shoucang-on.svg" alt="">
                            <img v-else src="@/assets/images/info/btn-shoucang.svg" alt=""> {{ componentNum ? "已收藏" : "收藏" }}
                        </span>
                    </div>
                </div>
                <div class="articaleBody" v-html="articleCount"></div>
                <div class="articaleFooter">
                    <span @click="pointOfPraise(1)">
                        <img v-if="isthumbsUp" src="@/assets/images/info/btn-dianzan-on.svg" alt="">
                        <img v-else src="@/assets/images/info/btn-dianzan-gray.svg" alt=""> {{ thumbsUpNum | numberFormat }}
                    </span>
                    <span @click="pointOfPraise(2)">
                        <img v-if="isstepOn" src="@/assets/images/info/btn-cai-on.svg" alt="">
                        <img v-else src="@/assets/images/info/btn-cai-gray.svg" alt=""> {{ stepOnNum | numberFormat }}
                    </span>
                    <span class="shareBtn" @mouseover="showShare" @mouseout="hideShare">
                        <img src="@/assets/images/info/btn-share.svg" alt="">分享给朋友
                        <div class="shareContent" v-if="showShareContent">
                            <ul>
                                <li>
                                    <img src="@/assets/images/info/icon-weixin.svg" alt="">微信扫一扫
                                </li>
                                <li>
                                    <qrcode :value="localVal" tag="img"></qrcode>
                                </li>
                                <li>
                                    <a href="javascript:;" target="_blank" @click="shareQzone">
                                        <img src="@/assets/images/info/icon-qq.svg" alt="">QQ空间</a>
                                </li>
                                <li>
                                    <a href="javascript:;" target="_blank" @click="shareWeibo">
                                        <img src="@/assets/images/info/icon-weibo.svg" alt="">新浪微博</a>
                                </li>
                            </ul>
                        </div>
                    </span>
                </div>
                <div class="relevant" v-if="relevantOne[0]">
                    <p class="font-16 font-000 mb-20">相关文章</p>
                    <div class="relevantBody">
                        <wordList v-if="relevantOne[0]" :worldList="relevantOne"></wordList>
                        <wordList v-if="relevantTwo[0]" :worldList="relevantTwo"></wordList>
                        <wordList v-if="relevantStree[0]" :worldList="relevantStree"></wordList>
                    </div>
                </div>
                <div class="comment">
                    <comment :userId="userId" :articaleId="articaleId"></comment>
                </div>
            </div>
            <div class="author">
                <information ref="authorInfo"></information>
            </div>
        </div>
        <mfooter></mfooter>
    </div>
</template>

<script>
    import mHeader from "~/common/mheader";
    import mfooter from "~/common/mfooter";
    import wordList from "./element/wordList";
    import comment from "./element/comment";
    import information from "./element/information";
    import qrcode from "@xkeshi/vue-qrcode";
    export default {
        data() {
            return {
                showShareContent: false,
                componentNum: false,//是否收藏
                thumbsUpNum: "0",//点赞数量
                isthumbsUp: false,//是否点赞
                isstepOn: false,//是否踩
                stepOnNum: "0",//踩的数量
                localVal: location.href,//当前页面网址
                articaleId: this.$route.params.id,//文章id
                userId: this.$session.get("id"),//用户id
                articleCount: "",//文章内容详情
                infoArticle: "",//文章信息
                relevantOne: [],//相关文章1
                relevantTwo: [],//相关文章2
                relevantStree: [],//相关文章3
            }
        },
        created() {
            this.getArticle()
        },
        methods: {
            getArticle() {//获取文章详情
                let data = {
                    articleId: this.articaleId,
                };
                if(this.userId){
                    data.userId = this.userId
                };
                this.$post("article/getArticle", data).then(res => {
                    this.$refs.authorInfo.haveFollow = !!res.model.isFans;
                    this.$refs.authorInfo.publisherId = res.model.autherId;
                    this.$refs.authorInfo.authorName = res.model.autherName;
                    this.$refs.authorInfo.autherIntroduction = res.model.autherIntroduction;
                    if(res.model.autherPicUrl){
                        this.$refs.authorInfo.autherPicUrl = res.model.autherPicUrl;
                    }else{
                        this.$refs.authorInfo.autherPicUrl = require("@/assets/images/common/icon-user.svg");
                    };
                    this.$refs.authorInfo.elseArticle = res.model.elseArticles;
                    this.infoArticle = res.model.bcinfoArticle;
                    this.articleCount = res.model.contentData.content;
                    this.componentNum = !!res.model.collStatus;
                    if (res.model.isApprove == "0") {
                        this.isthumbsUp = false;
                        this.isstepOn = false;
                    } else if (res.model.isApprove == "1") {
                        this.isthumbsUp = true;
                        this.isstepOn = false;
                    } else if (res.model.isApprove == "2") {
                        this.isthumbsUp = false;
                        this.isstepOn = true;
                    };
                    this.thumbsUpNum = this.infoArticle.approve || 0;
                    this.stepOnNum = this.infoArticle.oppose || 0;
                    this.relevantOne.push(res.model.equalArt[0]);
                    this.relevantTwo.push(res.model.equalArt[1]);
                    this.relevantStree.push(res.model.equalArt[2]);
                }).catch(err => {
                    this.$message.error({
                        message: err.msg,
                        center: true
                    })
                });
            },
            showShare() {//鼠标移入显示分享组件
                this.showShareContent = true;
            },
            hideShare() {//鼠标离开隐藏分享组件
                this.showShareContent = false;
            },
            shareQzone() {//分享到QQ空间
                let base = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                    title = encodeURI(this.$refs.articaleTitle.innerHTML),
                    url = encodeURIComponent(location.href);
                let shareUrl = `${base}?title=${title}&desc=&summary=&site=&url=${url}`;
                window.open(shareUrl, "_blank");
            },
            shareWeibo() {//分享到微博
                let base = "http://service.weibo.com/share/share.php",
                    appkey = encodeURI("火链网"),
                    title = encodeURI(this.$refs.articaleTitle.innerHTML),
                    url = encodeURIComponent(location.href);
                let shareUrl = `${base}?appkey=${appkey}&title=${title}&url=${url}&searchPic=true`;
                window.open(shareUrl, "_blank");
            },
            collection() {//收藏功能
                // 收藏功能要先判断是否已登陆
                if (!this.userId) {
                    this.$router.push("/login");
                    return false;
                };
                let data = {
                    articleId:this.articaleId,
                    userId:this.userId
                };
                this.$post("article/collectionArticle",data).then( res => {
                    this.componentNum = res.model == 1 ? true : false;
                }).catch(err => {
                    this.$message.error({
                        message: err.msg,
                        center: true
                    })
                });
            },
            pointOfPraise(type){//点赞和踩的功能
                if (!this.userId) {//判断是否登录
                    this.$router.push("/login");
                    return false;
                };
                let data = {
                    articleId: this.articaleId,
                    token: this.userId,
                    type: type
                };
                this.$post("article/likeArticle", data).then(res => {
                    if(type == 1){//1是赞 2是踩
                        this.isthumbsUp = !!res.model.isApprove;
                        this.thumbsUpNum = res.model.approve;
                    }else if(type == 2){
                        this.isstepOn = !!res.model.isApprove;
                        this.stepOnNum = res.model.oppose;
                    };
                }).catch(err => {
                    this.$message.error({
                        message: err.msg,
                        center: true
                    })
                });
            }
        },
        watch: {
            '$route':(newval, oldval) => {
                if(newval !== oldval){
                    window.location.reload();
                } 
            }
        },
        components: {
            mHeader,
            mfooter,
            wordList,
            comment,
            information,
            qrcode
        }
    }
</script>

<style scoped>
    .temp {
        background: #fafbfd;
    }

    .inner {
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
        margin-top: 20px;
        margin-bottom: 40px;
        padding-left: 50px;
        box-sizing: border-box;
        display: flex;
    }

    .author {
        width: 300px;
        background: #EDF1F4;
    }

    .articale {
        width:840px;
        flex: 1;
    }

    .articaleTitle h6 {
        font-weight: normal;
        text-align: center;
        padding-top: 30px;
    }

    .articaleInfo {
        margin-top: 15px;
        text-align: center;
        padding-bottom: 30px;
    }

    .articaleInfo span {
        margin: 0 15px;
    }

    .cursor {
        cursor: pointer;
    }

    .articaleInfo span img,
    .articaleFooter span img {
        vertical-align: middle;
        margin-right: 5px;
    }

    .articaleBody {
        width:100%;
        padding: 0 60px 0 30px;
        box-sizing:border-box;
        overflow:hidden;
    }

    .articaleFooter {
        width: 740px;
        margin: 0 auto;
        margin-top: 20px;
        text-align: center;
    }

    .articaleFooter span {
        margin: 0 30px;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
    }

    .articaleFooter span.shareBtn {
        float: right;
        position: relative;
    }

    .shareContent {
        position: absolute;
        width: 148px;
        height: 227px;
        background: url(../../assets/images/info/sharebg.svg) no-repeat center center;
        background-size: 100% 100%;
        z-index: 99;
        left: 50%;
        top: 30px;
        transform: translateX(-50%);
        cursor: default;
    }

    .shareContent ul {
        padding-top: 30px;
        padding-left: 20px;
        text-align: left;
        font-size: 12px;
        color: #666666;
    }

    .shareContent ul li {
        margin-bottom: 8px;
    }

    .shareContent ul img {
        margin-right: 12px;
    }

    .shareContent ul img.ercode {
        display: block;
        width: 90px;
        height: 90px;
        margin: 0;
        margin-left: 10px;
    }

    .relevant {
        margin-top: 20px;
    }

    .relevantBody {
        padding-right: 50px;
        display: flex;
        justify-content: flex-start;
    }

    .relevantBody ul{
        margin-right:20px;
    }
    .relevantBody ul:last-child{
        margin-right:0;
    }

    .comment {
        padding-right: 80px;
        margin-top: 20px;
    }
</style>