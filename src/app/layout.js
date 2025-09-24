import './globals.css'
import Providers from './providers'
import GlobalHeader from '@/components/GlobalHeader'
import { Inter, Poppins, Orbitron, Great_Vibes} from 'next/font/google'

// Primary font for body text - clean and readable
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

// Secondary font for headings - friendly and modern
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

// Accent font for special elements - futuristic (optional)
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata = {
  title: 'Happy Food',
  description: 'Login with Discord and explore delicious stuff!',
  icons: {
    icon: '/food1.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">      
      <body className={`${inter.variable} ${poppins.variable} ${greatVibes.variable} font-sans antialiased`}>
        <Providers> 
          <GlobalHeader />
          {children}
        </Providers>
      </body>
    </html>
  )
}