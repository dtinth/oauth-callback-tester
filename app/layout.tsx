import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OAuth Callback Tester - Test OAuth 2.0 & OIDC Flows",
  description:
    "Free OAuth 2.0 and OpenID Connect callback testing tool. Test authorization code, implicit, PKCE flows with query and fragment response modes. Decode JWTs instantly.",
  keywords: [
    "OAuth",
    "OAuth 2.0",
    "OIDC",
    "OpenID Connect",
    "callback tester",
    "PKCE",
    "JWT decoder",
    "authorization code",
    "implicit flow",
  ],
  authors: [{ name: "v0.app" }],
  generator: "v0.app",
  metadataBase: new URL("https://oauth-callback-tester.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OAuth Callback Tester - Test OAuth 2.0 & OIDC Flows",
    description:
      "Free OAuth 2.0 and OpenID Connect callback testing tool. Test authorization code, implicit, PKCE flows with query and fragment response modes. Decode JWTs instantly.",
    url: "https://oauth-callback-tester.vercel.app",
    siteName: "OAuth Callback Tester",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OAuth Callback Tester - Test OAuth 2.0 & OIDC Flows",
    description:
      "Free OAuth 2.0 and OpenID Connect callback testing tool. Test authorization code, implicit, PKCE flows with query and fragment response modes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
