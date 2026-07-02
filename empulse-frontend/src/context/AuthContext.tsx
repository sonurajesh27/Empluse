import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface CurrentUser {
  id: string
  name: string
  sector: string
  role: 'employee' | 'hr' | 'admin'
  roleType: 'technical' | 'non-technical'
  pin?: string
}

interface AuthContextType {
  currentUser: CurrentUser | null
  setUser: (user: CurrentUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setUser: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  const setUser = (user: CurrentUser) => setCurrentUser(user)
  const logout = () => setCurrentUser(null)

  return (
    <AuthContext.Provider value={{ currentUser, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
