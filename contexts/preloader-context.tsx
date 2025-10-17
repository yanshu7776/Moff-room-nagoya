"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface PreloaderContextType {
  isPreloading: boolean
  showPreloader: () => void
  hidePreloader: () => void // Preloader自身がアニメーション完了後に呼ぶ
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined)

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isPreloading, setIsPreloading] = useState(true) // 初回起動時はtrue

  const showPreloader = useCallback(() => {
    setIsPreloading(true)
  }, [])

  const hidePreloader = useCallback(() => {
    setIsPreloading(false)
  }, [])

  return (
    <PreloaderContext.Provider value={{ isPreloading, showPreloader, hidePreloader }}>
      {children}
    </PreloaderContext.Provider>
  )
}

export function usePreloader() {
  const context = useContext(PreloaderContext)
  if (context === undefined) {
    throw new Error("usePreloader must be used within a PreloaderProvider")
  }
  return context
}
