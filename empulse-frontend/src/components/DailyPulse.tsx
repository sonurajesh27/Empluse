import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const EMOJIS = ['😞', '😐', '🙂', '😄']

function getTodayKey() {
  const d = new Date()
  return `pulse_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export default function DailyPulse() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(() => {
    return localStorage.getItem(getTodayKey()) === 'true'
  })
  const [justSubmitted, setJustSubmitted] = useState(false)

  if (submitted && !justSubmitted) return null

  const handleTap = (_emoji: string) => {
    localStorage.setItem(getTodayKey(), 'true')
    setJustSubmitted(true)
    setTimeout(() => {
      setSubmitted(true)
      setJustSubmitted(false)
    }, 2000)
  }

  if (justSubmitted) {
    return (
      <div className="card bg-green-50 border-green-200 text-center py-4">
        <p className="text-green-700 text-sm font-medium">{t('pulse.thanks')}</p>
      </div>
    )
  }

  return (
    <div className="card">
      <p className="font-semibold text-latte-900 mb-3">{t('pulse.question')}</p>
      <div className="flex justify-center gap-4">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleTap(emoji)}
            className="text-3xl p-3 rounded-2xl hover:bg-latte-100 active:scale-90 transition-all"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
