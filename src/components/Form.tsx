import React from "react"
import { Box, Grid, Divider } from "@chakra-ui/core"
import { H1, H2, P } from "@c1ds/components"

type FormProps<T = HTMLFormElement> = {
	displayedTitle: string
	description?: string
	children: React.ReactNode
} & React.FormHTMLAttributes<T> &
	React.RefAttributes<T>

export const Form: React.FC<FormProps> = (p: FormProps) => {
	const { displayedTitle, description, children, ...formProps } = p
	return (
		<form {...formProps}>
			<Grid
				gridColumn="1 / -1"
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={["repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(8, 1fr)", "repeat(12, 1fr)"]}
				color="white"
				maxW={{ xl: "1280px" }}
				m={{ xl: "auto" }}
				paddingX={{ base: "16", md: "24" }}
				paddingTop={{ base: "16", md: "24" }}
				paddingBottom={{ base: "64", md: "96" }}>
				<Box gridColumn="1 / -1">
					<Box marginBottom="12" wordBreak="break-all">
						<H1>{displayedTitle}</H1>
					</Box>
					<Box>
						<P>{description}</P>
					</Box>
				</Box>
				{children}
			</Grid>
		</form>
	)
}

interface FormSectionProps {
	title: string
	showDivider?: boolean
	children: React.ReactElement[]
}

export const FormSection: React.FC<FormSectionProps> = (p: FormSectionProps) => (
	<Grid
		as="section"
		gridColumn="1 / -1"
		gridGap={{ base: "16px", md: "24px" }}
		gridTemplateColumns={["repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(8, 1fr)", "repeat(12, 1fr)"]}>
		<Box marginBottom="4" gridColumn="1 / -1">
			<H2>{p.title}</H2>
		</Box>
		{p.children}
		{p.showDivider && (
			<Box gridColumn={{ base: "1 / -1" }}>
				<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
			</Box>
		)}
	</Grid>
)
