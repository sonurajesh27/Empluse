import { useState } from 'react'
import { MessageCircle, Clock } from 'lucide-react'

interface PollCardProps {
  question: string
  expiresIn: string
}

export default function PollCard({ question, expiresIn }: PollCardProps) {
  const [voted, setVoted] = useState(false)

  const handleVote = (answer: 'yes' | 'no') => {
    console.log('Poll vote:', answer)
    setVoted(true)
  }

  if (voted) {
    return (
      <div className="card bg-green-50 border-green-200">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle size={14} className="text-green-600" />
          <p className="text-xs font-medium text-green-700">Poll Response Recorded</p>
        </div>
        <p className="text-sm text-green-800">Thanks! Results in {expiresIn}</p>
      </div>
    )
  }

  return (
    <div className="card border-2 border-latte-200 bg-latte-50">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle size={14} className="text-latte-700" />
        <p className="text-xs font-medium text-latte-600 uppercase tracking-wide">Quick Poll</p>
      </div>
      <p className="text-sm font-semibold text-latte-900 mb-3">{question}</p>
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => handleVote('yes')}
          className="flex-1 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
        >
          👍 Yes
        </button>
        <button
          onClick={() => handleVote('no')}
          className="flex-1 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
        >
          👎 No
        </button>
      </div>
      <div className="flex items-center gap-1 text-xs text-latte-400">
        <Clock size={11} />
        <span>Expires in {expiresIn}</span>
      </div>
    </div>
  )
}
