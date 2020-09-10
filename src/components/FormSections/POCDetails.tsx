import React, { useState } from "react"
import { FormSection } from "../Forms/Form"
import { Box } from "@chakra-ui/core"
import { P, Link } from "@c1ds/components"
import POCBox from "../POCBox"

const POCDetails: React.FC = () => {
	// Couldn't figure out what values to use to identify each pocBox.
	// Feel free to change it to whatever you want
	const [pocBoxes, setPocBoxes] = useState(["PocBox"])

	return (
		<FormSection title="Point Of Contact" showDivider={false}>
			<Box gridColumn="1 / -1">
				<P>Enter a point of contact at this location.</P>
			</Box>
			{/* Display all pocBoxes available */}
			{pocBoxes.map((value: string, index: number) => {
				return (
					<Box key={`${value}${index}`} gridColumn="1 / 9">
						<POCBox pocBoxes={pocBoxes} id={`${value}-${index}`} setPocBoxes={setPocBoxes}></POCBox>
					</Box>
				)
			})}
			{/* This link adds more pocBoxes */}
			<Box gridColumn="1 / -1">
				<Link
					onClick={() => {
						setPocBoxes((currPocBoxes) => {
							return [...currPocBoxes, "PocBox"]
						})
					}}>
					Add Another Point of Contact
				</Link>
			</Box>
		</FormSection>
	)
}

export default POCDetails
