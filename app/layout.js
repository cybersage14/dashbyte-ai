import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DashbyteAI',
  description: 'Create your own PC with the help of DashbyteAI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <header>
        {/* Your header content goes here */}
      </header>

      <body className={inter.className}>{children}</body>

      <footer>
        {/* Your footer content goes here */}
      </footer>
    </html>
  )
}
