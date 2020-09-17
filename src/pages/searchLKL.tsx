import React, { useRef, useState, useMemo } from "react"
import { navigate } from "gatsby"
import moment from "moment"
import { Controller, useWatch, useForm } from "react-hook-form"

import {
	Button,
	Select,
	FormInput,
	Checkbox,
	LinkButton,
	ValidationState,
	IconAlignment,
	Text,
	Snackbar,
	C1_DATE_FORMAT as DateFormat,
} from "@c1ds/components"
import { Grid, Box, useDisclosure, Divider, Flex, Image } from "@chakra-ui/core"

import Layout, { LayoutProps } from "../components/Layout"
import FilterInput from "../components/FilterInput"
import LocationCard from "../components/LocationCard"
import { DataLossModal } from "../components/Modals/DataLossModal"
import { EventPageState } from "./event"

import Pagination from "@material-ui/lab/Pagination"
import SearchIcon from "@material-ui/icons/Search"
import AddLocationIcon from "@material-ui/icons/AddLocation"

import events_json from "../../content/events.json"
import countries_json from "../../content/countries.json"
import posts_json from "../../content/posts.json"
import ImpactedPostsSvg from "../../static/impactedPosts.svg"
import { Form } from "../components/Forms/Form"

const DateTimeFormat = `${DateFormat} HH:mm:ss:SS ZZ`

export interface SearchLklPageState {
	eventId: string
}

