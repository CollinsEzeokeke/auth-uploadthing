'use client'
import { useSearchParams } from 'next/navigation'
import UnauthorizedPage from '@/components/unauthorized'

export default function Page() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message') || 'Unauthorized Access'
  
  return <UnauthorizedPage message={message} />
}