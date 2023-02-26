const format = require('date-format'),
	now = new Date(2023, 02, 29);
const eNow = format.asString('yyyy-MM-dd', now); // normal date
console.log(eNow);

async function does(info) {
	const infos = info.elementPeriods[16899];
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
	return `${JSON.stringify(elementsChecked)}`;
}

async function get() {
	const z = fetch(
		`https://tipo.webuntis.com/WebUntis/api/public/timetable/weekly/data?elementType=1&elementId=16899&date=${eNow}&formatId=7`,
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
module.exports = get();
