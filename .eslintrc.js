module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: 'airbnb-base',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'no-tabs': 0,
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
	},
};
