import React from "react"
import { Box, Flex } from "@chakra-ui/core"
import { P, Button, H4, Modal, ModalBody, ModalFooter, ModalHeader, ModalCloseButton, LinkButton } from "@c1ds/components"

interface DeleteFileModalProps {
	message: string
	isOpen: boolean
	onCancel: React.ComponentProps<typeof Modal>["onClose"]
	onConfirm: React.ComponentProps<typeof Modal>["onClose"]
}

const DeleteFileModal: React.FC<DeleteFileModalProps> = ({ message, isOpen, onCancel, onConfirm }: DeleteFileModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onCancel} isCentered={true} size="sm">
			<ModalHeader>
				<H4>Delete Talking Points?</H4>
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<P>{message}</P>
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
