'use strict';

var util = require('./utils/util.js');
App({
	util: util,
	onLaunch: function onLaunch() {
		var _this = this;
		wx.login({
			success: function success(res) {
				console.log('login', res);
				_this.globalData.code = res.code;
			}
		});
	},
	globalData: {
		email: null,
		token: null,
		uid: null,
		username: null
	}
});
//# sourceMappingURL=../maps/app.js.map
