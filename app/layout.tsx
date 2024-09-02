import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/navigation/header/index'
import { CartListProvider } from '@/components/context'
import MainContent from '@/components/navigation/MainContent'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'Store-App'
const description = 'Online store of technology products'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn('font-sans antialiased h-screen', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartListProvider>
            {/* <SideMenu /> */}
            <Header />
            <MainContent>{children}</MainContent>
            {/* <BottomMenu /> */}
            <Toaster />
          </CartListProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
