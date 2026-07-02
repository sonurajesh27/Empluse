import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Fingerprint, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { mockEmployees } from '../data/mockEmployees'

type ScanState = 'idle' | 'scanning' | 'verified'

export default function FingerprintPage() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [detectedUser, setDetectedUser] = useState<typeof mockEmployees[0] | null>(null)

  const handleScan = () => {
    if (scanState !== 'idle') return
    setScanState('scanning')

    setTimeout(() => {
      // Pick a random employee-role user
      const employees = mockEmployees.filter((e) => e.role === 'employee')
      const picked = employees[Math.floor(Math.random() * employees.length)]
      setDetectedUser(picked)
      setScanState('verified')
    }, 1800)
  }

  useEffect(() => {
    if (scanState === 'verified' && detectedUser) {
      const timer = setTimeout(() => {
        setUser({ ...detectedUser })
        navigate('/employee')
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [scanState, detectedUser, setUser, navigate])

  return (
    <div className="min-h-screen bg-latte-50 flex flex-col px-6 py-10 max-w-md mx-auto">
      <button
        onClick={() => navigate('/role')}
        className="flex items-center gap-1 text-latte-500 text-sm mb-8 hover:text-latte-700 w-fit"
      >
        <ChevronLeft size={18} /> Back
      </button>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex items-center gap-1.5">
          <span className="w-7 h-7 rounded-full bg-latte-700 text-white text-xs flex items-center justify-center font-semibold">1</span>
          <span className="text-sm font-medium text-latte-700">Fingerprint</span>
        </div>
        <div className="flex-1 h-px bg-latte-200" />
        <div className="flex items-center gap-1.5">
          <span className="w-7 h-7 rounded-full bg-latte-200 text-latte-400 text-xs flex items-center justify-center font-semibold">2</span>
          <span className="text-sm text-latte-400">Dashboard</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-latte-900 mb-2">Verify Identity</h2>
      <p className="text-latte-500 text-sm mb-10">Place your finger on the sensor to authenticate</p>

      {/* Fingerprint Button */}
      <div className="flex flex-col items-center gap-6 mt-4">
        <button
          onClick={handleScan}
          disabled={scanState !== 'idle'}
          className={`relative w-36 h-36 rounded-full flex items-center justify-center transition-all duration-300
            ${scanState === 'idle' ? 'bg-latte-100 hover:bg-latte-200 border-2 border-latte-300 cursor-pointer' : ''}
            ${scanState === 'scanning' ? 'bg-latte-200 border-2 border-latte-400 animate-pulse cursor-not-allowed' : ''}
            ${scanState === 'verified' ? 'bg-green-50 border-2 border-green-400 cursor-not-allowed' : ''}
          `}
        >
          {scanState === 'verified' ? (
            <CheckCircle2 size={64} className="text-green-500" />
          ) : (
            <Fingerprint
              size={64}
              className={scanState === 'scanning' ? 'text-latte-500' : 'text-latte-400'}
            />
          )}
        </button>

        <p className="text-latte-500 text-sm font-medium">
          {scanState === 'idle' && 'Tap to scan fingerprint'}
          {scanState === 'scanning' && 'Scanning…'}
          {scanState === 'verified' && 'Identity verified!'}
        </p>

        {/* Detected user chip */}
        {scanState === 'verified' && detectedUser && (
          <div className="bg-latte-100 border border-latte-200 rounded-2xl px-5 py-3 text-center animate-fade-in">
            <p className="text-latte-700 font-semibold text-base">{detectedUser.name}</p>
            <p className="text-latte-500 text-sm mt-0.5">
              {detectedUser.sector} · {detectedUser.roleType === 'non-technical' ? 'Non-Technical' : 'Technical'} · Employee
            </p>
          </div>
        )}

        {scanState === 'idle' && (
          <p className="text-latte-300 text-xs text-center max-w-xs">
            Your identity is verified via biometric. No personal data is stored beyond this session.
          </p>
        )}
      </div>
    </div>
  )
}
