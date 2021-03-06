var app=getApp();
Page({
	onLoad:function(params){
		var _this=this;
		_this.setData({
			layer:false,
			isview:false,
			token:params.token
		});
		app.util.find("/index.php?r=paper/generate",{id:params.id,token:params.token}).then(function(res){
			console.log('paper',res);
			if(res.status==0){
				wx.redirectTo({
					url:"/pages/result/result?id="+res.paperInfo.id
				});
			}else{
				_this.setData({
					questionList:res.qaList,
					isview:true,
					interval:null,
					paper_id:res.paperInfo.id,
					paperInfo:res.paperInfo,
					questionIndex:0
				})
				var answerList=[];
				var questionList=res.qaList;
				for(var i=0;i<res.qaList.length;i++){
					answerList.push({question_id:res.qaList[i].question_id,type:res.qaList[i].type,answers:[]});
					for(var j=0;j<questionList[i].answers.length;j++)
						questionList[i].answers[j].sequence=String.fromCharCode(65+j);
				}
				_this.setData({
					questionList:questionList,
					answerList:answerList,
					time:res.paperInfo.time*60
				});					
				_this.data.interval=setInterval(function(){
					_this.setData({
						remainTime:app.util.clockTime(_this.data.time--)
					});
					if(_this.data.time<=0){
						clearInterval(_this.data.interval);
						wx.showToast({
							title:"时间结束"
						});
						_this.submitResult();
					}
				},1000);
			}
			
		})
	},
	formatAnswer:function(value,id){
		var answerList=this.data.answerList;
		for(var i=0,len=answerList.length;i<len;i++){
			if(answerList[i].question_id==id){
				answerList[i].answers=value;
			}
		}
		this.setData({
			answerList:answerList
		})
		console.log(this.data.answerList);
	},
	onUnload:function(){
		clearInterval(this.data.interval);
	},
	questionSubmit:function(e){
		this.setData({
			layer:true
		});
	},
	closeLayer:function(){
		this.setData({
			layer:false
		});
	},
	submitResult:function(){
		clearInterval(this.data.interval);
		var str='{"status":1,"token":"'+this.data.token+'","paper_id":"'+this.data.paper_id+'","answers":{';
		var answerarr=[];
		for(var i=0,len=this.data.answerList.length;i<len;i++){
			if(this.data.answerList[i].type==1){
				answerarr.push('"'+this.data.answerList[i].question_id+'":['+this.data.answerList[i].answers+']');
			}else if(this.data.answerList[i].type==2){
				answerarr.push('"'+this.data.answerList[i].question_id+'":['+this.data.answerList[i].answers.join(",")+']');
			}
		}
		str+=answerarr.join(",");
		str+='}}';
		var obj=JSON.parse(str);
		console.log(obj);
		wx.request({
			url:app.util.webUrl+"/index.php?r=paper/submit",
			data:obj,
			header:{'content-type':'application/json'},
			success:function(res){
				console.log('exam result',res.data);
				wx.setStorage({
					key:"resultInfo",
					data:res.data,
					success:function(){
						wx.redirectTo({
							url:"/pages/result/result"
						})
					}
				})
			}
		});
	},
	prev:function(){
		this.setData({
			questionIndex:this.data.questionIndex-1
		});
	},
	next:function(){
		this.setData({
			questionIndex:this.data.questionIndex+1
		});
	},
	radioChange:function(e){
		this.formatAnswer(e.detail.value,e.currentTarget.dataset.id);
	},
	checkboxChange:function(e){
		this.formatAnswer(e.detail.value,e.currentTarget.dataset.id);
	}
})