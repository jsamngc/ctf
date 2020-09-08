import React, { useRef, useState } from "react"
import { useFormContext, Controller, useWatch } from "react-hook-form"
import { Box, Flex, Text, Grid, Image, useDisclosure, VisuallyHidden } from "@chakra-ui/core"
import { Delete } from '@material-ui/icons';
import { Link, P, FinePrint, Card } from "@c1ds/components"

import { FormSection, useCTFFormContext } from "../Forms/Form"

import {AddPostsModal} from '../Modals/AddPostsModal'
import ImpactedPostsSvg from '../../../static/impactedPosts.svg'

interface ImpactedPostsProps {
    impactedPosts? : PostDto[]
}

const ImpactedPostsDetails : React.FC<ImpactedPostsProps> = (p : ImpactedPostsProps) => {
    const { impactedPosts } = p
    const { register } = useFormContext<EventFormData>()
    const { isOpen: isPostModalOpen, onOpen: onPostModalOpen, onClose: onPostModalClose } = useDisclosure()
    const [postList, setPostList] = useState<Array<PostDto>>(impactedPosts ?? [])

    const { isCreate } = useCTFFormContext()

    return (
        <FormSection title="Impacted Posts" showDivider={isCreate}>
     
            <Box gridColumn={{ base: "1 / -1"}}>
                <P>
                    <Text color="required" as="span">
                        *&nbsp;
                    </Text>
                    Which Consular Posts are impacted by this event?&nbsp; For a list of posts,{" "}
                    <Link
                        href="http://fam.a.state.sbu/fam/02FAM/02FAM0460.html#M463"
                        target="_blank"
                        rel="noreferrer noopener">
                        consult the FAM
                    </Link>
                    .
                </P>
            </Box>
           
            {postList.length > 0 ? 
                <Grid
                    gridColumn={{ base: "1 / -1", lg: "span 9"}}
                    templateRows={{ base: "1fr 1fr"}}
                    rowGap={{ base: "16px", md: "24px" }}>
                    {postList.map((post : PostDto, index : number) => {
                        return (
                            
                            <Card id="ctfPost" maxWidth="full" key={`${post.postValue}-${post.countryValue}-${index}`}>
                                <Controller
                                    ref={register}
                                    name={`impactedPosts[${index}]`}
                                    defaultValue={post}
                                />
                                <Flex w="full" my={{ base: "-8px", sm: "-12px" }} flexDir={{ base: "row" }}>
                                    <Box flexGrow={1}>
                                        <Box pb={4}>
                                            <FinePrint color="label">{post.countryName}</FinePrint>
                                        </Box>
                                        <P>U.S. Embassy in {post.postLabel}, {post.countryValue}</P>
                                    </Box>
                                    <Box display={{ base: "none", md: "flex" }} alignItems="center">
                                        <Link
                                            onClick={e => {
                                                e.preventDefault()
                                                setPostList((currPostList) => {
                                                    return [...currPostList.slice(0, index), ...currPostList.slice(index + 1)]
                                                })
                                            }}>
                                            Remove
                                        </Link>
                                    </Box>
                                    <Flex display={{ base: "flex", md: "none" }} alignItems="center">
                                        <Box as={Delete} right={{ base: "-12px" }} color="clickable" />
                                    </Flex>
                                </Flex>
                            </Card>
                        )
                    })}
                    <Link
                        onClick={onPostModalOpen}
                        rel="noreferrer noopener">
                        Add Additional Posts
                    </Link>
                </Grid>
            :
                <Flex 
                    h={{base : '240px', md: '280px'}} 
                    flexDir="column"
                    alignItems="center"
                    gridColumn={{ base: "1 / -1", lg: "span 9"}}>
                        <Image
                            h={{base : '172px', md: '212px'}} 
                            src={ImpactedPostsSvg} 
                            cursor="pointer"
                            alt="Posts"
                            onClick={onPostModalOpen}
                            />
                        <Box textAlign="center" width={{base : '240px', md: '280px'}} >
                            <P color="label">
                                There are no posts associated with this event.&nbsp;
                                <Link
                                    onClick={onPostModalOpen}
                                    rel="noreferrer noopener">
                                    Add Post
                                </Link>
                            </P>
                        </Box>
                </Flex>
            }
            <AddPostsModal
                key={postList.length}
                posts={postList}
                isOpen={isPostModalOpen}
                onClose={onPostModalClose}
                onSetPosts={setPostList}
            />
		</FormSection>
    )
}

export default ImpactedPostsDetails
