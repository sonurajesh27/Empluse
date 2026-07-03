import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Copy, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const DEMO_ACCOUNTS = [
  { role: 'Employee', id: 'EMP-1001', name: 'Ravi Kumar', sector: 'Assembly Line A', pin: '1001', method: 'Fingerprint or PIN', color: 'bg-amber-50 border-amber-200' },
  { role: 'Employee', id: 'EMP-1004', name: 'Suresh M.', sector: 'Welding', pin: '1004', method: 'Fingerprint or PIN', color: 'bg-amber-50 border-amber-200' },
  { role: 'Admin', id: 'ADM-001', name: 'Murugan A.', sector: 'Management', pin: '0000', method: 'PIN Login', color: 'bg-latte-50 border-latte-200' },
  { role: 'HR Manager', id: 'EMP-2001', name: 'Priya HR', sector: 'HR', pin: '2001', method: 'PIN Login', color: 'bg-emerald-50 border-emerald-200' },
  { role: 'Owner', id: 'OWN-001', name: 'Rajesh R.', sector: 'Owner', pin: '9999', method: 'PIN Login', color: 'bg-purple-50 border-purple-200' },
]

export default function DemoGuidePage() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState<string | null>(null)

  const copyPin = (pin: string) => {
    navigator.clipboard.writeText(pin)
    setCopied(pin)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="min-h-screen bg-cream px-5 py-8 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-latte-500 text-sm mb-6 hover:text-latte-700"
      >
        <ChevronLeft size={18} /> Back to Home
      </button>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-espresso mb-1">Demo Guide</h1>
        <p className="text-sm text-latte-500">Test credentials for presentation & evaluation</p>
        <p className="text-xs text-latte-400 mt-1">These accounts are pre-loaded with sample data</p>
      </div>

      <div className="space-y-3">
        {DEMO_ACCOUNTS.map((acc) => (
          <div key={acc.id} className={`card border ${acc.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="tag bg-latte-700 text-white text-xs">{acc.role}</span>
                  <span className="text-xs text-latte-400">{acc.method}</span>
                </div>
                <p className="font-semibold text-espresso">{acc.name}</p>
                <p className="text-xs text-latte-500">{acc.id} · {acc.sector}</p>
              </div>
              <button
                onClick={() => copyPin(acc.pin)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-latte-200 rounded-xl text-sm font-mono font-bold text-latte-700 hover:bg-latte-50 transition-all"
              >
                {copied === acc.pin ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                {acc.pin}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-latte-50 mt-6">
        <p className="text-sm font-semibold text-espresso mb-2">Demo Flow</p>
        <ol className="text-xs text-latte-600 space-y-1.5 list-decimal list-inside">
          <li>Login as <strong>Employee</strong> → Fingerprint scan → Raise complaint</li>
          <li>Login as <strong>Admin (0000)</strong> → See complaint in queue → Escalate/Resolve</li>
          <li>Login as <strong>HR (2001)</strong> → See escalated issues → Act or ignore (SLA demo)</li>
          <li>Login as <strong>Owner (9999)</strong> → See full audit trail + integrity analysis</li>
        </ol>
      </div>

      <div className="card bg-red-50 border-red-200 mt-4">
        <p className="text-xs text-red-600">
          ⚠️ This page is for demo/evaluation only. In production, credentials are never displayed anywhere in the application.
        </p>
      </div>
    </div>
  )
}
