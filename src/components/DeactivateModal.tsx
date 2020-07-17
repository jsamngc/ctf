import React from "react"
import { Box, Flex, Button as ChakraButton } from "@chakra-ui/core"
import { P, Button, ButtonSize, H4, Modal, ModalBody, ModalFooter, ModalHeader, ModalCloseButton } from "@c1ds/components"
import { LinkButton } from "../components/LinkButton"

interface DeactivateModalProps {
	isOpen: boolean
	onCancel: Modal["onClose"]
	onConfirm: Modal["onClose"]
	eventName?: string
	isActive?: boolean
}

const buttonStyle = {
	default: {
		bg: "badge",
		color: "white",
		border: "none",
	},
	hoverFocus: {
		borderStyle: "solid",
		borderWidth: "2",
		borderColor: "accent",
	},
	active: {
		bg: "#a30014",
		border: "none",
	},
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({
	isOpen,
	onCancel,
	onConfirm,
	eventName,
	isActive = undefined,
}: DeactivateModalProps) => {
	// if eventName and isActive are not defined, it will prompt default Deactive Modal with no event information.
	const status = typeof isActive === "undefined" ? "Deactivate" : isActive ? "Deactivate" : "Activate"

	return (
		<Modal isOpen={isOpen} onClose={onCancel} isCentered={true} size="sm">
			<ModalHeader>
				<H4>{status} Event?</H4>
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<P>
					Are you sure you want to {status.toLocaleLowerCase()} {eventName ?? "this event"}?
				</P>
			</ModalBody>

			<ModalFooter>
				<Flex align="center">
					<Box marginRight="20">
						<LinkButton onClick={onCancel}>Cancel</LinkButton>
					</Box>
					{typeof isActive === "undefined" ? (
						<Button size={ButtonSize.SM} onClick={onConfirm}>
							YES
						</Button>
					) : isActive ? (
						// Deactive button with warning background color.
						<ChakraButton
							height="input"
							width="buttonMd"
							textAlign="center"
							borderRadius={0}
							fontFamily="body"
							fontSize="button"
							fontWeight="button"
							px={20}
							py={12}
							{...buttonStyle.default}
							_focus={buttonStyle.hoverFocus}
							_hover={buttonStyle.hoverFocus}
							_active={buttonStyle.active}
							onClick={onConfirm}>
							<Box flex="1 1 0" lineHeight="normal">
								{status}
							</Box>
						</ChakraButton>
					) : (
						<Button size={ButtonSize.SM} onClick={onConfirm}>
							{status}
						</Button>
					)}
				</Flex>
			</ModalFooter>
		</Modal>
	)
}

export default DeactivateModal
