<template>
    <ul>
        <li v-for="(item,index) in worldList" :key="index">
            <router-link v-bind="{to:'/article/' + item.id}">
                <img :src="item.deployImage" alt="">
                <div class="cardBody">
                    <h6>{{ item.title }}</h6>
                    <p>
                        <img src="@/assets/images/info/icon-yulan.svg" alt="">
                        <span>{{ item.falseBrowse || 0 | numberFormat }}</span>
                        <img src="@/assets/images/info/icon-pinglun.svg" alt="">
                        <span>{{ item.commentCount || 0 | numberFormat }}</span>
                        <img class="lastChild" src="@/assets/images/info/icon-dianzan.svg" alt="">
                        <span>{{ item.approve || 0 | numberFormat }}</span>
                    </p>
                </div>
                <div class="cardFooter">
                    <p>来源：{{ item.author }}</p>
                    <p>{{ item.releaseTime | momentTime }}</p>
                </div>
                <div class="playBtn" v-if="item.type == 2">
                    <img src="@/assets/images/info/icon-video.svg" alt="">
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ["worldList"]
    }
</script>

<style scoped>
    ul li {
        width: 250px;
        height: 320px;
        box-shadow: 0 2px 3px 0 rgba(203, 198, 198, 0.50);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 20px;
    }

    ul li a {
        display: block;
        width: 100%;
        height: 100%;
        color: #aaa;
        position: relative;
        font-size: 12px;
    }

    ul li img {
        width: 100%;
        height: 188px;
    }

    .cardBody,
    .cardFooter {
        padding: 0 15px;
    }

    .cardBody {
        border-bottom: 1px solid #F2F2F2;
        padding-bottom: 10px;
    }

    .cardBody h6 {
        font-weight: normal;
        font-size: 14px;
        color: #000000;
        line-height: 20px;
        height:40px;
        overflow:hidden;
        margin-bottom: 10px;
    }

    .cardBody img,
    .playBtn img {
        width: auto;
        height: auto;
    }

    .cardBody img{
        vertical-align: middle;
    }

    .cardBody img.lastChild {
        vertical-align: sub;
    }

    .cardBody span {
        margin-right: 10px;
        line-height:20px;
    }

    .cardBody span:last {
        margin-right: 0;
    }

    .cardFooter {
        display: flex;
        justify-content: space-between;
        line-height: 50px;
    }

    .playBtn {
        position: absolute;
        width: 75px;
        height: 70px;
        padding-top:5px;
        top: 60px;
        left: 50%;
        margin-left: -37.5px;
        border-radius:50%;
        background-image: linear-gradient(#fc9e06, #fee201);
    }
    .playBtn img{
        display:block;
        width:64px;
        border-radius:50%;
        border:solid 1px #000;
        margin:0 auto;
    }
</style>