type SearchLKLPageProps = {
	location: {
		state: SearchLklPageState
	}
}
const SearchLKLPage: React.FC<SearchLKLPageProps> = (p: SearchLKLPageProps) => {
	// Temporarily decrease size of country list while performance is investigated
	const countries = useMemo(() => {
		const countriesList = countries_json.filter((_, index) => index % 5 === 0)
		// add in USA and JPN for demo purposes
		countriesList.push(
			{
				label: "UNITED STATES OF AMERICA",
				value: "USA",
			},
			{
				label: "JAPAN",
				value: "JPN",
			}
		)
		return countriesList.sort((countryA, countryB) => countryA.label.localeCompare(countryB.label))
	}, [])

	const submitSearchInputs = () => {
		let retVal = watchCountry
			? initialLocations().filter(location => {
					return location.lookupLklDto.lklAddressDto?.addressDto.countryCd === watchCountry
			  })
			: []
		if (watchPost) {
			retVal = retVal.filter(location => {
				return location.lookupLklDto.postCd === watchPost
			})
		}
		if (addressInput) {
			retVal = retVal.filter(location => {
				return location.lookupLklDto.lklTitle.toLowerCase().includes(addressInput.toLowerCase())
			})
		}
		setLocationList(retVal)
		setPage(1)
		return retVal
	}

	const initialLocations = () => {
		const LklDtoList: LklDto[] = []
		events_json.map(event => {
			event.eventLklDtoList.map(location => {
				const lklDto: LklDto = {
					...location,
					createdDateTime: location.createdDateTime
						? moment(location.createdDateTime, DateTimeFormat).toDate()
						: undefined,
					lastUpdatedDateTime: event.lastUpdatedDateTime
						? moment(event.lastUpdatedDateTime, DateTimeFormat).toDate()
						: undefined,
					lookupLklDto: {
						...location.lookupLklDto,
						lklAddressDto: {
							...location.lookupLklDto.lklAddressDto,
						},
						lklPocListDto: (location.lookupLklDto.lklPocListDto as LklPocListDto[]).map(
							(lklPocListDto: LklPocListDto) => {
								return {
									lklPocId: lklPocListDto.lklPocId,
									personDto: {
										...lklPocListDto.personDto,
										personEmailDtoList: (lklPocListDto.personDto.personEmailDtoList as PersonEmailDto[]).map(
											(personEmailDto: PersonEmailDto) => {
												return personEmailDto
											}
										),
										personPhoneDtoList: (lklPocListDto.personDto.personPhoneDtoList as PersonPhoneDto[]).map(
											(personPhoneDto: PersonPhoneDto) => {
												return personPhoneDto
											}
										),
									},
								}
							}
						),
					},
				}
				!LklDtoList.some(location => location.lookupLklDto.lklTitle === lklDto.lookupLklDto.lklTitle) &&
					LklDtoList.push(lklDto)
			})
		})
		return LklDtoList.sort((lklDtoA, lklDtoB) => lklDtoA.lookupLklDto.lklTitle.localeCompare(lklDtoB.lookupLklDto.lklTitle))
	}

	const [locationList, setLocationList] = useState<LklDto[]>([])
	const [locationsPerPage, setLocationsPerPage] = useState(10)
	const [page, setPage] = useState(1)

	const [addressInput, setAddressInput] = useState("")

	const numOfPages = Math.ceil(locationList.length / locationsPerPage)
	if (page > numOfPages) setPage(numOfPages)
	const indexOfLastEvent = page * locationsPerPage
	const indexOfFirstEvent = indexOfLastEvent - locationsPerPage
	const isMultiplePages = locationList.length > locationsPerPage
	const totalPages = isMultiplePages ? Math.ceil(locationList.length / locationsPerPage) : 1
	const locationsOnPage = totalPages !== 1 ? locationList.slice(indexOfFirstEvent, indexOfLastEvent) : locationList

	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()
	const { control, errors, setValue, handleSubmit } = useForm()

	const breadcrumbs: LayoutProps["breadcrumbs"] = [{ label: "Event", onClick: onDataLossOpen }, { label: "Add Location" }]

	const watchCountry: string | undefined = useWatch({ control, name: "country" })
	const watchPost: string | undefined = useWatch({ control, name: "post" })

	const countryRef = useRef<HTMLButtonElement>(null)
	const postRef = useRef<HTMLButtonElement>(null)

	return (
		<Layout
			pageTitle="Add Location"
			pageHeading="Add Location"
			pageDescription="Search for an existing last known location or add a new one."
			breadcrumbs={breadcrumbs}>
			<Form
				onSubmit={handleSubmit(data => {
					console.log(data)
				})}>
				<Box height="100px" gridColumn={{ base: "1 / -1", md: "1 / 5", lg: "1 / 4" }}>
					<FormInput labelText="Country" labelId="countryLabel" required>
						<Controller
							name="country"
							rules={{
								required: "Please select a Country",
							}}
							render={({ onChange, value }) => (
								<Select
									ref={countryRef}
									id="country"
									name="country"
									aria-labelledby="countryLabel"
									options={countries}
									size="full"
									validationState={errors?.country ? ValidationState.ERROR : undefined}
									errorMessage={errors?.country?.message}
									onChange={changes => {
										onChange(changes.selectedItem?.value)
										setValue("post", "")
									}}
									value={value}
									placeholder="Type to filter countries"
								/>
							)}
							control={control}
						/>
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1", md: "5 / -1", lg: "4 / 7" }}>
					<FormInput labelText="Post" labelId="postLabel">
						<Controller
							name="post"
							rules={{
								required: "Please select a Post",
							}}
							render={({ onChange, value }) => (
								<Select
									ref={postRef}
									id="post"
									name="post"
									disabled={watchCountry ? false : true}
									aria-labelledby="postLabel"
									options={posts_json.filter(post => post.country_cd === watchCountry)}
									size="full"
									onChange={changes => {
										onChange(changes.selectedItem?.value)
									}}
									value={value}
									placeholder=""
								/>
							)}
							control={control}
						/>
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1", md: "1 / 7", lg: "7 / 11" }}>
					<FilterInput
						labelText="Location"
						labelId="location"
						placeHolder="Location title or street address"
						searchTerm={addressInput}
						setSearchTerm={setAddressInput}>
						<Text id="location">Location</Text>
					</FilterInput>
				</Box>
				<Box gridColumn={{ base: "4 / -1", md: "7 / -1", lg: "11 / -1" }} alignSelf="center">
					<Button
						id="searchId"
						type="submit"
						size="lg"
						buttonIcon={{ mdIcon: SearchIcon, alignment: IconAlignment.LEFT, color: "white" }}
						onClick={() => {
							submitSearchInputs()
						}}>
						Search
					</Button>
				</Box>
				{locationList.length == 0 ? null : (
					<Box gridColumn="1 / -1">
						<Divider borderColor="disabledDark" marginY="2" opacity={3} />
					</Box>
				)}
				{locationList.length == 0 ? null : (
					<Grid gridColumn="1 / -1" gridTemplateColumns="repeat(2, 1fr)">
						<Box ml={24} gridColumn="1 / 2" justifySelf="left">
							<Checkbox id="selectAll" aria-labelledby="selectAll" value="Select all" />
						</Box>
						<Box gridColumn="2 / -1" justifySelf="right">
							<LinkButton
								buttonIcon={{
									mdIcon: AddLocationIcon,
									alignment: IconAlignment.LEFT,
									color: "clickable",
								}}
								onClick={() => {
									navigate("/addLKL")
								}}>
								&nbsp;Create New Location
							</LinkButton>
						</Box>
					</Grid>
				)}
				<Grid gridColumn="1 / -1" gridGap="18px">
					{locationsOnPage.map((lklDto: LklDto, index: number) => {
						return (
							<Box key={index} gridColumn="1 / -1">
								<LocationCard
									lklTitle={lklDto.lookupLklDto.lklTitle}
									city={lklDto.lookupLklDto.lklAddressDto?.addressDto.city}
									countryCd={lklDto.lookupLklDto.lklAddressDto?.addressDto.countryCd}
								/>
							</Box>
						)
					})}
				</Grid>

				{locationsOnPage.length > 0 ? null : (
					<Box gridColumn="1 / -1" position="relative" textAlign="center" backgroundImage={ImpactedPostsSvg}>
						<Image
							width={{ base: "300px", md: "300px", lg: "600px" }}
							height={{ base: "300px", md: "300px", lg: "600px" }}
							src={ImpactedPostsSvg}
							alt="World Map"></Image>
						<Box position="absolute" top="50%" right="30%">
							&nbsp;No locations found. Refine your {"\n"} search or create a new location.
						</Box>
					</Box>
				)}

				{locationList.length > 0 ? (
					<Flex gridColumn="1 / -1" justify="center" align="center">
						<h3>Total Locations: {locationList.length}</h3>
						<Pagination page={page} count={totalPages} onChange={(_, value) => setPage(value)} />
						<select>
							<option value="10">10</option>
							<option value="20">20</option>
						</select>
					</Flex>
				) : null}

				<Box alignSelf="center" width="100%" position="fixed" bottom={0}>
					<Snackbar
						buttonText="Add"
						action={() => {
							console.log("hee")
						}}>
						locations selected
					</Snackbar>
				</Box>
				<DataLossModal
					isOpen={isDataLossOpen}
					onClose={onDataLossClose}
					onLeave={() => {
						console.log("p.location.state.eventId: " + p.location.state.eventId)
						const pageState: EventPageState = {
							eventId: p.location.state.eventId,
							formSection: "locations",
						}
						navigate("/event", { state: pageState })
					}}></DataLossModal>
			</Form>
		</Layout>
	)
}

export default SearchLKLPage
