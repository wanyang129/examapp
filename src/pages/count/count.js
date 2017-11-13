var app=getApp();
Page({
	loadMore:function(){
		if(!this.data.hasMore)
			return;
		var _this=this;
		var params={start:(_this.data.page-1)*_this.data.size,count:_this.data.size,token:_this.data.token};
		_this.data.page++;
		app.util.find("/index.php?r=paper/mine",params).then(function(res){
			console.log('count',res);
			if(res.paperList.length){
				_this.setData({
					paperList:_this.data.paperList.concat(res.paperList),
					loading:false
				})
			}else{
				_this.setData({
					loading:false,
					hasMore:false
				})
			}
			
		})
	},
	onLoad:function(){
		var _this=this;
		this.setData({
			page:1,
			size:8,
			hasMore:true,
			paperList:[]
		});
		wx.getStorage({
			key:"userInfo",
			success:function(res){
				console.log(res.data.token);
				_this.setData({
					token:res.data.token
				})
				_this.loadMore();
			},fail:function(){
				wx.redirectTo({
					url:"/pages/login/login"
				});
			}
		})
		
	},
	onReachBottom:function(){
		this.loadMore();
	}
})