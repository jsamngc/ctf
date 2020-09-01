import React, { useState } from "react"
import { Box, Flex, Grid } from "@chakra-ui/core"
import { FinePrint, P, H3, FileUploader } from "@c1ds/components"
import AttachmentCard from "../AttachmentCard"

interface AttachmentTabProps {
	eventData: EventFormData
	setEventData: (eventData: EventFormData) => void
}

export const AttachmentsTab: React.FC<AttachmentTabProps> = (p: AttachmentTabProps) => {
	const { eventData, setEventData } = p
	const { attachments } = eventData

	const [progress, setProgress] = useState(0)
	const [attachmentDtoList, setAttachmentDtoList] = useState(attachments ?? [])

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
						maxSizeBytes={1024 * 1024 * 5}
						allowedFileTypes={[
							".jpg",
							".jpeg",
							".gif",
							".png",
							".xls",
							".xlsx",
							".doc",
							".docx",
							".txt",
							".rtf",
							".pdf",
						]}
						progress={progress}
						onDrop={(e, files) => {
							setProgress(0)
							files.map((file: File) => {
								const reader = new FileReader()
								let attachment: AttachmentDto
								reader.readAsDataURL(file)
								reader.onload = () => {
									attachment = {
										fileName: file.name,
										fileSize: file.size,
										fileMimeType: file.type,
										fileDataURL: reader.result,
									}
									setAttachmentDtoList(currentAttachments => {
										return [...currentAttachments, attachment]
									})
									eventData.attachments?.push(attachment)
									setEventData(eventData)
								}
							})
							setProgress(100)
						}}
					/>
				</Box>

				{attachmentDtoList.map((value: AttachmentDto, index: number) => {
					return (
						<Box key={index} gridColumn="1 / -1">
							<AttachmentCard
								attachmentDto={value}
								eventData={eventData}
								setEventData={setEventData}
								setAttachmentDtoList={setAttachmentDtoList}
							/>
						</Box>
					)
				})}
			</Grid>
		</>
	)
}
