<template>
    <div class="temp">
        <mHeader activeMenuName="info"></mHeader>
        <nav>
            <ul class="inner">
                <li>
                    <router-link to="/info/hotnews">新闻热点</router-link>
                </li>
                <li>
                    <router-link to="/info/policyLaws">政策法规</router-link>
                </li>
                <li>
                    <router-link to="/info/masterView">大咖视点</router-link>
                </li>
            </ul>
        </nav>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <div class="leftArrow" @click="leftArrow" v-if="showArrow">
            <img src="@/assets/images/info/arrow-left.svg" alt="">
        </div>
        <div class="rightArrow" @click="rightArrow" v-if="showArrow">
            <img src="@/assets/images/info/arrow-right.svg" alt="">
        </div>
        <mfooter></mfooter>
    </div>
</template>

<script>
    import mHeader from "~/common/mheader";
    import mfooter from "~/common/mfooter";
    export default {
        data() {
            return {
                arrowNum: 0,
                routePath: ["/info/hotnews", "/info/policyLaws", "/info/masterView"],
                showArrow: true,
                onOff:true
            }
        },
        created() {
            this.getArrowNum()
        },
        methods: {
            getArrowNum() {
                switch (this.$route.path) {
                    case "/info/hotnews":
                        this.arrowNum = 0;
                        this.showArrow = true;
                        break;
                    case "/info/policyLaws":
                        this.arrowNum = 1;
                        this.showArrow = true;
                        break;
                    case "/info/masterView":
                        this.arrowNum = 2;
                        this.showArrow = true;
                        break;
                    case "/info/hotnews/flashList":
                        this.showArrow = false;
                };
            },
            leftArrow() {
                /* if(!this.onOff){
                    return false;
                };
                this.onOff = false; */
                if (this.arrowNum <= 0) {
                    this.arrowNum = this.routePath.length - 1;
                } else {
                    this.arrowNum--;
                };
                this.$router.push(this.routePath[this.arrowNum]);
                /* setTimeout(() => {
                    this.onOff = true;
                },3000); */
            },
            rightArrow() {
               /*  if(!this.onOff){
                    return false;
                };
                this.onOff = false; */
                if (this.arrowNum >= this.routePath.length - 1) {
                    this.arrowNum = 0;
                } else {
                    this.arrowNum++;
                };
                this.$router.push(this.routePath[this.arrowNum]);
                /* setTimeout(() => {
                    this.onOff = true;
                },3000); */
            }
        },
        components: {
            mHeader,
            mfooter
        },
        watch: {
            "$route": function(newval, oldval){
                if(newval.path == "/info/hotnews/flashList"){
                    this.showArrow = false;
                }else if(newval.path == "/info/hotnews"){
                    this.arrowNum = 0;
                    this.showArrow = true;
                }else if(newval.path == "/info/policyLaws"){
                    this.arrowNum = 1;
                    this.showArrow = true;
                }else if(newval.path == "/info/masterView"){
                    this.arrowNum = 2;
                    this.showArrow = true;
                };
            }
        }
    }
</script>

<style scoped lang="less">
    .temp {
        background: #fafbfd;
    }

    nav {
        height: 60px;
        background: #fff;
        border-bottom: 1px solid #F0F0F1;
        margin-bottom: 20px;
    }

    nav ul {
        display: flex;
        line-height: 60px;
        font-size: 20px;
    }

    nav ul li {
        width: 180px;
        text-align: center;
    }

    nav ul li a {
        color: #000;
    }

    nav ul li:nth-child(1) {
        a.router-link-active {
            color: @hot-news;
        }
    }

    nav ul li:nth-child(2) {
        a.router-link-active {
            color: @laws-rules;
        }
    }

    nav ul li:nth-child(3) {
        a.router-link-active {
            color: @master-views;
        }
    }

    .leftArrow,
    .rightArrow {
        position: fixed;
        width: 60px;
        height: 60px;
        top: 50%;
        margin-top: -30px;
        cursor: pointer;
    }

    .leftArrow {
        left: 50%;
        margin-left: -650px;
    }

    .rightArrow {
        right: 50%;
        margin-right: -650px;
    }

    .fade-enter-active, .fade-leave-active {
      transition: all .3s;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }
    .fade-enter {
      transform: translateX(31px);
    }
    .fade-leave-active {
      transform: translateX(-31px);
    }
</style>
