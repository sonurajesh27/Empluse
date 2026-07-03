import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Delete } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { loginWithPin } from '../api/apiClient'

export default function PINLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useAuth()
  const { t } = useLanguage()
  const role = (location.state as { role?: string })?.role ?? 'admin'

  const [pin, setPin] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const append = (d: string) => {
    if (pin.length < 4) {
      setPin((p) => [...p, d])
      setError('')
    }
  }
  const backspace = () => setPin((p) => p.slice(0, -1))

  const submit = async () => {
    const pinStr = pin.join('')
    setLoading(true)
    try {
      const user = await loginWithPin(pinStr)
      setUser({
        id: user.employeeCode,
        name: user.name,
        sector: user.sector,
        role: user.role,
        roleType: user.roleType,
      })
      if (user.role === 'admin') navigate('/admin')
      else if (user.role === 'hr') navigate('/hr')
      else if (user.role === 'owner') navigate('/owner')
      else navigate('/employee')
    } catch {
      setError(t('login.incorrect'))
      setPin([])
    } finally {
      setLoading(false)
    }
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back']

  const titleKey = role === 'admin' ? 'login.title.admin' : role === 'owner' ? 'login.title.owner' : 'login.title.hr'

  return (
    <div className="min-h-screen bg-latte-50 flex flex-col px-6 py-10 max-w-md mx-auto items-center">
      <button
        onClick={() => navigate('/role')}
        className="flex items-center gap-1 text-latte-500 text-sm mb-8 hover:text-latte-700 self-start"
      >
        <ChevronLeft size={18} /> {t('common.back')}
      </button>

      <h2 className="text-2xl font-bold text-latte-900 mb-1 self-start">
        {t(titleKey)}
      </h2>
      <p className="text-latte-500 text-sm mb-8 self-start">{t('login.subtitle')}</p>

      {/* Dots */}
      <div className="flex gap-4 mb-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ${
              pin.length > i ? 'bg-latte-700 border-latte-700' : 'border-latte-300 bg-transparent'
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-64">
        {keys.map((k, idx) => {
          if (k === '') return <div key={idx} />
          if (k === 'back')
            return (
              <button
                key={idx}
                onClick={backspace}
                className="h-16 rounded-2xl bg-latte-100 flex items-center justify-center hover:bg-latte-200 active:scale-95 transition-all"
              >
                <Delete size={20} className="text-latte-600" />
              </button>
            )
          return (
            <button
              key={k}
              onClick={() => append(k)}
              className="h-16 rounded-2xl bg-white border border-latte-200 text-latte-900 font-semibold text-xl
                hover:bg-latte-50 active:scale-95 transition-all shadow-sm"
            >
              {k}
            </button>
          )
        })}
      </div>

      <button
        onClick={submit}
        disabled={pin.length !== 4 || loading}
        className="btn-primary w-64 mt-6"
      >
        {loading ? t('login.verifying') : t('login.verify')}
      </button>

      <p className="mt-8 text-latte-400 text-xs text-center">
        {t('login.forgot')}{' '}
        <button onClick={() => navigate('/demo-guide')} className="text-latte-600 font-medium underline">
          View Demo Guide
        </button>
      </p>
    </div>
  )
}
