import theme from "@c1ds/components/theme"

export default {
	...theme,
	space: {
		...theme.space,
		"24": "1.5rem",
		"40": "2.5rem",
		"64": "4rem",
		"72": "4.5rem",
		"96": "6rem",
	},
	sizes: {
		...theme.sizes,
		textarea: "129px",
		iconSort: "2.25rem !important",
	},
	colors: {
		...theme.colors,
		monitor: "#f9c642",
		general: "#DD7533",
	},
	radii: {
		...theme.radii,
		round: "50%",
		chip: "16px",
	},
}
