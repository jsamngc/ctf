import React from "react"
import { Box, Grid, Divider } from "@chakra-ui/core"
import { H2 } from "@c1ds/components"

type FormProps<T = HTMLFormElement> = {
	children: React.ReactNode
} & React.FormHTMLAttributes<T> &
	React.RefAttributes<T>

export const Form: React.FC<FormProps> = (p: FormProps) => {
	const { children, ...formProps } = p
	return (
		<Grid
			as="form"
			gridColumn="1 / -1"
			gridGap={{ base: "16px", md: "24px" }}
			gridTemplateColumns={["repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(8, 1fr)", "repeat(12, 1fr)"]}
			{...formProps}>
			{children}
		</Grid>
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
