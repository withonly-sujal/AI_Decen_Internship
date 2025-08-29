import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Study Notes Generator',
  description: 'Summarize your notes with AI and save them to a decentralized network.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The div below adds the full-screen layout styles */}
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-sans">
          {children}
        </div>
      </body>
    </html>
  )
}