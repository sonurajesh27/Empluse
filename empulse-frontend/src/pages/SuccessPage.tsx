import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Home } from 'lucide-react'

export default function SuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 bg-latte-700 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-2xl font-semibold text-espresso mb-2">Thank you!</h1>
      <p className="text-latte-500 max-w-xs mb-2">
        Your feedback has been recorded anonymously.
      </p>
      <p className="text-sm text-latte-400 max-w-xs mb-10">
        Our AI will analyze it and surface insights to HR — without revealing your identity.
      </p>

      <div className="card w-full max-w-xs text-left space-y-3 mb-8">
        {[
          { step: '1', text: 'Feedback received', done: true },
          { step: '2', text: 'AI transcribing & translating', done: true },
          { step: '3', text: 'Sentiment analysis in progress', done: false },
          { step: '4', text: 'HR dashboard updated', done: false },
        ].map((item) => (
          <div key={item.step} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
              ${item.done ? 'bg-latte-700 text-white' : 'bg-latte-100 text-latte-400'}`}>
              {item.done ? '✓' : item.step}
            </div>
            <p className={`text-sm ${item.done ? 'text-espresso' : 'text-latte-400'}`}>{item.text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="btn-outline flex items-center gap-2"
      >
        <Home className="w-4 h-4" /> Back to Home
      </button>
    </div>
  )
}
