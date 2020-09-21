import React, { useState } from "react"
import { navigate } from "gatsby"

import { Grid, Flex, Box, PseudoBox, Divider, Text, useDisclosure, BoxProps } from "@chakra-ui/core"
import { P, H4, Card, FinePrint, LinkButton } from "@c1ds/components"

import Dropdown from "../components/Dropdown"
import { LocationPageState } from "../pages/newLocation"
import DeactivateLklModal from "../components/Modals/DeactivateLklModal"
import { useSavedForm } from "../components/Utility/formHelpers"

import {
	MoreVertSharp,
	LocationOnSharp,
	PersonSharp,
	EmailSharp,
	PhoneSharp,
	ExpandLessSharp,
	ExpandMoreSharp,
} from "@material-ui/icons"

import { motion, AnimatePresence } from "framer-motion"

type OmittedBoxProps = "transition" | "style"

const MotionBox = motion.custom<Omit<BoxProps, OmittedBoxProps>>(Box)
interface LKLCard {
	lklData: LklDto
	setEventData: (eventdata: EventFormData) => void
}

const LKLCard: React.FC<LKLCard> = ({ lklData, setEventData }: LKLCard) => {
	const [savedEvents, updateSavedEvents] = useSavedForm<EventFormData[]>("ctfForms", "events")

	const checkActive = lklData.activeIndicator
	// If tabCurrent is true, Location Tab selected otherwise, POC Tab selected
	const [tabCurrent, setTabCurrent] = useState(true)
	const [isDetailOpen, setIsDetailOpen] = useState(false)
	const [direction, setDirection] = useState(1)
	const { isOpen: isDeactivateOpen, onOpen: onDeactivateOpen, onClose: onDeactivateClose } = useDisclosure()

	const pocIconProps = {
		mr: 4,
		alignSelf: "center",
		size: "iconPoc",
		color: "label",
	}
	const detailsTabProps = {
		display: "inline-block",
		py: 4,
		fontWeight: 600,
		fontSize: 16,
		color: "headingLarge",
	}

	// TODO : need to improve how to update entire Event DTO efficiently
	const onChangeActivation = () => {
		let lklDtoIndex = null
		const updateEventIndex = savedEvents.findIndex((evt: EventFormData) => {
			let foundLklDto = null
			if (evt.eventId === lklData.eventId) {
				foundLklDto = evt.eventLklDtoList.find((lklDto: LklDto, index: number) => {
					if (lklDto.eventLklId === lklData.eventLklId) {
						lklDtoIndex = index
						return true
					}
					return false
				})
			}
			return foundLklDto ? true : false
		})
		const tempLklDto = savedEvents[updateEventIndex].eventLklDtoList[lklDtoIndex]
		const tempLklDtoList = savedEvents[updateEventIndex].eventLklDtoList
		tempLklDtoList.splice(lklDtoIndex, 1, {
			...tempLklDto,
			activeIndicator: !checkActive,
			lastUpdatedDateTime: new Date(),
		})
		const updatedEvents = {
			...savedEvents[updateEventIndex],
			eventLklDtoList: tempLklDtoList,
		}
		// Update the current Event to reflect the new LKL list in ViewEvent component
		setEventData(updatedEvents)
		savedEvents.splice(updateEventIndex, 1, updatedEvents)

		updateSavedEvents(savedEvents)
		onDeactivateClose()
	}

	const options = [
		{
			label: "Edit Location",
			value: "Edit",
			onClick: () => {
				navigate("/newLocation", {
					state: {
						eventId: lklData.eventId,
						eventLklId: lklData.eventLklId,
						isEdit: true,
					},
				})
			},
		},
		{
			label: checkActive ? "Deactivate" : "Activate",
			value: "Deactivate",
			type: checkActive ? ("error" as const) : ("primary" as const),
			onClick: () => {
				onDeactivateOpen()
			},
		},
	]

	const { lklTitle, locationDesc, lklAddressDto, lklPocListDto }: LookupLklDto = lklData.lookupLklDto
	const { address1, address2, city, stateCd, postalCode, countryCd, addressTypeCd,
			province, latitude, longitude }: AddressDto = lklAddressDto.addressDto
	const isUSA = countryCd === "US" ? `${city}, ${stateCd}, ${postalCode}` : `${city}, ${province}, ${postalCode}`
	const fullAddress = `${address1} ${address2}, ${isUSA}`

	const pocInfo: Array<{ fullName: string; phone: string[]; email: string[] }> = []

	if (lklPocListDto && lklPocListDto?.length !== 0) {
		lklPocListDto.map((lklPocListDto: LklPocListDto) => {
			const extractedPoc = { fullName: "", phone: Array<string>(), email: Array<string>() }
			const { givenName, surName, personEmailDtoList, personPhoneDtoList }: PersonDto = lklPocListDto.personDto
			extractedPoc.fullName = `${givenName} ${surName}`

			// TODO: cases for multiple phones and emails
			personPhoneDtoList.map((personPhoneDto: PersonPhoneDto) => {
				extractedPoc.phone.push(personPhoneDto.phoneDto.phoneNum)
			})
			personEmailDtoList.map((personEmailDto: PersonEmailDto) => {
				extractedPoc.email.push(personEmailDto.emailDto.emailAddress)
			})
			pocInfo.push(extractedPoc)
		})
	}

	const geoLocationDetails = () => {
		return (
			<Box>
				{/* Below 768px */}
				<Grid
					display={{ base: "grid" , md: "none"}}
					ml={24}
					mb={12}
					maxWidth={600}
					templateColumns={{ base: "repeat(2,1fr)" , sm: "repeat(3,1fr)"}}
					columnGap={{ base: "12" }}
					rowGap={{ base: "12" }}
					>
					<Box gridColumn="1 / 2">
						<FinePrint color="label">Latitude:</FinePrint>
					</Box>
					<Box gridColumn="2 / 3">
						<P>{latitude}</P>
					</Box>
					<Box gridColumn="1 / 2">
						<FinePrint color="label">Longitude:</FinePrint>
					</Box>
					<Box gridColumn="2 / 3">
						<P>{longitude}</P>
					</Box>
					<Box gridColumn="1 / 2">
						<FinePrint color="label">Location Type:</FinePrint>
					</Box>
					<Box gridColumn="2 / 3">
						<P>{addressTypeCd}</P>
					</Box>
					
				</Grid>
				{/* Above 768px */}
				<Flex 
					display={{ base: "none" , md: "flex"}}
					mb={12}
					ml={24}
					justifyContent="space-between"
					maxWidth={600}>
					<Flex>
						<FinePrint color="label">Latitude:&nbsp;</FinePrint>
						<P>{latitude}</P>
					</Flex>
					<Flex>
						<FinePrint color="label">Longitude:&nbsp;</FinePrint>
						<P>{longitude}</P>
					</Flex>
					<Flex>
						<FinePrint color="label">Location Type:&nbsp;</FinePrint>
						<P>{addressTypeCd}</P>
					</Flex>
				</Flex>

			</Box>
		)
	}
	return (
		<Box>
			<Box backgroundColor={checkActive ? "success" : "silver"} h={3} w="full" />
			<Card id="lklCard" maxWidth="full">
				<Flex w="full" mt={{ base: "-8px", sm: "-16px" }}>
					<Flex flexDir={{ base: "column", xl: "row" }} flexGrow={1}>
						<Box flexBasis={{ xl: "74%" }}>
							<LinkButton
								onClick={() => {
									const pageState: LocationPageState = {
										eventId: lklData.eventId,
										eventLklId: lklData.eventLklId,
										isEdit: false,
									}
									navigate("/newLocation", { state: pageState })
								}}>
								{lklTitle}
							</LinkButton>
						</Box>
						{/* location address */}
						<Box mb={4}>
							<FinePrint color="label">
								U.S. Embassy in {city}, {countryCd}
							</FinePrint>
						</Box>
					</Flex>
					<Flex position="relative" right={{ base: "-12px", sm: "-20px", md: "-12px" }}>
						{ checkActive && <Box display={{ base: "none", lg:"flex"}}>
							<H4 color="success">Active</H4>
							<Box w={72}></Box>
						</Box>}
						<Dropdown
							options={options}
							borderedRows={true}
							width="10rem"
							label={`Additional actions for ${lklTitle}`}>
							<Box as={MoreVertSharp} color="clickable" />
						</Dropdown>
					</Flex>
					<DeactivateLklModal
						isOpen={isDeactivateOpen}
						onCancel={onDeactivateClose}
						locationName={lklTitle}
						isActivate={!checkActive}
						onConfirm={onChangeActivation}
					/>
				</Flex>

				{/* Detail, hide when  */}
				<Flex mt={8} mb={-12} justifyContent="space-between">
					<Box
						as="button"
						display="inline-flex"
						cursor="pointer"
						border="none"
						backgroundColor="transparent"
						onClick={() => {
							setIsDetailOpen(!isDetailOpen)
						}}
						aria-expanded={isDetailOpen}
						aria-controls="detailsToggleButton"
						aria-label={`Details toggle button for ${lklTitle}`}
						color="clickable">
						<Text my={0} fontSize={16}>
							Details
						</Text>
						{isDetailOpen ? <ExpandLessSharp /> : <ExpandMoreSharp />}
					</Box>
					<Box fontStyle="bold" display={{ base: "block", lg:"none"}}>
						{checkActive && <H4 color="success">Active</H4>}
					</Box>

				</Flex>

				{/* Location */}
				{isDetailOpen ? (
					// TODO: Dynamic height with useEffect
					<Box id="detailsToggleButton" position="relative" overflow="hidden">
						<Divider borderColor="silver" my={16} />
						{/* Detail Tabs before extra large view*/}
						<Box display={{ xl: "none" }}>
							<Flex mb={16}>
								<PseudoBox
									{...detailsTabProps}
									borderWidth={0}
									borderBottom={tabCurrent ? 3 : 0}
									borderBottomColor="accent"
									borderStyle="solid"
									color="headingSmall"
									_hover={
										tabCurrent
											? {}
											: {
													color: "clickable",
													borderBottomColor: "clickable",
													borderBottom: "3px",
													borderStyle: "solid",
											  }
									}
									onClick={() => {
										setDirection(-1)
										setTabCurrent(true)
									}}
									mr={8}>
									<Text fontFamily="headingSmall" margin={0} fontSize="h4" fontWeight="h4" lineHeight="h4">
										Location
									</Text>
								</PseudoBox>
								<Box mx={8} />
								<PseudoBox
									{...detailsTabProps}
									borderWidth={0}
									borderBottom={tabCurrent ? 0 : 3}
									borderBottomColor="accent"
									borderStyle="solid"
									color="headingSmall"
									_hover={
										tabCurrent
											? {
													color: "clickable",
													borderBottomColor: "clickable",
													borderBottom: "3px",
													borderStyle: "solid",
											  }
											: {}
									}
									onClick={() => {
										setDirection(1)
										setTabCurrent(false)
									}}>
									<Text fontFamily="headingSmall" margin={0} fontSize="h4" fontWeight="h4" lineHeight="h4">
										Point of Contact
									</Text>
								</PseudoBox>
							</Flex>
							<AnimatePresence custom={direction} initial={false}>
								<MotionBox
									position="relative"
									initial={{ transform: `translateX(${direction < 0 ? "-100%" : "100%"})` }}
									transition={{
										type: "tween",
										duration: 0.5,
										ease: "easeInOut",
									}}
									animate={{
										transform: "translateX(0%)",
									}}
									exit={(currDirection: number) => ({
										transform: `translateX(${currDirection < 0 ? "100%" : "-100%"})`,
									})}
									width="100%">
									{tabCurrent ? (
										<Box key="1">
											<Flex mb={12}>
												<Box as={LocationOnSharp} {...pocIconProps} />
												<FinePrint>{fullAddress}</FinePrint>
											</Flex>
											{geoLocationDetails()}
											<Box py={4}>
												<FinePrint color="label">Description</FinePrint>
											</Box>
											<Box>
												<FinePrint>{locationDesc}</FinePrint>
											</Box>
										</Box>
									) : (
										<Box key="2">
											{pocInfo.map((poc, index) => {
												return (
													<Flex
														key={index}
														flexDir={{ base: "column", md: "row" }}
														border={1}
														borderStyle="solid"
														borderColor="silver"
														px={8}
														my={8}
														justifyContent="space-around">
														<Flex py={4}>
															<Box as={PersonSharp} {...pocIconProps} />
															<FinePrint>{poc.fullName}</FinePrint>
														</Flex>
														{poc.email.map((emailAddress: string, index: number) => {
															return (
																<Flex py={4} key={index}>
																	<Box as={EmailSharp} {...pocIconProps} />
																	<FinePrint>{emailAddress}</FinePrint>
																</Flex>
															)
														})}
														{poc.phone.map((phoneNumber: string, index: number) => {
															return (
																<Flex py={4} key={index}>
																	<Box as={PhoneSharp} {...pocIconProps} />
																	<FinePrint>{phoneNumber}</FinePrint>
																</Flex>
															)
														})}
													</Flex>
												)
											})}
										</Box>
									)}
								</MotionBox>
							</AnimatePresence>
						</Box>
						{/* Detail Tabs at extra large view*/}
						<Flex display={{ base: "none", xl: "flex" }}>
							<Box flexBasis={{ xl: "63%" }}>
								<Box pb={16}>
									<H4>Location</H4>
								</Box>
								<Flex mb={12}>
									<Box as={LocationOnSharp} {...pocIconProps} />
									<FinePrint>{fullAddress}</FinePrint>
								</Flex>
								{geoLocationDetails()}
								<Box py={4}>
									<FinePrint color="label">Description</FinePrint>
								</Box>
								<Box>
									<FinePrint>{locationDesc}</FinePrint>
								</Box>
							</Box>
							<Divider orientation="vertical" flexBasis={{ xl: "2%" }} color="silver" />
							<Box flexBasis={{ xl: "35%" }}>
								<Box>
									<H4>Point of Contact</H4>
								</Box>
								{pocInfo.map((poc, index) => {
									return (
										<Grid
											key={index}
											p={16}
											my={16}
											border={1}
											borderStyle="solid"
											borderColor="silver"
											columnGap={{ base: "4" }}
											rowGap={{ base: "4" }}
											templateColumns="repeat(2,1fr)"
											>
											<Flex gridColumn="1 / -1">
												<Box as={PersonSharp} {...pocIconProps} />
												<FinePrint>{poc.fullName}</FinePrint>
											</Flex>
											{poc.email.map((emailAddress: string, index: number) => {
												return (
													<Flex 
														py={4} 
														key={index}
														gridColumn="1 / 2">
														<Box as={EmailSharp} {...pocIconProps} />
														<FinePrint>{emailAddress}</FinePrint>
													</Flex>
												)
											})}
											{poc.phone.map((phoneNumber: string, index: number) => {
												return (
													<Flex 
														py={4} 
														key={index}
														gridColumn="2 / 3">
														<Box as={PhoneSharp} {...pocIconProps} />
														<FinePrint>{phoneNumber}</FinePrint>
													</Flex>
												)
											})}
										</Grid>
									)
								})}
							</Box>
						</Flex>
					</Box>
				) : null}
			</Card>
		</Box>
	)
}

export default LKLCard
