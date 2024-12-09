'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface AnimatedButtonProps {
  href: string
  children: React.ReactNode
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ href, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        {children}
      </Link>
    </motion.div>
  )
}

export default AnimatedButton

