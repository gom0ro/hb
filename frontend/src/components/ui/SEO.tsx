import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  ogImage?: string
  ogType?: string
}

const SITE_NAME = 'ItHub'
const DEFAULT_TITLE = 'ItHub — Modern Web Development Team'
const DEFAULT_DESCRIPTION = 'We build fast, scalable and modern web applications. Full-stack development with React, TypeScript, FastAPI and PostgreSQL.'
const DEFAULT_IMAGE = '/og-image.png'
const SITE_URL = 'https://ithub.dev'

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
