import React from "react"
import SEO from "./seo"
import { Box, Grid } from "@chakra-ui/core"
import { H1, P } from "@c1ds/components"

interface MainProps {
	pageHeading: string
	pageTitle: string
	pageDescription?: string
	children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children, pageHeading, pageTitle, pageDescription }: MainProps) => {
	return (
		<Box as="main" w="full">
			<SEO title={pageTitle} />

			<Grid
				as="section"
				id="pageSection"
				gridColumn="1 / -1"
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={["repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(8, 1fr)", "repeat(12, 1fr)"]}
				bg="white"
				maxW={{ xl: "1280px" }}
				m={{ xl: "auto" }}
				paddingX={{ base: "16", md: "24" }}
				paddingTop={{ base: "16", md: "24" }}
				paddingBottom={{ base: "64", md: "96" }}>
				<Box gridColumn="1 / -1">
					<Box wordBreak="break-all">
						<H1>{pageHeading}</H1>
					</Box>
					{pageDescription && (
						<Box marginTop="12">
							<P>{pageDescription}</P>
						</Box>
					)}
				</Box>
				{children}
			</Grid>
		</Box>
	)
}

export default Main
