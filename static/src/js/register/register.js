$(function() {
	inviter.init();
	fromObj.init();
});

// elements
var elements = {
	tel: $(".item-tel"),
	validateCode: $(".item-validate"),
	psd: $(".item-password"),
	smsCode: $(".item-sms"),
	invitationCode: $(".item-invitationCode"),
	smsCodeButton: $("#getSMSCodeButton"),
	isEyeOpen: false,
	eyeButton: $(".eye").children("img"),
	checkBoxButton: $("#checkButton"),
	copyButton: $("#copyShareTextButton"),
	submitButton: $(".submit-button"),
	timer: 60,
	isTimerRunning: false,
	candyCount: $("#candyCount"),
	inviteCode: $("#inviteCode"),
	shareLink: $("#myShareLink"),
	hiddenCandyLink: $("#candy-link")
}

// inviter
var inviter = {
	inviteCode: '',
	locationUrl: '',
	init: function() {
		inviter.getInviteCode();
		inviter.getLocationUrl();
	},
	getInviteCode: function() {
		var locationUrl = window.location.href;
		var inviteCode = locationUrl.split("?")[1];
		if(inviteCode) {
			elements.invitationCode.val(inviteCode.split("=")[1]);
		}	
	},
	getLocationUrl: function() {
		inviter.locationUrl = window.location.href;
	},
}

