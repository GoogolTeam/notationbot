const Discord=require("discord.js");
const token=require("../token.js").token;
const client=new Discord.Client();
client.on("ready",()=>{console.log("Active")});
client.on("message",respond);
function respond(msg){
	msg.channel.startTyping();
	var response=commands.respond(msg.content);
	if(response!==null){
		msg.channel.send(response).catch(a=>{console.error(a);console.log(msg.content)});
	}
	msg.channel.stopTyping();
}
client.login(token);