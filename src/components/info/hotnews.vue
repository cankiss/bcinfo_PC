<template>
    <div class="inner">
        <myTips :tips="tips"></myTips>
        <div class="innerBody">
            <div class="wordList">
                <div class="listHeader">
                    <div class="swiper">
                        <infoSwiper :width="swiperwidth" :height="swiperheight" :linecolor="linecolor" :data="banner"></infoSwiper>
                    </div>
                    <div class="news">
                        <router-link v-for="(item,index) in newsList" :key="index" v-bind="{to:'/article/' + item.id}">
                            <img :src="item.deployImage" alt="">
                            <p>{{ item.title }}</p>
                        </router-link>
                    </div>
                </div>
                <div class="listFooter">
                    <div class="clomList">
                        <wordList :worldList="leftList"></wordList>
                    </div>
                    <div class="clomList">
                        <wordList :worldList="middleList"></wordList>
                    </div>
                    <div class="clomList">
                        <wordList :worldList="rightList"></wordList>
                    </div>
                </div>
            </div>
            <div class="newFlash">
                <flash :newFlash="newFlash" :hotReport="hotReport"></flash>
            </div>
        </div>
    </div>
</template>

<script>
    import myTips from "./element/tips";
    import wordList from "./element/wordList";
    import infoSwiper from "./element/infoSwiper";
    import flash from "./element/flash";
    export default{
        data(){
            return{
                tips:{
                    content:"新闻热点",
                    backgroundImg:"linear-gradient(-180deg, #F23030 0%, #F23066 100%)"
                },
                swiperwidth:"629px",
                swiperheight:"280px",
                linecolor:"#F23030",
                banner:[],//轮播数据
                newsList:[],//banner旁边的三个图
                newFlash:[],//快讯列表
                hotReport:[],//热点报道
                leftList:[],//左侧文章列表
                middleList:[],//中间视频列表
                rightList:[]//右侧文章列表
            }
        },
        created(){
            this.getBanner();//获取轮播图和旁边的三个图
            this.getNewsFlash();//获取快讯
            this.gethotReport();//获取热点报道
            this.getWorldList();//获取左右两侧列表
            this.getMiddleList();//获取中间列表
        },
        methods:{
            getBanner(){//获取banner
                this.$post("article/findNewsBanner").then( res => {
                    this.banner = res.model.articlesOne;
                    this.newsList = res.model.articlesTwo;
                }).catch( err => {
                    this.$message.error({
                        message:err.msg,
                        center:true
                    })
                });
            },
            getInformationList(plate,type,pageSize){
                let data = {
                    columns:"news",
                    plate:plate,
                    type:type,
                    pageSize:pageSize,
                    pageNum:1
                };
                this.$post("article/findInformation",data).then( res => {
                    if(plate == "NewsFlash"){
                        this.newFlash = res.model.articles;
                    }else if(plate == "reports"){
                        this.hotReport = res.model.articles;
                    }else if(plate == "VideoNews"){
                        this.middleList = res.model.articles;
                    };
                }).catch( err => {
                    this.$message.error({
                        message:err.msg,
                        center:true
                    })
                });
            },
            getNewsFlash(){//获取快讯
                this.getInformationList("NewsFlash",1,5);
            },
            gethotReport(){//获取热点报道
                this.getInformationList("reports",1,1);
            },
            getWorldList(){//获取左侧和右侧文章列表
                let data = {
                    pageSize:0,
                    pageNum:1
                };
                this.$post("article/findNewsHot",data).then( res => {
                    console.log(res);
                    this.leftList = res.model.left;
                    this.rightList = res.model.right;
                }).catch( err => {
                    this.$message.error({
                        message:err.msg,
                        center:true
                    })
                });
            },
            getMiddleList(){//获取中间视频文章列表
                this.getInformationList("VideoNews",2,0);
            }
        },
        components:{
            myTips,
            wordList,
            infoSwiper,
            flash
        }
    }
</script>

<style scoped>
    .inner{
        position:relative;
        background:#fff;
        box-shadow: 0 2px 4px 0 rgba(231,231,231,0.50);
        margin-bottom:40px;
        padding-left:50px;
        box-sizing:border-box;
    }
    .innerBody{
        display:flex;
    }
    .wordList{
        width:822px;
        padding-right:20px;
        box-sizing:border-box;
        border-right:1px solid #F2F2F2;
    }
    .listHeader{
        height:280px;
        display:flex;
        justify-content: space-between;
        margin-bottom:26px;
    }
    .swiper{
        width:629px;
        background:#ccc;
    }
    .news{
        width:160px;
    }
    .news a{
        display:block;
        width:100%;
        height:86px;
        margin-bottom:10px;
        position:relative;
        overflow:hidden;
    }
    .news a img{
        width:100%;
        height:100%;
    }
    .news a p{
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        height:26px;
        line-height:26px;
        padding:0 10px;
        box-sizing:border-box;
        background:rgba(0,0,0,.6);
        color:#fff;
        font-size:12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .listFooter{
        display:flex;
    }
    .clomList{
        flex:1;
        padding:0 10px;
        border-right: 1px solid #F2F2F2;
    }
    .clomList:last-child{
        border-right:0;
    }
    .newFlash{
        flex:1;
        padding:30px 50px 0 30px;
    }
</style>
