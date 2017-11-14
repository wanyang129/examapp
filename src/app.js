var util=require('./utils/util.js');
App({
	util:util,
	onLaunch:function(){
		wx.setEnableDebug({
		    enableDebug: true,
		    success:function(res){
		    	console.log('调试成功',res)
		    },fail:function(res){
		    	console.log('调试fail')
		    }
		})
		var _this=this;
		wx.login({
			success:function(res){
				console.log('login',res);
				_this.globalData.code=res.code;
				util.find("/index.php?r=user/wxinfo",{code:res.code}).then(function(res){
					console.log(res);
					_this.globalData.openid=res.openid;
					_this.globalData.session_key=res.session_key;
				});
			}
		});
	},
	globalData:{
		email:null,
		token:null,
		uid:null,
		username:null
	}
})
