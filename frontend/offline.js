console.log("Active");
//stackoverflow 8128578
const stdin=process.openStdin();
const commands=require("../commands/commands.js");
stdin.addListener("data",d=>{
	commands.respond(d.toString().slice(0,-1),console.log);
});