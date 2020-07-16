import React from "react"
import { Box,Flex, PseudoBox } from "@chakra-ui/core"
import {
	P,
	Button,
	ButtonSize,
	H4,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalCloseButton,
} from "@c1ds/components"
import { LinkButton } from "../components/LinkButton"

interface DeactivateModalProps {
	isOpen: boolean
	onCancel: Modal["onClose"]
    onConfirm: Modal["onClose"]
    eventName: string
    isActive?: boolean
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({isOpen, onCancel, onConfirm, eventName, isActive = undefined}: DeactivateModalProps) => {

    const status = typeof isActive === 'undefined' ? 'Deactivate' : isActive ? 'Deactivate' : 'Activate';
    return (
        <Modal isOpen={isOpen} onClose={onCancel} isCentered={true} size="sm">
		<ModalHeader>
			<H4>{status} Event?</H4>
		</ModalHeader>
		<ModalCloseButton />
		<ModalBody>
            <P>Are you sure you want to {status.toLocaleLowerCase()} {eventName??'this event'}?</P>
		</ModalBody>

		<ModalFooter>
			<Flex align="center">
				<Box marginRight="20">
					<LinkButton onClick={onCancel}>Cancel</LinkButton>
				</Box>
                {
                    typeof isActive === 'undefined' ? 
                    <Button size={ButtonSize.SM} onClick={onConfirm}>
                        YES
                    </Button> :
					isActive ?
					<PseudoBox
						as="button"
						textAlign="center"
						fontFamily="body"
						fontSize="button"
						fontWeight="button"
						lineHeight="normal"
						px={20}
						py={12}
						bg="red"
						color ="white"
						border = "1px solid red"
						outline='none'
						_hover={{ 
							borderStyle: "solid",
							borderWidth: "1px",
							borderColor: "accent",
						}}
						_active={{
							bg: "required",
							borderColor: "accent",
						}}
						onClick={onConfirm}>
						{status}
					</PseudoBox> :
                    <Button size={ButtonSize.SM} onClick={onConfirm}>
                        {status}
                    </Button> 
                }
			</Flex>
		</ModalFooter>
	</Modal>
    )
	
}

export default DeactivateModal