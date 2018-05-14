<template>
    <div class="tips" ref="tips" :style="{backgroundImage:tips.backgroundImg}">
        <p v-bind:class="{ active: isActive }">{{ tips.content }}</p>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                isActive:false
            }
        },
        props:["tips"],
        mounted(){
            window.addEventListener('scroll', this.eventScroll)
        },
        methods:{
            eventScroll(){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if( scrollTop >= 160 ){
                    this.isActive = true;
                }else{
                    this.isActive = false;
                }
            }
        },
        destroyed () {
            window.removeEventListener('scroll', this.eventScroll)
        }
    }
</script>

<style scoped>
    .tips{
        position:absolute;
        height:100%;
        padding-top:20px;
        width:50px;
        line-height: 50px;
        box-sizing:border-box;
        top:0;
        left:50%;
        letter-spacing:10px;
        font-size: 24px;
        color: #FFFFFF;
        margin-left:-595px;
        writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/    
        writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
    }
    .active{
        width:50px;
        position:fixed;
        top:20px;
        left:50%;
        margin-left:-595px;
    }
</style>