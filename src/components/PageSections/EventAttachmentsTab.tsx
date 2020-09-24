import React, { useState } from "react"
import { Box, Grid, Flex, Button } from "@chakra-ui/core"
import { FinePrint, P, H3, FileUploader } from "@c1ds/components"
import AttachmentCard from "../AttachmentCard"
import { useCTFFormContextWSavedForm } from "../Forms/Form"

interface AttachmentTabProps {
	eventData: EventFormData
}

export const AttachmentsTab: React.FC<AttachmentTabProps> = (p: AttachmentTabProps) => {
	const { eventData } = p
	const { attachments } = eventData

	const { savedForm: savedEvents, updateSavedForm: updateSavedEvents } = useCTFFormContextWSavedForm()
	const [errorMsg, setErrorMsg] = useState<string>("")
	const [progress, setProgress] = useState(0)
	const [attachmentDtoList, setAttachmentDtoList] = useState(attachments ?? [])

	console.log(errorMsg)

	const maxSizeBytes = 1024 * 1024 * 5
	const acceptedFileExtensions = [".jpg", ".jpeg", ".gif", ".png", ".xls", ".xlsx", ".doc", ".docx", ".txt", ".rtf", ".pdf"]

	return (
		<>
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
					<FileUploader
						id="attachments"
						maxSizeBytes={maxSizeBytes}
						allowedFileTypes={acceptedFileExtensions}
						progress={progress}
						onDrop={(_, files) => {
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
						errorMessage={errorMsg}
					/>
				</Box>

				{attachmentDtoList.map((value: AttachmentDto, index: number) => {
					return (
						<Box key={index} gridColumn="1 / -1">
							<AttachmentCard
								eventData={eventData}
								setErrorMsg={setErrorMsg}
								setProgress={setProgress}
								maxSize={maxSizeBytes}
								setAttachmentDtoList={setAttachmentDtoList}
								attachmentDto={value}
							/>
						</Box>
					)
				})}
			</Grid>
		</>
	)
}
