import React, { useCallback }from "react"
import Layout, { LayoutProps } from "../../components/Layout"
import { navigate } from "gatsby"
import { FormProvider, useForm } from "react-hook-form"
import { Button, LinkButton } from "@c1ds/components"
import { Box, Grid, useDisclosure } from "@chakra-ui/core"
import { Form, useCTFFormContext } from "./Form"
import LocationDetails from "../FormSections/LocationDetails"
import POCDetails from "../FormSections/POCDetails"
import { DataLossModal } from "../Modals/DataLossModal"
import { EventPageState } from "../../pages/event"

interface LKLFormProps {
	eventId: string
	savedForm?: LklDto
}

const LKLForm: React.FC<LKLFormProps> = (p: LKLFormProps) => {
	const { eventId, savedForm } = p
	// const { isCreate, isEdit } = useCTFFormContext()
	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()

	const defaultValues = {
		activeIndicator: true,
	}
	
	const formMethods = useForm<LklDto>({
		mode: "onBlur",
		defaultValues: defaultValues,
	})
	const { register, handleSubmit, getValues } = formMethods

	const breadcrumbs: LayoutProps["breadcrumbs"] = [
		{ label: "Event", onClick: onDataLossOpen },
		{ label: "Add Location" },
		{ label: "New Location" },
	]

	const onSubmit = useCallback(
		(data, skipNavigate = false) => {
			// console.log(data)
		},
		[]
	)

	return (
		<Layout
			pageTitle="Location Details"
			pageHeading="New Location"
			pageDescription="Provide as much information as you have for the new location."
			breadcrumbs={breadcrumbs}>
			<FormProvider {...formMethods}>
				<Form id="LKLForm"
					onSubmit={handleSubmit(data => {
						onSubmit(data, false)
					})}>
					<LocationDetails />
					<POCDetails />
					<Grid
						as="nav"
						aria-label="page"
						id="pageNav"
						gridColumn="1 / -1"
						alignSelf="center"
						gridGap={{ base: "16px", md: "24px" }}
						marginTop={{ md: "72" }}
						size="full"
						gridTemplateColumns={{ base: "1", md: "repeat(14, 1fr)", lg: "repeat(12, 1fr)" }}>
						<Box gridColumn={{ base: "1 / -1", md: "10 / 15", lg: "10 / 13" }} gridRow={{ md: "1" }}>
							<Button
								type="submit"
								size="full"
								>
								Create New Location
							</Button>
						</Box>
						<Box gridColumn={{ base: "1 / -1", md: "5 / 10", lg: "7 / 10" }} gridRow={{ md: "1" }}>
							<Button size="full" buttonType="secondary" type="button" onClick={() => navigate("/")}>
								Create and Add Another
							</Button>
						</Box>
						<Box gridColumn={{ base: "1 / -1", md: "1 / 2" }} gridRow={{ md: "1" }} justifySelf="center">
							<LinkButton type="button" onClick={onDataLossOpen}>
								Cancel
							</LinkButton>
						</Box>
					</Grid>

					<DataLossModal
						isOpen={isDataLossOpen}
						onClose={onDataLossClose}
						onLeave={() => {
							const pageState: EventPageState = {
								// TODO: Uncomment once form integration is established
								// eventId: getValues("eventId"),
								eventId: eventId,
								formSection: "locations",
							}
							navigate("/event", { state: pageState })
						}}
					/>
				</Form>
			</FormProvider>
		</Layout>
	)
}

export default LKLForm
