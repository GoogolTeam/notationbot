//todo: make a better api
const notations=[require("./oldapi/unan.js")];
//will probably need a server/channel input
function iscommand(text){
	return /^!(?:step|calculate) /.test(text);
}
function respond(text,reply){
	if(/^!step /.test(text)){
		var output=step(text.slice(6));
		if(output!==null){
			reply(output);
		}
	}else if(/^!calculate /.test(text)){
		var current=text.slice(11);
		function loop(){
			current=step(current);
			if(current!==null){
				reply(current).then(loop);
			}
		}
		loop();
	}
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
exports.iscommand=iscommand;