import React from "react"
import Layout from "../../components/Layout"
import { FormProvider, useForm } from "react-hook-form"
import { Form } from "./Form"
import LocationDetails from "../FormSections/LocationDetails"

export interface LKLFormData extends Record<string, boolean | Date | string | number | undefined> {
	countryCode: string
}

interface LKLFormProps {
	savedEvent?: LKLFormData
}

const LKLForm: React.FC<LKLFormProps> = (p: LKLFormProps) => {
	const formMethods = useForm<LKLFormData>({})

	return (
		<Layout pageTitle="New Location" pageHeading="New Location">
			<FormProvider {...formMethods}>
				<Form>
					<LocationDetails></LocationDetails>
				</Form>
			</FormProvider>
		</Layout>
	)
}

export default LKLForm
