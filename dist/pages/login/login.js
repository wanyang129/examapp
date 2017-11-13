"use strict";

var app = getApp();
Page({
	onLoad: function onLoad() {
		var _this = this;
		wx.getStorage({
			key: "userInfo",
			success: function success(res) {
				wx.switchTab({
					url: "/pages/index/index"
				});
			}, fail: function fail() {
				_this.setData({
					disabled: true,
					code: app.globalData.code
				});
			}
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
		var _this = this;
		app.util.find("/index.php?r=site/login", e.detail.value).then(function (res) {
			console.log("login", res);
			if (res.status == 1) {
				wx.setStorage({
					key: "userInfo",
					data: res.data,
					success: function success() {
						wx.switchTab({
							url: "/pages/index/index"
						});
					}
				});
				console.log('aa');
			} else if (res.status == 0) {
				_this.setData({
					reason: res.reason
				});
			}
		});
	}
});
//# sourceMappingURL=../../../maps/pages/login/login.js.map
