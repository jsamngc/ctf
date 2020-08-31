import React, { useState } from "react"
import { Box, Flex, Grid } from "@chakra-ui/core"
import { FinePrint, P, H3, FileUploader } from "@c1ds/components"
import AttachmentCard from "../AttachmentCard"

// interface AttachmentData {
// 	files: File[]
// }
interface AttachmentTabProps {
	eventData: EventFormData
	setAttachmentData?: (attachmentData: AttachmentData) => void
}

export const AttachmentsTab: React.FC<AttachmentTabProps> = (p: AttachmentTabProps) => {
	const { eventData } = p

	const { attachments } = eventData

	const [progress, setProgress] = useState(0)
	const [attachmentList, setAttachmentList] = useState(attachments ?? [])
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
							setAttachmentList(currentAttachments => {
								const newAttachments = files.map((file: File) => {
									return { file: file }
								})
								return [...currentAttachments, ...newAttachments]
							})
							setProgress(100)
						}}
					/>
				</Box>

				{attachmentList.map((value: AttachmentDto, index: number) => {
					return (
						<Box key={index} gridColumn="1 / -1">
							<AttachmentCard attachmentData={value} />
						</Box>
					)
				})}
			</Grid>
		</>
	)
}
