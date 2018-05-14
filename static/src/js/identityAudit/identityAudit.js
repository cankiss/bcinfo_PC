var userId ;
try{
  userId = JSON.parse(sessionStorage.getItem("id")); 
}catch(e){
  userId = sessionStorage.getItem("id");
};

//姓名的验证
$(".realName").blur(function () {
  if(!/^\S+/.test($(this).val())){
    layer.tips('请输入正确的姓名', '.realName',{
      tips: [2, '#425DF1'],
      time: 4000
    });
    $(this).removeClass('already')
    return
  } else $(this).addClass('already')
})

//身份证号码验证
$(".idCard").blur(function () {
  if(!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test($(this).val())){
    layer.tips('请输入正确的身份证号码', '.idCard',{
      tips: [2, '#425DF1'],
      time: 4000
    });
    $(this).removeClass('already')
    return
  }else $(this).addClass('already')
 
})

//上传文件验证
$(".file input").on("change",function (e) {
  var that = this
  var isPic =/(\.jpe?g)|(\.png)|(\.bmp)$/gi.test(this['value']),
    picSize = (this.files[0].size / 1024).toFixed(0);
  if(!isPic){
    layer.tips('仅支持jpg/jpeg/png/bmp格式', "." + $(this).attr("class"),{
      tips: [3, '#425DF1'],
      time: 2000
    });
    return;
  }
  if( picSize > 2048){
    layer.tips('图片需小于2MB', "." + $(this).attr("class"),{
      tips: [3, '#425DF1'],
      time: 2000
    });
    return;
  }

  WebUploadImg(this.files[0]).then(function (res) {
    console.log(res);
    var fd = res.formData;
    fd.append('userId',userId);
    $.ajax({
      type:"post",
      url:api + "user/upload",
      processData: false,
      contentType: false,
      data: fd,
      success:function(data){
        if(data.code == 200){
          $(that).parent().css({
            'background':'url('+res.base64+')',
            'background-size': '100% 100%'
          })
          $(that).parent().find("input[type='hidden']").length
            ?$(that).parent().find("input[type='hidden']").val(data.model.url)
            :$("<input>").attr({"name":that.name,"type":"hidden"}).val(data.model.url).appendTo($(that).parent())
        }else{
          layer.tips('图片上传失败', "." + $(this).attr("class"),{
            tips: [3, '#425DF1'],
            time: 2000
          });
        }
      }
    });
  })

})

//点击确认
$(".send").on("click",function () {
  
  //判断姓名跟身份证号码是否为空
  if(!/^\S+/.test($(".realName").val())){
    layer.tips('请输入正确的姓名', '.realName',{
      tips: [2, '#425DF1'],
      time: 4000
    });
    return;
  }
  if(!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test($(".idCard").val())){
    layer.tips('请输入正确的身份证号码', '.idCard',{
      tips: [2, '#425DF1'],
      time: 4000
    });
    return;
  }
  var picLength =  $(".file input").parent().find("input[type='hidden']").length
  if( picLength < 3){
    layer.tips('请上传身份证照片', '.hand',{
      tips: [2, '#425DF1'],
      time: 4000
    });
    return;
  }
  
  if($(".realName").hasClass("already") && $(".idCard").hasClass("already") &&  picLength == 3 ){
    $.ajax({
      url:api+"user/setRealName",
      type:"post",
      data:{
        userId:userId,
        name:$(".realName").val(),
        idCard:$(".idCard").val(),
        idCardFrontUrl:$("input[type='hidden'][name='idCardFrontUrl']").val(),
        idCardBackUrl:$("input[type='hidden'][name='idCardBackUrl']").val(),
        idCardUrl:$("input[type='hidden'][name='idCardUrl']").val(),
      },
      success:function (data) {
        if(data.code == 200){
          var userInformation = JSON.parse(sessionStorage.getItem("userInformation"));
          userInformation.status = 1;
          sessionStorage.setItem("userInformation",JSON.stringify(userInformation));
          location.href = "./audit.html";
          sessionStorage.setItem("AuditAmount",data.model.amount);
          $(".realName").val("");
          $(".idCard").val("");
          $.manualStatistics(data.model.session_id,data.model.evn);
        }else{
          layer.msg(data.msg);
        }
      }
    })
  }
})