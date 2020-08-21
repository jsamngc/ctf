import React from "react"
import { CTFFormProvider } from "../components/Forms/Form"
import LKLForm, { LKLFormData } from "../components/Forms/LKLForm"

interface LKLFormProps {
	savedEvent?: LKLFormData
}

const addLKLPage: React.FC<LKLFormProps> = (p: LKLFormProps) => {
	return (
		<CTFFormProvider formMode="view">
			<LKLForm />
		</CTFFormProvider>
	)
}

export default addLKLPage
