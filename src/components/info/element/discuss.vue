<template>
    <li>
        <div class="userInfo">
            <div class="portrait">
                <div class="user">
                    <img v-if="item.picUrl" :src="item.picUrl" alt="">
                    <img v-else src="@/assets/images/common/icon-user.svg" alt="">
                </div>
                <span>{{ item.nickName }}</span>
            </div>
            <div>{{ item.commonTime }}</div>
        </div>
        <div class="userWord">
            <p>
                <span v-if="isOpen">{{ item.content | worderNum }}
                    <a v-if="item.content.length > 120" href="javascript:;" @click="openClose">... [展开全部]</a>
                </span>
                <span v-else>{{ item.content }}
                    <a v-if="item.content.length > 120" href="javascript:;" @click="openClose">[收起评论]</a>
                </span>
            </p>
        </div>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: true
            }
        },
        methods: {
            openClose() {
                this.isOpen = !this.isOpen;
            }
        },
        filters: {
            worderNum(val) {
                if (val.length > 120) {
                    return val.substr(0, 120);
                } else {
                    return val;
                }
            }
        },
        props: ["item"]
    }
</script>

<style scoped>
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

    .userInfo,
    .portrait {
        display: flex;
        justify-content: space-between;
    }

    .portrait span {
        margin-left: 20px;
        line-height: 30px;
        font-size: 16px;
        color: #000000;
    }

    .userWord {
        padding: 20px 20px 20px 50px;
        font-size: 16px;
        color: #000000;
        word-wrap: break-word;
        word-break: break-all;
        line-height: 24px;
    }
</style>