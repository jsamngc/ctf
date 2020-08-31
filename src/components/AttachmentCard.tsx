import React, { useState } from "react"
import { navigate } from "gatsby"
import { Grid, Box, Button, PseudoBox, Divider, Text, useDisclosure, BoxProps } from "@chakra-ui/core"
import { Link, Card, P, H4, FinePrint } from "@c1ds/components"
import RemoveAttachmentModal from "../components/Modals/RemoveAttachmentModal"

interface AttachmentCard {
	attachmentDto: AttachmentDto
	setAttachmentDto: (attachmentDto: AttachmentDto) => void
}

const AttachmentCard: React.FC<AttachmentCard> = (p: AttachmentCard) => {
	const { attachmentDto } = p
	const { isOpen: isAttachmentOpen, onOpen: onAttachmentOpen, onClose: onAttachmentClose } = useDisclosure()

	return (
		<Box>
			<Card id="attachmentCard" maxWidth="full">
				<Grid
					gridGap={{ base: "16px", md: "24px" }}
					gridTemplateColumns={{
						base: "repeat(4, 1fr)",
						md: "repeat(12, 1fr)",
					}}>
					<Box gridColumn="1/2">
						<Link>{attachmentDto.file.name}</Link>
					</Box>
					<Box gridColumn="11/12">
						<Link>Replace</Link>
					</Box>

					<Box gridColumn="12/-1">
						<Link
							onClick={() => {
								onAttachmentOpen()
							}}>
							Remove
						</Link>
					</Box>
					<RemoveAttachmentModal isOpen={isAttachmentOpen} onClose={onAttachmentClose} />
				</Grid>
			</Card>
		</Box>
	)
}

export default AttachmentCard
