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

type TextProps<T = HTMLTextAreaElement> = C1TextProps &
	RequiredField<T> &
	Omit<React.InputHTMLAttributes<T>, OmittedTypes> &
	React.RefAttributes<T>

export const Textarea: React.FC<TextProps> = (p: TextProps) => {
	const { size = TextareaSize.FULL, isRequired = false } = p
	const success = p.validationState === ValidationState.SUCCESS
	const error = p.validationState === ValidationState.ERROR

	const [curVal, setCurVal] = useState(p.value)
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurVal(event.target.value)
		p.onChange && p.onChange(event)
	}

	const charCountId = `${p.id}_charCount`

	let borderColor = "inputBorder"
	if (success) {
		borderColor = "success"
	} else if (error) {
		borderColor = "error"
	}

	return (
		<>
			<ChakraTextarea
				resize="none"
				id={p.id}
				onChange={handleChange}
				value={p.value}
				isRequired={isRequired}
				aria-labelledby={p.labelId}
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
				isDisabled={p.isDisabled}
				_disabled={{
					color: "disabledButtonText",
					bg: "disabledBackground",
					borderColor: "disabledBorder",
				}}
				_focus={{
					borderWidth: "2px",
					borderColor: "accent",
				}}
			/>
			<CharCount id={charCountId} maxLength={p.maxLength} value={curVal} />
			{!p.isDisabled && error && p.errorMessage && <ErrorMessage message={p.errorMessage} />}
		</>
	)
}

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
