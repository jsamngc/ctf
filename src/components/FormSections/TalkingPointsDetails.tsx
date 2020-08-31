import React, { useRef, useState } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Box, Divider, VisuallyHidden, Flex, useDisclosure } from "@chakra-ui/core"
import { FormInput, H4, P, FileUploader, Card, Link, Button, 
    Modal, ModalHeader, ModalCloseButton} from "@c1ds/components"
// import chargeSample from '../../../content/Talking_Points_SOP.docx'

import { FormSection, useCTFFormContext } from "../Forms/Form"
import Dropdown from "../Dropdown"
import DeleteTalkingPointModal from '../Modals/DeleteTalkingPointModal'

import { MoreVertSharp } from "@material-ui/icons"

const TalkingPointDetails: React.FC = () => {
    const { setValue } = useFormContext<EventFormData>()

    const { isOpen: defaultModalOpen, onOpen: onDefaultModalOpen, onClose: onDefaultModalClose } = useDisclosure()
    const { isOpen: removeModalOpen, onOpen: onRemoveModalOpen, onClose: onRemoveModalClose } = useDisclosure()

    const [ errorMsg, setErrorMsg ] = useState<string>('')
    const [ talkingPoint, setTalkingPoint ] = useState<TalkingPoint|null>(null)

	const talkingPointRef = useRef<HTMLInputElement>(null)

    const { isCreate, isView } = useCTFFormContext()

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
    
    // 1.6 The system displays appropriate error message when the file size exceeding 5MB
    const maxSize = 1024 * 1024 * 5
    const acceptedFileFormats = [
        "text/plain",
        "application/pdf",
        "application/rtf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]

    const setFileInForm = (file : File, onChange : (tp : TalkingPoint) => void) => {
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
            setTalkingPoint(talkingPoint)
        }
    }
    
	return (
        // 1.2         The user can see the following fields on the Add New Talking Points section
        //       • Default Talking Points - hyperlink
        //       • Upload File Area: [Drop/Browse]
		<FormSection title="Talking Points" showDivider={isCreate} >
            <Box gridColumn={{ base: "1 / -1" }} >
                {talkingPoint ? 
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
            
            {/* Hidden File input field */}
            <Controller
                name="talkingPoints"
                render={({onChange}) => (
                    /* @ts-ignore */
                    <VisuallyHidden as="input" type="file" ref={talkingPointRef} 
                        name="talkingPoints"
                        aria-hidden={true}
                        tabIndex={-1}
                        accept={acceptedFileFormats.join()}
                        onChange={(e : React.FormEvent<HTMLInputElement>) => {
                            // @ts-ignore
                            const uploadFile = e.target.files[0]
                            console.log(uploadFile)

                            if (!acceptedFileFormats.includes(uploadFile.type)){
                                setErrorMsg("File type must be one of .doc, .docx, .txt, .rtf, .pdf")
                            } else if (uploadFile.size > maxSize){
                                setErrorMsg("File is larger than 5242880 bytes")
                            } else{
                                setFileInForm(uploadFile, onChange)
                            }
                            
                        }}/>     
                )}
            />
            
            {/* Reason for using ternary is that there is no reset function in File Uploader Thus,
            need to re-render it when user removes the talking point */}
            <Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
                <FormInput labelText="Attachments" labelId="talkingPointsLabel">
                {talkingPoint ?
                    (
                    // 1.7   The system displays a Talking Points "card" after a successful upload with the file name displayed on the card.
                    // 1.7.1 The user can see the following fields on the Talking Point card
                    //       •  Hyperlinked Talking Points file name
                    //       •  [Remove]
                    // 1.7.2 The user can click on the hyperlinked Talking Points filename to download the file and view the content.
                    // 1.7.3 The system displays the Upload File Area/Default Talking Points after the user removes the uploaded Talking Points
                    <Box mt={8}>
                        <Card id={`talkingPointItem`} >
                            <Flex 
                                w="full" 
                                my={{ base: "-8px", sm: "-12px" }} 
                                flexDir={{ base: "row" }}>
                                <Flex flexGrow={1} justifyContent="flex-start">
                                    <Link 
                                        href={`${talkingPoint.fileDataURL}`} 
                                        download={talkingPoint.fileName}>
                                        {talkingPoint.fileName}
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
                                        onRemoveModalOpen()} 
                                    }>
                                        Remove
                                    </Link>
                                    <DeleteTalkingPointModal
                                        isOpen={removeModalOpen}
                                        onCancel={onRemoveModalClose}
                                        onConfirm={() => {
                                            setTalkingPoint(null)
                                            setValue("talkingPoints", {})
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
                                            label={`Additional actions for ${talkingPoint.fileName}`}>
                                            <Box as={MoreVertSharp} color="clickable" />
                                        </Dropdown>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Card>
                        { errorMsg !== '' && <P color="error">{errorMsg}</P>}
                    </Box>
                    ) :
                    // 1.3 (Drop function) The user can drag a file from user’s local desktop and drop it into the [Drop/Browse] area to upload the file
                    // 1.4 (Browse Function) The user can click [Drop/Browse] area to launch an interface (e.g. File Explorer) which allows the user to identify the proper document to be uploaded.
                    // 1.5 The system displays appropriate error message when the selected file is in the unacceptable format.
                    //     · Valid file formats are - .doc, docx, .txt, .rtf, .pdf
                    <Controller
                        name="talkingPoints"
                        render={({onChange}) => (
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
                        )}
                    />
                }
                </FormInput>
            </Box>
            
            
		</FormSection>
	)
}

export default TalkingPointDetails
