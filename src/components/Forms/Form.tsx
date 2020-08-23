import React, { useContext } from "react"
import { Box, Grid, Divider } from "@chakra-ui/core"
import { H2 } from "@c1ds/components"

type FormModes = "create" | "view" | "edit"

type FormProps<T = HTMLFormElement> = React.FormHTMLAttributes<T> & React.RefAttributes<T>

/**
 * Form wrapper component which includes standard C1DS grid layout
 */
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
	/**
	 * Section title
	 */
	title: string
	/**
	 * Controls whether hr section separator is displayed at the end of the section
	 */
	showDivider?: boolean
}

/**
 * Renders form sections with standard C1DS grid layout
 */
export const FormSection: React.FC<FormSectionProps> = p => (
	<Grid
		as="section"
		gridColumn="1 / -1"
		gridGap={{ base: "16px", md: "24px" }}
		gridTemplateColumns={["repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(8, 1fr)", "repeat(12, 1fr)"]}>
		{p.title && (
			<Box marginBottom="4" gridColumn="1 / -1">
				<H2>{p.title}</H2>
			</Box>
		)}
		{p.children}
		{p.showDivider && (
			<Box gridColumn={{ base: "1 / -1" }}>
				<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
			</Box>
		)}
	</Grid>
)

interface FormContextProps {
	/**
	 * Form mode stateful value
	 */
	formMode: FormModes
	/**
	 * `true` if form is currently in create mode
	 */
	isCreate: boolean
	/**
	 * `true` if form is  form currently in edit mode
	 */
	isEdit: boolean
	/**
	 * `true` if form is  form currently in view mode
	 */
	isView: boolean
}

const FormContext = React.createContext<FormContextProps | null>(null)
FormContext.displayName = "CTFFormContext"

/**
 * Hook allowing access to CTF Form Context.
 *
 * CTF Form context includes props to:
 * - View form mode (view/create/edit) state
 * - Manage/update form mode state
 *
 * There must be a parent `CTFFormProvider` component in the component tree
 * for `useCTFFormContext` to work.
 */
export const useCTFFormContext = (): FormContextProps => useContext(FormContext) as FormContextProps

interface CTFFormProviderProps {
	/**
	 * Form mode to use as initial state
	 */
	formMode: FormModes
}

/**
 * Provider for CTF Form context
 * @see useCTFFormContext
 */
export const CTFFormProvider: React.FC<CTFFormProviderProps> = p => {
	const { formMode } = p

	const providerProps = {
		formMode,
		isCreate: formMode === "create",
		isEdit: formMode === "edit",
		isView: formMode === "view",
	}

	return <FormContext.Provider value={providerProps}>{p.children}</FormContext.Provider>
}

/**
 * Helper function to replace special MS Word
 * characters with their ASCII equivalent
 */
export const replaceMSWordChars = (s: string): string =>
	s &&
	s
		.replace(/[\u2018\u2019\u201A]/g, `'`)
		.replace(/[\u201C\u201D\u201E]/g, `"`)
		.replace(/[\u2013\u2014]/g, `-`)
