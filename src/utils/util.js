// var webUrl="http://172.16.57.235:8080";
var webUrl="http://172.16.117.161:84";

function fetch(path,param){
	return new Promise(function(resolve,reject){
		wx.request({
			url:webUrl+path,
			data:Object.assign(param),
			header:{'content-type':'application/json'},
			success:resolve,
			fail:reject
		})
	})
}
function find(path,param){
	return fetch(path,param).then(function(res){
		return res.data;
	})
}
function clockTime(time){
	var hours=parseInt(time/3600);
	hours=hours==0?"00":(hours<10?"0"+hours:hours);
	var minutes=parseInt(time%3600/60);
	minutes=minutes==0?"00":(minutes<10?"0"+minutes:minutes);
	var seconds=time%60;
	seconds=seconds<10?"0"+seconds:seconds;
	return hours+":"+minutes+":"+seconds;
}
function isEmptyObj(obj){
	for(var i in obj){
		return false;
	}
	return true;
}
function json2Form(json) { 
  var str = []; 
  for(var p in json){ 
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p])); 
  } 
  return str.join("&"); 
} 
module.exports={
	find:find,
	json2Form:json2Form,
	isEmptyObj:isEmptyObj,
	clockTime:clockTime,
	webUrl:webUrl
}