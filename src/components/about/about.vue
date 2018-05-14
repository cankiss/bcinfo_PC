<template>
    <div>
        <mHeader></mHeader>
        <div class="inner font-20">
            关于我们：
            <br/>
            火链网HuoBC（www.huobc.com），是为区块链行业从业者以及周边用户量身定制的社区信息平台。通过使用权益凭证HBCandy激励的方式，激励区块链圈的学者，从业者，投资者以及其他需要学习了解区块链信息的相关人士，一起参与社区建设，同时用户获取HuoBC的使用权益凭证HBCandy后，也能使用权益凭证交换其他产品、服务或奖励其他价值贡献者，以此将社区打造为区块链行业的信息自媒体平台和交流社区。
            <br/>
            联系我们：
            微信扫码关注微信公众号HuoBC，联系微信在线客服
            <br/>
            <img src="@/assets/images/common/wxkf.jpg" alt="">
            <br/>
            版权说明：
            　　凡本网注明“来源：火链网”的所有作品，均为上海亿坤宝网络科技有限公司合法拥有版权或有权使用的作品，未经本网授权不得转载、摘编或利用其它方式使用上述作品。已经本网授权使用作品的，应在授权范围内使用，并注明“来源：火链网”。违反上述声明者，本网将追究其相关法律责任。
            
            　　凡本网注明“来源：XXX（非火链网）”的作品，均转载自其它媒体，转载目的在于传递更多信息，并不代表本网赞同其观点和对其真实性负责。
            <br/>
            我要投稿：
                投稿请发送稿件至market@huobc.com，邮件名称：火链网投稿。
        </div>
        <mfooter></mfooter>
    </div>
</template>

<script>
    import mHeader from "~/common/mheader";
    import mfooter from "~/common/mfooter";
    export default{
        data(){
            return {

            }
        },
        components:{
            mHeader,
            mfooter
        }
    }
</script>

<style scoped>
    .inner{
        background:#fff;
        box-shadow: 0 0 4px 0 rgba(231,231,231,0.50);
        margin:40px auto;
    }
</style>