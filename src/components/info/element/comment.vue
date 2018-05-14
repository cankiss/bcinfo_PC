<template>
    <div>
        <p class="font-16 font-000 mb-20">发表评论</p>
        <div class="inputBox">
            <div class="user">
                <img :src="picUrl" alt="">
            </div>
            <div class="ipt">
                <textarea v-model="commentCount" maxlength="800" placeholder="写下你的评论..."></textarea>
            </div>
        </div>
        <div class="commentBtn">
            <button @click="comment">评论</button>
        </div>
        <div class="selectCommon clearfix pb-10" v-if="wordList.length > 0">
            <div class="selectTitle">
                <span>精选评论</span>
            </div>
            <ul>
                <discuss v-for="(item,index) in wordList" :key="index" :item="item"></discuss>
            </ul>
            <div class="pageFooter">
                <Pagination class="myPageFooter" samll layout="prev, pager, next" :total="totalPage" @current-change="sizeChange" :current-page="currentPage"></Pagination>
            </div>
        </div>
        <div class="dialog" v-if="dislogShow">
            <div class="tcCount">
                <a href="javascript:;" @click="closeDialog">×</a>
                <img src="@/assets/images/info/reward.png" alt="">
                <p class="rmb">HBCandy
                    <span>+5</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import discuss from "./discuss";
    import { Pagination } from "element-ui";
    export default {
        data() {
            return {
                picUrl: require("@/assets/images/common/icon-user.svg"),
                wordList: [],//精选评论列表
                commentCount: "",//发表评论的内容
                dislogShow: false,//是否显示弹窗
                totalPage: 1,//评论总总页数
                currentPage: 1,//当前页数
                pageSize: 10//每页多少条
            }
        },
        created() {
            this.getCommentList();
            this.getUserUrl();
        },
        methods: {
            sizeChange(val) {//分页切换
                this.currentPage = val;
                this.getCommentList();
            },
            getUserUrl() {
                let userInformation = this.$session.get("userInformation");
                if (userInformation && userInformation.picUrl) {
                    this.picUrl = userInformation.picUrl;
                };
            },
            comment() {//发表评论方法
                if (!this.userId) {
                    this.$router.push("/login");
                    return false;
                };
                if (this.commentCount.trim().length > 800) {
                    this.$message.error({
                        message: "评论内容不得超过800字",
                        center: true
                    });
                    return false;
                };
                if (this.commentCount.trim()) {
                    let data = {
                        articleId: this.articaleId,
                        token: this.userId,
                        comment: this.commentCount
                    };
                    this.$post("article/commentArticle", data).then(res => {
                        this.dislogShow = true;
                        this.commentCount = "";
                        this.currentPage = 1;
                        this.getCommentList();
                    }).catch(err => {
                        this.$message.error({
                            message: err.msg,
                            center: true
                        })
                    });
                } else {
                    this.$message.error({
                        message: "请输入评论内容",
                        center: true
                    });
                }
            },
            closeDialog() {
                this.dislogShow = false;
            },
            getCommentList() {
                let data = {
                    articleId: this.articaleId,
                    pageNumber: this.currentPage,
                    pageSize: this.pageSize
                };
                this.$post("article/getArticleComments", data).then(res => {
                    this.totalPage = Math.ceil(res.model.total / this.pageSize) * 10;
                    this.wordList = res.model.comments;
                }).catch(err => {
                    this.$message.error({
                        message: err.msg,
                        center: true
                    })
                });
            }
        },
        components: {
            discuss,
            Pagination
        },
        props: ["userId", "articaleId"]
    }
</script>

<style scoped>
    .inputBox {
        display: flex;
        justify-content: space-between;
    }

    .user {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
    }

    .user img {
        width: 30px;
        height: 30px;
    }

    .ipt textarea {
        width: 700px;
        height: 100px;
        border: 1px solid #F2F2F2;
        border-radius: 4px;
        resize: none;
        outline: none;
        text-indent: 10px;
    }

    .commentBtn {
        margin-top: 10px;
        padding-right: 20px;
        display: flex;
        justify-content: flex-end;
        padding-bottom: 26px;
    }

    .commentBtn button {
        background-image: linear-gradient(90deg, #435EF2 0%, #071E9C 100%);
        border-radius: 4px;
        width: 80px;
        height: 30px;
        border: 0;
        outline: none;
        font-size: 14px;
        color: #FFFFFF;
        cursor: pointer;
    }

    .commentBtn button:hover {
        background-image: linear-gradient(124deg, #1933C1 0%, #04136A 100%);
    }

    /* .selectCommon {
        margin-top: 26px;
    } */

    .selectTitle {
        position: relative;
        height: 1px;
        background: #F2F2F2;
        margin-bottom: 30px;
    }

    .selectTitle span {
        display: inline-block;
        width: 100px;
        height: 24px;
        background: #fff;
        line-height: 24px;
        font-size: 18px;
        color: #000000;
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -12px;
    }

    .selectCommon ul {
        padding-bottom: 20px;
    }

    .dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
    }

    .tcCount,
    .tcCount a {
        position: absolute;
    }

    .tcCount {
        width: 400px;
        height: 200px;
        padding-top: 70px;
        background: #fff;
        border-radius: 20px;
        top: 50%;
        left: 50%;
        margin-top: -135px;
        margin-left: -200px;
    }

    .tcCount a {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        top: 0px;
        right: 0;
        color: #000;
        font-size: 40px;
    }

    .tcCount img {
        display: block;
        margin: 0 auto;
    }

    .tcCount .rmb {
        text-align: center;
        font-size: 30px;
        color: #333333;
    }

    .tcCount .rmb span {
        color: #f23030;
    }

    .pageFooter {
        float: right;
    }
</style>