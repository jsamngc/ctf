import { useEffect, useState } from "react"

/**
 * Retrieve saved form data,
 * optionally initialized to default values if not found
 *
 * @param rootKey Key for top-level object containing all forms' data
 * @param formName Name page-level specific form data to retrieve.
 *  Returns top-level form object with all pages' data if not specified
 * @param defaultValue Default value to be returned if no form data is found
 *
 * @returns Saved form data or default value if none is found
 */
export const getSavedForm = <T extends Record<string, unknown> | Array<Record<string, unknown>>>(
	rootKey: string,
	formName?: string,
	defaultValue?: T
): T => {
	let formData
	if (typeof window !== "undefined") {
		const storedData = window.sessionStorage.getItem(rootKey)
		const savedForm = storedData && JSON.parse(storedData)
		formData = savedForm && formName ? savedForm[formName] : savedForm
	}

	return formData || defaultValue
}

/**
 * Clear all stored form data
 *
 * @param {string} rootKey Key for top-level object containing all forms' data
 */
export const clearAllFormData = (rootKey: string): void => {
	typeof window !== "undefined" && window.sessionStorage.removeItem(rootKey)
}

type useSavedFormOverload = {
	<T extends Record<string, unknown>>(rootKey: string): [T, (formData: T) => void]
	<T extends Array<Record<string, unknown>>>(rootKey: string, formName: string): [T, (formData: T) => void]
	<T extends Array<Record<string, unknown>>>(rootKey: string, formName: string, persistOnUnload: boolean): [
		T,
		(formData: T) => void
	]
}

/**
 * Custom hook to manage saved form data.
 *
 * @param {string} rootKey Key for top-level object containing all forms' data
 * @param {string} formName Name page-level specific form data to retrieve (ex. Child Information (1 of 2) form data).
 *  Returns top-level form object with all pages' data if not specified
 *
 * @returns Current stateful form data and a function to update it
 */
export const useSavedForm: useSavedFormOverload = <T extends Record<string, unknown> | Array<Record<string, unknown>>>(
	rootKey: string,
	formName?: string,
	persistOnUnload?: boolean
): [T, (formData: T) => void] => {
	const [formData, setFormData] = useState<T>(() => {
		let formData
		if (typeof window !== "undefined") {
			const storedData = window.sessionStorage.getItem(rootKey)
			formData = storedData && JSON.parse(storedData)
		}
		return formData ?? {}
	})

	// Update storage when from data changes
	useEffect(() => {
		window.sessionStorage.setItem(rootKey, JSON.stringify(formData))
	}, [formData, rootKey])

	// Clear form data from session storage on unload
	useEffect(() => {
		const clearFormData = () => window.sessionStorage.removeItem(rootKey)
		if (!persistOnUnload) {
			window.addEventListener("beforeunload", clearFormData)
		}

		return () => {
			if (!persistOnUnload) {
				window.removeEventListener("beforeunload", clearFormData)
			}
		}
	}, [rootKey])

	// Update the form data with new sub-form values
	const saveFormData = (formVals: T) => {
		formName ? setFormData(prevFormData => ({ ...prevFormData, [formName]: formVals })) : setFormData(formVals)
	}

	return [formName ? (formData as Record<string, T>)[formName] : formData, saveFormData]
}
