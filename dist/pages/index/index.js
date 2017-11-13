"use strict";

var app = getApp();
Page({
	onLoad: function onLoad() {
		var _this = this;
		wx.getStorage({
			key: "userInfo",
			success: function success(res) {
				console.log('userInfo', res);
				var token = res.data.token;
				app.util.find("/index.php?r=exam/index", { token: res.data.token }).then(function (res) {
					_this.setData({
						examList: res.examList,
						token: token
					});
					console.log(_this.data.examList);
				});
			}, fail: function fail() {
				wx.redirectTo({
					url: "/pages/login/login"
				});
			}
		});
	}
});
//# sourceMappingURL=../../../maps/pages/index/index.js.map
