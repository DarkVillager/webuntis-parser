const format = require('date-format'),
	fetch = require('node-fetch'),
	elementId = '13864',
	now = new Date('2023-05-08'),
	eNow = format.asString('yyyy-MM-dd', now),
	now2 = new Date(Date.now()),
	eNow2 = format.asString('yyyy-MM-dd', now); // normal date

// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(arr) {
	var table = _table_.cloneNode(false),
		columns = addAllColumnHeaders(arr, table);
	for (var i = 0, maxi = arr.length; i < maxi; ++i) {
		var tr = _tr_.cloneNode(false);
		for (var j = 0, maxj = columns.length; j < maxj; ++j) {
			var td = _td_.cloneNode(false);
			var cellValue = arr[i][columns[j]];
			td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(arr, table) {
	var columnSet = [],
		tr = _tr_.cloneNode(false);
	for (var i = 0, l = arr.length; i < l; i++) {
		for (var key in arr[i]) {
			if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
				columnSet.push(key);
				var th = _th_.cloneNode(false);
				th.appendChild(document.createTextNode(key));
				tr.appendChild(th);
			}
		}
	}
	table.appendChild(tr);
	return columnSet;
}

let willem;
function server(elementsCheckeds) {
	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const express = require('express');
	const path = require('path');
	const app = express();
	const router = express.Router();
	router.get('/api', function (req, res) {
		app.use(express.static(`main`));
		res.json(elementsCheckeds);
		//__dirname : It will resolve to your project folder.
	});
	router.get('/', function (req, res) {
		willem = false;
		res.sendFile(path.join(__dirname + '/index.html'));
		//__dirname : It will resolve to your project folder.
	});
	router.get('/ext', function (req, res) {
		willem = true;
		res.sendFile(path.join(__dirname + '/index.html'));
		//__dirname : It will resolve to your project folder.
	});

	app.listen(3000, () => console.log(`Server is listening on port 3000`));
	const transform = JSON.stringify(elementsCheckeds);
	console.log(transform);
	app.use('/', router);
	// app.get('/', function (req, res) {
	// 	sleep(2000);
	// 	const options = {
	// 		root: __dirname,
	// 	};
	// 	res.sendFile('index.html', options);
	// 	res.end(transform);
	// });
}

async function does(info) {
	const infos = info.elementPeriods[elementId];
	const check = {};
	const elementsChecked = {};
	let g = 0;
	const elements = [];
	const testSorted = infos.sort(function (a, b) {
		if (a.date === b.date) return a.startTime - b.startTime;
		else return a.date - b.date;
	});
	testSorted.forEach((el) => {
		elements.push({
			date: el.date,
			startTime: el.startTime,
			endTime: el.endTime,
		});
	});

	elements.forEach((el) => {
		if (!check[el.date]) {
			g = 0;
			check[el.date] = { [g]: [el.startTime, el.endTime] };
		} else {
			check[el.date][g] = [el.startTime, el.endTime];
		}
		g++;
	});

	for (let index = 0; index < Object.keys(check).length; index++) {
		const numbers = Object.keys(check)[index];
		const childrenV = Object.values(check[numbers]);
		const sorted = childrenV.sort(function (a, b) {
			if (a !== b) return a - b;
		});
		const sortedLength = sorted.length;
		elementsChecked[Number(Object.keys(check)[index])] = {
			begin: Number(String(Array(sorted[0])[0]).split(',')[0]),
			end: Number(String(Array(sorted[sortedLength - 1])[0]).split(',')[1]),
		};
	}
	console.log(elementsChecked);
	return server(elementsChecked);
}

async function get() {
	const z = fetch(
		`https://tipo.webuntis.com/WebUntis/api/public/timetable/weekly/data?elementType=1&elementId=${elementId}&date=${
			willem ? eNow2 : eNow
		}&formatId=7`,
		{
			headers: {
				accept: 'application/json',
				'accept-language': 'en,ru;q=0.9,nl;q=0.8,en-US;q=0.7',
				'sec-ch-ua':
					'"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Windows"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				cookie:
					'schoolname="_cm9jIHJpdm9yIHRpZWw="; schoolname="_cm9jIHJpdm9yIHRpZWw="; schoolname="_cm9jIHJpdm9yIHRpZWw="; JSESSIONID=7B3C6155C7C90C3E41C675E973CD8D2D; traceId=66fc569f4a1263509efb2865dcaa09a09a560379',
				Referer:
					'https://tipo.webuntis.com/WebUntis/?school=roc%20rivor%20tiel',
				'Referrer-Policy': 'strict-origin-when-cross-origin',
			},
			body: null,
			method: 'GET',
		}
	)
		.then((res) => res.json())
		.then((data) => {
			return data.data.result.data;
		});
	return does(await z);
}

get();
