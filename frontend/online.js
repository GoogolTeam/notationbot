const Discord=require("discord.js");
const token=require("../token.js").token;
const client=new Discord.Client();
client.on("ready",()=>{console.log("Active")});
client.on("message",respond);
const commands=require("../commands/commands.js");
function respond(msg){
	function reply(text){
		return new Promise((win,lose)=>msg.channel.send(text).catch(a=>{
			console.error(a);
			console.log(msg.content,text)
		}).then(win,lose));
	}
	if(commands.iscommand(msg.content)){
		msg.channel.startTyping();
		commands.respond(msg.content,reply);
		msg.channel.stopTyping();
	}
}
client.login(token);