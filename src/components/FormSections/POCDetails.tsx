import React, { useState } from "react"
import { FormSection } from "../Forms/Form"
import { Box } from "@chakra-ui/core"
import { P, Link } from "@c1ds/components"
import POCBox from "../POCBox"

const POCDetails: React.FC = () => {
	const [pocIndex, setPocIndex] = useState(1)
	const [pocBoxes, setPocBoxes] = useState(["personDto0"])

	return (
		<FormSection title="Point Of Contact" showDivider={false}>
			<Box gridColumn="1 / -1">
				<P>Enter a point of contact at this location.</P>
			</Box>
			{/* Display all pocBoxes available */}
			{pocBoxes.map((value: string) => {
				const personDtoIndex = value.charAt(value.length-1)
				return (
					// key : PocBox-{index} will use this for personId
					<Box key={value} gridColumn="1 / 9">
						<POCBox 
							personDtoIndex={+personDtoIndex}
							onRemove={()=>{
								setPocBoxes(pocBoxes.filter(boxName => boxName !== value))
							}} 
						/>
					</Box>
				)
			})}
			{/* This link adds more pocBoxes */}
			<Box gridColumn="1 / -1">
				<Link
					onClick={() => {
						setPocBoxes((currPocBoxes) => {
							return [...currPocBoxes, `personDto${pocIndex}`]
						})
						setPocIndex(pocIndex+1)
					}}>
					Add Another Point of Contact
				</Link>
			</Box>
		</FormSection>
	)
}

export default POCDetails
