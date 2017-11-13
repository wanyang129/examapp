'use strict';

var webUrl = "http://172.16.57.235:8080";
function fetch(path, param) {
	return new Promise(function (resolve, reject) {
		wx.request({
			url: webUrl + path,
			data: Object.assign(param),
			header: { 'content-type': 'application/json' },
			success: resolve,
			fail: reject
		});
	});
}
function find(path, param) {
	return fetch(path, param).then(function (res) {
		return res.data;
	});
}
function isEmptyObj(obj) {
	for (var i in obj) {
		return false;
	}
	return true;
}
function json2Form(json) {
	var str = [];
	for (var p in json) {
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
	}
	return str.join("&");
}
module.exports = {
	find: find,
	json2Form: json2Form,
	isEmptyObj: isEmptyObj,
	webUrl: webUrl
};
//# sourceMappingURL=../../maps/utils/util.js.map
