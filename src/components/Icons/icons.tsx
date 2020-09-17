import React from "react"
import { Box, BoxProps } from "@chakra-ui/core"

import EventLocationTabMap from "./eventLocationTabMap.inline.svg"

export const EventLocationTabMapIcon: React.FC<BoxProps> = p => (
	<Box {...p} as={EventLocationTabMap} aria-hidden="true" focusable={false} />
)