// formObj
var fromObj = {
	init: function() {
		fromObj.getValidateCode();
		fromObj.toggleValidateCode();
		fromObj.getSMSCode();
		fromObj.toggleEye();
		fromObj.toggleCheckBoxButton();
		fromObj.commit();
		fromObj.copyJS();
	},
	getValidateCode: function() {
		elements.validateCode.next().children("img").attr("src", api + "user/getPicCode?picCode?phone_num=" + Math.random());
	},
	toggleValidateCode: function() {
		elements.validateCode.next().children("img").on("click", function() {
			fromObj.getValidateCode();
		});
	},
	getSMSCode: function() { //获取短信验证码之前需要先验证图片验证码的正确
		elements.smsCodeButton.on("click", function() {
			if(!fromObj.isEmpty(elements.tel)) {
				layerObj.show('手机号码不能为空', elements.tel.parent());
			} else if(!fromObj.isTelChecked(elements.tel)) {
				layerObj.show('手机号码不正确', elements.tel.parent());
			} else {
				fromObj.isPcCodeCorrect({
					phone_num: elements.tel.val(),
					type: '1',
					operationType: '2',
					pcCode: elements.validateCode.val()
				}, function(data) {
					if(data.code == 200) {
						layer.msg(data.msg);

						if(!elements.isTimerRunning) {
							fromObj.getSMSCodeMethod();
							elements.isTimerRunning = !elements.isTimerRunning;
							if(elements.timer <= 60) {
								var timerCount = setInterval(function() {
									if(elements.timer > 0) {
										fromObj.getSMSCodeMethod();
									} else {
										elements.smsCodeButton.html("重新获取");
										elements.smsCodeButton.removeClass('disabled');
										elements.smsCodeButton.removeAttr('disabled');
										elements.isTimerRunning = !elements.isTimerRunning;
										clearInterval(timerCount);
										elements.timer = 60;
									}
								}, 1000);
							}
						} else {
							return;
						}
					}
				});
			}
		});
	},
	isPcCodeCorrect: function(requestData, callback) { // 验证图片验证码是否输入正确
		$.ajax({
			type: "post",
			url: api + "user/requestCodeValidateCode",
			data: {
				phone_num: elements.tel.val(),
				type: '1',
				operationType: '2',
				pcCode: elements.validateCode.val()
			},
			success: function(data) {
				typeof data == 'string' ? data = JSON.parse(data) : data = data;
				if(data.code == 200) {
					callback(data);
				} else {
					layer.msg(data.msg);
				}
			}
		});
	},
	getSMSCodeMethod: function() {
		elements.smsCodeButton.html(elements.timer--);
		elements.smsCodeButton.addClass('disabled');
		elements.smsCodeButton.attr('disabled', "disabled");
	},
	toggleEye: function() { //toggleEye
		elements.eyeButton.on("click", function() {
			if(elements.isEyeOpen) {
				$(this).attr("src", "../img/register/eye_off.png");
				elements.psd.attr("type", "password");
				elements.isEyeOpen = !elements.isEyeOpen;
			} else {
				$(this).attr("src", "../img/register/eye_open.png");
				elements.psd.attr("type", "text");
				elements.isEyeOpen = !elements.isEyeOpen;
			}
		});
	},
	toggleCheckBoxButton: function() {
		elements.checkBoxButton.on("click", function() {
			if($(this).attr("data-checked") == 'checked') {
				$(this).attr("data-checked", "unchecked");
				$(this).css({
					'background': 'url(../img/register/chose.png) no-repeat'
				});
			} else {
				$(this).attr("data-checked", "checked");
				$(this).css({
					'background': 'url(../img/register/chosen.png) no-repeat'
				});
			}
		});
	},
	isEmpty: function(target) {
		return !!target.val(); //为假则说明没有值
	},
	isTelChecked: function(tel) {
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		return myreg.test(tel.val());
	},
	isPasswordChecked: function(psd) {
		var passwordReg = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{8,12}$/;
		return passwordReg.test(psd.val());
	},
	copyJS: function() {
		elements.copyButton.on("click", function() {
			var Url2 = $(document.getElementById("candy-link")).val();
			var oInput = document.createElement('input');
			oInput.value = Url2;
			document.body.appendChild(oInput);
			oInput.select(); // 选择对象
			document.execCommand("Copy"); // 执行浏览器复制命令
			oInput.className = 'oInput';
			oInput.style.display = 'none';
			layer.msg('复制成功');
		})
	},
	commit: function() {
		elements.submitButton.on("click", function() {
			// STEP 1:is empty
			if(elements.checkBoxButton.attr("data-checked") != 'checked') {
				layerObj.show('请勾选协议', elements.checkBoxButton, 3);
			} else if(!fromObj.isEmpty(elements.tel)) {
				layerObj.show('手机号码不能为空', elements.tel.parent());
			} else if(!fromObj.isEmpty(elements.validateCode)) {
				layerObj.show('图形验证码不能为空', elements.validateCode.parent());
			} else if(!fromObj.isEmpty(elements.psd)) {
				layerObj.show('密码不能为空', elements.psd.parent());
			} else if(!fromObj.isEmpty(elements.smsCode)) {
				layerObj.show('验证码不能为空', elements.smsCode.parent());
			} else if(!fromObj.isTelChecked(elements.tel)) {
				layerObj.show('手机号码不正确', elements.tel.parent());
			} else if(elements.validateCode.val().length < 4) {
				layerObj.show('图形验证码不正确', elements.validateCode.parent());
			} else if(elements.smsCode.val().length < 4) {
				layerObj.show('验证码输入不正确', elements.smsCode.parent());
			} else if(!fromObj.isPasswordChecked(elements.psd)) {
				layerObj.show('密码需为字母、数字组合，8-12位', elements.psd.parent());
			} else { // ok
				var requestData = {
					mobile: elements.tel.val(),
					pcCode: elements.validateCode.val(), // 圖片驗證碼
					validateCode: elements.smsCode.val(), // 短信驗證碼
					password: elements.psd.val(),
					inviteCode: elements.invitationCode.val()
				};
				!elements.invitationCode.val() ? delete requestData['inviteCode'] : '';

				$.ajax({
					type: "post",
					url: api + "user/register",
					data: requestData,
					success: function(data) {
						typeof data == 'string' ? data = JSON.parse(data) : data = data;
						if(data.code == 200) {

							// 成功之后的回调埋点
							$.manualStatistics(data.model.session_id, data.model.evn);

							// 注册成功
							sessionStorage.setItem("id", data.model.id); //id
							sessionStorage.setItem("status", 0); //status = 
							sessionStorage.setItem("inviteCode", data.model.inviteCode); // 邀请码
							$.ajax({
								type:"post",
								url:api + "user/getPersonalInformation",
								data:{ userId: sessionStorage.getItem("id") },
								success:function(data){
									typeof data == 'string' ? data = JSON.parse(data) : data = data;
									if(data.code == 200){
										sessionStorage.setItem("userInformation",JSON.stringify(data.model));
									}else {
										layer.msg(data.msg);
									}
								}
							})
							$(".form-box").addClass("display-none");
							$(".scccess-content").removeClass("display-none");

							// empty
							for(var i = 0; i < $(".form-box").children(".form-item").length; i++) {
								$(".form-box").children(".form-item").eq(i).children("input").val('');
							}

							// 赋值
							elements.candyCount.text(filter.moneyFilter(data.model.amount || 0));
							elements.inviteCode.text(data.model.inviteCode);
							elements.shareLink.text(inviter.locationUrl + '?inviteCode=' + data.model.inviteCode);
							elements.hiddenCandyLink.val('区块链应用平台火链网注册大礼发放啦！新手注册最高获取10万HBCandy，成功邀请1名好友注册认证成功可另外获取0.5万HBCandy。快来注册吧! ' + inviter.locationUrl + '?invitCode=' + data.model.inviteCode + '  邀请码：' + data.model.inviteCode);
						} else {
							layer.msg(data.msg);
						}
					}
				});
			}
		});
	}
}

// layer
var layerObj = {
	show: function(msg, target, position) {
		position = position || 2;
		layer.tips(msg, target, {
			tips: [position, '#524CEC']
		});
	}
}

// filter
var filter = {
	moneyFilter: function(money) {
		money = money - 0;
		if(money > 10000) {
			return money;
		} else {
			if(money % 10000 == 0) {
				return(money / 10000) + '万';
			} else {
				return(money / 10000).toFixed(1) + '万';
			}
		}
	}
}