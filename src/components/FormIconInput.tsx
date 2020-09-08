import { FormControl, FormLabel, Text, Box } from "@chakra-ui/core"
import SvgIcon from "@material-ui/core/SvgIcon"
import * as React from "react"

type FormIconInputProps = {
	labelText: string
	labelId: string
	required?: boolean
	disabled?: boolean
    children: React.ReactElement<React.InputHTMLAttributes<HTMLElement>>
    icon?: typeof SvgIcon
}

export const FormIconInput: React.FC<FormIconInputProps> = (p: FormIconInputProps) => {
	const { labelText, labelId, children, required, icon, ...input } = p

	return (
		<FormControl>
			<FormLabel
				id={labelId}
				fontFamily="body"
				fontSize="label"
				fontWeight="normal"
				pb={0}
				color="label"
				display="block"
				lineHeight="label">
				{required && (
					<Text color="required" as="span">
						*&nbsp;
					</Text>
				)}
                {icon && <Box position="absolute" as={icon} mr={4} color="label" />}
				<Text m={0} ml={28}>{labelText}</Text>
			</FormLabel>
			{React.cloneElement(children, {
				required,
				"aria-labelledby": `${labelId} ${children.props["aria-labelledby"] ?? ""}`.trim(),
				...input,
			})}
		</FormControl>
	)
}
