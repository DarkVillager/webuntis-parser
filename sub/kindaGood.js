const check = {};
const kaasChecked = {};
let g = 0;
const kaas = [];
const test = [
	{
		id: 22672013,
		lessonId: 275317,
		lessonNumber: 402401,
		lessonCode: 'LESSON',
		lessonText: '',
		periodText: '',
		hasPeriodText: false,
		periodInfo: '',
		periodAttachments: [],
		substText: '',
		date: 20230327,
		startTime: 800,
		endTime: 930,
		elements: [[Array], [Array], [Array], [Array], [Array]],
		studentGroup: 'SG20221205090348_4024',
		hasInfo: false,
		code: 0,
		cellState: 'STANDARD',
		priority: 5,
		is: { standard: true, event: false },
		roomCapacity: 0,
		studentCount: 0,
	},
	{
		id: 22676693,
		lessonId: 275317,
		lessonNumber: 402401,
		lessonCode: 'LESSON',
		lessonText: '',
		periodText: '',
		hasPeriodText: false,
		periodInfo: '',
		periodAttachments: [],
		substText: '',
		date: 20230327,
		startTime: 930,
		endTime: 1000,
		elements: [[Array], [Array], [Array], [Array], [Array]],
		studentGroup: 'SG20221205090348_4024',
		hasInfo: false,
		code: 0,
		cellState: 'STANDARD',
		priority: 5,
		is: { standard: true, event: false },
		roomCapacity: 0,
		studentCount: 0,
	},
	{
		id: 22677883,
		lessonId: 275439,
		lessonNumber: 403300,
		lessonCode: 'LESSON',
		lessonText: '+Devices(hardware)',
		periodText: '',
		hasPeriodText: false,
		periodInfo: '',
		periodAttachments: [],
		substText: '',
		date: 20230327,
		startTime: 1200,
		endTime: 1230,
		elements: [[Array], [Array], [Array], [Array], [Array]],
		studentGroup: 'SG20221205092004_4033',
		hasInfo: false,
		code: 0,
		cellState: 'STANDARD',
		priority: 5,
		is: { standard: true, event: false },
		roomCapacity: 0,
		studentCount: 0,
	},
	{
		id: 22258508,
		lessonId: 275444,
		lessonNumber: 403400,
		lessonCode: 'LESSON',
		lessonText: '+Devices(hardware)',
		periodText: '',
		hasPeriodText: false,
		periodInfo: '',
		periodAttachments: [],
		substText: '',
		date: 20230331,
		startTime: 1030,
		endTime: 1100,
		elements: [[Object], [Object], [Object], [Object], [Object]],
		studentGroup: 'SG20221205092007_4034',
		hasInfo: false,
		code: 0,
		cellState: 'STANDARD',
		priority: 5,
		is: { standard: true, event: false },
		roomCapacity: 0,
		studentCount: 0,
	},
	{
		id: 22258513,
		lessonId: 275444,
		lessonNumber: 403400,
		lessonCode: 'LESSON',
		lessonText: '+Devices(hardware)',
		periodText: '',
		hasPeriodText: false,
		periodInfo: '',
		periodAttachments: [],
		substText: '',
		date: 20230331,
		startTime: 1100,
		endTime: 1130,
		elements: [[Object], [Object], [Object], [Object], [Object]],
		studentGroup: 'SG20221205092007_4034',
		hasInfo: false,
		code: 0,
		cellState: 'STANDARD',
		priority: 5,
		is: { standard: true, event: false },
		roomCapacity: 0,
		studentCount: 0,
	},
	{
		id: 22258518,
		lessonId: 275444,
		lessonNumber: 403400,
		lessonCode: 'LESSON',
		lessonText: '+Devices(hardware)',
		periodText: '',
		hasPeriodText: false,
		periodInfo: '',
		periodAttachments: [],
		substText: '',
		date: 20230331,
		startTime: 1130,
		endTime: 1200,
		elements: [[Object], [Object], [Object], [Object], [Object]],
		studentGroup: 'SG20221205092007_4034',
		hasInfo: false,
		code: 0,
		cellState: 'STANDARD',
		priority: 5,
		is: { standard: true, event: false },
		roomCapacity: 0,
		studentCount: 0,
	},
];
test.forEach((el) => {
	kaas.push({ date: el.date, startTime: el.startTime, endTime: el.endTime });
});

kaas.forEach((el) => {
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
	console.log(childrenV);
	const sorted = childrenV.sort(function (a, b) {
		if (a !== b) return a - b;
	});
	console.log(sorted);
	const sortedLength = sorted.length;
	kaasChecked[Number(Object.keys(check)[index])] = {
		begin: Number(String(Array(sorted[0])[0]).split(',')[0]),
		end: Number(String(Array(sorted[sortedLength - 1])[0]).split(',')[0]),
	};
}
console.log(kaasChecked);
