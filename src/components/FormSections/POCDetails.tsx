import React, { useState } from "react"
import { FormSection } from "../Forms/Form"
import { Box } from "@chakra-ui/core"
import { P, Link } from "@c1ds/components"
import { useCTFFormContext } from "../Forms/Form"
import POCBox from "../POCBox"

interface POCDetailsProps {
	pocList? : POC[]
}

const POCDetails: React.FC<POCDetailsProps> = (p : POCDetailsProps) => {
	const { pocList } = p
	const { isView } = useCTFFormContext()
	const [pocIndex, setPocIndex] = useState(pocList ? (pocList.length === 0 ? 1 : pocList.length) : 1)
	// pocBoxes = [ 'poc0', 'poc1', ,,, 'pocN']
	const [pocBoxes, setPocBoxes] = useState(() => pocList ? (pocList.length > 0 ? pocList.map((_,index) => {
		return 'poc' + index
	}) : ['poc0']) : ['poc0'])

	return (
		<FormSection title="Point Of Contact" showDivider={false}>
			<Box gridColumn="1 / -1">
				<P>Enter a point of contact at this location.</P>
			</Box>
			{/* Display all pocBoxes available */}
			{pocBoxes.map((value: string) => {
				const pocIndex = value.charAt(value.length-1)
				const isEmailListEmpty = pocList && pocList[+pocIndex] && pocList[+pocIndex].emailList.length === 0
				const isPhoneListEmpty = pocList && pocList[+pocIndex] && pocList[+pocIndex].phoneList.length === 0
				return (
					// key : PocBox-{index}, index will be used in POCBox component
					<Box key={value} gridColumn={{ base: "1 / -1", md: "1 / 7", lg: "1 / 9" }}>
						<POCBox 
							pocIndex={+pocIndex}
							initialEmailList={pocList && pocList[+pocIndex] && !isEmailListEmpty ? pocList[+pocIndex].emailList : []}
							initialPhoneList={pocList && pocList[+pocIndex] && !isPhoneListEmpty ? pocList[+pocIndex].phoneList : []}
							onRemove={()=>{
								setPocBoxes(pocBoxes.filter(boxName => boxName !== value))
							}} 
						/>
					</Box>
				)
			})}
			{/* This link adds more pocBoxes */}
			{
				!isView &&
				<Box gridColumn="1 / -1">
					<Link
						onClick={() => {
							setPocBoxes((currPocBoxes) => {
								return [...currPocBoxes, `poc${pocIndex}`]
							})
							setPocIndex(pocIndex+1)
						}}>
						Add Another Point of Contact
					</Link>
				</Box>
			}
			
		</FormSection>
	)
}

export default POCDetails
