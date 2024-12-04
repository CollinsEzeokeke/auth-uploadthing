"use client"
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProfileSection } from '@/components/dashbasic/ProfileSection'
import { CollapsibleSidebar } from '@/components/dashbasic/CollapsibleSidebar'
import { AccountSettings } from '@/components/dashbasic/AccountSettings'
import { InventoryManagement } from '@/components/dashbasic/InventoryManagement'
import { SalesOverview } from '@/components/dashbasic/SalesOverview'

export default function Dashboard() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/placeholder.svg?height=200&width=200',
    userType: 'Seller',
    username: 'johndoe123',
    bio: 'Passionate about creating and selling unique products.',
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')
  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false)
      }
    }

    const handleScroll = () => {
      if (isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isSidebarOpen])

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection user={user} setUser={setUser} />
      case 'account':
        return <AccountSettings user={user} />
      case 'sales':
        return <SalesOverview />
      case 'inventory':
        return <InventoryManagement />
      default:
        return <ProfileSection user={user} setUser={setUser} />
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        ref={toggleButtonRef}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isSidebarOpen && (
          <CollapsibleSidebar
            isOpen={isSidebarOpen}
            ref={sidebarRef}
            setActiveSection={setActiveSection}
            closeMenu={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 pl-16 pt-16"
      >
        <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
        {renderActiveSection()}
      </motion.div>
    </div>
  )
}

