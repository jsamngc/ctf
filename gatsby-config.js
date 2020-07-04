/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	/* Your site config here */
	siteMetadata: {
		title: `CTF React App`,
		description: `CTF React app`,
		author: `CSM`,
	},
	pathPrefix: "/ctf",
	plugins: [
		{
			resolve: "gatsby-plugin-chakra-ui",
			options: {
				/**
				 * @property {boolean} [isResettingCSS=true]
				 * if false, this plugin will not use `<CSSReset />
				 */
				isResettingCSS: false,
				/**
				 * @property {boolean} [isUsingColorMode=true]
				 * if false, this plugin will not use <ColorModeProvider />
				 */
				isUsingColorMode: false,
			},
		},
		{
			resolve: "gatsby-plugin-eslint",
			options: {
				test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
			},
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					// Allows SVGs names as `name.inline.svg` to be included as components
					include: /\.inline\.svg$/,
				},
			},
		},
		"gatsby-plugin-react-axe",
		"gatsby-plugin-react-helmet",
		// "gatsby-plugin-ts",
	],
}
