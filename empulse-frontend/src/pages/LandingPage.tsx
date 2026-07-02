import { useNavigate } from 'react-router-dom'
import { Users, BarChart3, ShieldCheck } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-latte-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-2xl font-semibold text-espresso tracking-tight">EmPulse</span>
        </div>
        <p className="text-latte-500 text-sm">AI-Powered Employee Retention Platform</p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-sm space-y-4">
        {/* Employee card */}
        <button
          onClick={() => navigate('/verify')}
          className="w-full card hover:shadow-md hover:border-latte-300 transition-all duration-200 text-left group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-latte-100 rounded-xl flex items-center justify-center group-hover:bg-latte-200 transition-colors">
              <ShieldCheck className="w-6 h-6 text-latte-700" />
            </div>
            <div>
              <p className="font-semibold text-espresso">I'm an Employee</p>
              <p className="text-sm text-latte-500 mt-0.5">Submit anonymous feedback</p>
            </div>
            <span className="ml-auto text-latte-300 group-hover:text-latte-500 transition-colors text-xl">→</span>
          </div>
        </button>

        {/* HR card */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full card hover:shadow-md hover:border-latte-300 transition-all duration-200 text-left group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-latte-100 rounded-xl flex items-center justify-center group-hover:bg-latte-200 transition-colors">
              <BarChart3 className="w-6 h-6 text-latte-700" />
            </div>
            <div>
              <p className="font-semibold text-espresso">I'm HR / Manager</p>
              <p className="text-sm text-latte-500 mt-0.5">View dashboard & insights</p>
            </div>
            <span className="ml-auto text-latte-300 group-hover:text-latte-500 transition-colors text-xl">→</span>
          </div>
        </button>
      </div>

      {/* Stats strip */}
      <div className="mt-14 flex gap-10 text-center">
        {[
          { val: '80', label: 'Workers' },
          { val: '6–8', label: 'Leave/month' },
          { val: '₹90L', label: 'Annual loss' },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-xl font-bold text-mocha">{s.val}</p>
            <p className="text-xs text-latte-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-latte-300">Built for Indian manufacturing floors · Hackathon MVP</p>
    </div>
  )
}
