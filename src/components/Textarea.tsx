import React, { useState } from "react"
import { Textarea as ChakraTextarea, Box } from "@chakra-ui/core"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { RequiredField, ErrorMessage, ValidationState, FinePrint } from "@c1ds/components"

export enum TextareaSize {
	XS = "inputXs",
	SM = "inputSm",
	MD = "inputMd",
	LG = "inputLg",
	XL = "inputXl",
	XXL = "inputXxl",
	FULL = "full",
}

interface C1TextProps<T = HTMLTextAreaElement> {
	isRequired?: React.InputHTMLAttributes<T>["required"]
	isDisabled?: boolean
	validationState?: ValidationState
	id: string
	labelId: string
	size?: TextareaSize
	value?: string
	errorMessage?: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

type OmittedTypes = "size" | "disabled" | "required" | "checked" | "defaultChecked" | "readOnly" | "onChange"

type TextareaProps<T = HTMLTextAreaElement> = C1TextProps &
	RequiredField<T> &
	Omit<React.InputHTMLAttributes<T>, OmittedTypes> &
	React.RefAttributes<T>

export const Textarea = React.forwardRef<HTMLInputElement, TextareaProps>(function Textarea(p: TextareaProps, ref) {
	const { size = TextareaSize.FULL, labelId, onChange, validationState, errorMessage, ...textareaProps } = p
	const success = validationState === ValidationState.SUCCESS
	const error = validationState === ValidationState.ERROR

	const [curVal, setCurVal] = useState(textareaProps.value)
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurVal(event.target.value)
		onChange && onChange(event)
	}

	const charCountId = `${textareaProps.id}_charCount`

	let borderColor = "inputBorder"
	if (success) {
		borderColor = "success"
	} else if (error) {
		borderColor = "error"
	}

	return (
		<>
			<ChakraTextarea
				ref={ref}
				resize="none"
				onChange={handleChange}
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
				pl="12"
				pr="12"
				py="4"
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
			<CharCount id={charCountId} maxLength={textareaProps.maxLength} value={curVal} />
			{!textareaProps.isDisabled && error && errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	)
})

interface CharCountProps {
	id: string
	maxLength: number
	value: string
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
