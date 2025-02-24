'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyAuth } from '@/services/login'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    if (!verifyAuth()) {
      router.push('/login')
    }
  }, [router])
}