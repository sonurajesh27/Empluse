import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { COMPLAINT_CATEGORIES } from '../../data/sectors'
import VoiceRecorder from '../../components/VoiceRecorder'
import {
  ChevronLeft, UserX, Building2, UtensilsCrossed, ShieldAlert,
  Wrench, Heart, Banknote, MessageSquare, Lock, CheckCircle2
} from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  UserX, Building2, UtensilsCrossed, ShieldAlert, Wrench, Heart, Banknote, MessageSquare
}

const COLOR_MAP: Record<string, string> = {
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  blue:   'bg-blue-100 text-blue-700 border-blue-200',
  green:  'bg-green-100 text-green-700 border-green-200',
  red:    'bg-red-100 text-red-700 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  pink:   'bg-pink-100 text-pink-700 border-pink-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  gray:   'bg-gray-100 text-gray-700 border-gray-200',
}

type Mode = 'voice' | 'text'
type Urgency = 'Low' | 'Medium' | 'High'

export default function RaiseComplaint() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [mode, setMode] = useState<Mode>('text')
  const [description, setDescription] = useState('')
  const [voiceRecorded, setVoiceRecorded] = useState(false)
  const [urgency, setUrgency] = useState<Urgency>('Medium')
  const [submitted, setSubmitted] = useState(false)

  const selectedCat = COMPLAINT_CATEGORIES.find((c) => c.id === category)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => navigate('/employee'), 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-latte-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-latte-900 mb-2">Complaint Submitted</h2>
        <p className="text-latte-500 text-sm">Your feedback has been recorded anonymously.</p>
        <p className="text-latte-400 text-xs mt-2">Redirecting…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-latte-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-latte-50 border-b border-latte-200 px-4 py-3 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/employee')} className="text-latte-500 hover:text-latte-700">
            <ChevronLeft size={22} />
          </button>
          <h2 className="font-semibold text-latte-900">Raise Complaint</h2>
        </div>
        {/* Progress */}
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? 'bg-latte-700' : 'bg-latte-200'}`} />
          ))}
        </div>
        <p className="text-latte-400 text-xs mt-1.5">Step {step} of 4 — {['Category', 'Sub-category', 'Describe', 'Confirm'][step - 1]}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h3 className="font-semibold text-latte-900 mb-4">What is the issue about?</h3>
            <div className="grid grid-cols-2 gap-3">
              {COMPLAINT_CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.icon] ?? MessageSquare
                const colorClass = COLOR_MAP[cat.color] ?? COLOR_MAP.gray
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setCategory(cat.id); setSubCategory(''); setStep(2) }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all hover:shadow-sm active:scale-95
                      ${category === cat.id ? `border-latte-600 bg-latte-50` : 'border-latte-100 bg-white'}`}
                  >
                    <div className={`p-2.5 rounded-xl border ${colorClass}`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-medium text-latte-700 text-center leading-tight">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && selectedCat && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              {(() => { const Icon = ICON_MAP[selectedCat.icon] ?? MessageSquare; const cc = COLOR_MAP[selectedCat.color]; return <div className={`p-2 rounded-xl border ${cc}`}><Icon size={18}/></div> })()}
              <span className="font-semibold text-latte-800">{selectedCat.label}</span>
            </div>
            <h3 className="font-semibold text-latte-900 mb-3">Select the specific issue:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCat.subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => { setSubCategory(sub); setStep(3) }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                    ${subCategory === sub ? 'bg-latte-700 text-white border-latte-700' : 'bg-white text-latte-700 border-latte-200 hover:bg-latte-50'}`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h3 className="font-semibold text-latte-900 mb-4">Describe the issue</h3>

            {/* Toggle */}
            <div className="flex bg-latte-100 rounded-xl p-1 mb-5 gap-1">
              {(['voice', 'text'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${mode === m ? 'bg-white text-latte-700 shadow-sm' : 'text-latte-500'}`}
                >
                  {m === 'voice' ? '🎤 Voice' : '✏️ Text'}
                </button>
              ))}
            </div>

            {mode === 'voice' && <VoiceRecorder onRecorded={() => setVoiceRecorded(true)} />}
            {mode === 'text' && (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail…"
                rows={5}
                className="input-field resize-none"
              />
            )}

            {/* Urgency */}
            <div className="mt-5">
              <p className="text-latte-600 text-sm font-medium mb-2">Urgency Level (optional)</p>
              <div className="flex gap-2">
                {(['Low', 'Medium', 'High'] as Urgency[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUrgency(u)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all
                      ${urgency === u
                        ? u === 'High' ? 'bg-red-500 text-white border-red-500'
                          : u === 'Medium' ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-green-500 text-white border-green-500'
                        : 'bg-white text-latte-500 border-latte-200'}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(4)}
              disabled={mode === 'text' ? description.trim().length < 5 : !voiceRecorded}
              className="btn-primary w-full mt-6"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && selectedCat && (
          <div>
            <h3 className="font-semibold text-latte-900 mb-4">Confirm & Submit</h3>

            <div className="card space-y-3 mb-4">
              <Row label="Sector" value={currentUser?.sector ?? '—'} />
              <Row label="Category" value={selectedCat.label} />
              <Row label="Issue" value={subCategory} />
              <Row label="Mode" value={mode === 'voice' ? '🎤 Voice recording' : '✏️ Text'} />
              <Row label="Urgency" value={urgency} />
            </div>

            <div className="flex items-center gap-2 bg-latte-50 border border-latte-200 rounded-2xl px-4 py-3 mb-6">
              <Lock size={15} className="text-latte-500 shrink-0" />
              <p className="text-latte-600 text-xs">
                Submitting anonymously from <strong>{currentUser?.sector}</strong>. Your identity is never revealed.
              </p>
            </div>

            <button onClick={handleSubmit} className="btn-primary w-full">
              Submit Complaint
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-latte-400">{label}</span>
      <span className="text-latte-800 font-medium">{value}</span>
    </div>
  )
}
