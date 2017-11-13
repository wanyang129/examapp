"use strict";

var app = getApp();
Page({
	onLoad: function onLoad() {
		this.setData({
			disabled: true,
			code: app.globalData.code
		});
	},
	inputName: function inputName(e) {
		this.setData({
			name: e.detail.value
		});
		this.checkForm();
	},
	inputPass: function inputPass(e) {
		this.setData({
			password: e.detail.value
		});
		this.checkForm();
	},
	checkForm: function checkForm() {

		if (this.data.name && this.data.name != "" && this.data.password && this.data.password != "") {
			this.setData({
				disabled: false
			});
		} else {
			this.setData({
				disabled: true
			});
		}
	},
	formSubmit: function formSubmit(e) {
		console.log(e.detail);
		app.util.find("/index.php?r=site/login", e.detail.value).then(function (res) {
			wx.setStorage({
				key: "userInfo",
				data: res.data,
				success: function success() {
					console.log('a');
				}
			});
			console.log('login', res);
			wx.switchTab({
				url: "/pages/index/index"
			});
		});
	}
});
//# sourceMappingURL=../../../maps/pages/login/login.js.map
