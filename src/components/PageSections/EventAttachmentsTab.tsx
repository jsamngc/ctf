import React from "react"
import { navigate } from "gatsby"
import { Box, Flex, Grid } from "@chakra-ui/core"
import { FinePrint, P, H3, FileUploader } from "@c1ds/components"
import moment from "moment"

interface AttachmentsTabProps {
	eventData: EventFormData
}

export const AttachmentsTab: React.FC<AttachmentsTabProps> = (p: AttachmentsTabProps) => {
	const { eventData } = p
	return (
		<>
			<Grid
				gridColumn="1 / -1"
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{
					base: "repeat(4, 1fr)",
					md: "repeat(12, 1fr)",
					lg: "repeat(12, 1fr)",
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
					/>
				</Box>
			</Grid>
		</>
	)
}

// TODO: Move to common util file (also used by EventCard)
const formatDateField = (inputDate: Date | undefined) => {
	return moment(inputDate).format("MM/DD/YYYY")
}

const displayData = (value?: string) => value ?? "---"
