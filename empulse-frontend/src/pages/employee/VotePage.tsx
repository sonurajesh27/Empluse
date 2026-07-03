import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { mockEmployees } from '../../data/mockEmployees'
import { CheckCircle2, Clock } from 'lucide-react'

export default function VotePage() {
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [voted, setVoted] = useState(false)
  const [votedFor, setVotedFor] = useState('')

  const colleagues = mockEmployees.filter(
    (e) => e.role === 'employee' && e.sector === currentUser?.sector && e.id !== currentUser?.id
  )

  const daysUntilResults = 5

  const handleSelect = (id: string, name: string) => {
    setSelectedId(id)
    setVotedFor(name)
    setConfirming(true)
  }

  const handleConfirm = () => {
    setVoted(true)
    setConfirming(false)
  }

  if (voted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={36} className="text-green-500" />
        </div>
        <p className="text-lg font-semibold text-latte-900 mb-2">{t('vote.locked')}</p>
        <p className="text-latte-500 text-sm mb-1">You voted for <strong>{votedFor}</strong></p>
        <div className="flex items-center gap-2 mt-4 text-latte-400 text-sm">
          <Clock size={14} />
          <span>{t('vote.results', { days: String(daysUntilResults) })}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-latte-900 mb-1">{t('employee.vote')}</h3>
        <p className="text-latte-500 text-sm">Vote for the best colleague in your sector this cycle</p>
      </div>

      {confirming && (
        <div className="card bg-amber-50 border-amber-200 border-2">
          <p className="text-sm font-medium text-amber-800 mb-3">
            {t('vote.confirm', { name: votedFor })}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleConfirm}
              className="flex-1 py-2.5 bg-latte-700 text-white rounded-xl text-sm font-medium hover:bg-latte-800 transition-colors"
            >
              Confirm Vote
            </button>
            <button
              onClick={() => { setConfirming(false); setSelectedId(null) }}
              className="flex-1 py-2.5 bg-white text-latte-600 border border-latte-200 rounded-xl text-sm font-medium hover:bg-latte-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {colleagues.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-latte-400 text-sm">No colleagues in your sector to vote for</p>
          </div>
        ) : (
          colleagues.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelect(c.id, c.name)}
              disabled={confirming}
              className={`w-full card flex items-center gap-4 text-left transition-all hover:shadow-md active:scale-[0.98] ${
                selectedId === c.id ? 'border-latte-600 border-2' : ''
              } ${confirming ? 'opacity-50' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-latte-100 flex items-center justify-center text-latte-700 font-bold text-sm shrink-0">
                {c.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="font-medium text-latte-800 text-sm">{c.name}</p>
                <p className="text-latte-400 text-xs">{c.id} · {c.roleType}</p>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="flex items-center gap-2 text-latte-400 text-xs justify-center pt-2">
        <Clock size={12} />
        <span>{t('vote.results', { days: String(daysUntilResults) })}</span>
      </div>
    </div>
  )
}
