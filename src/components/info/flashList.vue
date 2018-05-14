<template>
    <div class="inner">
        <ul>
            <li v-for="(item,index) in flashList" :key="index">
                <p class="font-16 font-000 mb-10">{{ item.title }}</p>
                <p class="font-14 font-666 mb-20" v-html="item.content"></p>
                <p class="font-12 font-aaa">{{ item.releaseTime | momentTime }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                flashList:[]
            }
        },
        created(){
            this.getList()
        },
        methods:{
            getList(){
                let data = {
                    columns:"news",
                    plate:"NewsFlash",
                    type:1,
                    pageSize:0,
                    pageNum:1
                };
                this.$post("article/findInformation",data).then( res => {
                    console.log(res);
                    this.flashList = res.model.articles;
                })
            }
        }
    }
</script>

<style scoped>
    .inner{
        background:#fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
        margin-bottom:40px;
        padding:20px 30px 30px;
        box-sizing:border-box;
    }
    ul li{
        border-bottom: 1px solid #ECECEC;
        padding:20px 0;
    }
    .font-aaa{
        color:#aaa;
    }
</style>