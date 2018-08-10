const Discord=require("discord.js");
const token=require("../token.js").token;
const client=new Discord.Client();
client.on("ready",()=>{console.log("Active")});
client.on("message",respond);
function respond(msg){
	function reply(text){
		msg.channel.send(text).catch(a=>{
			console.error(a);
			console.log(msg.content,text)}
		);
	}
	msg.channel.startTyping();
	commands.respond(msg.content,reply)
	msg.channel.stopTyping();
}
client.login(token);