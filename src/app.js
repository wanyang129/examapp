var util=require('./utils/util.js');
App({
	util:util,
	onLaunch:function(){
		var _this=this;
		wx.login({
			success:function(res){
				console.log('login',res);
				_this.globalData.code=res.code;
				util.find("/index.php?r=user/wxinfo",{code:res.code}).then(function(res){
					console.log(res)
					_this.globalData.openid=res.openid;
					_this.globalData.session_key=res.session_key;
					if(res.token!==undefined){

					}
				});
			}
		});
	},
	globalData:{
		code:"",
		openid:"",
		session_key:""
	}
})
