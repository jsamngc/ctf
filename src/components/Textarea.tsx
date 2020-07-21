import React from "react"
import { Textarea as ChakraTextarea, Box } from "@chakra-ui/core"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { ErrorMessage, ValidationState, FinePrint } from "@c1ds/components"

export enum TextareaSize {
	XS = "inputXs",
	SM = "inputSm",
	MD = "inputMd",
	LG = "inputLg",
	XL = "inputXl",
	XXL = "inputXxl",
	FULL = "full",
}

interface C1TextProps {
	validationState?: ValidationState
	id: string
	labelId: string
	size?: TextareaSize
	value?: string
	errorMessage?: string
}

type OmittedTypes = "cols" | "rows" | "readOnly" | "value"

type TextareaProps<T = HTMLTextAreaElement> = C1TextProps &
	Omit<React.TextareaHTMLAttributes<T>, OmittedTypes> &
	React.RefAttributes<T>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(p: TextareaProps, ref) {
	const { size = TextareaSize.FULL, labelId, validationState, errorMessage, disabled, required, ...textareaProps } = p
	const success = validationState === ValidationState.SUCCESS
	const error = validationState === ValidationState.ERROR

	const charCountId = `${textareaProps.id}_charCount`

	let borderColor = "inputBorder"
	if (success) {
		borderColor = "success"
	} else if (error) {
		borderColor = "error"
	}

	return (
		<>
			{/* @ts-ignore */}
			<ChakraTextarea
				ref={ref}
				resize="none"
				aria-labelledby={labelId}
				aria-describedby={charCountId}
				color="text"
				display="inline-block"
				fontFamily="body"
				fontSize="base"
				borderStyle="solid"
				border={success || error ? 2 : 1}
				borderColor={borderColor}
				boxSizing="border-box"
				height="textarea"
				width={size}
				mt="8"
				p="12"
				isDisabled={disabled}
				isRequired={required}
				outline="none"
				_disabled={{
					color: "disabledButtonText",
					bg: "disabledBackground",
					borderColor: "disabledBorder",
				}}
				_focus={{
					borderWidth: "2px",
					borderColor: "accent",
				}}
				{...textareaProps}
			/>
			<CharCount id={charCountId} maxLength={textareaProps.maxLength} value={textareaProps.value} />
			{!disabled && error && errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	)
})

interface CharCountProps {
	id: string
	maxLength?: number
	value?: string
}

const CharCount = (p: CharCountProps) => {
	const { id, maxLength, value } = p
	const formatter = new Intl.NumberFormat("en-US")
	const length = formatter.format(value?.length ?? 0)

	return (
		<>
			{maxLength && (
				<Box textAlign="right">
					<FinePrint id={id}>{`${length} / ${formatter.format(maxLength)}`}</FinePrint>
				</Box>
			)}
		</>
	)
}
