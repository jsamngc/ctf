import React, { useState } from "react"
import PropTypes from "prop-types"
import { Box, PseudoBox, List, ListItem } from "@chakra-ui/core"
import { motion } from "framer-motion"

const MotionBox = motion.custom(Box)
const MotionPseudoBox = motion.custom(PseudoBox)

const Dropdown = ({ children, options = [] }) => {
	const [isOpen, setOpen] = useState(false)
	const childrenArray = children ? children : <div></div>
	const menuMotion = {
		hidden: {
			transform: "translateY(-100%)",
			transition: {
				type: "tween",
				duration: options.length > 3 ? 0.5 : 0.25,
				ease: "easeInOut",
			},
		},
		initVisible: {
			transform: "translateY(-100%)",
			display: "block",
		},
		visible: {
			transform: "translateY(0%)",
			transition: {
				type: "tween",
				duration: options.length > 3 ? 0.5 : 0.25,
				ease: "easeInOut",
			},
		},
	}

	const menuContainerMotion = {
		hidden: {
			display: "none",
			transition: {
				when: "afterChildren",
			},
		},
		visible: {
			display: "block",
			transition: {
				when: "beforeChildren",
			},
		},
	}

	const handleClick = () => {
		setOpen(!isOpen)
	}

	return (
		<>
			{React.cloneElement(childrenArray, { onClick: handleClick })}
			<MotionBox
				position="absolute"
				zIndex={isOpen ? 1 : -1}
				width="162px"
				overflowY="hidden"
				variants={menuContainerMotion}
				initial={false}
				
				border="1px"
				
				borderColor="inputBorder"
				boxShadow={isOpen ? "0px 4px 6px rgba(0,0,0,0.4)" : ""}
				animate={isOpen ? "visible" : "hidden"}>
				{options.map((option, index) => {
					return (
						<MotionPseudoBox
							as={List}
							key={index}
							role="listbox"
							tabIndex={-1}
							p={0}
							m={0}
							_focus={{
								outline: "none",
							}}
							backgroundColor="white"
							fontFamily="default"
							fontSize="base"
							boxSizing="border-box"
							variants={menuMotion}
							_hover={{
								color: "white",
								backgroundColor:"clickable"
							}}
						>
							<ListItem
								display="flex"
								alignItems="center"
								boxSizing="border-box"
								height="option"
								paddingX="12"
								paddingY="4"
								cursor="pointer"
								onClick={() => {
									option.onClick(option.value, option.label)
									setOpen(!isOpen)
								}}
								backgroundColor={""}
								color={option.color ?? "text"}
								_hover={{color: "white"}}>
								{option.label}
							</ListItem>
						</MotionPseudoBox>
					)
				})}
			</MotionBox>
		</>
	)
}

Dropdown.propTypes = {
	children: PropTypes.node.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			color: PropTypes.string,
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			onClick: PropTypes.func,
		})
	).isRequired,
}

export default Dropdown
