import React, { useRef } from "react"
import { Box, useDisclosure, Flex, Divider, VisuallyHidden } from "@chakra-ui/core"
import { Link, Card } from "@c1ds/components"
import { MoreVertSharp } from "@material-ui/icons"
import DeleteFileModal from "./Modals/DeleteFileModal"
import Dropdown from "./Dropdown"
import { useCTFFormContextWSavedForm } from "./Forms/Form"

interface AttachmentCardProp {
	attachmentDto: AttachmentDto
	eventData: EventFormData
	maxSize: number
	setAttachmentDtoList: React.Dispatch<React.SetStateAction<AttachmentDto[]>>
	setErrorMsg: React.Dispatch<React.SetStateAction<string>>
	setProgress: React.Dispatch<React.SetStateAction<number>>
}

const AttachmentCard: React.FC<AttachmentCardProp> = (p: AttachmentCardProp) => {
	const { attachmentDto, eventData, maxSize, setAttachmentDtoList, setErrorMsg, setProgress} = p
	const { attachments } = eventData

	const { savedForm: savedEvents, updateSavedForm: updateSavedEvents } = useCTFFormContextWSavedForm()

	const { isOpen: isAttachmentOpen, onOpen: onAttachmentOpen, onClose: onAttachmentClose } = useDisclosure()

	const attachmentRef = useRef<HTMLInputElement>(null)

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
								const savedEventIndex = savedEvents.findIndex(
									(evt: EventFormData) => evt.eventId === eventData.eventId
								)
								savedEvents.splice(savedEventIndex, 1, eventData)
								updateSavedEvents(savedEvents)
								setProgress(0)
								setErrorMsg("")
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
					if (!acceptedFileFormats.includes(fileToReplace.type)){
						setErrorMsg("File type must be one of .jpg .jpeg .gif .png .xls .xlsx .doc .docx .txt .rtf .pdf")
					} else if (fileToReplace.size > maxSize){
						setErrorMsg("File is larger than 5242880 bytes")
					} else{
						setFileOnCard(fileToReplace)
					}
				}}
			/>
		</Box>
	)
}

export default AttachmentCard
