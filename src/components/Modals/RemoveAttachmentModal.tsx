import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { H4, P, Modal, ModalHeader, ModalBody, ModalFooter, LinkButton, Button } from "@c1ds/components"

interface RemoveAttachmentModalProps {
	isOpen: boolean
	onClose: React.ComponentProps<typeof Modal>["onClose"]
	message?: string
}

const RemoveAttachmentModal: React.FC<RemoveAttachmentModalProps> = (p: RemoveAttachmentModalProps) => {
	const { isOpen, onClose, message = "Are you sure you want to delete this attachment? This action cannot be undone." } = p
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="sm">
			<ModalHeader>
				<H4>Delete Attachment?</H4>
			</ModalHeader>
			<ModalBody>
				<P>{message}</P>
			</ModalBody>
			<ModalFooter>
				<Flex align="center">
					<Box marginRight="20">
						<LinkButton onClick={p.onClose}>Cancel</LinkButton>
					</Box>
					<Button size="sm">Delete</Button>
				</Flex>
			</ModalFooter>
		</Modal>
	)
}

export default RemoveAttachmentModal
