import React, { useState, useRef } from "react"
import { Box, useDisclosure, Flex, Divider, VisuallyHidden } from "@chakra-ui/core"
import { Link, Card } from "@c1ds/components"
import DeleteFileModal from "./Modals/DeleteFileModal"

import Dropdown from "./Dropdown"

import { MoreVertSharp } from "@material-ui/icons"

interface AttachmentCard {
	attachmentDto: AttachmentDto
	eventData: EventFormData
	setEventData: (eventData: EventFormData) => void
	setAttachmentDtoList: React.Dispatch<React.SetStateAction<AttachmentDto[]>>
}

const AttachmentCard: React.FC<AttachmentCard> = (p: AttachmentCard) => {
	const { attachmentDto, eventData, setEventData, setAttachmentDtoList } = p
	const { attachments } = eventData

	const { isOpen: isAttachmentOpen, onOpen: onAttachmentOpen, onClose: onAttachmentClose } = useDisclosure()

	const [attachment, setAttachment] = useState<AttachmentDto | null>(attachmentDto)
	const [errorMsg, setErrorMsg] = useState<string>("")

	const attachmentRef = useRef<HTMLInputElement>(null)

	const setFileOnCard = (file: File) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			const newAttachment: AttachmentDto = {
				fileName: file.name,
				fileSize: file.size,
				fileMimeType: file.type,
				fileDataURL: reader.result,
			}
			const index = eventData.attachments?.indexOf(attachmentDto)
			console.log("eventData.attachments?: " + eventData.attachments)
			console.log("index: " + index)
			eventData.attachments[index] = attachmentDto
			// setEventData(eventData)
		}
	}

	const options = [
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

	return (
		<Box>
			<Card id="attachmentCard" maxWidth="full">
				<Flex w="full" my={{ base: "-8px", sm: "-12px" }} flexDir={{ base: "row" }}>
					<Flex flexGrow={1} justifyContent="flex-start">
						<Link href={`${attachmentDto.fileDataURL}`} download={attachmentDto.fileName}>
							{attachmentDto.fileName}
						</Link>
					</Flex>

					<Flex display={{ base: "none", md: "flex" }} flexGrow={1} justifyContent="flex-end">
						<Link
							aria-label="Replace"
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
							aria-label="Remove"
							onClick={e => {
								e.preventDefault()
								onAttachmentOpen()
							}}>
							Remove
						</Link>

						<DeleteFileModal
							message={"Are you sure you want to delete this attachment? This action cannot be undone."}
							isOpen={isAttachmentOpen}
							onCancel={onAttachmentClose}
							onConfirm={() => {
								eventData.attachments = attachments?.filter(attachment => {
									return attachment.fileName !== attachmentDto.fileName
								})
								setEventData(eventData)
								setAttachmentDtoList(eventData.attachments ?? [])
								onAttachmentClose()
							}}
						/>
					</Flex>

					<Flex display={{ md: "none" }} justifyContent="flex-end">
						<Box position="relative" right={{ base: "-12px" }}>
							<Dropdown
								options={options}
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
					console.log(fileToReplace)

					if (!acceptedFileFormats.includes(fileToReplace.type)) {
						setErrorMsg("File type must be one of .jpg .jpeg .gif .png .xls .xlsx .doc .docx .txt .rtf .pdf")
					} else {
						setFileOnCard(fileToReplace)
					}
				}}
			/>
		</Box>
	)
}

export default AttachmentCard
