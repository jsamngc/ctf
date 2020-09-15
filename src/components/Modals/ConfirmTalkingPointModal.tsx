import React from "react"
import { H4, P, Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalCloseButton, LinkButton } from "@c1ds/components"
import { Flex, Box } from "@chakra-ui/core"

interface ConfirmTalkingPointModalProps {
	isOpen: boolean
	onClose: React.ComponentProps<typeof Modal>["onClose"]
	onConfirm: () => void
}

export const ConfirmTalkingPointModal: React.FC<ConfirmTalkingPointModalProps> = (p: ConfirmTalkingPointModalProps) => (
	<Modal isOpen={p.isOpen} onClose={p.onClose} isCentered={true} size="sm">
		<ModalHeader>
			<H4>Empty Talking Point</H4>
		</ModalHeader>
		<ModalCloseButton />
		<ModalBody>
			<P>The event is saving with the pre-determined Talking Points. Would you like to continue?</P>
		</ModalBody>

		<ModalFooter>
			<Flex align="center">
				<Box marginRight="20">
					<LinkButton onClick={p.onClose}>
                    Cancel
                    </LinkButton>
				</Box>
				<Button size="sm" onClick={p.onConfirm} buttonType="secondary">
                    Continue
				</Button>
			</Flex>
		</ModalFooter>
	</Modal>
)
