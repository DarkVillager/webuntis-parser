kaas.forEach((el) => {
	if (!check[el.date]) {
		g = 0;
		check[el.date] = { [g]: el.time };
	} else {
		check[el.date][g] = el.time;
	}
	g++;
});
