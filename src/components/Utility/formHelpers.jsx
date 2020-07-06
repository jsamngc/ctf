import { useEffect, useState } from "react"

/**
 * Retrieve saved form data,
 * optionally initialized to default values if not found
 *
 * @param {string} formName Name page-level specific form data to retrieve.
 *  Returns top-level form object with all pages' data if not specified
 * @param {object} defaultValue Default value to be returned if no form data is found
 * @param {string} rootKey Key for top-level object containing all forms' data
 *
 * @returns Saved form data or default value if none is found
 */
export const getSavedForm = (formName, rootKey, defaultValue) => {
	let formData
	if (typeof window !== "undefined") {
		const savedForm = JSON.parse(window.sessionStorage.getItem(rootKey))
		formData = savedForm && formName ? savedForm[formName] : savedForm
	}

	return formData || defaultValue
}

/**
 * Clear all stored form data
 *
 * @param {string} rootKey Key for top-level object containing all forms' data
 */
export const clearAllFormData = rootKey => {
	typeof window !== "undefined" && window.sessionStorage.removeItem(rootKey)
}

/**
 * Custom hook to manage saved form data.
 *
 * @param {string} formName Name page-level specific form data to retrieve (ex. Child Information (1 of 2) form data).
 *  Returns top-level form object with all pages' data if not specified
 * @param {string} rootKey Key for top-level object containing all forms' data
 *
 * @returns Current stateful form data and a function to udpate it
 */
export const useSavedForm = (formName, rootKey) => {
	const [formData, setFormData] = useState(
		() => (typeof window !== "undefined" && JSON.parse(window.sessionStorage.getItem(rootKey))) || {}
	)

	// Update storage when from data changes
	useEffect(() => {
		window.sessionStorage.setItem(rootKey, JSON.stringify(formData))
	}, [formData])

	// Clear form data from session storage on unload
	// TODO: Remove to keep data during demos
	useEffect(() => {
		const clearFormData = () => window.sessionStorage.removeItem(rootKey)
		window.addEventListener("beforeunload", clearFormData)

		return () => {
			window.removeEventListener("beforeunload", clearFormData)
		}
	}, [])

	// Update the eCRBA form data with new sub-form values
	const saveFormData = formVals => {
		formName ? setFormData(prevFormData => ({ ...prevFormData, [formName]: formVals })) : setFormData(formVals)
	}

	return [formName ? formData[formName] : formData, saveFormData]
}
