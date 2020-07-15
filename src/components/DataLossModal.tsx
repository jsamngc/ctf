import React from "react"
import { H4, P, Button, ButtonSize, Modal, ModalBody, ModalFooter, ModalHeader, ModalCloseButton } from "@c1ds/components"
import { LinkButton } from "../components/LinkButton"

interface DataLossModalProps {
	isOpen: boolean
	onClose: Modal["onClose"]
	onLeave: (e: React.MouseEvent<HTMLInputElement>) => void
}

export const DataLossModal: React.FC<DataLossModalProps> = (p: DataLossModalProps) => (
	<Modal isOpen={p.isOpen} onClose={p.onClose} isCentered={true} size="sm">
		<ModalHeader>
			<H4>Leave Page?</H4>
		</ModalHeader>
		<ModalCloseButton />
		<ModalBody>
			<P>Do you want to leave this page and lose unsaved data?</P>
		</ModalBody>

		<ModalFooter>
			<LinkButton onClick={p.onLeave}>Leave</LinkButton>
			<Button size={ButtonSize.SM} onClick={p.onClose}>
				Stay
			</Button>
		</ModalFooter>
	</Modal>
)
