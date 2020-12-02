module.exports = {
	env: {
		browser: true,
		node: true,
		es2020: true,
	},
	extends: ["airbnb-base", "prettier"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 11,
	},
	rules: {
		"no-console": 0,
		"linebreak-style": 0,
		indent: 0,
		"no-tabs": 0,
		quotes: 0,
	},
};
