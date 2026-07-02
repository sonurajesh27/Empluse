import { useNavigate } from 'react-router-dom'
import { BrainCircuit } from 'lucide-react'

export default function SplashPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-latte-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="bg-latte-700 text-white p-5 rounded-3xl shadow-md">
          <BrainCircuit size={48} />
        </div>
        <h1 className="text-6xl font-bold text-latte-700 tracking-tight">EmPulse</h1>
        <p className="text-latte-600 text-lg font-medium tracking-wide uppercase">
          AI-Powered Workforce Retention
        </p>
        <p className="text-latte-500 text-base max-w-sm leading-relaxed mt-1">
          Giving every worker a voice.<br />Giving every manager clarity.
        </p>
      </div>

      <div className="mt-4 w-full max-w-xs space-y-3">
        <button
          onClick={() => navigate('/role')}
          className="btn-primary w-full text-lg py-4"
        >
          Enter Platform
        </button>
      </div>

      <p className="mt-12 text-latte-300 text-xs">
        Designed for Indian Manufacturing Floors · Confidential & Anonymous
      </p>
    </div>
  )
}
