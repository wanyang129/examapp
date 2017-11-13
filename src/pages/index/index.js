var app=getApp();
Page({
	onLoad:function(){
		var _this=this;
		wx.getStorage({
			key:"userInfo",
			success:function(res){
				console.log('userInfo',res)
				var token=res.data.token;
				app.util.find("/index.php?r=exam/index",{token:res.data.token}).then(function(res){
					_this.setData({
						examList:res.examList,
						token:token
					})
					console.log(_this.data.examList)
				})
			},fail:function(){
				wx.redirectTo({
					url:"/pages/login/login"
				});
			}
		})
	}
})