'use client'

import { motion } from 'framer-motion'
import { AccountSettings } from '@/components/dashbasic/AccountSettings'

export default function AccountPage() {
  const user = {
    email: 'john@example.com',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <AccountSettings user={user} />
    </motion.div>
  )
}

