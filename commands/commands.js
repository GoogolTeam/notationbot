//todo: make a better api
const notations=[require("./oldapi/unan.js"),require("./oldapi/basicmath.js"),require("./oldapi/letters.js"),require("./oldapi/uparrows.js")];
var stopcalcs=[]
function iscommand(text){
	return /^!(?:step |calculate |stop$)/.test(text);
}
function respond(text,reply,servername,channelname){
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
			if(stopcalcs.includes(servername+"~"+channelname)){
				stopcalcs.splice(stopcalcs.indexOf(servername+"~"+channelname),1);
				return;
			}
			if(buffer.length>0&&current!==null){
				reply(buffer.join("\n")).then(loop);
			}else if(buffer.length>0){
				reply(buffer.join("\n"))
			}
			buffer=temp;
		}
		loop();
	}else if(/^!stop$/.test(text)){
		stopcalcs.push(servername+"~"+channelname);
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