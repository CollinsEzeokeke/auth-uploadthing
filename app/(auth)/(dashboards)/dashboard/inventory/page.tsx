'use client'

import { motion } from 'framer-motion'
import { InventoryManagement } from '@/components/dashbasic/InventoryManagement'

export default function InventoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      <InventoryManagement />
    </motion.div>
  )
}

