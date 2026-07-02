import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Delete } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { mockEmployees } from '../data/mockEmployees'

export default function PINLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useAuth()
  const role = (location.state as { role?: string })?.role ?? 'admin'

  const [pin, setPin] = useState<string[]>([])
  const [error, setError] = useState('')

  const append = (d: string) => {
    if (pin.length < 4) {
      setPin((p) => [...p, d])
      setError('')
    }
  }
  const backspace = () => setPin((p) => p.slice(0, -1))

  const submit = () => {
    const pinStr = pin.join('')
    const found = mockEmployees.find((e) => e.pin === pinStr && e.role === role)
    if (found) {
      setUser({ ...found })
      navigate(role === 'admin' ? '/admin' : '/hr')
    } else {
      setError('Incorrect PIN. Please try again.')
      setPin([])
    }
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back']

  return (
    <div className="min-h-screen bg-latte-50 flex flex-col px-6 py-10 max-w-md mx-auto items-center">
      <button
        onClick={() => navigate('/role')}
        className="flex items-center gap-1 text-latte-500 text-sm mb-8 hover:text-latte-700 self-start"
      >
        <ChevronLeft size={18} /> Back
      </button>

      <h2 className="text-2xl font-bold text-latte-900 mb-1 self-start">
        {role === 'admin' ? 'Admin Login' : 'HR Manager Login'}
      </h2>
      <p className="text-latte-500 text-sm mb-8 self-start">Enter your 4-digit PIN to continue</p>

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
        disabled={pin.length !== 4}
        className="btn-primary w-64 mt-6"
      >
        Verify PIN
      </button>

      <p className="mt-8 text-latte-300 text-xs text-center">
        {role === 'admin' ? 'Admin PIN: 0000' : 'HR PIN: 2001'}
      </p>
    </div>
  )
}
