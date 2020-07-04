import React from "react"
import PropTypes from "prop-types"
import { Box } from "@chakra-ui/core"

const Layout = ({ children }: { children: React.ReactNode }) => {
	const max_size = ["100%", "100%", "100%", "702px", "976px", "1232px"]
	const marginX = ["8px", "8px", "8px", "auto"]
	return (
		<>
			<Box as="main" maxWidth={max_size} mx={marginX}>
				{children}
			</Box>
		</>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
