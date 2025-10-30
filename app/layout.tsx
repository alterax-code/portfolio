import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lucas Jacob - Développeur Web Full-Stack | Portfolio',
  description: 'Portfolio de Lucas Jacob, développeur web full-stack passionné. Découvrez mes projets en PHP, JavaScript, Python et mes compétences en développement web moderne.',
  keywords: ['développeur web', 'full-stack', 'PHP', 'JavaScript', 'Python', 'React', 'MySQL', 'portfolio', 'Lucas Jacob', 'EPITECH'],
  authors: [{ name: 'Lucas Jacob' }],
  openGraph: {
    title: 'Lucas Jacob - Développeur Web Full-Stack',
    description: 'Portfolio de développeur web passionné spécialisé en PHP, JavaScript et Python',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucas Jacob - Développeur Web Full-Stack',
    description: 'Portfolio de développeur web passionné',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
