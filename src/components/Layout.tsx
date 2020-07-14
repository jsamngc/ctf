/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 */

import React from "react"
import { Flex } from "@chakra-ui/core"

import Main from "./main"

interface LayoutProps {
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
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (p: LayoutProps) => {
	const { children, ...mainProps } = p
	return (
		<Flex minH="100vh">
			<Main {...mainProps}>{children}</Main>
		</Flex>
	)
}

export default Layout
