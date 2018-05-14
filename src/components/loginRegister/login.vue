<template>
    <div class="temp">
        <header>
            <h1 class="inner">HuoBC.com</h1>
        </header>
        <div class="inner loginBox">
            <router-link to="/" class="backIndex text-center lh-30">返回首页</router-link>
            <!--form-box-->
            <div class="form-box">
                <h4 class="font-20">用户登录</h4>
                <Tooltip :value="phonevalue" class="item" effect="dark" content="请输入有效手机号码" placement="right" :manual="manual">
                    <div class="form-item">
                        <label>+86中国</label>
                        <input type="text" v-model="phoneNum" class="item-tel" maxlength="11" placeholder="请输入手机号" name="tel" data-id='register-input-1'
                            data-content='注册页面手机号输入框' />
                    </div>
                </Tooltip>
                <Tooltip :value="passwordvalue" class="item" effect="dark" content="请输入登录密码" placement="right" :manual="manual">
                    <div class="form-item">
                        <label>密码</label>
                        <input type="password" v-model="passWord" class="item-password" maxlength="12" style="width: 210px;" placeholder="字母、数字组合不少于8位"
                            data-id='register-input-3' data-content='注册页面密码输入框' ref="passwordIpt" />
                        <button class="button eye" @click="changeEyes">
                            <img v-if="eyeImg" src="@/assets/images/login/eye_off.png" alt="" />
                            <img v-else src="@/assets/images/login/eye_open.png" alt="">
                        </button>
                    </div>
                </Tooltip>
                <Tooltip :value="invicodevalue" class="item" effect="dark" :content="errorContent" placement="right" :manual="manual">
                    <div class="form-item">
                        <label>图形验证码</label>
                        <input type="text" v-model="inviCode" class="item-validate" maxlength="5" placeholder="请输入图形验证码" name="vilidateCode" data-id='register-input-2'
                            data-content='注册页面图形验证码' @keyup.enter="login" />
                        <div class="button validate" style="background: none;">
                            <img id="imgUrl" :src="vaildateCode" style="width: 100%;height: 40px;" @click="changeVaildateCode" />
                        </div>
                    </div>
                </Tooltip>
                <div class="rigister">
                    <p>还没有账号？
                        <a href="../../../static/src/html/register.html">去注册</a>
                    </p>
                    <p>
                        <a href="../../../static/src/html/findPassword.html">忘记密码？</a>
                    </p>
                </div>
                <!--button-->
                <button @click="login" class="button submit-button font-20" data-id='register-button-1' data-content='注册页面完成按钮'>登录</button>
            </div>
        </div>
        <mFooter></mFooter>
    </div>
</template>

