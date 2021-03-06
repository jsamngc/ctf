import React, { useState, useEffect, useRef } from "react"
import { Box, BoxProps, PseudoBox, PseudoBoxProps, Flex, List, ListItem, useTheme } from "@chakra-ui/core"
import { motion } from "framer-motion"

type OmittedBoxProps = "transition" | "style" | "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"

const MotionBox = motion.custom<Omit<BoxProps, OmittedBoxProps>>(Box)
const MotionPseudoBox = motion.custom<Omit<PseudoBoxProps, OmittedBoxProps>>(PseudoBox)

export type OptionType = "primary" | "error"

export type DropdownClick = (value: string, label: string) => void

export interface DropdownOptions {
	label: string
	value: string
	type?: OptionType
	onClick?: DropdownClick
}

type DropdownProps = {
	children: React.ReactElement
	/**
	 * Show borders between dropdown items
	 */
	borderedRows?: boolean
	width?: BoxProps["width"]
	options: DropdownOptions[]
	/**
	 * Label for dropdown toggle/menu button
	 */
	label: string
	menuProps?: Omit<PseudoBoxProps, OmittedBoxProps>
	/**
	 * Highlights currently selected option
	 * when dropdown is opened
	 */
	showSelected?: boolean
	/**
	 * Initially selected option
	 * that will be highlighted
	 *
	 * (see `showSelected` property)
	 */
	initialSelection?: string
}

const Dropdown: React.FC<DropdownProps> = (p: DropdownProps) => {
	const [isOpen, setOpen] = useState(false)
	const { children, borderedRows, width = "buttonMd", options = [], label, menuProps, showSelected, initialSelection } = p
	const theme = useTheme()
	const dropdownRef = useRef<HTMLDivElement>(null)
	const [selectedVal, setSelectedVal] = useState<string | undefined>(initialSelection)

	/**
	 * Auto-close dropdown if user clicks outside it
	 */
	useEffect(() => {
		const closeDropdown = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener("click", closeDropdown)

		return () => {
			document.removeEventListener("click", closeDropdown)
		}
	}, [setOpen, dropdownRef])

	const menuMotion = {
		hidden: {
			transform: "translateY(-100%)",
			transition: {
				type: "tween",
				duration: options.length > 3 ? 0.5 : 0.25,
				ease: "easeInOut",
			},
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
			zIndex: -1,
			transition: {
				when: "afterChildren",
			},
		},
		visible: {
			display: "block",
			zIndex: 1,
			transition: {
				when: "beforeChildren",
			},
		},
	}

	const listItemProps: PseudoBoxProps = {
		display: "flex",
		alignItems: "center",
		boxSizing: "border-box",
		height: "option",
		paddingX: "12",
		paddingY: "4",
		cursor: "pointer",
	}

	if (borderedRows) {
		listItemProps._notLast = {
			borderBottom: "px",
			borderColor: "disabledDark",
		}
	}

	const handleClick = () => {
		setOpen(!isOpen)
	}

	return (
		<Box position="relative" ref={dropdownRef}>
			<Flex display="inline-flex" align="center">
				<PseudoBox
					as="button"
					display="inline-flex"
					alignItems="flex-end"
					textAlign="center"
					border="none"
					borderRadius={0}
					background="none"
					p={0}
					fontFamily="body"
					fontSize="button"
					color="clickable"
					//@ts-ignore
					type="button"
					_focus={{
						// @ts-ignore
						outline: `1px solid ${theme.colors.accent}`,
					}}
					_hover={{
						// @ts-ignore
						outline: `1px solid ${theme.colors.accent}`,
					}}
					onClick={handleClick}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					aria-label={label}>
					<Box display="inline-flex" flex="1 1 0" lineHeight="linkButton">
						{children}
					</Box>
				</PseudoBox>
			</Flex>

			<MotionBox
				right={0}
				{...menuProps}
				position="absolute"
				width={width}
				overflowY="hidden"
				variants={menuContainerMotion}
				initial={false}
				animate={isOpen ? "visible" : "hidden"}>
				<MotionPseudoBox
					as={List}
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
					border="px"
					borderColor="inputBorder"
					boxShadow={isOpen ? "0px 4px 6px rgba(0,0,0,0.4)" : ""}
					boxSizing="border-box"
					variants={menuMotion}>
					{options.map((option: DropdownOptions, index) => {
						const { onClick, value, label, type: type = "primary" } = option
						const isSelected = showSelected && value === selectedVal
						const hoverBg = type === "primary" ? "clickable" : "error"
						const hoverColor = "white"

						const colorProps: PseudoBoxProps = {
							color: isSelected ? hoverColor : type === "primary" ? "text" : "error",
							backgroundColor: isSelected ? hoverBg : undefined,
							_hover: {
								color: hoverColor,
								backgroundColor: hoverBg,
							},
						}

						return (
							<PseudoBox
								as={ListItem}
								key={index}
								{...listItemProps}
								{...colorProps}
								onClick={() => {
									onClick && onClick(value, label)
									setSelectedVal(value)
									setOpen(!isOpen)
								}}>
								{label}
							</PseudoBox>
						)
					})}
				</MotionPseudoBox>
			</MotionBox>
		</Box>
	)
}

export default Dropdown
