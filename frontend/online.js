const Discord=require("discord.js");
const token=require("../token.js").token
const client=new Discord.Client();
client.on("ready",()=>{console.log("Active")});
client.on("message",respond);
function respond(msg){
	if(msg.content=="!notation"){
		msg.reply("TBD");
	}
}
client.login(token)