const check = {};
const kaasChecked = {};
let g = 0;
const kaas = [
	{
		time: 140,
		date: 20230327,
	},
	{
		time: 090,
		date: 20230327,
	},

	{
		time: 150,
		date: 20230327,
	},
	{
		time: 090,
		date: 20230328,
	},
	{
		time: 140,
		date: 20230328,
	},
	{
		time: 150,
		date: 20230328,
	},
];
kaas.forEach((el) => {
	if (!check[el.date]) {
		g = 0;
		check[el.date] = { [g]: el.time };
	} else {
		check[el.date][g] = el.time;
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
	kaasChecked[Number(Object.keys(check)[index])] = {
		begin: sorted[0],
		end: sorted[sortedLength - 1],
	};
}
console.log(kaasChecked);
