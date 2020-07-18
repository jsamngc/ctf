import React, { useState, useContext } from "react"
import { Box, Grid, Divider } from "@chakra-ui/core"
import { H2 } from "@c1ds/components"

export type FormModes = "create" | "view" | "edit"

type FormProps<T = HTMLFormElement> = React.FormHTMLAttributes<T> & React.RefAttributes<T>

export const Form: React.FC<FormProps> = p => {
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
}

export const FormSection: React.FC<FormSectionProps> = p => (
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

interface FormContextProps {
	formMode: FormModes
	setFormMode: React.Dispatch<React.SetStateAction<FormModes>>
	/**
	 * Is form currently in create mode
	 */
	isCreate: boolean
	/**
	 * Is form currently in edit mode
	 */
	isEdit: boolean
	/**
	 * Is form currently in view mode
	 */
	isView: boolean
}

const FormContext = React.createContext<FormContextProps | null>(null)
FormContext.displayName = "CTFFormContext"

export const useCTFFormContext = (): FormContextProps => useContext(FormContext) as FormContextProps

interface CTFFormProviderProps {
	initialFormMode: FormModes
}

export const CTFFormProvider: React.FC<CTFFormProviderProps> = p => {
	const [formMode, setFormMode] = useState<FormModes>(p.initialFormMode)

	const providerProps = {
		formMode,
		setFormMode,
		isCreate: formMode === "create",
		isEdit: formMode === "edit",
		isView: formMode === "view",
	}

	return <FormContext.Provider value={providerProps}>{p.children}</FormContext.Provider>
}

export const replaceMSWordChars = (s: string): string =>
	s &&
	s
		.replace(/[\u2018\u2019\u201A]/, `'`)
		.replace(/[\u201C\u201D\u201E]/, `"`)
		.replace(/[\u2013\u2014]/, `-`)
