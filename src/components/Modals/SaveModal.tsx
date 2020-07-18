import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { H4, P, Modal, ModalBody, ModalHeader } from "@c1ds/components"
import { CircularProgress } from "../ProgressIndicator"

interface SaveModalProps {
	isOpen: boolean
	onClose: Modal["onClose"]
}

export const SaveModal: React.FC<SaveModalProps> = (p: SaveModalProps) => (
	<Modal isOpen={p.isOpen} onClose={p.onClose} isCentered={true} size="sm">
		<ModalHeader>
			<H4>Please Wait...</H4>
		</ModalHeader>
		<ModalBody>
			<Flex align="center">
				<Box color="clickable">
					<CircularProgress />
				</Box>
				<Box pl="24">
					<P>Saving your information</P>
				</Box>
			</Flex>
		</ModalBody>
	</Modal>
)
