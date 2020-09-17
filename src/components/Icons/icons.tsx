import React from "react"
import { Box, BoxProps } from "@chakra-ui/core"

import EventLocationTabMap from "./eventLocationTabMap.inline.svg"
import SearchLocationMap from "./searchLocationMap.inline.svg"
import SearchLocationMapCompass from "./searchLocationMapCompass.inline.svg"

export const EventLocationTabMapIcon: React.FC<BoxProps> = p => (
	<Box
		{...p}
		as={EventLocationTabMap}
		aria-hidden="true"
		// @ts-ignore
		focusable={false}
	/>
)

export const SearchLocationMapIcon: React.FC<BoxProps> = p => (
	<Box
		{...p}
		as={SearchLocationMap}
		aria-hidden="true"
		// @ts-ignore
		focusable={false}
	/>
)

export const SearchLocationMapCompassIcon: React.FC<BoxProps> = p => (
	<Box
		{...p}
		as={SearchLocationMapCompass}
		aria-hidden="true"
		// @ts-ignore
		focusable={false}
	/>
)
