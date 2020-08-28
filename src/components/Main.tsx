import React from "react"
import SEO from "./seo"
import { Box, Grid, Flex, Text } from "@chakra-ui/core"
import { H1, P, Link } from "@c1ds/components"

interface Breadcrumb {
	/**
	 * Displayed breadcrumb text
	 */
	label: string
	/**
	 * Indicates if breadcrumb
	 * is for current page
	 */
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export interface MainProps {
	/**
	 * Top-level page heading/name
	 */
	pageHeading: string

	/**
	 * Page title for SEO. Also displays as tab name
	 */
	pageTitle: string

	/**
	 * Page description/sub-heading
	 */
	pageDescription?: string
	/**
	 * Page breadcrumbs
	 */
	breadcrumbs?: Breadcrumb[]
	children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children, pageHeading, pageTitle, pageDescription, breadcrumbs }: MainProps) => {
	return (
		<Grid
			as="main"
			alignContent="start"
			gridGap={{ base: "16px", md: "24px" }}
			gridTemplateColumns={{ base: "repeat(4, 1fr)", md: "repeat(8, 1fr)", lg: "repeat(12, 1fr)" }}
			bg="white"
			w="full"
			maxW={{ xl: "1280px" }}
			mx={{ xl: "auto" }}
			paddingX={{ base: "16", md: "24" }}
			paddingTop={{ base: "16", md: "24" }}
			paddingBottom={{ base: "64", md: "96" }}
			lineHeight="normal">
			<SEO title={pageTitle} />

			<Box gridColumn="1 / -1">
				{breadcrumbs && (
					<Box as="nav" fontSize="breadcrumb" lineHeight="normal" marginBottom={16}>
						<Box as="ol" padding={0} margin={0}>
							{breadcrumbs.map((breadcrumb, index) => (
								<Flex as="li" display="inline-flex" align="baseline" key={index}>
									{index < breadcrumbs.length - 1 ? (
										<>
											<Link onClick={breadcrumb.onClick}>{breadcrumb.label}</Link>
											<Box as="span" role="presentation" marginX={8}>
												&gt;
											</Box>
										</>
									) : (
										<Text
											fontFamily="default"
											color={"text"}
											fontWeight="normal"
											lineHeight="normal"
											margin={0}>
											{breadcrumb.label}
										</Text>
									)}
								</Flex>
							))}
						</Box>
					</Box>
				)}
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
	)
}

export default Main
