'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { User, Settings, BarChart2, Package } from 'lucide-react'

interface CollapsibleSidebarProps {
  isOpen: boolean
  setActiveSection: (section: string) => void
  closeMenu: () => void
}

export const CollapsibleSidebar = forwardRef<HTMLDivElement, CollapsibleSidebarProps>(
  function CollapsibleSidebar({  setActiveSection }, ref) {
    const menuItems = [
      { icon: User, label: 'Profile', value: 'profile' },
      { icon: Settings, label: 'Account', value: 'account' },
      { icon: BarChart2, label: 'Sales', value: 'sales' },
      { icon: Package, label: 'Inventory', value: 'inventory' },
    ]

    const handleItemClick = (value: string) => {
      setActiveSection(value)
      // Remove the closeMenu() call to keep the sidebar open when clicking menu items
    }

    return (
      <motion.aside
        ref={ref}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-gray-100 overflow-y-auto z-40 pt-16"
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleItemClick(item.value)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    )
  }
)

