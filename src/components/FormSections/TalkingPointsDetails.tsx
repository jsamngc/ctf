import React, { useRef, useState } from "react"
import { Controller } from "react-hook-form"
import { Box, Divider, VisuallyHidden, Flex, useDisclosure } from "@chakra-ui/core"
import { FormInput, H4, P, FileUploader, Card, Link, Button, 
    Modal, ModalHeader, ModalCloseButton} from "@c1ds/components"

import { FormSection, useCTFFormContext } from "../Forms/Form"
import Dropdown from "../Dropdown"
import DeleteFileModal from "../Modals/DeleteFileModal"

import { MoreVertSharp } from "@material-ui/icons"

const TalkingPointDetails: React.FC = () => {
    const { isOpen: defaultModalOpen, onOpen: onDefaultModalOpen, onClose: onDefaultModalClose } = useDisclosure()
    const { isOpen: removeModalOpen, onOpen: onRemoveModalOpen, onClose: onRemoveModalClose } = useDisclosure()

    const [ errorMsg, setErrorMsg ] = useState<string>('')
    const [ isTPExist, setIsTPExist ] = useState<boolean>(false)

    // Ref to the hidden input type="file"
	const talkingPointRef = useRef<HTMLInputElement>(null)

    const { isCreate } = useCTFFormContext()

	const options = [
		{
			label: "Replace",
			value: "Replace",
			onClick: () => {
				talkingPointRef.current?.click()
			},
		},
		{
			label: "Remove",
			value: "Remove",
			onClick: () => {
				onRemoveModalOpen()
			},
		},
    ]
    
    const maxSize = 1024 * 1024 * 5
    const acceptedFileFormats = [
        "text/plain",
        "application/pdf",
        "application/rtf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]

    const setFileInForm = (file : File, onChange : (tp : TalkingPoint | undefined) => void) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const talkingPoint = {
                fileName : file.name,
                fileSize : file.size,
                fileMimeType : file.type,
                fileDataURL : reader.result
            }
            onChange(talkingPoint)
            setIsTPExist(true)
        }
    }
    
	return (
		<FormSection title="Talking Points" showDivider={isCreate} >
            <Box gridColumn={{ base: "1 / -1" }} >
                {isTPExist ? 
                    <P>You have added talking points to this event. The default talking points have been removed.</P>
                :
                    <P>If Talking Points aren&apos;t 
                    available, <Link onClick={onDefaultModalOpen}>default Talking Points</Link> will 
                    be presented based on the Event Type.</P>
                }
                <Modal 
                    isOpen={defaultModalOpen} 
                    onClose={onDefaultModalClose} 
                    isCentered={true} 
                    size="lg">
                    <ModalHeader>
                        <H4>Default Talking Points</H4>
                    </ModalHeader>
                    <ModalCloseButton />
                    <Box mt={{ base: "-92px", sm: "-108px" ,md: "-144px" }} gridColumn={{ base: "1 / -1" }} >
                        <P>
                            We are aware of the event at hand. We are monitoring the event closely 
                            and will update you with any new information that comes forth during 
                            this unprecedented time. We thank you for your understanding and ultimately 
                            for your cooperation.
                        </P>
                    </Box>
                        <Flex 
                            justifyContent="center" 
                            alignItems="flex-end"
                            gridColumn={{ base: "1 / -1" }}>
                            <Button buttonType="primary" onClick={onDefaultModalClose}>
                                Close
                            </Button>

                        </Flex>
                </Modal>
            </Box>
            
            <Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
                <Controller
                    name="talkingPoints"
                    render={({onChange, value}) => {
                        // Check if Talking Point value exists
                        setIsTPExist(value ? true : false)
                        return (
                            <FormInput labelText="Attachments" labelId="talkingPointsLabel">
                                {value ?
                                // Talking Point Card
                                <Box mt={8}>
                                    <Card id={`talkingPointItem`} >
                                        <VisuallyHidden 
                                            as="input" 
                                            // @ts-ignore
                                            type="file" 
                                            ref={talkingPointRef} 
                                            name="talkingPoints"
                                            aria-hidden={true}
                                            tabIndex={-1}
                                            accept={acceptedFileFormats.join()}
                                            onChange={(e : React.FormEvent<HTMLInputElement>) => {
                                                // @ts-ignore
                                                const uploadFile = e.target.files[0]
                                                if (!acceptedFileFormats.includes(uploadFile.type)){
                                                    setErrorMsg("File type must be one of .doc, .docx, .txt, .rtf, .pdf")
                                                } else if (uploadFile.size > maxSize){
                                                    setErrorMsg("File is larger than 5242880 bytes")
                                                } else{
                                                    setErrorMsg('')
                                                    setFileInForm(uploadFile, onChange)
                                                }
                                                
                                            }}/>    
                                        <Flex 
                                            w="full" 
                                            my={{ base: "-8px", sm: "-12px" }} 
                                            flexDir={{ base: "row" }}>
                                            <Flex flexGrow={1} justifyContent="flex-start">
                                                <Link 
                                                    href={`${value.fileDataURL}`} 
                                                    download={value.fileName}>
                                                    {value.fileName}
                                                </Link>
                                            </Flex>
                                            {/* Additional Talking Points actions Replace and Remove */}
                                            <Flex display={{ base: "none", md:"flex" }} flexGrow={1} justifyContent="flex-end">
                                                <Link href="" aria-label="Replace" onClick={(e)=> {
                                                    e.preventDefault()
                                                    talkingPointRef.current?.click()} 
                                                }>
                                                    Replace
                                                    </Link>
                                                <Box mx={24} >
                                                    <Divider position="absolute" 
                                                    h={{base:16, sm: 16 }}
                                                    top={{base:-12, sm: -16}} 
                                                    orientation="vertical" 
                                                    color="silver" />
                                                </Box>
                                                <Link href="" aria-label="Remove" onClick={(e)=> {
                                                    e.preventDefault()
                                                    onRemoveModalOpen()
                                                }}>
                                                    Remove
                                                    </Link>
                                                <DeleteTalkingPointModal
                                                    isOpen={removeModalOpen}
                                                    onCancel={onRemoveModalClose}
                                                    onConfirm={() => {
                                                        setIsTPExist(false)
                                                        onChange(undefined)
                                                        onRemoveModalClose()
                                                    }}
                                                />
                                            </Flex>
                                            <Flex display={{ md: "none" }} justifyContent="flex-end">
                                                <Box position="relative" right={{ base: "-12px" }}>
                                                    <Dropdown
                                                        options={options}
                                                        borderedRows={true}
                                                        width="10rem"
                                                        label={`Additional actions for ${value.fileName}`}>
                                                        <Box as={MoreVertSharp} color="clickable" />
                                                    </Dropdown>
                                                </Box>
                                            </Flex>
                                        </Flex>
                                    </Card>
                                    { errorMsg !== '' && <P color="error">{errorMsg}</P>}
                                </Box>
                                :
                                <FileUploader
                                    id="talkingPoints"
                                    aria-labelledby="talkingPoints"
                                    name="talkingPoints"
                                    maxSizeBytes={maxSize}
                                    allowedFileTypes={[
                                        ".doc",
                                        ".docx",
                                        ".txt",
                                        ".rtf",
                                        ".pdf",
                                    ]}
                                    onDrop={(_, files) => {      
                                        setFileInForm(files[0], onChange)
                                        setErrorMsg('')
                                    }}
                                    handleRejectedFiles={(_, files) => {
                                        setErrorMsg(files[0].errors[0])
                                    }} 
                                    errorMessage={errorMsg}
                                />
                                }
                            </FormInput>
                        )
                    }}
                />
            </Box>
		</FormSection>
	)
}

export default TalkingPointDetails
