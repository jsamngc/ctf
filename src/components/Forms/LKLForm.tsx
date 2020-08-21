import React from "react"
import Layout from "../../components/Layout"
import { navigate } from "gatsby"
import { FormProvider, useForm } from "react-hook-form"
import { Link, Button, LinkButton, H4 } from "@c1ds/components"
import { Box, Grid, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/core"
import { Form } from "./Form"
import LocationDetails from "../FormSections/LocationDetails"

export interface LKLFormData extends Record<string, boolean | string | number | LookupLklDto | undefined> {
	eventId: number
	eventLklId: number
	activeIndicator: boolean
	lklTypeCd: string
	createdDateTime: string
	lastUpdatedDateTime: string
	lookupLklDto: LookupLklDto
}

interface LookupLklDto {
	lookupLklId: number
	lklTitle: string
	locationDesc: string
	postCd: string
	countryCd: string
	lklAddressDto: LklAddressDto
}

interface LklAddressDto {
	lklAddressId: number
	addressDto: AddressDto
}

interface AddressDto {
	addressId: number
	addressTypeCd: string
	address1: string
	address2: string
	city: string
	countryCd: string
	postalCode: number
	stateCd: string
}

interface LKLFormProps {
	savedEvent?: LKLFormData
}

const LKLForm: React.FC<LKLFormProps> = (p: LKLFormProps) => {
	const defaultValues = {
		activeIndicator: true,
	}

	const formMethods = useForm<LKLFormData>({
		mode: "onBlur",
		defaultValues: defaultValues,
	})

	return (
		<>
			<Breadcrumb justifySelf="center" fontWeight="medium" fontSize="md" separator=">" spacing="8px">
				<BreadcrumbItem>
					<BreadcrumbLink href="/event"> Event </BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href="/event"> Location </BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink href="/addLKL"> New Location </BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<Layout
				pageTitle="New Location"
				pageHeading="New Location"
				pageDescription="Provide as much information as you have for the new location.">
				<FormProvider {...formMethods}>
					<Form id="LKLForm">
						<LocationDetails />

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
									onClick={(e: React.MouseEvent) => {
										e.preventDefault()
										window.scrollTo(0, 0)
									}}>
									Create New Location
								</Button>
							</Box>
							<Box gridColumn={{ base: "1 / -1", md: "5 / 10", lg: "7 / 10" }} gridRow={{ md: "1" }}>
								<Button size="full" buttonType="secondary" type="button" onClick={() => navigate("/")}>
									Create and Add Another
								</Button>
							</Box>
							<Box gridColumn={{ base: "1 / -1", md: "1 / 2" }} gridRow={{ md: "1" }} justifySelf="center">
								<LinkButton
									onClick={() => {
										navigate("/")
									}}>
									Cancel
								</LinkButton>
							</Box>
						</Grid>
					</Form>
				</FormProvider>
			</Layout>
		</>
	)
}

export default LKLForm
