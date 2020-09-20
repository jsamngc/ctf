import React from "react"
import { motion } from "framer-motion"

import {
	Text,
	Box,
	BoxProps,
	PseudoBoxProps,
	useToast,
	ThemeProvider,
	ColorModeProvider,
	useTheme,
	Button as ChakraButton,
} from "@chakra-ui/core"

import { LinkButton } from "@c1ds/components"

interface SnackbarProps {
	children: React.ReactNode
	buttonText?: string
	buttonType?: "link" | "button"
	action?: () => void
	/**
	 * Snackbar's background color
	 */
	color?: string
}

const NotificationProps: BoxProps = {
	color: "white",
	display: "flex",
	alignItems: "center",
	w: "100vw",
	fontFamily: "default",
	fontSize: "base",
	fontWeight: "normal",
	boxShadow: "0 1px 4px 0 rgba(0,0,0,0.3)",
	boxSizing: "border-box",
	verticalAlign: "center",
}

const snackbarProps: BoxProps = {
	...NotificationProps,
	bg: "snackbar",
	padding: "16",
}

const snackbarVariants = {
	hidden: {
		opacity: 0,
		display: "flex",
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
		display: "flex",
	},
}

interface ButtonStyle {
	default: PseudoBoxProps
	hoverFocus: PseudoBoxProps
	active: PseudoBoxProps
	disabled: PseudoBoxProps
}

const buttonStyle: ButtonStyle = {
	default: {
		bg: "white",
		color: "clickable",
		border: "none",
	},
	hoverFocus: {
		color: "secondary",
		borderStyle: "solid",
		borderWidth: "2",
		borderColor: "accent",
	},
	active: {
		color: "primary",
		bg: "buttonDarkBackground",
		borderColor: "none",
	},
	disabled: {
		bg: "disabledBackground",
		color: "disabledButtonText",
		border: "none",
	},
}

export const Snackbar: React.FC<SnackbarProps> = (p: SnackbarProps) => {
	const { action, children, color, buttonType: actionButtonType = "link" } = p

	snackbarProps.bg = color ?? snackbarProps.bg

	return (
		<motion.div variants={snackbarVariants} initial="hidden" animate="visible">
			<Box {...snackbarProps}>
				<Box padding="0" marginRight="8" flexGrow={1} textAlign="left" color="white">
					<Text wordBreak="break-word" margin="0">
						{children}
					</Text>
				</Box>

				{action && (
					<ColorModeProvider value="dark">
						{actionButtonType === "link" ? (
							<LinkButton onClick={p.action}>{p.buttonText}</LinkButton>
						) : (
							//@ts-ignore
							<ChakraButton
								height="2rem"
								width="74px"
								textAlign="center"
								borderRadius={0}
								fontFamily="body"
								fontSize="button"
								fontWeight="button"
								pl={20}
								pr={20}
								py={4}
								{...buttonStyle["default"]}
								_focus={buttonStyle.hoverFocus}
								_hover={buttonStyle.hoverFocus}
								_active={buttonStyle.active}
								_disabled={buttonStyle.disabled}
								onClick={p.action}>
								<Box flex="1 1 0" lineHeight="normal">
									{p.buttonText}
								</Box>
							</ChakraButton>
						)}
					</ColorModeProvider>
				)}
			</Box>
		</motion.div>
	)
}

/**
 *
 * @param snackbar Snackbar component to display
 * @param duration Amount of time (in milliseconds) before auto-closing snackbar (defaults to 8 seconds). Set to null to prevent auto-close
 * @returns Function that will display snackbar when called
 */
export const useSnackbar: (snackbar: React.ReactElement<SnackbarProps>, duration?: number | null) => () => void = (
	b,
	duration = 8000
) => {
	const theme = useTheme()
	const toast = useToast()

	return () =>
		toast({
			position: "bottom",
			duration: duration,
			render: (p: { onClose: () => void; id: string }) => (
				<ThemeProvider theme={theme}>
					{b.props.action
						? React.cloneElement(b, {
								action: () => {
									b.props.action && b.props.action()
									p.onClose()
								},
						  })
						: b}
				</ThemeProvider>
			),
		})
}
