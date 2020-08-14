import React, { useRef } from "react"
import { LKLFormData } from "../Forms/LKLForm"
import { FormSection, useCTFFormContext } from "../Forms/Form"
import { Box } from "@chakra-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import { Select, FormInput, Text, ValidationState, ChangeEvent } from "@c1ds/components"
import { Textarea } from "../../components/Textarea"
import countries from "../../../content/countries.json"
import posts from "../../../content/posts.json"

interface LocationDetailsProps {
	savedEvent?: LKLFormData
}

const LocationDetails: React.FC<LocationDetailsProps> = (p: LocationDetailsProps) => {
	const textOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/^[^A-Za-z0-9]+/, "")
	}

	const { savedEvent } = p

	const { errors, setValue } = useFormContext<LKLFormData>()
	const countryRef = useRef<HTMLButtonElement>(null)
	const { isView } = useCTFFormContext()

	const isDisabled = false

	console.log(isView)

	return (
		<FormSection title="New Location">
			<Box></Box>
			<Box gridColumn={{ base: "1 / 9" }}>
				<FormInput inputId="locationTitle" labelText="Location Title" labelId="locationTitleLabel" isRequired={true}>
					<Text
						name="locationTitle"
						id="locationTitle"
						labelId="locationTitleLabel"
						size="full"
						isDisabled={isDisabled}
						onChange={textOnChange}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / 5" }}>
				<FormInput inputId="country" labelText="Country" labelId="countryLabel" isRequired={true}>
					<Select
						ref={countryRef}
						id="country"
						name="country"
						options={countries}
						labelId="country"
						size="full"
						value="USA"
						isDisabled={isDisabled}
						validationState={errors?.eventTitle ? ValidationState.ERROR : ""}
						errorMessage={errors?.eventTitle?.message}
						onChange={(changes: ChangeEvent) =>
							setValue("countryCode", changes.selectedItem.value, { shouldDirty: true })
						}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "5 / 9" }}>
				<FormInput inputId="post" labelText="Post" labelId="postLabel" isRequired={true}>
					<Select
						ref={countryRef}
						id="post"
						name="post"
						options={posts}
						labelId="post"
						size="full"
						isDisabled={isDisabled}
						maxLength={25}
						validationState={errors?.eventTitle ? ValidationState.ERROR : ""}
						errorMessage={errors?.eventTitle?.message}
						onChange={textOnChange}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / 9" }}>
				<FormInput inputId="streetAddress" labelText="Street Address" labelId="streetAddressLabel" isRequired={false}>
					<Text
						name="streetAddress"
						id="streetAddress"
						labelId="streetAddressLabel"
						size="full"
						isDisabled={isDisabled}
						onChange={textOnChange}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / 9" }}>
				<FormInput
					inputId="additionalAddress"
					labelText="Apartment, Suite, Other"
					labelId="additionalAddressLabel"
					isRequired={false}>
					<Text
						name="additionalAddress"
						id="additionalAddress"
						labelId="additionalAddressLabel"
						size="full"
						isDisabled={isDisabled}
						onChange={textOnChange}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / 4" }}>
				<FormInput inputId="city" labelText="City" labelId="city" isRequired={false}>
					<Text name="city" id="city" labelId="cityLabel" size="full" isDisabled={isDisabled} onChange={textOnChange} />
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "4 / 7" }}>
				<FormInput inputId="state" labelText="State" labelId="stateLabel" isRequired={false}>
					<Text
						name="state"
						id="state"
						labelId="stateLabel"
						size="full"
						isDisabled={isDisabled}
						onChange={textOnChange}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "7 / 9" }}>
				<FormInput inputId="postalCode" labelText="Postal Code" labelId="postalCodeLabel" isRequired={isDisabled}>
					<Text
						name="postalCode"
						id="postalCode"
						labelId="postalCodeLabel"
						size="full"
						isDisabled={isDisabled}
						onChange={textOnChange}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / 5" }}>
				<FormInput inputId="longitude" labelText="Longitude" labelId="longitudeLabel" isRequired={isDisabled}>
					<Text
						name="longitude"
						id="longitude"
						labelId="longitudeLabel"
						size="full"
						isDisabled={isDisabled}
						onChange={textOnChange}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "5 / 9" }}>
				<FormInput inputId="latitude" labelText="Latitude" labelId="latitudeLabel" isRequired={isDisabled}>
					<Text
						name="latitude"
						id="latitude"
						labelId="latitudeLabel"
						size="full"
						isDisabled={isDisabled}
						onChange={textOnChange}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / 9" }}>
				<FormInput inputId="description" labelText="Description" labelId="descriptionLabel" isRequired={isDisabled}>
					<Controller
						name="eventSummary"
						rules={{
							pattern: {
								value: /^[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]*$/,
								message: "Please enter only plain text in the Description field",
							},
							maxLength: { value: 500, message: "Description cannot exceed 500 characters" },
						}}
						render={({ onChange, onBlur, value }) => (
							<Textarea
								id="eventSummary"
								name="eventSummary"
								labelId="eventSummaryLabel"
								maxLength={500}
								disabled={isDisabled}
								validationState={errors?.eventSummary ? ValidationState.ERROR : ""}
								errorMessage={errors?.eventSummary?.message}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									onChange(e)
								}}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
				</FormInput>
			</Box>
		</FormSection>
	)
}

export default LocationDetails
