//todo: make a better api
const notations=[require("./oldapi/unan.js")];
function iscommand(text){
	return /^!(?:step|calculate) /.test(text);
}
//will probably need a server/channel input
function respond(text,reply){
	if(/^!step /.test(text)){
		var output=step(text.slice(6));
		if(output!==null){
			reply(output);
		}
	}else if(/^!calculate /.test(text)){
		var current=text.slice(11);
		var buffer=[]
		function loop(){
			while(buffer.join("\n").length<=2000){
				current=step(current);
				if(current===null){
					break;
				}
				buffer.push(current);
			}
			var temp;
			if(buffer.join("\n").length>2000){
				temp=[buffer.pop()];
			}else{
				temp=[]
			}
			if(buffer.length>0&&current!==null){
				reply(buffer.join("\n")).then(loop);
			}else if(buffer.length>0){
				reply(buffer.join("\n"))
			}
			buffer=temp;
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