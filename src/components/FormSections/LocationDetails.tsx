import React, { useRef, useMemo } from "react"
import { LKLFormData } from "../Forms/LKLForm"
import { FormSection } from "../Forms/Form"
import { Box, Grid } from "@chakra-ui/core"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Switch, Select, FormInput, Text, ValidationState } from "@c1ds/components"
import { Textarea } from "../../components/Textarea"
import countries_json from "../../../content/countries.json"
import posts from "../../../content/posts.json"
import states from "../../../content/states.json"
import locationTypes from "../../../content/locationTypes.json"

const LocationDetails: React.FC = () => {
	const { trigger, register, errors, setValue, formState } = useFormContext<LKLFormData>()
	const { dirtyFields } = formState

	const countryRef = useRef<HTMLButtonElement>(null)
	const postRef = useRef<HTMLButtonElement>(null)
	const stateRef = useRef<HTMLButtonElement>(null)
	const locationTypeRef = useRef<HTMLButtonElement>(null)

	const watchCountry: string | undefined = useWatch({ name: "country" })
	const watchLongitude: string | undefined = useWatch({ name: "longitude" })
	const watchLatitude: string | undefined = useWatch({ name: "latitude" })
	const watchStreetAddress: string | undefined = useWatch({ name: "streetAddress" })
	const watchCity: string | undefined = useWatch({ name: "city" })

	// Temporarily decrease size of country list while performance is investigated
	const countries = useMemo(() => {
		const countriesList = countries_json.filter((_, index) => index % 5 === 0)
		countriesList.push({
			label: "UNITED STATES OF AMERICA",
			value: "USA",
		})
		return countriesList
	}, [])

	const isDisabled = false

	const stateComp = (
		<Box gridColumn={{ base: "1 / -1", md: "span 7" }}>
			<FormInput labelText="State" labelId="stateLabel" required>
				<Select
					id="state"
					name="state"
					size="full"
					disabled={isDisabled}
					options={states}
					validationState={errors?.state ? ValidationState.ERROR : undefined}
					errorMessage={errors?.state?.message}
					onChange={changes => setValue("state", changes.selectedItem?.value, { shouldDirty: true })}
					ref={stateRef}
				/>
			</FormInput>
		</Box>
	)
	const provinceComp = (
		<Box gridColumn={{ base: "1 / -1", md: "span 7" }}>
			<FormInput labelText="Province" labelId="provinceLabel">
				<Text
					id="province"
					name="province"
					size="full"
					disabled={isDisabled}
					onChange={filterOnTextChange}
					maxLength={50}
				/>
			</FormInput>
		</Box>
	)

	return (
		<FormSection title="" showDivider={true}>
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
							onChange={filterOnTextChange}
							validationState={errors?.locationTitle ? ValidationState.ERROR : undefined}
							errorMessage={errors?.locationTitle?.message}
							ref={register({
								required: "Please enter a Location Title",
								maxLength: { value: 50, message: "Location Title cannot exceed 25 characters" },
							})}
							maxLength={50}
						/>
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1", md: "span 1" }}>
					<FormInput labelText="Active" labelId="activeIndicatorLabel">
						<Switch
							id="activeIndicator"
							name="activeIndicator"
							disabled={isDisabled}
							value="Active"
							ref={register()}
						/>
					</FormInput>
				</Box>
			</Grid>

			<Box gridColumn={{ base: "1 / -1", md: "1 / 5" }}>
				<FormInput labelText="Country" labelId="countryLabel" required>
					<Controller
						name="country"
						rules={{
							required: "Please select a Country",
						}}
						onFocus={() => countryRef.current?.focus()}
						render={({ onChange, onBlur, value }) => (
							<Select
								ref={countryRef}
								id="country"
								name="country"
								aria-labelledby="countryLabel"
								options={countries}
								size="full"
								disabled={isDisabled}
								validationState={errors?.country ? ValidationState.ERROR : undefined}
								errorMessage={errors?.country?.message}
								onChange={changes => {
									onChange(changes.selectedItem?.value)
									setValue("post", "")
								}}
								onBlur={() => {
									dirtyFields?.country && onBlur()
								}}
								value={value}
							/>
						)}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput labelText="Post" labelId="postLabel" required>
					<Controller
						name="post"
						rules={{
							required: "Please select a Post",
						}}
						onFocus={() => postRef.current?.focus()}
						render={({ onChange, onBlur, value }) => (
							<Select
								ref={postRef}
								id="post"
								name="post"
								aria-labelledby="postLabel"
								options={posts.filter(post => post.country_cd === watchCountry)}
								size="full"
								disabled={isDisabled}
								validationState={errors?.post ? ValidationState.ERROR : undefined}
								errorMessage={errors?.post?.message}
								onChange={changes => {
									onChange(changes.selectedItem?.value)
								}}
								onBlur={() => {
									dirtyFields?.post && onBlur()
								}}
								value={value}
							/>
						)}
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
						onChange={changes => {
							filterOnTextChange(changes)
						}}
						onBlur={() => trigger("city")}
						maxLength={200}
						ref={register()}
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
						onChange={filterOnTextChange}
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
						<Text
							id="city"
							name="city"
							size="full"
							disabled={isDisabled}
							validationState={errors?.city ? ValidationState.ERROR : undefined}
							errorMessage={errors?.city?.message}
							onChange={changes => {
								filterOnTextChange(changes)
							}}
							maxLength={30}
							ref={register({
								required: watchStreetAddress && !watchCity ? "City also required with Street Address" : false,
							})}
						/>
					</FormInput>
				</Box>
				{watchCountry === "USA" ? stateComp : provinceComp}
				<Box gridColumn={{ base: "1 / 2", md: "span 4" }}>
					<FormInput labelText="Postal Code" labelId="postalCodeLabel">
						<Text
							id="postalCode"
							name="postalCode"
							size="full"
							disabled={isDisabled}
							onChange={filterOnTextChange}
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
						validationState={errors?.longitude ? ValidationState.ERROR : undefined}
						errorMessage={errors?.longitude?.message}
						onBlur={() => {
							trigger("latitude")
						}}
						ref={register({
							validate: value => (validateLongLat(value, 180) ? true : "Invalid input"),
							required: watchLatitude && !watchLongitude ? "Longitude value also required" : false,
						})}
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
						validationState={errors?.latitude ? ValidationState.ERROR : undefined}
						errorMessage={errors?.latitude?.message}
						onBlur={() => {
							trigger("longitude")
						}}
						ref={register({
							validate: value => (validateLongLat(value, 90) ? true : "Invalid input"),
							required: watchLongitude && !watchLatitude ? "Latitude value also required" : false,
						})}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput labelText="Location Type" labelId="locationTypeLabel">
					<Select
						id="locationType"
						name="locationType"
						size="full"
						disabled={isDisabled}
						options={locationTypes}
						validationState={errors?.locationType ? ValidationState.ERROR : undefined}
						errorMessage={errors?.locationType?.message}
						onChange={changes => setValue("stateCode", changes.selectedItem?.value, { shouldDirty: true })}
						ref={locationTypeRef}
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
								disabled={isDisabled}
								maxLength={500}
								validationState={errors?.description ? ValidationState.ERROR : undefined}
								errorMessage={errors?.description?.message}
								onChange={filterOnTextChange}
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

const filterOnTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	e.target.value = e.target.value.replace(/^[^A-Za-z0-9]+/, "")
}

const validateLongLat = (value: string, range: number) => {
	if (!value) {
		return true
	}
	const regexMatch = RegExp(/^([-+]?)([\d]{1,3})([.]?)([\d]*)$/)
	const inRange = parseFloat(value) >= -range && parseFloat(value) <= range
	return regexMatch && inRange
}

export default LocationDetails
