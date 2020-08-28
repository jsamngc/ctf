/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 */

import React from "react"
import { Flex } from "@chakra-ui/core"

import Main, { MainProps } from "./Main"

export type LayoutProps = {
	children: React.ReactNode
} & MainProps

const Layout: React.FC<LayoutProps> = (p: LayoutProps) => {
	const { children, ...mainProps } = p
	return (
		<Flex minH="100vh">
			<Main {...mainProps}>{children}</Main>
		</Flex>
	)
}

export default Layout
