const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const http = require('http');
const rooster = {
	20230327: { begin: 900, end: 1530 },
	20230328: { begin: 1100, end: 1630 },
	20230329: { begin: 1030, end: 1430 },
	20230330: { begin: 900, end: 1300 },
	20230331: { begin: 900, end: 1130 },
};
const host = 'localhost';
const port = 8000;

const transform = JSON.stringify(rooster);
console.log(transform);
const requestListener = async function (req, res) {
	sleep(2000);
	res.writeHead(200);
	res.end(transform);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});
