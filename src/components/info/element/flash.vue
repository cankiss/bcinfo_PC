<template>
    <div>
        <div class="flashTop">
            <p class="font-20">快讯</p>
            <router-link to="/info/hotnews/flashList" class="font-14">更多 ></router-link>
        </div>
        <ul class="flashList">
            <li v-for="(item,index) in newFlash" :key="index" class="font-14">{{ item.title }}</li>
        </ul>
        <div class="flashTop">
            <p class="font-20">热点报道</p>
        </div>
        <div class="report">
            <router-link v-for="(item,index) in hotReport" :key="index" v-bind="{to:'/article/' + item.id}">
                <img :src="item.deployImage" alt="">
                <p class="font-14 mt-20">{{ item.title }}</p>
                <div class="author">
                    <p>{{ item.author }}</p>
                    <p>{{ item.releaseTime | momentTime }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default{
        props:["newFlash","hotReport"]
    }
</script>

<style scoped>
    .flashTop,.author{
        display:flex;
        justify-content: space-between;
    }
    .flashTop p,.flashTop a,.flashList li{
        color:#000;
    }
    .flashTop a{
        line-height:30px;
    }
    .flashList{
        margin-top:30px;
        padding-bottom:10px;
    }
    .flashList li{
        margin-bottom:20px;
    }
    .report a{
        display: block;
        margin:20px 0;
        color:#000;
    }
    .report img{
        width:240px;
        height:180px;
    }
    .author{
        color:#aaa;
        font-size:12px;
        margin-top:10px;
    }
</style>