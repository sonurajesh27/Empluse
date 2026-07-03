import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Send, BarChart3 } from 'lucide-react'
import { SECTORS } from '../../data/sectors'

interface PollResult {
  question: string
  sector: string
  duration: string
  yesPercent: number
  noPercent: number
  totalVotes: number
}

export default function QuickPoll() {
  const navigate = useNavigate()
  const [question, setQuestion] = useState('Is the new canteen contractor better?')
  const [sector, setSector] = useState('Assembly Line A')
  const [duration, setDuration] = useState('4hr')
  const [sent, setSent] = useState(false)
  const [result, setResult] = useState<PollResult | null>(null)

  const handleSend = () => {
    if (!question.trim() || !sector) return

    // Mock result
    setResult({
      question,
      sector,
      duration,
      yesPercent: 65,
      noPercent: 35,
      totalVotes: 23,
    })
    setSent(true)
  }

  const handleReset = () => {
    setQuestion('')
    setSector('')
    setDuration('4hr')
    setSent(false)
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <button onClick={() => navigate('/hr')} className="flex items-center gap-1.5 text-latte-300 hover:text-white text-sm mb-3">
          <ArrowLeft size={18} /> Back to HR Dashboard
        </button>
        <div className="flex items-center gap-2">
          <MessageCircle size={20} className="text-white" />
          <h1 className="text-white font-bold text-xl">Ask the Floor</h1>
        </div>
        <p className="text-latte-300 text-sm mt-1">Quick pulse-check polls for workers</p>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto space-y-5">
        {!sent ? (
          <>
            {/* Question */}
            <div className="card space-y-4">
              <div>
                <label className="block text-sm font-medium text-latte-700 mb-1.5">Poll Question</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a Yes/No question..."
                  className="input-field min-h-[80px] resize-none"
                  rows={3}
                />
              </div>

              {/* Target sector */}
              <div>
                <label className="block text-sm font-medium text-latte-700 mb-1.5">Target Sector</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select sector</option>
                  <option value="all">All Sectors</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-latte-700 mb-1.5">Duration</label>
                <div className="flex gap-2">
                  {['1hr', '4hr', '24hr'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        duration === d
                          ? 'bg-latte-700 text-white border-latte-700'
                          : 'bg-white text-latte-600 border-latte-200 hover:border-latte-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="card bg-latte-50 border-latte-200">
              <p className="text-xs font-medium text-latte-500 uppercase tracking-wide mb-2">Preview</p>
              <div className="bg-white border border-latte-100 rounded-xl p-3">
                <p className="text-sm font-semibold text-latte-900 mb-2">{question || 'Your question here...'}</p>
                <div className="flex gap-2">
                  <span className="flex-1 py-2 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium text-center">👍 Yes</span>
                  <span className="flex-1 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium text-center">👎 No</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={!question.trim() || !sector}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Send size={18} /> Send Poll
            </button>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="card text-center py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 size={24} className="text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-latte-900 mb-1">Poll Sent!</h2>
              <p className="text-latte-500 text-sm">Live results are coming in</p>
            </div>

            {result && (
              <div className="card space-y-4">
                <div>
                  <p className="text-xs font-medium text-latte-500 uppercase tracking-wide mb-1">Question</p>
                  <p className="text-sm font-semibold text-latte-900">{result.question}</p>
                </div>

                <div className="flex gap-4 text-xs text-latte-500">
                  <span>Sector: <strong className="text-latte-700">{result.sector}</strong></span>
                  <span>Duration: <strong className="text-latte-700">{result.duration}</strong></span>
                  <span>Votes: <strong className="text-latte-700">{result.totalVotes}</strong></span>
                </div>

                {/* Animated result bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-700 font-medium">👍 Yes</span>
                      <span className="text-green-700 font-bold">{result.yesPercent}%</span>
                    </div>
                    <div className="w-full bg-latte-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${result.yesPercent}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-700 font-medium">👎 No</span>
                      <span className="text-red-700 font-bold">{result.noPercent}%</span>
                    </div>
                    <div className="w-full bg-latte-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-red-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${result.noPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-latte-400 text-center">Results update in real-time as workers respond</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={handleReset} className="btn-primary flex-1">
                Create New Poll
              </button>
              <button onClick={() => navigate('/hr')} className="btn-outline flex-1">
                Back to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
