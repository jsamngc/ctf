import theme from "@c1ds/components/theme"

const breakpoints = ["320px", "480px", "768px", "1024px", "1280px"]
breakpoints.xs = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]
breakpoints.xl = breakpoints[4]

export default {
	...theme,
	breakpoints,
	fontSizes: {
		...theme.fontSizes,
		breadcrumb: "18px",
	},
	space: {
		...theme.space,
		"24": "1.5rem",
		"40": "2.5rem",
		"64": "4rem",
		"72": "4.5rem",
		"96": "6rem",
	},
	lineHeights: {
		...theme.lineHeights,
		modalButton: "1rem",
	},
	sizes: {
		...theme.sizes,
		textarea: "129px",
		iconPoc: "1.25rem !important",
		iconSort: "2.25rem !important",
		iconMobileCreate: "1.75rem !important",
	},
	colors: {
		...theme.colors,
		monitor: "#F9C642",
		general: "#DD7533",
	},
	radii: {
		...theme.radii,
		round: "50%",
		chip: "16px",
	},
}
