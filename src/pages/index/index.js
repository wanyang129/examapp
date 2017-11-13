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
					var examList=res.examList;
					for(var i=0;i<examList.length;i++){
						examList[i].tips=examList[i].tips.split("\n")
					}
					_this.setData({
						examList:examList,
						token:token
					})
					console.log('examList',_this.data.examList);
					
				})
			},fail:function(){
				wx.redirectTo({
					url:"/pages/login/login"
				});
			}
		})
	}
})