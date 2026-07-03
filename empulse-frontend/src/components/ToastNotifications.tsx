import { useState, useEffect } from 'react'
import { X, AlertCircle, AlertTriangle, Info } from 'lucide-react'

export interface ToastItem {
  id: string
  title: string
  message: string
  priority: 'critical' | 'medium' | 'low'
  navigateTo?: string
}

interface ToastNotificationsProps {
  items: ToastItem[]
  onNavigate?: (path: string) => void
}

const priorityConfig = {
  critical: {
    border: 'border-l-red-500',
    bg: 'bg-white',
    icon: <AlertCircle size={16} className="text-red-500" />,
    badge: 'bg-red-100 text-red-700',
    emoji: '🔴',
  },
  medium: {
    border: 'border-l-amber-500',
    bg: 'bg-white',
    icon: <AlertTriangle size={16} className="text-amber-500" />,
    badge: 'bg-amber-100 text-amber-700',
    emoji: '🟡',
  },
  low: {
    border: 'border-l-green-500',
    bg: 'bg-white',
    icon: <Info size={16} className="text-green-500" />,
    badge: 'bg-green-100 text-green-700',
    emoji: '🟢',
  },
}

export default function ToastNotifications({ items, onNavigate }: ToastNotificationsProps) {
  const [visible, setVisible] = useState<ToastItem[]>([])

  useEffect(() => {
    // Show top 3 items
    const toShow = items.slice(0, 3)
    setVisible(toShow)

    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => {
      setVisible([])
    }, 8000)

    return () => clearTimeout(timer)
  }, [items])

  const dismiss = (id: string) => {
    setVisible((prev) => prev.filter((t) => t.id !== id))
  }

  if (visible.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80 max-w-[calc(100vw-2rem)]">
      {visible.map((toast, index) => {
        const config = priorityConfig[toast.priority]
        return (
          <div
            key={toast.id}
            className={`${config.bg} border border-latte-100 border-l-4 ${config.border} rounded-xl p-3 shadow-lg 
              transform transition-all duration-300 ease-out cursor-pointer hover:shadow-xl`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'slideIn 0.3s ease-out forwards',
            }}
            onClick={() => {
              if (toast.navigateTo && onNavigate) {
                onNavigate(toast.navigateTo)
                dismiss(toast.id)
              }
            }}
          >
            <div className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5">{config.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-latte-900 truncate">{toast.title}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0 ${config.badge}`}>
                    {toast.priority}
                  </span>
                </div>
                <p className="text-xs text-latte-500 line-clamp-2">{toast.message}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); dismiss(toast.id) }}
                className="text-latte-400 hover:text-latte-700 transition-colors shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )
      })}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
