'use client'

import { SessionProvider } from 'next-auth/react'
import { createContext, useContext, useState, useCallback } from 'react'
import AuthModal from '@/components/AuthModal'

export const AuthModalContext = createContext({ openAuthModal: () => {}, closeAuthModal: () => {} })

export function useAuthModal() {
  return useContext(AuthModalContext)
}

export default function Providers({ children }) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const openAuthModal = useCallback(() => setAuthModalOpen(true), [])
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), [])

  return (
    <SessionProvider>
      <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
        {children}
        <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
      </AuthModalContext.Provider>
    </SessionProvider>
  )
}
