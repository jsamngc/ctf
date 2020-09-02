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
							setErrorMsg('')
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
								attachmentDto={value}
								eventData={eventData}
								setAttachmentDtoList={setAttachmentDtoList}
								setEventData={setEventData}
								setErrorMsg={setErrorMsg}
								acceptedFileFormats={acceptedFileFormats}
							/>
						</Box>
					)
				})}
			</Grid>
		</>
	)
}
