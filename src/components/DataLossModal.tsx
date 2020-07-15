import React from "react"
import { H4, P, Button, ButtonSize, Modal, ModalBody, ModalFooter, ModalHeader, ModalCloseButton } from "@c1ds/components"
import { LinkButton } from "../components/LinkButton"
import { Flex, Box } from "@chakra-ui/core"

interface DataLossModalProps {
	isOpen: boolean
	onClose: Modal["onClose"]
	onLeave: (e: React.MouseEvent<HTMLInputElement>) => void
}

export const DataLossModal: React.FC<DataLossModalProps> = (p: DataLossModalProps) => (
	<Modal isOpen={p.isOpen} onClose={p.onClose} isCentered={true} size="sm">
		<ModalHeader>
			<H4>Leave Page</H4>
		</ModalHeader>
		<ModalCloseButton />
		<ModalBody>
			<P>Are you sure you want to leave this page? The data entered will not be saved.</P>
		</ModalBody>

		<ModalFooter>
			<Flex align="center">
				<Box marginRight="20">
					<LinkButton onClick={p.onLeave}>Leave</LinkButton>
				</Box>
				<Button size={ButtonSize.SM} onClick={p.onClose}>
					Stay
				</Button>
			</Flex>
		</ModalFooter>
	</Modal>
)
