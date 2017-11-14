var app=getApp();
Page({
	data:{

	},
	getUserInfo:function(){
		var _this=this;
		wx.getUserInfo({
			success:function(res){
				console.log('userInfo',res);
				_this.setData({
					userInfo:res.userInfo
				})
			}
		})
	},
	onLoad:function(){
		var _this=this;
	  	wx.getSetting({
	  		success:function(res){
	  			if(!res.authSetting['scope.userInfo']){
	  				wx.authorize({
	  					scope:'scope.userInfo',
	  					success:function(){
	  						_this.getUserInfo();
	  					}
	  				})
	  			}else{
		          _this.getUserInfo();
		        }
	  		}
	  	});
	  	wx.getStorage({
	  		key:"userInfo",
	  		success:function(res){
	  			console.log(res);
	  			_this.setData({
	  				personalInfo:res.data
	  			})
	  		}
	  	})
	}
})