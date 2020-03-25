const axios = require("axios");
const comma = require("comma-number");
const { sortingStateKeys } = require("./table.js");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");
const orderBy = require("lodash.orderby");

module.exports = async (spinner, table, states, sortBy) => {
	if (states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/states`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allStates = response.data;

		// Sort.
		allStates = orderBy(allStates, [sortingStateKeys[sortBy]], ["desc"]);

		// Push selected data.
		allStates.map((oneState, count) => {
			table.push([
				count + 1,
				oneState.state,
				comma(oneState.cases),
				comma(oneState.todayCases),
				comma(oneState.deaths),
				comma(oneState.todayDeaths),
				comma(oneState.active)
			]);
		});

	}
};
