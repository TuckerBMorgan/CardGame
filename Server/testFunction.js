
function main()
{
	var obj = {
		"t":"t",
		"i":0,
		"f":function(param){console.log("I am the best\n")}
	}
	console.log(JSON.stringify(obj));
	var test;

	test = Object.assign({}, obj);
	test.f();
}

main();
