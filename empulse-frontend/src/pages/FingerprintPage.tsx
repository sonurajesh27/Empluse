import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fingerprint, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'

type Step = 'idle' | 'scanning' | 'verified'

export default function FingerprintPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('idle')
  const [workerId] = useState('EMP-' + Math.floor(1000 + Math.random() * 9000))

  const handleScan = () => {
    setStep('scanning')
    setTimeout(() => {
      setStep('verified')
      setTimeout(() => navigate('/feedback'), 1200)
    }, 2200)
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5">
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-latte-500 hover:text-latte-700 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Title */}
        <p className="text-xs font-medium text-latte-400 uppercase tracking-widest mb-2">Step 1 of 2</p>
        <h1 className="text-2xl font-semibold text-espresso mb-1">Verify Identity</h1>
        <p className="text-sm text-latte-500 mb-10">Your feedback is completely anonymous after this step</p>

        {/* Fingerprint circle */}
        <button
          onClick={step === 'idle' ? handleScan : undefined}
          disabled={step !== 'idle'}
          className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 mb-8
            ${step === 'idle' ? 'bg-latte-100 hover:bg-latte-200 cursor-pointer active:scale-95 border-2 border-latte-200' : ''}
            ${step === 'scanning' ? 'bg-latte-200 border-2 border-latte-400 animate-pulse cursor-default' : ''}
            ${step === 'verified' ? 'bg-latte-700 border-2 border-latte-700 cursor-default' : ''}
          `}
        >
          {step === 'idle' && <Fingerprint className="w-16 h-16 text-latte-600" />}
          {step === 'scanning' && <Loader2 className="w-16 h-16 text-latte-700 animate-spin" />}
          {step === 'verified' && <CheckCircle2 className="w-16 h-16 text-white" />}
        </button>

        {/* Status text */}
        {step === 'idle' && (
          <div className="space-y-1">
            <p className="font-medium text-espresso">Place your finger to scan</p>
            <p className="text-sm text-latte-400">Tap the circle above to simulate</p>
          </div>
        )}
        {step === 'scanning' && (
          <div className="space-y-1">
            <p className="font-medium text-latte-700">Scanning...</p>
            <p className="text-sm text-latte-400">Hold still for a moment</p>
          </div>
        )}
        {step === 'verified' && (
          <div className="space-y-1">
            <p className="font-medium text-latte-700">Verified! Redirecting...</p>
            <p className="text-sm text-latte-400">Identity confirmed, token generated</p>
          </div>
        )}

        {/* Worker token chip */}
        <div className="mt-8 px-4 py-2 bg-latte-100 rounded-full">
          <p className="text-xs text-latte-500">Token: <span className="font-mono font-medium text-mocha">{workerId}</span></p>
        </div>

        {/* Info note */}
        <div className="mt-10 max-w-xs bg-latte-50 border border-latte-100 rounded-xl p-4 text-left">
          <p className="text-xs text-latte-500 leading-relaxed">
            🔒 Your identity is used only to prevent duplicate submissions. 
            Your actual feedback is stored anonymously — no one can trace it back to you.
          </p>
        </div>
      </div>
    </div>
  )
}
