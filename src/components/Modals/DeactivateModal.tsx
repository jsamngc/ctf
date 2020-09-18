import React from "react"
import { Box, Flex, Button as ChakraButton } from "@chakra-ui/core"
import { P, Button, H4, Modal, ModalBody, ModalFooter, ModalHeader, ModalCloseButton, LinkButton } from "@c1ds/components"

interface DeactivateModalProps {
	isOpen: boolean
	onCancel: React.ComponentProps<typeof Modal>["onClose"]
	onConfirm: React.ComponentProps<typeof Modal>["onClose"]
	eventName?: string
	/**
	 * Indicates whether modal is for event activation.
	 *
	 * If true, confirmation button/description will display "Activate"
	 *
	 * If false, confirmation button/description will display "Deactivate"
	 *
	 * If undefined, confirmation button/description will display "Yes"
	 */
	isActivate?: boolean
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
	isActivate,
}: DeactivateModalProps) => {
	// if eventName and isActivate are not defined, it will prompt default Deactivate Modal with no event information.
	const status = isActivate ? "Activate" : "Deactivate"

	return (
		<Modal isOpen={isOpen} onClose={onCancel} isCentered={true} size="sm">
			<ModalHeader>
				<H4>{status} {eventName ?? 'Event?'}</H4>
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<P>
					Are you sure you want to {status.toLocaleLowerCase()} this {eventName?.toLocaleLowerCase() ?? "event"}?
				</P>
			</ModalBody>

			<ModalFooter>
				<Flex align="center">
					<Box marginRight="20">
						<LinkButton onClick={onCancel}>Cancel</LinkButton>
					</Box>
					{typeof isActivate === "undefined" ? (
						<Button size="sm" onClick={onConfirm}>
							YES
						</Button>
					) : !isActivate ? (
						// Deactivate button with warning background color.
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
						<Button size={isActivate ? "md" : "sm"} onClick={onConfirm}>
							{status}
						</Button>
					)}
				</Flex>
			</ModalFooter>
		</Modal>
	)
}

export default DeactivateModal
