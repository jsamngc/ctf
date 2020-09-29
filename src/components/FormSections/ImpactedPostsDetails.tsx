import React, { useRef, useState, useEffect } from "react"
import { useFormContext, Controller, useWatch } from "react-hook-form"
import { Box, Flex, Text, Grid, Image, useDisclosure, PseudoBox } from "@chakra-ui/core"
import { Delete } from "@material-ui/icons"
import { Link, P, FinePrint, Card, ValidationState} from "@c1ds/components"

import { FormSection, useCTFFormContext } from "../Forms/Form"

import { AddPostsModal } from "../Modals/AddPostsModal"
import ImpactedPostsSvg from "../../../static/impactedPosts.svg"

interface ImpactedPostsProps {
	impactedPosts?: PostDto[]
}

const ImpactedPostsDetails: React.FC<ImpactedPostsProps> = (p: ImpactedPostsProps) => {
	const { impactedPosts } = p
	const { errors, setValue } = useFormContext<EventFormData>()
	
	const { isOpen: isPostModalOpen, onOpen: onPostModalOpen, onClose: onPostModalClose } = useDisclosure()
	const [postList, setPostList] = useState<Array<PostDto>>(impactedPosts ?? [])
	const impactedPostsRef = useRef<HTMLDivElement>(null)

	const { isCreate } = useCTFFormContext()

	useEffect(() => {
		if(postList.length === 0) {
			setValue("impactedPosts", undefined)
		}
		else{
			postList.forEach((post : PostDto, index : number) => {
				setValue(`impactedPosts[${index}]`, post)
			})
		}
	}, [setValue, postList])

	return (
		<FormSection title="Impacted Posts" showDivider={isCreate}>
			<Box gridColumn={{ base: "1 / -1" }}>
				<P>
					<Text color="required" as="span">
						*&nbsp;
					</Text>
					Which Consular Posts are impacted by this event?&nbsp; For a list of posts,{" "}
					<Link href="http://fam.a.state.sbu/fam/02FAM/02FAM0460.html#M463" target="_blank" rel="noreferrer noopener">
						consult the FAM
					</Link>
					.
				</P>
			</Box>

			{postList.length > 0 ? (
				<Grid
					gridColumn={{ base: "1 / -1", lg: "span 9" }}
					templateRows={{ base: "1fr 1fr" }}
					rowGap={{ base: "16px", md: "24px" }}>
					{postList.map((post: PostDto, index: number) => {
						return (
							<Card id="ctfPost" maxWidth="full" key={`${post.postValue}-${post.countryValue}-${index}`}>
								<Controller 
									name={`impactedPosts[${index}]`} 
									defaultValue={post} 
								/>
								<Flex w="full" my={{ base: "-8px", sm: "-12px" }} flexDir={{ base: "row" }}>
									<Box flexGrow={1}>
										<Box pb={4}>
											<FinePrint color="label">{post.countryName}</FinePrint>
										</Box>
										<P>
											U.S. Embassy in {post.postLabel}, {post.countryValue}
										</P>
									</Box>
									<Box display={{ base: "none", md: "flex" }} alignItems="center">
										<Link
											onClick={e => {
												e.preventDefault()
												setPostList(currPostList => {
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
					<Link onClick={onPostModalOpen} rel="noreferrer noopener">
						Add Additional Posts
					</Link>
				</Grid>
			) : (
				
					<Controller 
						rules={{
							required: "Impacted Post is required"
						}}
						name={`impactedPosts`} 
						value={"x"}
						defaultValue={postList.length > 1 ? postList : undefined}
						onFocus={() => impactedPostsRef.current?.focus()}
						render={() => (
							<PseudoBox
								ref={impactedPostsRef}
								as="div"
								display="flex"
								position="relative"
								flexDir="column"
								cursor="pointer"
								tabIndex={0}
								alignItems="center"
								h={{ base: "240px", md: "280px" }}
								gridColumn={{ base: "1 / -1", lg: "span 9" }}
								_focus={errors && errors.impactedPosts ? {
									borderWidth: "2px",
									color: "error",
									outline: "solid",
								} : {
									borderWidth: "2px",
									color: "accent",
									outline: "solid",
								}}
								onClick={onPostModalOpen}>
									<Box position="absolute" left={0}>
										<P color="red">
											{errors?.impactedPosts?.message}
										</P> 
									</Box>
									<Image
										h={{ base: "172px", md: "212px" }}
										src={ImpactedPostsSvg}
										alt="Posts"
									/>
									<Box textAlign="center" width={{ base: "240px", md: "280px" }}>
										<P color="label">
											There are no posts associated with this event.&nbsp;
											<Link onClick={onPostModalOpen} rel="noreferrer noopener">
												Add Post
											</Link>
										</P>
									</Box>
							</PseudoBox>
							// <Flex
							// 	ref={impactedPostsRef}
							// 	h={{ base: "240px", md: "280px" }}
							// 	flexDir="column"
							// 	alignItems="center"
							// 	onFocus={{
							// 		border-Color :"clickable"
							// 	}}
							// 	gridColumn={{ base: "1 / -1", lg: "span 9" }}>
								
							// </Flex>
						)} 
					/>
					
					
			)}
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
