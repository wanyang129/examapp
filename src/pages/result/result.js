var app=getApp();
Page({
	handler:function(paperInfo,qaList){
		var questionList=qaList;
		for(var i=0,len=questionList.length;i<len;i++){
			var rightanswer="";
			var useranswer="";
			for(var j=0;j<questionList[i].answers.length;j++){
				questionList[i].answers[j].sequence=String.fromCharCode(j+65);
				if(questionList[i].right_answer.indexOf(questionList[i].answers[j].answer_id)>-1){
					rightanswer+=String.fromCharCode(j+65);
				}
				if(questionList[i].user_answer.indexOf(questionList[i].answers[j].answer_id)>-1){
					useranswer+=String.fromCharCode(j+65);
				}
			}
			questionList[i].useranswer=useranswer;
			questionList[i].rightanswer=rightanswer;
		}
		this.setData({
			paperInfo:paperInfo,
			questionList:questionList
		})
	},
	onLoad:function(params){
		var _this=this;
		if(!app.util.isEmptyObj(params)){
			var id=params.id;
			wx.getStorage({
				key:"userInfo",
				success:function(res){
					app.util.find("/index.php?r=paper/info",{paper_id:id,token:res.data.token}).then(function(res){
						console.log('result',res);
						_this.handler(res.paperInfo,res.qaList);
					})
				}
			})
		}else{
			wx.getStorage({
				key:"resultInfo",
				success:function(res){
					_this.handler(res.data.paperInfo,res.data.qaList);
				},fail:function(){
					wx.redirectTo({
						url:"/pages/login/login"
					});
				}
			})
		}
	}
})