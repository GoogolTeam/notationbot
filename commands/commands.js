//todo: make a better api
const notations=[require("./oldapi/unan.js")];
function respond(text){
	if(/^!notation /.test(text)){
		return step(text.slice(10));
	}
	return null;
}
function step(str){
	var notation=-1;
	for(var i=str.length-1;i>=0;i--){
		for(var j=0;j<notations.length;j++){
			if(notations[j].triggerchars.includes(str[i])){
				notation=j;
				i=-1;
				break;
			}
		}
	}
	if(notation==-1){
		return null;
	}
	return notations[j].step(str);
}
exports.respond=respond;