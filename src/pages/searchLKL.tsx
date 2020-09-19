import React, { useRef, useState, useMemo, useCallback } from "react"
import { navigate } from "gatsby"
import moment from "moment"
import { Controller, useWatch, useForm } from "react-hook-form"

import {
	Button,
	Select,
	FormInput,
	Checkbox,
	LinkButton,
	Link,
	ValidationState,
	IconAlignment,
	Text,
	P,
	C1_DATE_FORMAT as DateFormat,
} from "@c1ds/components"
import { Grid, Box, useDisclosure, Divider, Flex } from "@chakra-ui/core"

import Layout, { LayoutProps } from "../components/Layout"
import FilterInput from "../components/FilterInput"
import LocationCard, { LocationCardProps } from "../components/LocationCard"
import { DataLossModal } from "../components/Modals/DataLossModal"
import { SaveModal } from "../components/Modals/SaveModal"
import { getSavedForm, useSavedForm } from "../components/Utility/formHelpers"

import Pagination from "@material-ui/lab/Pagination"
import SearchIcon from "@material-ui/icons/Search"
import AddLocationIcon from "@material-ui/icons/AddLocation"

import events_json from "../../content/events.json"
import countries_json from "../../content/countries.json"
import posts_json from "../../content/posts.json"
import { Form } from "../components/Forms/Form"
import { SearchLocationMapIcon } from "../components/Icons/icons"
import { SearchLocationMapCompassIcon } from "../components/Icons/icons"
import { Snackbar, useSnackbar } from "../components/C1DS Extensions/SearchLocationSnackbar"
import { Card } from "@material-ui/core"

const DateTimeFormat = `${DateFormat} HH:mm:ss:SS ZZ`

export interface SearchLklPageState {
	savedEvent: EventFormData
}

type SearchLKLPageProps = {
	location: {
		state: SearchLklPageState
	}
}

