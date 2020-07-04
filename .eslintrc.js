module.exports = {
	globals: {
		__PATH_PREFIX__: true,
		__BASE_PATH__: true, // this will rarely, if ever, be used by consumers
	},
	parser: "@typescript-eslint/parser",
	// parserOptions: {
	//   ecmaVersion: 2018,
	//   sourceType: 'module',
	//   ecmaFeatures: {
	//     jsx: true,
	//   },
	// },
	plugins: ["@typescript-eslint", "testing-library", "jest-dom"],
	env: {
		browser: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/strict",
		"prettier/@typescript-eslint",
		"prettier",
		"plugin:testing-library/recommended",
		"plugin:jest-dom/recommended",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"react/no-children-prop": "off",
		"react/display-name": "off",
	},
}
