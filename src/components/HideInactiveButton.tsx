import React from "react"
import { Checkbox } from "@c1ds/components"
type HideInactiveProp = {
	onToggleHideInactive: () => void
}
/**
 * Hide Inactive button component which hide all events with inactive status.
 */
const HideInactiveButton: React.FC<HideInactiveProp> = ({ onToggleHideInactive }: HideInactiveProp) => (
	<Checkbox id="hideInactive" aria-label="Hide inactive" value="Hide Inactive" defaultChecked onChange={onToggleHideInactive} />
)

export default HideInactiveButton
