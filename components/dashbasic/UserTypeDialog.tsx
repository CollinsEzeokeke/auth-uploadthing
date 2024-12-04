'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function UserTypeDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const userTypes = [
    {
      name: 'Seller',
      description: 'Can list and sell products, manage inventory, and process orders.',
      capabilities: [
        'Create and manage product listings',
        'Process and fulfill orders',
        'Access sales analytics',
        'Communicate with buyers',
      ],
    },
    {
      name: 'Buyer',
      description: 'Can browse products, make purchases, and leave reviews.',
      capabilities: [
        'Browse and search products',
        'Make purchases',
        'Leave reviews and ratings',
        'Track order status',
      ],
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-2">
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Types</DialogTitle>
          <DialogDescription>
            Learn about the different user types and their capabilities.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {userTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-100 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{type.description}</p>
              <ul className="list-disc list-inside text-sm">
                {type.capabilities.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

