$(function () {
    // 判断登录状态，获取用户信息
    var userId = sessionStorage.getItem("id"),
        status = sessionStorage.getItem("status"),
        inviteCode = sessionStorage.getItem("inviteCode"),
        pageSize = 1;
        totalPages = null;
    if(userId){
        getUserInfo();
        obtainList();
    };
    function getUserInfo(){
        $(".loginForm ul").hide();
        $(".loginForm .auditStatus").show();
        $(".loginExplain img").hide();
        $(".loginExplain .invitingFriends").show();
        $(".loginExplain").addClass("invitMtp");
        $("#invitedCodeNum").html(inviteCode);
        $("#trueInvitUrl").html("区块链应用平台火链网注册大礼发放啦！新手注册最高获取10万HBCandy，成功邀请1名好友注册认证成功可另外获取0.5万HBCandy。快来注册吧! "+ location.origin +"/html/register.html?invitCode=" + inviteCode +"  邀请码："+ inviteCode);
        $.ajax({
            url:api + "user/getUserInformation",
            type:"post",
            data:{"userId":userId},
            success:function(data){
                typeof data == 'string' ? data = JSON.parse(data) : data = data;
                if(data.code == 200){
                    $("#userName").html(data.model.mobile);
                    status = data.model.status;
                    $(".toExamine").hide();
                    $(".toExamine").eq(status).show();
                    $("#candyNum").html(parseInt(data.model.amount).toLocaleString());
                    $("#peosonNum").html(parseInt(data.model.count).toLocaleString());
                    $(".dialog .colorblue").html(parseInt(data.model.amount).toLocaleString());
                }else{
                    layer.msg(data.msg);
                }
            }
        })
    };
    // 验证手机号码
    function checkPhone(value) {
        var Number = value.replace(/\s/g, "");
        var phone_num = Number;
        var reg = /^1\d{10}$/;
        if (!reg.test(phone_num)) {
            return "404";
        } else {
            return "200";
        };
    };
    //检验登录密码是否符合初步的验证规则
    function checkLoginPassword(value) {
        var phone_num = value;
        //数字 字母 和下划线
        var reg = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{8,12}$/;
        if (!reg.test(phone_num)) {
            return "404";
        } else {
            return "200";
        };
    };
    $("#password").on('keydown', function (e) { 
        e = e || window.event; 
        (e.keyCode == 13) && ($('.loginBtn button').trigger('click')); 
        }); 
    // 登录验证
    $(".loginBtn button").on("click", function () {
        var phoneNum = $("#phoneNum").val(),
            password = $("#password").val().trim();
        if (phoneNum == "") {
            layer.tips('手机号码不能为空', '#phoneNum', {
                tips: [2, '#061D9A'],
                time: 4000
            });
            return;
        };
        if (checkPhone(phoneNum) == "404") {
            layer.tips('手机号码格式不正确', '#phoneNum', {
                tips: [2, '#061D9A'],
                time: 4000
            });
            return;
        };
        // if (checkLoginPassword(password) == "404") {
        //     layer.tips('登录密码格式错误', '#password', {
        //         tips: [2, '#061D9A'],
        //         time: 4000
        //     });
        //     return;
        // }
        $.ajax({
            url:api + "user/login",
            type:"post",
            data:{"phone_num":phoneNum,"password":password},
            success:function(data){
                typeof data == 'string' ? data = JSON.parse(data) : data = data;
                if(data.code == 200){
                    layer.msg('登录成功');
                    userId = data.model.token;
                    status = data.model.status;
                    inviteCode = data.model.inviteCode;
                    sessionStorage.setItem("id",userId);
                    sessionStorage.setItem("status",status);
                    sessionStorage.setItem("inviteCode",inviteCode);
                    $("#phoneNum").val("");
                    $("#password").val("");
                    getUserInfo();
                    obtainList();
                    $.manualStatistics(data.model.session_id,data.model.evn);
                }else{
                    layer.msg(data.msg);
                    // layer.tips(data.msg, '.loginBtn button', {
                    //     tips: [2, '#3595CC'],
                    //     time: 4000,
                    // });
                }
            }
        })
    });

    // 复制内容到剪贴板
    $("#copyUrl").on("click", function () {
        var Url2 = document.getElementById("trueInvitUrl").innerText;
        var oInput = document.createElement('input');
        oInput.value = Url2;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        layer.msg('复制成功');
        // layer.tips('复制成功', '#copyUrl', {
        //     tips: [1, '#3595CC'],
        //     time: 4000
        // });
    });
    
    // 获取记录的现实和隐藏
    $("#HBCandyBtn").on("click", function () {
        $('body').addClass('open');
        $(".tc_bg").show();
    });
    $(".dialog a").on("click", function () {
        $('body').removeClass('open');
        $(".tc_bg").hide();
    });
    // 获取记录加载更多
    $(".dialog .tbody").niceScroll({
        "cursorcolor": "#6e6d6d",
        "autohidemode": false
    });
    var flog = true;
    $(".dialog .tbody").scroll(function () {
        if ($(this)[0].scrollTop + $(this)[0].clientHeight + 20 >= $(".dialog .tbody ul")[0].offsetHeight) {
            if(flog){
                pageSize ++;
                if(pageSize > totalPages){
                    return;
                };
                flog = false;
                $(".dialog .showbox").show();
                obtainList();
            }
        }
    });
    function obtainList(){
        $.ajax({
            url:api + "keyInfo/selectBcinfoKeyInfoByUserId",
            type:"post",
            data:{
                "userId":userId,
                "page_num":pageSize,
                "page_size":15
            },
            success:function(data){
                typeof data == 'string' ? data = JSON.parse(data) : data = data;
                if(data.code == 200){
                    $(".dialog .showbox").hide();
                    flog = true;
                    if(data.model == null){
                        $("#pages").show();
                        return;
                    };
                    totalPages = data.model.totalPageNum;
                    var list = data.model.list;
                        tbodyList = document.getElementById("tbodyList");
                    for(var i = 0; i < list.length; i++){
                        var lis = document.createElement("li"),
                            listMode = "";
                        listMode += '<span class="time">'+ list[i].createTime +'</span>'+
                                    '<span class="task">' + list[i].typeName + '</span>'+
                                    '<span class="harvest">'+ list[i].plusMinus + parseInt(list[i].amount).toLocaleString() +'</span>';
                        lis.innerHTML = listMode;
                        tbodyList.appendChild(lis);
                    }
                }else{
                    layer.msg(data.msg);
                }
            }
        })
    }
    
    // 退出登陆
    $(".exitLogin").on("click",function(){
        sessionStorage.clear();
        $("#tbodyList").html("");
        $("#pages").hide();
        $(".loginForm ul").show();
        $(".loginForm .auditStatus").hide();
        $(".loginExplain img").show();
        $(".loginExplain .invitingFriends").hide();
        $(".loginExplain").removeClass("invitMtp");
        $.ajax({
            type:"post",
            url:api + "user/logOff",
            data:{token:userId},
            success:function(data){
                typeof data == 'string' ? data = JSON.parse(data) : data = data;
                if(data.code == 200){
                    console.log("退出成功");
                }
            }
        })
    })

    // 监听视频播放结束的层级问题
    document.getElementById('homeVideo').addEventListener('ended', function(){
        $(".indexVideo .videoEnd").show();
        document.getElementById('homeText').innerHTML = document.getElementById('homeText').innerHTML;
        console.log('end');
    })

})