import React, { useState, useRef } from "react"
import { Box, Grid, useDisclosure, Flex, Divider, VisuallyHidden } from "@chakra-ui/core"
import { FinePrint, P, H3, FileUploader, Link, Card } from "@c1ds/components"
import { MoreVertSharp } from "@material-ui/icons"
import { useSavedForm } from "../Utility/formHelpers"
import DeleteFileModal from "../Modals/DeleteFileModal"
import Dropdown from "../Dropdown"

interface AttachmentTabProps {
	eventData: EventFormData
	setEventData: (eventData: EventFormData) => void
}

export const AttachmentsTab: React.FC<AttachmentTabProps> = (p: AttachmentTabProps) => {
	const { eventData, setEventData } = p
	const { attachments } = eventData

	const { isOpen: isAttachmentOpen, onOpen: onAttachmentOpen, onClose: onAttachmentClose } = useDisclosure()

	const [savedEvents, updateSavedEvents] = useSavedForm<EventFormData[]>("ctfForms", "events")

	// 1.6 The system displays appropriate error message when the selected file is in the unacceptable format.
	// 1.7 The system displays appropriate error message when the file size exceeding 5MB
	const [errorMsg, setErrorMsg] = useState<string>("")
	const [progress, setProgress] = useState(0)
	const [attachmentDtoList, setAttachmentDtoList] = useState(attachments ?? [])

	// 1.5 The system accepts the following file format of the selected file
	// · Image(.jpg, .jpeg, .gif, .png)
	// · Spreadsheet(.xls, .xlsx)
	// · Text File(.doc, docx, .txt, .rtf, .pdf)
	const acceptedFileFormats = [
		"image/jpeg",
		"image/gif",
		"image/png",
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"text/plain",
		"application/rtf",
		"application/pdf",
	]

	const maxSizeBytes = 1024 * 1024 * 5
	const acceptedFileExtensions = [".jpg", ".jpeg", ".gif", ".png", ".xls", ".xlsx", ".doc", ".docx", ".txt", ".rtf", ".pdf"]
	const attachmentRef = useRef<HTMLInputElement>(null)
	const cardOptions = [
		{
			label: "Replace",
			value: "Replace",
			onClick: () => {
				attachmentRef.current?.click()
			},
		},
		{
			label: "Remove",
			value: "Remove",
			onClick: () => {
				onAttachmentOpen()
			},
		},
	]
	interface AttachmentCard {
		attachmentDto: AttachmentDto
	}

	const AttachmentCard: React.FC<AttachmentCard> = (p: AttachmentCard) => {
		const { attachmentDto } = p
		const { attachments } = eventData
		const attachmentRef = useRef<HTMLInputElement>(null)

		const setFileOnCard = (file: File) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				if (eventData && eventData.attachments) {
					eventData.attachments[eventData.attachments.indexOf(attachmentDto)] = {
						fileName: file.name,
						fileSize: file.size,
						fileMimeType: file.type,
						fileDataURL: reader.result,
					}
					setAttachmentDtoList([...eventData.attachments])
					setEventData(eventData)
					const savedEventIndex = savedEvents.findIndex((evt: EventFormData) => evt.eventId === eventData.eventId)
					savedEvents.splice(savedEventIndex, 1, eventData)
					updateSavedEvents(savedEvents)
				}
			}
		}

		return (
			<Box>
				<Card id="attachmentCard" maxWidth="full">
					<Flex w="full" my={{ base: "-8px", sm: "-12px" }} flexDir={{ base: "row" }}>
						{/* 1.4 The user can see the following information on the Attachment card
					· Filename name (hyperlinked)
					· [Replace] Function
					· [Remove] function */}
						{/* 1.5 The user can click on the hyperlinked Attachment filename to download the file and view the content. */}
						<Flex flexGrow={1} justifyContent="flex-start">
							<Link href={`${attachmentDto.fileDataURL}`} download={attachmentDto.fileName}>
								{attachmentDto.fileName}
							</Link>
						</Flex>
						<Flex display={{ base: "none", md: "flex" }} flexGrow={1} justifyContent="flex-end">
							<Link
								onClick={e => {
									e.preventDefault()
									setErrorMsg("")
									attachmentRef.current?.click()
								}}>
								Replace
							</Link>
							<Box mx={24}>
								<Divider
									position="absolute"
									h={{ base: 16, sm: 16 }}
									top={{ base: -12, sm: -16 }}
									orientation="vertical"
									color="silver"
								/>
							</Box>
							<Link
								onClick={e => {
									e.preventDefault()
									onAttachmentOpen()
								}}>
								Remove
							</Link>

							<DeleteFileModal
								type="attachment"
								isOpen={isAttachmentOpen}
								onCancel={onAttachmentClose}
								onConfirm={() => {
									const selectedIndex = attachments?.indexOf(attachmentDto)
									eventData.attachments = attachments?.filter((att, index) => index !== selectedIndex)
									setAttachmentDtoList(eventData.attachments ?? [])
									setEventData(eventData)
									const savedEventIndex = savedEvents.findIndex(
										(evt: EventFormData) => evt.eventId === eventData.eventId
									)
									savedEvents.splice(savedEventIndex, 1, eventData)
									updateSavedEvents(savedEvents)
									onAttachmentClose()
								}}
							/>
						</Flex>

						<Flex display={{ md: "none" }} justifyContent="flex-end">
							<Box position="relative" right={{ base: "-12px" }}>
								<Dropdown
									options={cardOptions}
									borderedRows={true}
									width="10rem"
									label={`Additional actions for ${attachmentDto.fileName}`}>
									<Box as={MoreVertSharp} color="clickable" />
								</Dropdown>
							</Box>
						</Flex>
					</Flex>
				</Card>

				<VisuallyHidden
					as="input"
					/* @ts-ignore */
					type="file"
					ref={attachmentRef}
					name="talkingPoints"
					aria-hidden={true}
					tabIndex={-1}
					accept={acceptedFileFormats.join()}
					onChange={(e: React.FormEvent<HTMLInputElement>) => {
						// @ts-ignore
						const fileToReplace = e.target.files[0]
						!acceptedFileFormats.includes(fileToReplace.type)
							? setErrorMsg("File type must be one of .jpg .jpeg .gif .png .xls .xlsx .doc .docx .txt .rtf .pdf")
							: setFileOnCard(fileToReplace)
					}}
				/>
			</Box>
		)
	}

	return (
		<>
			{/*1.1 The user can access the Attachment screen from Edit Event option.*/}
			<Grid
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{
					base: "repeat(4, 1fr)",
					md: "repeat(12, 1fr)",
				}}>
				<Flex gridColumn="1 / -1" align="center" justify="space-between">
					<Box>
						<H3>Attachments</H3>
					</Box>
				</Flex>
				<Box gridColumn="1 / -1">
					<P>Add additional attachments related to this event.</P>
				</Box>
				<Box gridColumn={{ base: "1 / -1" }}>
					<Box mb={4}>
						<FinePrint color="label">Attachments</FinePrint>
					</Box>
					{/* 1.2 The user can see the following section on the Attachment screen when there is no attachments.
						· Upload File Area: [Drop/Browse] */}
					{/* 1.6 The system displays the Upload File Area: [Drop/Browse] always on top of the file list */}
					{/* 1.4 The user can upload file by using the Upload File Area: [Drop/Browse] */}
					{/* 1.4.1 (Drop function) The user can drag a file from user’s local desktop and drop it into the [Drop/Browse] area to upload the file */}
					{/* 1.4.2 (Browse Function) The user can click [Drop/Browse] area to launch an interface (e.g. File Explorer) which allows the user to identify the proper document to be uploaded. */}
					<FileUploader
						id="attachments"
						maxSizeBytes={maxSizeBytes}
						allowedFileTypes={acceptedFileExtensions}
						progress={progress}
						onDrop={(e, files) => {
							setProgress(0)
							const fileToSet = files[0]
							const reader = new FileReader()
							let attachment: AttachmentDto
							reader.readAsDataURL(fileToSet)
							reader.onload = () => {
								attachment = {
									fileName: fileToSet.name,
									fileSize: fileToSet.size,
									fileMimeType: fileToSet.type,
									fileDataURL: reader.result,
								}
								eventData.attachments?.push(attachment)
								setAttachmentDtoList(eventData.attachments ?? [])
								setEventData(eventData)
								const savedEventIndex = savedEvents.findIndex(
									(evt: EventFormData) => evt.eventId === eventData.eventId
								)
								savedEvents.splice(savedEventIndex, 1, eventData)
								updateSavedEvents(savedEvents)
							}
							setProgress(100)
							setErrorMsg("")
						}}
						handleRejectedFiles={(_, files) => {
							setErrorMsg(files[0].errors[0])
						}}
					/>
					{errorMsg !== "" && <P color="error">{errorMsg}</P>}
				</Box>

				{/* 1.3 The user can see the following section on the Attachment screen when there are pre-existing attachments
				· Upload File Area: [Drop/Browse]
				· Attachment Card */}
				{attachmentDtoList.map((value: AttachmentDto, index: number) => {
					return (
						<Box key={index} gridColumn="1 / -1">
							<AttachmentCard attachmentDto={value} />
						</Box>
					)
				})}
			</Grid>
		</>
	)
}
