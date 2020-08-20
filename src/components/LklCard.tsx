import React, { useState } from "react"

import { LklDto, LookupLklDto, AddressDto, LklPocListDto, PersonDto } from "../pages/lklList"

import { Flex, Box, PseudoBox, Divider, Text, useDisclosure } from "@chakra-ui/core"
import { P, H4, Card, FinePrint } from "@c1ds/components"

import Dropdown from "../components/Dropdown"
import DeactivateModal from "../components/Modals/DeactivateModal"

import MoreVertIcon from "@material-ui/icons/MoreVert"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from "@material-ui/icons/Email"
import PhoneIcon from "@material-ui/icons/Phone"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { motion, AnimatePresence } from "framer-motion"

const MotionBox = motion.custom(Box)
interface LKLCard {
	lklData: LklDto
}

const LKLCard: React.FC<LKLCard> = ({ lklData }: LKLCard) => {
	// If tabCurrent is true, Location Tab selected otherwise, POC Tab selected
	const [tabCurrent, setTabCurrent] = useState(true)
	const [isDetailOpen, setIsDetailOpen] = useState(false)
	const [direction, setDirection] = useState(1)
	const { isOpen: isDeactivateOpen, onOpen: onDeactivateOpen, onClose: onDeactivateClose } = useDisclosure()

	const [detailsSectionHeight, setHeight] = useState(200)

	const variants = {
		animate: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			transition: {
				x: { type: "spring", stiffness: 300, damping: 200 },
				// opacity: { duration: 0.5 }
			},
		},
		exit: (direction: number) => {
			return {
				zIndex: 0,
				x: direction < 0 ? "50vh" : "-10vh",
				opacity: 0,
				transition: {
					x: { type: "spring", stiffness: 300, damping: 200 },
					// opacity: { duration: 0.5 }
				},
			}
		},
	}

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

	// 1.4          The user can see the following fields inside each Last Known Location on the list
	// ·         Location Title
	// ·         Country
	// ·         Post
	// ·         Location Status
	// ·         [Location Description] - expand chevron  (Address, Point of Contact)
	// ·         [Additional Action] – Edit
	// ·         [Additional Action] – Deactivate?
	const options = [
		{
			label: "Edit Location",
			value: "Edit",
			onClick: () => {
				// navigate("/event", { state: { eventId: , isEdit: true } })
			},
		},
		{
			label: "Remove Location",
			value: "Delete Location",
			type: "error" as const,
			onClick: () => {
				onDeactivateOpen()
			},
		},
	]

	const { lklTitle, locationDesc, lklAddressDto, lklPocListDto }: LookupLklDto = lklData.lookupLklDto
	const { address1, address2, city, postalCode, countryCd }: AddressDto = lklAddressDto.addressDto

	const fullAddress = `${address1} ${address2}, ${city}, ${postalCode}, ${countryCd}`

	const pocInfo: Array<{ fullName: string; phone: string; email: string }> = []
	lklPocListDto.map((lklPocListDto: LklPocListDto) => {
		const extractedPoc = { fullName: "", phone: "", email: "" }
		const { givenName, surName, personEmailDtoList, personPhoneDtoList }: PersonDto = lklPocListDto.personDto
		extractedPoc.fullName = `${givenName} ${surName}`

		// TODO: cases for multiple phones and emails
		extractedPoc.phone = personPhoneDtoList[0].phoneDto.phoneNum
		extractedPoc.email = personEmailDtoList[0].emailDto.emailAddress
		pocInfo.push(extractedPoc)
	})
	return (
		<Box mb={{ base: "16", md: "24" }}>
			<Card id="lklCard" maxWidth="full">
				<Flex flexDir={{ base: "column", xl: "row" }} w="full" mt={{ base: "-8px", sm: "-16px" }}>
					<Box flexBasis={{ xl: "65%" }}>
						<P>{lklTitle}</P>
					</Box>
					{/* location address */}
					<Box mb={4} flexBasis={{ xl: "35%" }}>
						<FinePrint color="label">
							U.S. Embassy in {city}, {countryCd}
						</FinePrint>
					</Box>
				</Flex>
				<Box
					position="absolute"
					color="secondary"
					top={{ base: "-8px", sm: "-16px" }}
					right={{ base: "-12px", sm: "-20px", md: "-12px" }}>
					<Dropdown options={options} borderedRows={true} width="10rem">
						<Box w="120px" right="0" textAlign="right" color="clickable">
							<MoreVertIcon />
						</Box>
					</Dropdown>
					<DeactivateModal
						isOpen={isDeactivateOpen}
						onCancel={onDeactivateClose}
						onConfirm={() => {
							// onConfirm(isActive, eventId)
							onDeactivateClose()
						}}
					/>
				</Box>

				{/* Detail, hide when  */}
				<Flex mt={8} mb={-12}>
					<Box
						display="inline-flex"
						cursor="pointer"
						onClick={() => {
							setIsDetailOpen(!isDetailOpen)
						}}
						color="clickable">
						<Text my={0} fontSize={16}>
							Details
						</Text>
						{isDetailOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</Box>
				</Flex>

				{/* Location */}
				{isDetailOpen ? (
					// TODO: Dynamic height with useEffect
					<Box position="relative" h={detailsSectionHeight}>
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
									position="absolute"
									key={direction}
									variants={variants}
									custom={direction}
									initial="initial"
									animate="animate"
									exit="exit"
									width="100%">
									{tabCurrent ? (
										<Box>
											<Flex mb={12}>
												<Box as={LocationOnIcon} {...pocIconProps} />
												<FinePrint>{fullAddress}</FinePrint>
											</Flex>
											<Box py={4}>
												<FinePrint color="label">Description</FinePrint>
											</Box>
											<Box>
												<FinePrint>{locationDesc}</FinePrint>
											</Box>
										</Box>
									) : (
										<Box>
											{pocInfo.map((poc, index) => {
												return (
													<Flex
														key={index}
														flexDir={{ base: "column", md: "row" }}
														border={1}
														borderStyle="solid"
														borderColor="silver"
														px={8}
														justifyContent="space-around">
														<Flex py={4}>
															<Box as={PersonIcon} {...pocIconProps} />
															<FinePrint>{poc.fullName}</FinePrint>
														</Flex>
														<Flex py={4}>
															<Box as={EmailIcon} {...pocIconProps} />
															<FinePrint>{poc.email}</FinePrint>
														</Flex>
														<Flex py={4}>
															<Box as={PhoneIcon} {...pocIconProps} />
															<FinePrint>{poc.phone}</FinePrint>
														</Flex>
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
									<Box as={LocationOnIcon} {...pocIconProps} />
									<FinePrint>{fullAddress}</FinePrint>
								</Flex>
								<Box py={4}>
									<FinePrint color="label">Description</FinePrint>
								</Box>
								<Box>
									<FinePrint>{locationDesc}</FinePrint>
								</Box>
							</Box>
							<Divider orientation="vertical" flexBasis={{ xl: "2%" }} color="silver" />
							<Box flexBasis={{ xl: "35%" }}>
								<Box pb={16}>
									<H4>Point of Contact</H4>
								</Box>
								{pocInfo.map((poc, index) => {
									return (
										<Flex
											key={index}
											flexDir="column"
											border={1}
											borderStyle="solid"
											borderColor="silver"
											px={8}
											justifyContent="space-around"
											flexWrap="wrap">
											<Flex py={4}>
												<Box as={PersonIcon} {...pocIconProps} />
												<FinePrint>{poc.fullName}</FinePrint>
											</Flex>
											<Flex py={4}>
												<Box as={EmailIcon} {...pocIconProps} />
												<FinePrint>{poc.email}</FinePrint>
											</Flex>
											<Flex py={4}>
												<Box as={PhoneIcon} {...pocIconProps} />
												<FinePrint>{poc.phone}</FinePrint>
											</Flex>
										</Flex>
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
