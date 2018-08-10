console.log("Active");
//stackoverflow 8128578
const stdin=process.openStdin();
const commands=require("../commands/commands.js");
stdin.addListener("data",d=>{
	var response=commands.respond(d.toString().slice(0,-1));
	if(response!==null){
		console.log(response);
	}
});