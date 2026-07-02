import { ReactNode } from 'react'

interface BottomNavItem {
  label: string
  icon: ReactNode
  tab: string
}

interface Props {
  items: BottomNavItem[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNav({ items, activeTab, onTabChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-latte-200 flex z-50">
      {items.map((item) => {
        const isActive = activeTab === item.tab
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors
              ${isActive ? 'text-latte-700' : 'text-latte-400'}`}
          >
            <span className={`${isActive ? 'text-latte-700' : 'text-latte-400'}`}>{item.icon}</span>
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
