import React, { useRef } from "react"
import { LKLFormData } from "../Forms/LKLForm"
import { FormSection } from "../Forms/Form"
import { Box, Grid } from "@chakra-ui/core"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Switch, Select, FormInput, Text, ValidationState } from "@c1ds/components"
import { Textarea } from "../../components/Textarea"
import countries from "../../../content/countries.json"
import posts from "../../../content/posts.json"
import states from "../../../content/states.json"
import locationTypes from "../../../content/locationTypes.json"

interface LocationDetailsProps {
	savedLocation?: LKLFormData
}

const LocationDetails: React.FC<LocationDetailsProps> = (p: LocationDetailsProps) => {
	const textOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		e.target.value = e.target.value.replace(/^[^A-Za-z0-9]+/, "")
	}

	const filterPost = (countryCode: string) => {
		return posts.filter(post => post.country_cd === countryCode)
	}

	const { register, errors, setValue } = useFormContext<LKLFormData>()

	const countryRef = useRef<HTMLButtonElement>(null)
	const postRef = useRef<HTMLButtonElement>(null)
	const stateRef = useRef<HTMLButtonElement>(null)
	const locationTypeRef = useRef<HTMLButtonElement>(null)

	const watchCountry = useWatch({ name: "country" })
	const watchPostalCode = useWatch({ name: "postalCode" })

	console.log("values: " + watchCountry)

	const isDisabled = false

	const stateComp = (
		<Box gridColumn={{ base: "1 / -1", md: "span 7" }}>
			<FormInput labelText="State" labelId="stateLabel">
				<Select
					ref={stateRef}
					id="state"
					name="state"
					options={states}
					size="full"
					disabled={isDisabled}
					validationState={errors?.eventTitle ? ValidationState.ERROR : undefined}
					errorMessage={errors?.eventTitle?.message}
					onChange={changes => setValue("stateCode", changes.selectedItem?.value, { shouldDirty: true })}
				/>
			</FormInput>
		</Box>
	)
	const provinceComp = (
		<Box gridColumn={{ base: "1 / -1", md: "span 7" }}>
			<FormInput labelText="Province" labelId="provinceLabel">
				<Text id="province" name="province" size="full" disabled={isDisabled} onChange={textOnChange} />
			</FormInput>
		</Box>
	)

	return (
		<FormSection title="New Location of Section" showDivider={true}>
			<Grid
				gridColumn={{ base: "1 / -1", lg: "1 / 9" }}
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{ base: "1", md: "repeat(12,1fr)" }}>
				<Box gridColumn={{ base: "1 / -1", md: "span 11" }}>
					<FormInput labelText="Location Title" labelId="locationTitleLabel" required>
						<Text
							id="locationTitle"
							name="locationTitle"
							size="full"
							disabled={isDisabled}
							onChange={textOnChange}
							maxLength={50}
							ref={register({
								required: "Please enter a Location Title",
								maxLength: { value: 50, message: "Location Title cannot exceed 25 characters" },
							})}
							validationState={errors?.locationTitle ? ValidationState.ERROR : undefined}
							errorMessage={errors?.locationTitle?.message}
						/>
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1", md: "span 1" }}>
					<FormInput labelText="Active" labelId="activeIndicatorLabel">
						<Switch
							id="activeIndicator"
							name="activeIndicator"
							value="Active"
							disabled={isDisabled}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								e.target.checked ? setValue("activeIndicator", false) : setValue("activeIndicator", true)
							}}
						/>
					</FormInput>
				</Box>
			</Grid>

			<Box gridColumn={{ base: "1 / -1", md: "1 / 5" }}>
				<FormInput labelText="Country" labelId="countryLabel" required>
					<Select
						id="country"
						name="country"
						ref={countryRef}
						options={countries}
						size="full"
						disabled={isDisabled}
						onChange={changes => {
							// filterPost(changes.selectedItem?.label)
							setValue("countryCode", changes.selectedItem?.value, { shouldDirty: true })
							console.log(watchCountry)
						}}
						validationState={errors?.country ? ValidationState.ERROR : undefined}
						errorMessage={errors?.country?.message}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput labelText="Post" labelId="postLabel" required>
					<Select
						ref={postRef}
						id="post"
						name="post"
						options={posts}
						size="full"
						disabled={isDisabled}
						validationState={errors?.eventTitle ? ValidationState.ERROR : undefined}
						errorMessage={errors?.eventTitle?.message}
						onChange={changes => setValue("postCode", changes.selectedItem?.value, { shouldDirty: true })}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "span 8" }}>
				<FormInput labelText="Street Address" labelId="streetAddressLabel">
					<Text
						id="streetAddress"
						name="streetAddress"
						size="full"
						disabled={isDisabled}
						onChange={textOnChange}
						maxLength={200}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "span 8" }}>
				<FormInput labelText="Apartment, Suite, Other" labelId="additionalAddressLabel">
					<Text
						id="additionalAddress"
						name="additionalAddress"
						size="full"
						disabled={isDisabled}
						onChange={textOnChange}
						maxLength={200}
					/>
				</FormInput>
			</Box>

			<Grid
				gridColumn={{ base: "1 / -1", lg: "1 / 9" }}
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{ base: "repeat(4,1fr)", md: "repeat(22,1fr)" }}>
				<Box gridColumn={{ base: "1 / -1", md: "span 11" }}>
					<FormInput labelText="City" labelId="cityLabel">
						<Text id="city" name="city" size="full" disabled={isDisabled} onChange={textOnChange} maxLength={30} />
					</FormInput>
				</Box>
				{/* {state==="usa" ? stateComp : provinceComp}  */}
				{/* {stateComp}{stateComp} */}
				{watchCountry === "USA" ? stateComp : provinceComp}

				<Box gridColumn={{ base: "1 / 2", md: "span 4" }}>
					<FormInput labelText="Postal Code" labelId="postalCodeLabel">
						<Text
							id="postalCode"
							name="postalCode"
							size="full"
							disabled={isDisabled}
							onChange={() => {
								textOnChange
								console.log(watchPostalCode)
							}}
							maxLength={10}
						/>
					</FormInput>
				</Box>
			</Grid>

			<Box gridColumn={{ base: "1 / 3", md: "1 / 3" }}>
				<FormInput labelText="Longitude" labelId="longitudeLabel">
					<Text
						id="longitude"
						name="longitude"
						size="full"
						disabled={isDisabled}
						ref={register({
							pattern: { value: /^([-+]?)([\d]{1,3})([.]?)([\d]*)$/, message: "Not a valid longitude" },
							validate: value => value !== "cannot be short" || "Nice try!",
						})}
						validationState={errors?.longitude ? ValidationState.ERROR : undefined}
						errorMessage={errors?.longitude?.message}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "3 / 5", md: "span 2" }}>
				<FormInput labelText="Latitude" labelId="latitudeLabel">
					<Text
						id="latitude"
						name="latitude"
						size="full"
						disabled={isDisabled}
						ref={register({
							pattern: { value: /^([-+]?)([\d]{1,3})([.]?)([\d]*)$/, message: "Not a valid latitude" },
						})}
						validationState={errors?.latitude ? ValidationState.ERROR : undefined}
						errorMessage={errors?.latitude?.message}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput labelText="Location Type" labelId="locationTypeLabel">
					<Select
						ref={locationTypeRef}
						id="locationType"
						name="locationType"
						options={locationTypes}
						size="full"
						disabled={isDisabled}
						validationState={errors?.eventTitle ? ValidationState.ERROR : undefined}
						errorMessage={errors?.eventTitle?.message}
						onChange={changes => setValue("stateCode", changes.selectedItem?.value, { shouldDirty: true })}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "span 8" }}>
				<FormInput labelText="Description" labelId="descriptionLabel">
					<Controller
						name="description"
						rules={{
							pattern: {
								value: /^[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]*$/,
								message: "Please enter only plain text in the Description field",
							},
							maxLength: { value: 500, message: "Description cannot exceed 500 characters" },
						}}
						render={({ onBlur, value }) => (
							<Textarea
								id="description"
								name="description"
								labelId="descriptionLabel"
								maxLength={500}
								disabled={isDisabled}
								validationState={errors?.eventSummary ? ValidationState.ERROR : undefined}
								errorMessage={errors?.eventSummary?.message}
								onChange={() => {
									textOnChange
									console.log("values: " + watchCountry)
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
