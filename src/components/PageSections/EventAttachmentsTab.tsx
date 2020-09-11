import React, { useState } from "react"
import { Box, Grid, Flex } from "@chakra-ui/core"
import { FinePrint, P, H3, FileUploader } from "@c1ds/components"
import { useSavedForm } from "../Utility/formHelpers"
import AttachmentCard from "../AttachmentCard"

interface AttachmentTabProps {
	eventData: EventFormData
	setEventData: (eventData: EventFormData) => void
}

export const AttachmentsTab: React.FC<AttachmentTabProps> = (p: AttachmentTabProps) => {
	const { eventData, setEventData } = p
	const { attachments } = eventData

	const [savedEvents, updateSavedEvents] = useSavedForm<EventFormData[]>("ctfForms", "events")

	// 1.6 The system displays appropriate error message when the selected file is in the unacceptable format.
	// 1.7 The system displays appropriate error message when the file size exceeding 5MB
	const [errorMsg, setErrorMsg] = useState<string>("")
	const [progress, setProgress] = useState(0)
	const [attachmentDtoList, setAttachmentDtoList] = useState(attachments ?? [])

	const maxSizeBytes = 1024 * 1024 * 5
	const acceptedFileExtensions = [".jpg", ".jpeg", ".gif", ".png", ".xls", ".xlsx", ".doc", ".docx", ".txt", ".rtf", ".pdf"]
	
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
							<AttachmentCard 
								eventData={eventData}
								setEventData={setEventData}
								setErrorMsg={setErrorMsg}
								setAttachmentDtoList={setAttachmentDtoList}
								attachmentDto={value} />
						</Box>
					)
				})}
			</Grid>
		</>
	)
}
