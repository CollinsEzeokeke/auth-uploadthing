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
import getUser from '@/lib/getSessions'
import { useQuery } from '@tanstack/react-query'

export default function Dashboard() {
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const result = await getUser();
      return JSON.parse(JSON.stringify(result));
    }
  })

  // console.log(userData)
  const data = userData?.user
  console.log('this is ....')
  console.log(data)
  const [user, setUser] = useState({
    name: data?.name,
    email: data?.email,
    image: data?.image,
    userType: data?.UserType,
    username: data?.username,
    bio: data?.Bio
  })
  console.log(user.email)
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
        return <AccountSettings user={user.email} />
      case 'sales':
        return <SalesOverview />
      case 'inventory':
        return <InventoryManagement />
      default:
        return <ProfileSection user={user} setUser={setUser} />
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading user data</div>
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50"
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
      <div className='w-screen flex justify-end'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 pl-16 pt-16 h-screen w-[80%]"
        >
          <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
          <div className='w-[50%]'>{renderActiveSection()}</div>
        </motion.div>
      </div>

    </div>
  )
}

