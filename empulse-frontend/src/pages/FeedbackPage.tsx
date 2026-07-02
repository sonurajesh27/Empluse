import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Mic, MicOff, Type,
  UserX, Clock, UtensilsCrossed, ShieldAlert,
  MessageSquare, ChevronRight
} from 'lucide-react'

const CATEGORIES = [
  { id: 'supervisor', label: 'Supervisor', icon: UserX, color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { id: 'shift', label: 'Shift Timing', icon: Clock, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'canteen', label: 'Canteen / Food', icon: UtensilsCrossed, color: 'bg-green-50 border-green-200 text-green-700' },
  { id: 'safety', label: 'Workplace Safety', icon: ShieldAlert, color: 'bg-red-50 border-red-200 text-red-700' },
  { id: 'other', label: 'Other', icon: MessageSquare, color: 'bg-latte-50 border-latte-200 text-latte-700' },
]

const QUESTIONS: Record<string, string[]> = {
  supervisor: [
    'Does your supervisor treat you with respect?',
    'Does your supervisor give clear instructions?',
    'Does your supervisor show favouritism?',
  ],
  shift: [
    'Is your shift timing suitable for you?',
    'Are you given enough notice before overtime?',
    'Is the shift change process fair?',
  ],
  canteen: [
    'Is the canteen food good quality?',
    'Is food available on time during breaks?',
    'Is the canteen clean and hygienic?',
  ],
  safety: [
    'Do you feel physically safe at your workstation?',
    'Are safety rules followed by everyone?',
    'Have you seen any unsafe conditions ignored?',
  ],
  other: [
    'Describe the issue you are facing.',
    'How long has this been a problem?',
    'Have you reported this before?',
  ],
}

const RATINGS = ['😞', '😕', '😐', '🙂', '😄']

type Mode = 'text' | 'voice'

export default function FeedbackPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'category' | 'questions' | 'voice'>('category')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>('text')
  const [ratings, setRatings] = useState<number[]>([])
  const [textFeedback, setTextFeedback] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDone, setRecordingDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const questions = selectedCategory ? QUESTIONS[selectedCategory] : []

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id)
    setRatings([])
    setStep('questions')
  }

  const handleRating = (qIdx: number, val: number) => {
    const updated = [...ratings]
    updated[qIdx] = val
    setRatings(updated)
  }

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      setRecordingDone(true)
      if (timerRef.current) clearTimeout(timerRef.current)
    } else {
      setIsRecording(true)
      setRecordingDone(false)
      timerRef.current = setTimeout(() => {
        setIsRecording(false)
        setRecordingDone(true)
      }, 8000)
    }
  }

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => navigate('/success'), 1800)
  }

  const allRated = ratings.length === questions.length && ratings.every((r) => r !== undefined)
  const canSubmit = mode === 'text' ? (allRated || textFeedback.trim().length > 10) : recordingDone

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 flex items-center gap-3">
        <button
          onClick={() => step === 'category' ? navigate('/') : setStep('category')}
          className="flex items-center gap-1.5 text-latte-500 hover:text-latte-700 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex-1 h-1.5 bg-latte-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-latte-500 rounded-full transition-all duration-500"
            style={{ width: step === 'category' ? '25%' : '75%' }}
          />
        </div>
        <p className="text-xs text-latte-400">Step 2 of 2</p>
      </div>

      <div className="flex-1 px-5 py-6">

        {/* STEP: Category */}
        {step === 'category' && (
          <div>
            <h1 className="text-xl font-semibold text-espresso mb-1">What's on your mind?</h1>
            <p className="text-sm text-latte-500 mb-6">Pick the area you want to give feedback on</p>

            <div className="space-y-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border text-left
                      hover:shadow-sm active:scale-98 transition-all duration-150 ${cat.color}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{cat.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP: Questions */}
        {step === 'questions' && selectedCategory && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`tag ${CATEGORIES.find(c => c.id === selectedCategory)?.color}`}>
                {CATEGORIES.find(c => c.id === selectedCategory)?.label}
              </span>
            </div>
            <h1 className="text-xl font-semibold text-espresso mb-1">Your Feedback</h1>
            <p className="text-sm text-latte-500 mb-5">Completely anonymous. Be honest.</p>

            {/* Mode toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode('text')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all
                  ${mode === 'text' ? 'bg-latte-700 text-white border-latte-700' : 'bg-white border-latte-200 text-latte-600 hover:bg-latte-50'}`}
              >
                <Type className="w-4 h-4" /> Text / Rating
              </button>
              <button
                onClick={() => setMode('voice')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all
                  ${mode === 'voice' ? 'bg-latte-700 text-white border-latte-700' : 'bg-white border-latte-200 text-latte-600 hover:bg-latte-50'}`}
              >
                <Mic className="w-4 h-4" /> Voice Note
              </button>
            </div>

            {/* TEXT MODE */}
            {mode === 'text' && (
              <div className="space-y-5">
                {questions.map((q, i) => (
                  <div key={i} className="card">
                    <p className="text-sm font-medium text-espresso mb-3">{q}</p>
                    <div className="flex justify-between">
                      {RATINGS.map((emoji, val) => (
                        <button
                          key={val}
                          onClick={() => handleRating(i, val)}
                          className={`w-11 h-11 text-xl rounded-xl transition-all duration-150 border-2
                            ${ratings[i] === val
                              ? 'bg-latte-700 border-latte-700 scale-110'
                              : 'bg-latte-50 border-transparent hover:border-latte-300 hover:scale-105'
                            }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="card">
                  <p className="text-sm font-medium text-espresso mb-2">Anything else? (optional)</p>
                  <textarea
                    value={textFeedback}
                    onChange={(e) => setTextFeedback(e.target.value)}
                    placeholder="Write in English or Tamil..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>
              </div>
            )}

            {/* VOICE MODE */}
            {mode === 'voice' && (
              <div className="flex flex-col items-center py-8 text-center">
                <p className="text-sm text-latte-500 mb-8">Speak in Tamil or English — AI will process it</p>

                <button
                  onClick={handleRecord}
                  className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300
                    ${isRecording
                      ? 'bg-red-500 animate-pulse shadow-lg shadow-red-200'
                      : recordingDone
                        ? 'bg-latte-700'
                        : 'bg-latte-100 hover:bg-latte-200 border-2 border-latte-200'
                    }`}
                >
                  {isRecording
                    ? <MicOff className="w-10 h-10 text-white" />
                    : <Mic className={`w-10 h-10 ${recordingDone ? 'text-white' : 'text-latte-600'}`} />
                  }
                </button>

                <p className="mt-5 font-medium text-espresso">
                  {isRecording ? 'Recording... Tap to stop' : recordingDone ? 'Recording saved ✓' : 'Tap to start recording'}
                </p>
                {isRecording && <p className="text-xs text-latte-400 mt-1">Auto-stops in 8 seconds</p>}
                {recordingDone && (
                  <div className="mt-4 px-4 py-2.5 bg-latte-50 rounded-xl border border-latte-100 text-sm text-latte-600">
                    🎙️ Voice recorded · AI will transcribe & analyze
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>

            <p className="text-center text-xs text-latte-300 mt-3">
              Submitted anonymously · Cannot be traced back to you
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
