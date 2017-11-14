'use strict';

var app = getApp();
Page({
	data: {},
	getUserInfo: function getUserInfo() {
		var _this = this;
		wx.getUserInfo({
			success: function success(res) {
				console.log('userInfo', res);
				_this.setData({
					userInfo: res.userInfo
				});
			}
		});
	},
	onLoad: function onLoad() {
		var _this = this;
		wx.getSetting({
			success: function success(res) {
				if (!res.authSetting['scope.userInfo']) {
					wx.authorize({
						scope: 'scope.userInfo',
						success: function success() {
							_this.getUserInfo();
						}
					});
				} else {
					_this.getUserInfo();
				}
			}
		});
		wx.getStorage({
			key: "userInfo",
			success: function success(res) {
				console.log(res);
				_this.setData({
					personalInfo: res.data
				});
			}
		});
	}
});
//# sourceMappingURL=../../../maps/pages/personal/personal.js.map
