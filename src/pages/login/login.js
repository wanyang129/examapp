var app=getApp();
Page({
	onLoad:function(){
		var _this=this;
		wx.getStorage({
			key:"userInfo",
			success:function(res){
				wx.switchTab({
					url:"/pages/index/index"
				})
			},fail:function(){
				_this.setData({
					disabled:true,
					code:app.globalData.code,
					reason:false
				});
			}
		})
	},
	inputName:function(e){
		this.setData({
			name:e.detail.value
		})
		this.checkForm();
	},
	inputPass:function(e){
		this.setData({
			password:e.detail.value
		})
		this.checkForm();
	},
	checkForm:function(){
		
		if(this.data.name && this.data.name!="" && this.data.password && this.data.password!=""){
			this.setData({
				disabled:false
			})
		}else{
			this.setData({
				disabled:true
			})
		}
	},
	formSubmit:function(e){
		var _this=this;
		app.util.find("/index.php?r=site/login",e.detail.value).then(function(res){
			console.log("login",res)
			if(res.status==1){
				wx.setStorage({
					key:"userInfo",
					data:res.data,
					success:function(){
						wx.switchTab({
							url:"/pages/index/index"
						})
					}
				});
				console.log('aa');
			}else if(res.status==0){
				_this.setData({
					reason:true
				});
			}
		})
	}
})