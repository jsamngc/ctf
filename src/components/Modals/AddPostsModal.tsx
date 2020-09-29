import React, {useState, useRef, useMemo} from "react"
import { H4, P, Button, Select, FormInput, Checkbox,
	Modal, ModalFooter, ModalHeader, ModalCloseButton, LinkButton, } from "@c1ds/components"
import { Grid, Flex, Box } from "@chakra-ui/core"
import countries_json from "../../../content/countries.json"
import posts from "../../../content/posts.json"

interface AddPostsModalProps {
	posts: PostDto[]
	isOpen: boolean
	onClose(): void
	onSetPosts: (e: PostDto[]) => void
}

interface Post {
	value: string
	label: string
	country_cd: string
}

interface Country {
	value: string
	label: string
}

export const AddPostsModal: React.FC<AddPostsModalProps> = (p: AddPostsModalProps) => {
	const {isOpen, onClose, posts : selectedPosts, onSetPosts} = p

	const countries = useMemo(() => {
		const countriesList = countries_json.filter((_, index) => index % 5 === 0)
		countriesList.push({
			label: "UNITED STATES OF AMERICA",
			value: "USA",
		})
		countriesList.sort((countryA, countryB) => countryA.label.localeCompare(countryB.label))
		return countriesList
	}, [])

	const filterUnknowns = new Set<string>(selectedPosts.map((post : PostDto) => {
		return post.postValue === "Unknown" ? post.countryValue : ''
	}))

	const [selectedCountry, setCountry] = useState<Country>()
	const [postList, setPostList] = useState<Array<PostDto>>(selectedPosts)
	const [unknownPostList, setUnknownPostList] = useState<Set<string>>(filterUnknowns)

	const countryRef = useRef<HTMLButtonElement>(null)
	const checkboxRef = useRef<HTMLInputElement>(null)
	
	const addDisabled = postList.length === 0


	const filteredPosts = posts.filter(post => post.country_cd === selectedCountry?.value)
	if(selectedCountry && filteredPosts.length > 1){
		filteredPosts.unshift({
			value: 'Unknown',
			label: 'Unknown Location',
			country_cd: selectedCountry.value
		})
	}

	const onClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>, post : Post)=>{
		if (e.target.checked && selectedCountry) {
			// Add checked post
			setPostList(currList => {
				const postDto: PostDto = {
					countryValue: selectedCountry.value,
					countryName: selectedCountry.label,
					postLabel: post.label,
					postValue: post.value
				}
				return [...currList, postDto]
			})
		} else {
			// Remove unchecked post
			setPostList(currList => {
				return currList.filter((selectedPost : PostDto) => {
					return selectedPost.postValue !== post.value
				})
			})
		}
	}

	const onClickUnknownCheckbox = (e: React.ChangeEvent<HTMLInputElement>, post : Post)=>{
		// value: 'Unknown',
		// label: 'Unknown Location',
		// country_cd: selectedCountry.value

		if (e.target.checked && selectedCountry) {
			// Add unknown post country in the list
			setUnknownPostList(uknPostSet => {
				uknPostSet.add(post.country_cd)
				return uknPostSet
			})
			setPostList(currList => {
				const postDto: PostDto = {
					countryValue: selectedCountry.value,
					countryName: selectedCountry.label,
					postLabel: 'Unknown Location',
					postValue: 'Unknown'
				}
				return [...currList, postDto]
			})
		} else {
			// Remove unknown post country in the list
			setUnknownPostList(uknPostSet => {
				uknPostSet.forEach(country_cd => {
					if(country_cd === post.country_cd){
						uknPostSet.delete(country_cd)
					}
				})
				return uknPostSet
			})
			setPostList(currList => {
				return currList.filter((selectedPost : PostDto) => {
					return !(selectedPost.postValue === 'Unknown' && selectedPost.countryValue === post.country_cd)
				})
			})
		}
	}

	const onAddPosts= () => {
		// Extract any post which has same country_cd from unknownPostList
		const postListWithUnknown = postList.filter((post) => {
			// extract posts that have same country_cd except Unknown post
			return unknownPostList.has(post.countryValue) ? post.postValue === 'Unknown' : true
		})
		setCountry(undefined)
		onSetPosts(postListWithUnknown)
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="lg">
			<ModalHeader>
				<H4>Add Impacted Posts</H4>
			</ModalHeader>
			<ModalCloseButton />
			<Grid 
				gridColumn={{ base: "1 / -1"}}
				gridRowGap={16}>
				<FormInput labelText="Country" labelId="stateLabel" required>
					<Select
						ref={countryRef}
						id="country"
						name="country"
						aria-labelledby="countryLabel"
						options={countries}
						size="full"
						onChange={changes => {
							if(changes && changes.selectedItem)
								setCountry(changes.selectedItem)
						}}
						placeholder={selectedCountry ? selectedCountry.label : 'Select a country'}
						value={selectedCountry ? selectedCountry.label : 'Select a country'}
					/>
				</FormInput>
				<FormInput labelText="Post" labelId="stateLabel" required>
					<Grid
						p={12}
						h={320}
						borderColor="silver"
						borderWidth={1}
						borderStyle="solid"
						gridColumn={{ base: "1 / -1" }}
						templateRows={{ base: "repeat(6,1fr)"}}
						rowGap={{ base: "16px", md: "24px" }}
						overflow="auto">

						{(selectedCountry && selectedCountry.label) ?

							filteredPosts.length !== 0 ?
							// Filtered posts are posts that have same country code including unknown posts
							filteredPosts.map((post : Post, index) => {
								const unknownChecked = unknownPostList.has(selectedCountry.value)
								if(filteredPosts.length > 1 && index === 0){
									return (
										// If number of posts are more than 1 (1 < n) then this unknown post will be created
										<Checkbox 
											ref={checkboxRef}
											id="unknownPost" 
											key={`${post.value}-${post.country_cd}`}
											aria-label="post" 
											defaultChecked={unknownChecked}
											value={`Unknown Post in ${selectedCountry.label}`} 
											onChange={e => {onClickUnknownCheckbox(e, post)}} />
										)
								}
								else{
									// Check if posts were already selected before modal opens
									const isChecked = selectedPosts.some((selectedPost : PostDto) => selectedPost.postValue === post.value)
									return (
										<Checkbox 
											id="post" 
											key={`${post.value}-${post.country_cd}`}
											aria-label="post" 
											value={`U.S. Embassy in ${post.label}, ${selectedCountry.label}`} 
											defaultChecked={isChecked}
											disabled={unknownChecked}
											onChange={e => onClickCheckbox(e, post)} />
									)
								}
							})
							:
							<Flex gridRow="1/-1" justifyContent="center" alignItems="center">
								<Box w={200} textAlign="center">
									<P color="label">There are no consular posts in this country.</P>
								</Box>
							</Flex>
						:
						<Flex gridRow="1/-1" justifyContent="center" alignItems="center">
							<Box w={200} textAlign="center">
								<P color="label">Select a country to see a list of consular posts.</P>
							</Box>
						</Flex>
						}
					</Grid>
				</FormInput>
			</Grid>
	
			<ModalFooter>
				<Flex align="center">
					<Box marginRight="20">
						<LinkButton onClick={() => {
							setCountry(undefined)
							onClose()
						}}>Cancel</LinkButton>
					</Box>
					<Button size="sm"
						buttonType="primary"
						disabled={addDisabled}
						onClick={onAddPosts}>
						Add
					</Button>
				</Flex>
			</ModalFooter>
		</Modal>
	)
}