<script>
    import mFooter from "~/common/mfooter.vue";
    import { Tooltip } from "element-ui";
    export default {
        data() {
            return {
                vaildateCode: BASEURL + "user/getPicCode?phone_num=" + Math.random(),//图形验证码
                eyeImg: true,//眼睛是否显示
                phoneNum: "",//手机号码
                passWord: "",//密码
                inviCode: "",//图形验证码
                phonevalue: false,//控制手机号码提示框
                passwordvalue: false,//控制密码框错误提示框
                invicodevalue: false,//控制图形验证码错误提示框
                errorContent: "",//错误内容
                manual: true,//取消提示框默认行为
                loginCount: ""//登录提示内容
            }
        },
        created() {
        },
        methods: {
            open() {
                this.$message.success({
                    message: this.loginCount,
                    center: true
                });
            },
            changeVaildateCode() {//切换图形验证码
                this.vaildateCode = BASEURL + "user/getPicCode?phone_num=" + Math.random();
            },
            changeEyes() {//切换密码框
                if (this.eyeImg) {
                    this.eyeImg = false;
                    this.$refs.passwordIpt.type = "text";
                } else {
                    this.eyeImg = true;
                    this.$refs.passwordIpt.type = "password";
                }
            },
            checkNum(num) {//检验手机号码
                let mynum = num.replace(/\s/g, "");
                if (mynum) {
                    let regExp = /^1\d{10}$/;
                    if (regExp.test(mynum)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                };
            },
            checkRequired(val) {//检验是否为空
                let value = val.replace(/\s/g, "");
                if (value) {
                    return true;
                } else {
                    return false;
                };
            },
            getUserMoution() {
                this.$post("user/getPersonalInformation", { userId: this.$session.get("id") }).then(res => {
                    this.$session.set("userInformation",res.model);
                    let redirectUrl = this.$route.query.redirect;
                    if (redirectUrl) {
                        this.$router.replace(redirectUrl);
                    } else {
                        this.$router.push("/");
                    };
                }).catch(err => {
                    this.$message.error({
                        message: err.msg,
                        center: true
                    })
                });
            },
            login() {//登录方法
                if (!this.checkNum(this.phoneNum)) {
                    this.phonevalue = true;
                    setTimeout(() => {
                        this.phonevalue = false;
                    }, 3000);
                    return false;
                };
                if (!this.passWord) {
                    this.passwordvalue = true;
                    setTimeout(() => {
                        this.passwordvalue = false;
                    }, 3000);
                    return false;
                };
                if (!this.checkRequired(this.inviCode)) {
                    this.errorContent = "请输入正确的图形验证码";
                    this.invicodevalue = true;
                    setTimeout(() => {
                        this.invicodevalue = false;
                        this.errorContent = "";
                    }, 3000);
                    return false;
                };
                let data = {
                    phone_num: this.phoneNum,
                    password: this.passWord,
                    validate_code: this.inviCode
                };
                this.$post("user/login", data).then(res => {
                    console.log(res);
                    this.loginCount = "登录成功";
                    this.open();
                    this.$session.set("id", res.model.token);
                    this.getUserMoution();
                }).catch(err => {
                    this.loginCount = err.msg;
                    this.$message.error({
                        message: this.loginCount,
                        center: true
                    });
                })
            }
        },
        components: {
            mFooter,
            Tooltip
        }
    }
</script>

<style>
    .el-tooltip__popper.is-dark {
        background: #2926A3;
    }

    .el-tooltip__popper[x-placement^=right] .popper__arrow::after {
        border-right-color: #2926A3;
    }

    .myMessage {
        top: 150px;
    }
</style>

<style scoped>
    .temp {
        background: #fafbfd;
    }

    .container {
        width: 1190px;
        margin: 0 auto;
    }

    header {
        height: 100px;
        background: #1c294c;
        color: #fff;
    }

    h1 {
        font-weight: normal;
        line-height: 100px;
        font-size: 40px;
        text-indent: 10px;
    }

    .loginBox {
        margin: 20px auto;
        background: #fff;
        height: 800px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
        position: relative;
    }

    .backIndex {
        position: absolute;
        top: 40px;
        left: 90px;
        width: 99px;
        height: 30px;
        border: solid 1px #0F27A7;
        border-radius: 4px;
        color: #0F27A7;
    }

    .form-box {
        text-align: center;
    }

    .form-box h4 {
        color: #425DF1;
        padding-top: 55px;
        margin-bottom: 30px;
    }

    .form-box .form-item {
        width: 360px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        margin: 0 auto;
        margin-bottom: 30px;
        overflow: hidden;
    }

    .form-box .form-item label {
        color: #000000;
        font-size: 16px;
        width: 109px;
        border-right: 1px solid #ccc;
        display: inline-block;
        height: 40px;
        float: left;
        text-align: left;
        text-indent: 10px;
    }

    .form-box .form-item input {
        border: none;
        outline: none;
        float: left;
        width: 160px;
        text-indent: 10px;
        padding: 11px 0;
    }

    .form-box .last-form-item {
        margin-bottom: 20px;
    }

    .form-box .button {
        color: #fff;
        border: none;
        cursor: pointer;
        background: #425DF1;
        border-radius: 4px;
        outline: none;
    }

    .form-box .validate {
        height: 40px;
        width: 82px;
        float: right;
    }

    .form-box .eye {
        background: none;
    }

    .form-box .submit-button {
        display: inline-block;
        width: 360px;
        height: 44px;
        border-radius: 4px;
        margin-top: 20px;
        background: -webkit-linear-gradient(left, #435ef2, #061d9a);
        background: -o-linear-gradient(left, #435ef2, #061d9a);
        background: -moz-linear-gradient(left, #435ef2, #061d9a);
        background: -ms-linear-gradient(left, #435ef2, #061d9a);
        background: linear-gradient(left, #435ef2, #061d9a);
    }

    .form-box .protocol-bar {
        border: none;
        margin-bottom: 50px;
        position: relative;
    }

    .rigister {
        width: 360px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #333333;
    }

    .rigister a {
        color: #425DF1;
    }
</style>