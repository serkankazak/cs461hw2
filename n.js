var so = require("./j.js");

if (process.argv.length == 3) {

	console.log(so.ge(process.argv[2]));

} else if (process.argv.length == 6) {

    console.log(so.sol(process.argv[2], process.argv[3], process.argv[4], (process.argv[5] == "1")));

}
