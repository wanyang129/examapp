var util=require('./utils/util.js');
App({
	util:util,
	onLaunch:function(){
		var _this=this;
		wx.login({
			success:function(res){
				console.log('login',res);
				_this.globalData.code=res.code;
			}
		})
	},
	globalData:{
		email:null,
		token:null,
		uid:null,
		username:null
	}
})