const SearchLKLPage: React.FC<SearchLKLPageProps> = (p: SearchLKLPageProps) => {
	const customEvent: EventFormData = {
		eventId: "59",
		activeIndicator: false,
		eventTypeId: "Monitoring",
		eventTitle: "1998 Hurricane Mitch",
		eventSummary: "Event Summary",
		evacSummary: "Evacuation Summary",
		evacStatusCode: "NONE",
		managementTypeCode: "wg",
		lastUpdatedUserId: "5f072eb0801e5d74ea30b21d",
		talkingPoint: undefined,
		attachments: [],
		impactedPosts: [],
		eventLklDtoList: [],
	}
	p = {
		location: {
			state: {
				savedEvent: customEvent,
			},
		},
	}
	const { location } = p
	const { state } = location
	const { savedEvent } = state

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
		setIsSecondAction(true)
		return retVal
	}

	const initialLocations = () => {
		const lklDtoList: LklDto[] = []
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
				!lklDtoList.some(loc => loc.lookupLklDto.lklTitle === lklDto.lookupLklDto.lklTitle) &&
					!savedEvent.eventLklDtoList?.some(loc => loc.lookupLklDto.lklTitle === lklDto.lookupLklDto.lklTitle) &&
					lklDtoList.push(lklDto)
			})
		})
		return lklDtoList.sort((lklDtoA, lklDtoB) => lklDtoA.lookupLklDto.lklTitle.localeCompare(lklDtoB.lookupLklDto.lklTitle))
	}

	//const [, updateSavedForm] = useSavedForm<EventFormData[]>("ctfForms", "events")

	const [isAllSelected, setIsAllSelected] = useState(false)
	const [selectedLocationList, setSelectedLocationList] = useState<LklDto[]>([])
	const [locationList, setLocationList] = useState<LklDto[]>([])
	const [locationsPerPage, setLocationsPerPage] = useState(10)
	const [isSecondAction, setIsSecondAction] = useState(false)
	const [addressInput, setAddressInput] = useState("")
	const [page, setPage] = useState(1)

	const numOfPages = Math.ceil(locationList.length / locationsPerPage)
	if (page > numOfPages) setPage(numOfPages)
	const indexOfLastEvent = page * locationsPerPage
	const indexOfFirstEvent = indexOfLastEvent - locationsPerPage
	const isMultiplePages = locationList.length > locationsPerPage
	const totalPages = isMultiplePages ? Math.ceil(locationList.length / locationsPerPage) : 1
	const locationsOnPage = totalPages !== 1 ? locationList.slice(indexOfFirstEvent, indexOfLastEvent) : locationList

	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()
	const { isOpen: isSaveOpen, onOpen: onSaveOpen, onClose: onSaveClose } = useDisclosure()
	const { control, errors, setValue, handleSubmit } = useForm()

	const breadcrumbs: LayoutProps["breadcrumbs"] = [{ label: "Event", onClick: onDataLossOpen }, { label: "Add Location" }]

	const watchCountry: string | undefined = useWatch({ control, name: "country" })
	const watchPost: string | undefined = useWatch({ control, name: "post" })

	const countryRef = useRef<HTMLButtonElement>(null)
	const postRef = useRef<HTMLButtonElement>(null)

	const snackBar = (
		<Snackbar
			color="searchLocSnackbar"
			buttonText="Add"
			buttonType="button"
			action={() => {
				onSubmit(savedEvent, false)
			}}>
			{`${selectedLocationList.length} ${selectedLocationList.length == 1 ? "location" : "locations"} selected`}
		</Snackbar>
	)

	//TODO: Uncomment to see working Snackbar
	// const showSnackbar = useSnackbar(snackBar, null)
	// showSnackbar()

	const [, updateSavedForm] = useSavedForm<EventFormData[]>("ctfForms", "events")

	const saveData = useCallback(
		(data: EventFormData | undefined, skipNavigate: boolean) => {
			const currForm = getSavedForm<EventFormData[]>("ctfForms", "events", [])
			const savedIdx = currForm.findIndex((evt: EventFormData) => evt.eventId === data?.eventId)
			// Merge existing saved data with updates in case any fields are not present in section's form data

			const updatedEvent = { ...currForm[savedIdx], ...data }
			currForm.splice(savedIdx, 1, updatedEvent)

			updateSavedForm(currForm)
			onSaveOpen()
			setTimeout(() => {
				// TODO: Once microservice is connected, use returned eventId/event data
				if (skipNavigate) {
					onSaveClose()
				} else {
					navigate("/event", {
						state: {
							eventId: savedEvent.eventId,
							formSection: "locations",
						},
					})
				}
			}, 2000)
		},
		[updateSavedForm, onSaveClose, onSaveOpen, savedEvent]
	)

	const onSubmit = (data: EventFormData, skipNavigate = false) => {
		data.lastUpdatedDateTime = new Date()
		data.eventLklDtoList = data.eventLklDtoList
			? [...data.eventLklDtoList, ...selectedLocationList]
			: [...selectedLocationList]
		data.eventLklDtoList.map(lkl => {
			lkl.eventId = savedEvent.eventId
		})

		data.eventLklDtoList.sort((a: LklDto, b: LklDto) => {
			const aLastUpdatedTime = a.lastUpdatedDateTime ?? new Date()
			const bLastUpdatedTime = b.lastUpdatedDateTime ?? new Date()
			// Descending order
			const direction = -1
			if (aLastUpdatedTime > bLastUpdatedTime) return direction
			if (aLastUpdatedTime < bLastUpdatedTime) return -direction
			return 0
		})
		console.log("onSubmit data: ")
		console.log(data.eventLklDtoList)
		saveData(data, skipNavigate)
	}

	return (
		<Layout
			pageTitle="Add Location"
			pageHeading="Add Location"
			pageDescription="Search for an existing last known location or add a new one."
			breadcrumbs={breadcrumbs}>
			<Form
				onSubmit={handleSubmit(data => {
					onSubmit(data as EventFormData, false)
				})}>
				<Box gridColumn={{ base: "1 / -1", md: "1 / 5", lg: "1 / 4" }} height={{ md: "100px", lg: "auto" }}>
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
				<Box
					gridColumn={{ base: "3 / -1", md: "7 / -1", lg: "11 / -1" }}
					alignSelf={{ base: "auto", md: "flex-end", lg: "auto" }}
					marginTop={{ lg: "28" }}>
					<Button
						id="searchId"
						type="submit"
						size="full"
						buttonIcon={{ mdIcon: SearchIcon, alignment: IconAlignment.LEFT, color: "white" }}
						onClick={() => {
							submitSearchInputs()
						}}>
						Search
					</Button>
				</Box>
				{locationList.length > 0 && (
					<Box gridColumn="1 / -1">
						<Divider borderColor="disabledDark" opacity={3} />
					</Box>
				)}
				{locationList.length > 0 && (
					<Grid gridColumn="1 / -1" gridTemplateColumns="repeat(2, 1fr)">
						<Box ml={24} gridColumn="1 / 2" justifySelf="left">
							<Checkbox
								id="selectAll"
								aria-labelledby="selectAll"
								onClick={_ => {
									setIsAllSelected(!isAllSelected)
								}}
								value="Select all"
							/>
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
							<LocationCard
								id={lklDto.lookupLklDto.lklTitle}
								key={index}
								lklDto={lklDto}
								isAllSelected={isAllSelected}
								selectedLocationList={selectedLocationList}
								setSelectedLocationList={setSelectedLocationList}
							/>
						)
					})}
				</Grid>

				{locationList.length > 0 && (
					<Flex gridColumn="1 / -1" justify="center" align="center">
						<h3>Total Locations: {locationList.length}</h3>
						<Pagination page={page} count={totalPages} onChange={(_, value) => setPage(value)} />
						<select>
							<option value="10">10</option>
							<option value="20">20</option>
						</select>
					</Flex>
				)}

				{locationsOnPage.length == 0 && (
					<Flex gridColumn="1 / -1" position="relative" textAlign="center" justify="center" align="center">
						{isSecondAction ? (
							<>
								<SearchLocationMapCompassIcon width="full" maxWidth="726px" />
								<Box
									position="absolute"
									cursor="pointer"
									bg="white"
									top={{ base: "16px", md: "24px" }}
									width="252px"
									onClick={() => {
										navigate("/addLKL")
									}}>
									<P>
										No locations found. Refine your search or <Link>create a new location</Link>.
									</P>
								</Box>
							</>
						) : (
							<SearchLocationMapIcon width="full" maxWidth="726px" />
						)}
					</Flex>
				)}
				{selectedLocationList.length > 0 && (
					<Box position="fixed" width="100%" bottom="0">
						{snackBar}
					</Box>
				)}

				<DataLossModal
					isOpen={isDataLossOpen}
					onClose={onDataLossClose}
					onLeave={() => {
						navigate("/event", {
							state: {
								eventId: savedEvent.eventId,
								formSection: "locations",
							},
						})
					}}></DataLossModal>
				<SaveModal isOpen={isSaveOpen} onClose={onSaveClose} message={"Adding selected locations"} />
			</Form>
		</Layout>
	)
}

export default SearchLKLPage
