import React from "react"
import { Box } from "@chakra-ui/core"
import { CircularProgress as MuiCircularProgress } from "@material-ui/core"

export const CircularProgress: React.FC = () => (
	<Box color="clickable">
		<MuiCircularProgress color="inherit" size={48} thickness={7.5} />
	</Box>
)
