'use client'

import { motion } from 'framer-motion'
import AnimatedButton from '@/components/AnimatedButton'

interface UnauthorizedPageProps {
    message: string;
  }
  

export default function UnauthorizedPage({message}: UnauthorizedPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-xl text-gray-700 mb-8">{message}</p>
        <AnimatedButton href="/">
          Go to Home Page
        </AnimatedButton>
      </motion.div>
    </div>
  )
}

