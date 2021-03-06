/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
	description?: string
	lang?: string
	meta?: React.ComponentProps<typeof Helmet>["meta"]
	title: string
}

const SEO: React.FC<SEOProps> = ({ description = "", lang = "en", meta = [], title }: SEOProps) => {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`
	)

	const metaDescription = description || site.siteMetadata.description

	const metaDefaults: React.ComponentProps<typeof Helmet>["meta"] = [
		{
			name: `description`,
			content: metaDescription,
		},
		{
			property: `og:title`,
			content: title,
		},
		{
			property: `og:description`,
			content: metaDescription,
		},
		{
			property: `og:type`,
			content: `website`,
		},
		{
			name: `twitter:card`,
			content: `summary`,
		},
		{
			name: `twitter:creator`,
			content: site.siteMetadata.author,
		},
		{
			name: `twitter:title`,
			content: title,
		},
		{
			name: `twitter:description`,
			content: metaDescription,
		},
	]

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={`%s | ${site.siteMetadata.title}`}
			meta={metaDefaults.concat(meta)}
		/>
	)
}

export default SEO
