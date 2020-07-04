import { PseudoBox, useColorMode, Box } from "@chakra-ui/core"
import * as React from "react"
import { PseudoBoxProps } from "@chakra-ui/core/dist"

interface ButtonProps {
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
	isDisabled?: boolean
	children: React.ReactNode
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

interface ButtonStyle {
	light: {
		default: PseudoBoxProps
		hoverFocus: PseudoBoxProps
		disabled: PseudoBoxProps
	}
	dark: {
		default: PseudoBoxProps
		hoverFocus: PseudoBoxProps
		disabled: PseudoBoxProps
	}
}

const buttonStyle: ButtonStyle = {
	light: {
		default: {
			color: "clickable",
			border: "none",
		},
		hoverFocus: {
			textDecor: "underline",
			outline: "none",
		},
		disabled: {
			color: "disabledButtonText",
			border: "none",
		},
	},
	dark: {
		default: {
			color: "white",
			border: "none",
		},
		hoverFocus: {
			textDecor: "underline",
			outline: "none",
		},
		disabled: {
			color: "inputBorder",
			border: "none",
		},
	},
}

export const LinkButton: React.FC<ButtonProps> = (p: ButtonProps) => {
	const { colorMode } = useColorMode()

	return (
		//@ts-ignore
		<PseudoBox
			as="button"
			textAlign="center"
			border="none"
			borderRadius={0}
			background="none"
			fontFamily="body"
			fontSize="button"
			pl="20"
			pr="20"
			py="12"
			{...buttonStyle[colorMode]["default"]}
			//@ts-ignore
			isDisabled={p.isDisabled}
			_focus={buttonStyle[colorMode].hoverFocus}
			_hover={buttonStyle[colorMode].hoverFocus}
			_disabled={buttonStyle[colorMode].disabled}
			onClick={p.onClick}
			type={p.type}>
			<Box flex="1 1 0" lineHeight="normal">
				{p.children}
			</Box>
		</PseudoBox>
	)
}
