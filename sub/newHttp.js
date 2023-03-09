const express = require('express');
const app = express();

app.get('/', function (req, res) {
	const ipAddress = req.socket.remoteAddress;
	res.send(ipAddress);
});
app.listen(3000, () => console.log(`Server is listening on port 3000`));
