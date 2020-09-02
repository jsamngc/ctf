import React from "react"
import { Box, Flex } from "@chakra-ui/core"
import { P, Button, H4, Modal, ModalBody, ModalFooter, ModalHeader, ModalCloseButton, LinkButton } from "@c1ds/components"

interface DeleteFileModalProps {
	type: string
	isOpen: boolean
	onCancel: React.ComponentProps<typeof Modal>["onClose"]
	onConfirm: React.ComponentProps<typeof Modal>["onClose"]
}
enum Type {
	talkingPoints = "Talking Points",
	attachment = "Attachment"
}

const DeleteFileModal: React.FC<DeleteFileModalProps> = ({ type, isOpen, onCancel, onConfirm }: DeleteFileModalProps) => {
	const targetType = type === 'talkingPoints' ? Type.talkingPoints :
				 type === 'attachment' ? Type.attachment : ""
	return (
		<Modal isOpen={isOpen} onClose={onCancel} isCentered={true} size="sm">
			<ModalHeader>
				<H4>Delete {targetType}?</H4>
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<P>Are you sure you want to delete this {targetType.toLowerCase}? This action cannot be undone.</P>
			</ModalBody>

			<ModalFooter>
				<Flex align="center">
					<Box marginRight="20">
						<LinkButton onClick={onCancel}>Cancel</LinkButton>
					</Box>
					<Button size="sm" onClick={onConfirm}>
						Delete
					</Button>
				</Flex>
			</ModalFooter>
		</Modal>
	)
}

export default DeleteFileModal
