import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserPlus, Copy, Check, Clock } from 'lucide-react'
import { SECTORS } from '../../data/sectors'

export default function RegisterEmployee() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [sector, setSector] = useState('')
  const [roleType, setRoleType] = useState<'technical' | 'non-technical'>('technical')
  const [pin, setPin] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [generatedId, setGeneratedId] = useState('')
  const [copied, setCopied] = useState(false)

  const generateId = () => {
    const digits = Math.floor(1000 + Math.random() * 9000)
    return `EMP-${digits}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !sector || !pin || pin.length !== 4) return

    const id = generateId()
    setGeneratedId(id)
    setSubmitted(true)

    // In production, this would call POST /api/employees/register
    console.log('Registering employee:', { id, name, sector, roleType, pin })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setName('')
    setSector('')
    setRoleType('technical')
    setPin('')
    setSubmitted(false)
    setGeneratedId('')
  }

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-1.5 text-latte-300 hover:text-white text-sm mb-3">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="flex items-center gap-2">
          <UserPlus size={20} className="text-white" />
          <h1 className="text-white font-bold text-xl">Register Employee</h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-latte-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter employee name"
                className="input-field"
                required
              />
            </div>

            {/* Sector */}
            <div>
              <label className="block text-sm font-medium text-latte-700 mb-1.5">Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select sector</option>
                {SECTORS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Role Type */}
            <div>
              <label className="block text-sm font-medium text-latte-700 mb-1.5">Role Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRoleType('technical')}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                    roleType === 'technical'
                      ? 'bg-latte-700 text-white border-latte-700'
                      : 'bg-white text-latte-600 border-latte-200 hover:border-latte-400'
                  }`}
                >
                  Technical
                </button>
                <button
                  type="button"
                  onClick={() => setRoleType('non-technical')}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                    roleType === 'non-technical'
                      ? 'bg-latte-700 text-white border-latte-700'
                      : 'bg-white text-latte-600 border-latte-200 hover:border-latte-400'
                  }`}
                >
                  Non-Technical
                </button>
              </div>
            </div>

            {/* PIN */}
            <div>
              <label className="block text-sm font-medium text-latte-700 mb-1.5">4-Digit PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4)
                  setPin(val)
                }}
                placeholder="••••"
                className="input-field text-center text-xl tracking-[0.5em]"
                maxLength={4}
                required
              />
              <p className="text-latte-400 text-xs mt-1">Used for anonymous login</p>
            </div>

            {/* Auto-generated ID note */}
            <div className="bg-latte-50 border border-latte-200 rounded-xl px-4 py-3">
              <p className="text-latte-600 text-sm">
                <span className="font-medium">ID will be auto-generated:</span> EMP-XXXX format
              </p>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <UserPlus size={18} /> Register Employee
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            {/* Success card */}
            <div className="card text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-latte-900 mb-1">Employee Registered!</h2>
              <p className="text-latte-500 text-sm">The new employee has been added to the system</p>
            </div>

            {/* Generated ID */}
            <div className="card">
              <p className="text-latte-500 text-xs font-medium uppercase tracking-wide mb-2">Employee ID</p>
              <div className="flex items-center justify-between bg-latte-50 rounded-xl px-4 py-3">
                <span className="text-2xl font-bold text-latte-900 tracking-wide">{generatedId}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-sm text-latte-600 hover:text-latte-800 transition-colors bg-white border border-latte-200 px-3 py-1.5 rounded-lg"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="card space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-latte-500">Name</span>
                <span className="text-latte-800 font-medium">{name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-latte-500">Sector</span>
                <span className="text-latte-800 font-medium">{sector}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-latte-500">Role Type</span>
                <span className="text-latte-800 font-medium capitalize">{roleType}</span>
              </div>
            </div>

            {/* Observation period tag */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <Clock size={16} className="text-amber-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-700">New Employee — Observation Period: 7 days</p>
                <p className="text-xs text-amber-600 mt-0.5">No complaints can be raised during this period</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={handleReset} className="btn-primary flex-1">
                Register Another
              </button>
              <button onClick={() => navigate('/admin')} className="btn-outline flex-1">
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
