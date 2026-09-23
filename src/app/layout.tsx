import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

const siteUrl = 'https://stardew-valley-data.chiefpansancolt.dev'
const siteDescription = 'Documentation for the stardew-valley-data NPM package.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Stardew Valley Data Docs',
    default: 'Stardew Valley Data - NPM package documentation',
  },
  description: siteDescription,
  keywords: ['Stardew Valley', 'Stardew Valley Data', 'NPM package', 'game data'],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'Stardew Valley Data',
    title: 'Stardew Valley Data - NPM package documentation',
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley Data - NPM package documentation',
    description: siteDescription,
  },
  // NOTE: no favicon/apple-touch-icon/manifest files exist in this repo at
  // all (no public/ directory) — icons metadata intentionally omitted here
  // rather than pointing at files that 404. Add public/ assets and restore
  // an `icons`/`manifest` block once real favicon files exist.
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: 'Stardew Valley Data',
  description: siteDescription,
  codeRepository: 'https://github.com/chiefpansancolt/stardew-valley-data',
  programmingLanguage: 'TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-white dark:bg-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
