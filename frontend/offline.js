console.log("Active");
//stackoverflow 8128578
const stdin=process.openStdin();
const commands=require("../commands/commands.js");
stdin.addListener("data",d=>{
	function reply(text){
		return new Promise((win,lose)=>{
			console.log(text);
			win();
		})
	}
	commands.respond(d.toString().slice(0,-1),reply,"Terminal","window");
});