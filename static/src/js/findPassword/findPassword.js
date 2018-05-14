$(function() {
	fromObj.init();
});

// elements
var elements = {
	tel: $(".item-tel"),
	validateCode: $(".item-validate"),
	smsCode: $(".item-sms"),
	smsCodeButton: $("#getSMSCodeButton"),
	pcCodeImg: $("#pc-code-img"),
	newPsd: $(".item-newpsd"),
	isEyeOpen: false,
	eyeButton: $(".eye").children(),
	submitButton: $(".submit-button"),
	timer: 60,
	isTimerRunning: false
}

// formObj
var fromObj = {
	init: function() {
		fromObj.getValidateCode();
		fromObj.toggleValidateCode();
		fromObj.getSMSCode();
		fromObj.toggleEye();
		fromObj.commit();
	},
	getValidateCode: function() {
		elements.pcCodeImg.children("img").attr("src", api + "user/getPicCode?picCode?phone_num=" + Math.random());
	},
	toggleValidateCode: function() {
		elements.pcCodeImg.on("click", function() {
			fromObj.getValidateCode();
		});
	},
	getSMSCode: function() {
		elements.smsCodeButton.on("click", function() {
			if(!fromObj.isEmpty(elements.tel)) {
				layerObj.show('手机号码不能为空', elements.tel.parent());
			} else if(!fromObj.isTelChecked(elements.tel)) {
				layerObj.show('手机号码不正确', elements.tel.parent());
			} else {
				if(!elements.isTimerRunning) {
					$.ajax({
						type: "post",
						url: api + "user/requestCodeValidateCode",
						data: {
							phone_num: elements.tel.val(),
							type: "1",
							operationType: "3",
							pcCode: elements.validateCode.val()
						},
						success: function(data) {
							typeof data == 'string' ? data = JSON.parse(data) : data = data;
							if(data.code == 200) {
								layer.msg(data.msg);
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
								layer.msg(data.msg);
							}
						}
					});
				} else {
					return;
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
				elements.newPsd.attr("type", "password");
				elements.isEyeOpen = !elements.isEyeOpen;
			} else {
				$(this).attr("src", "../img/register/eye_open.png");
				elements.newPsd.attr("type", "text");
				elements.isEyeOpen = !elements.isEyeOpen;
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
	isPasswordChecked: function(newPsd) {
		var passwordReg = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{8,12}$/;
		return passwordReg.test(newPsd.val());
	},
	commit: function() {
		elements.submitButton.on("click", function() {
			// STEP 1:is empty
			if(!fromObj.isEmpty(elements.tel)) {
				layerObj.show('手机号码不能为空', elements.tel.parent());
			} else if(!fromObj.isEmpty(elements.validateCode)) {
				layerObj.show('图形验证码不能为空', elements.validateCode.parent());
			} else if(!fromObj.isEmpty(elements.smsCode)) {
				layerObj.show('手机验证码不能为空', elements.smsCode.parent());
			} else if(!fromObj.isEmpty(elements.newPsd)) {
				layerObj.show('新密码不能为空', elements.newPsd.parent());
			} else if(!fromObj.isTelChecked(elements.tel)) {
				layerObj.show('手机号码不正确', elements.tel.parent());
			} else if(elements.validateCode.val().length < 4) {
				layerObj.show('图形验证码不正确', elements.validateCode.parent());
			} else if(elements.smsCode.val().length < 4) {
				layerObj.show('验证码不正确', elements.smsCode.parent());
			} else if(!fromObj.isPasswordChecked(elements.newPsd)) {
				layerObj.show('密码需为字母、数字组合，8-12位', elements.newPsd.parent());
			} else {
				$.ajax({
					type: "post",
					url: api + "user/resetPassword",
					data: {
						phone_num: elements.tel.val(),
						validate_code: elements.smsCode.val(),
						figure_code: elements.validateCode.val(),
						password: elements.newPsd.val()
					},
					success: function(data) {
						typeof data == 'string' ? data = JSON.parse(data) : data = data;
						if(data.code == 200) {
							// 埋点
							$.manualStatistics(data.model.session_id, data.model.evn);

							layer.msg('密码修改成功!', {
								time: 2000
							}, function() {
								window.history.go(-1)
							});
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