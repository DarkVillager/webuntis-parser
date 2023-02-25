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
