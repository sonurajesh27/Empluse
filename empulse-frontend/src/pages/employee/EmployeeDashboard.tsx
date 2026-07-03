import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, MessageSquare, Trophy, Plus, Clock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { mockComplaints, Complaint } from '../../data/mockComplaints'
import { mockRewards } from '../../data/mockRewards'
import BottomNav from '../../components/NavBar'
import StatusBadge from '../../components/StatusBadge'
import PollCard from '../../components/PollCard'

const LAST_SUBMITTED_DAYS_AGO = 8
const CYCLE_DAYS = 15

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function EmployeeDashboard() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const { t } = useLanguage()
  const [tab, setTab] = useState('home')

  const user = currentUser!
  const sectorComplaints = mockComplaints.filter((c) => c.sector === user.sector)
  const daysRemaining = CYCLE_DAYS - LAST_SUBMITTED_DAYS_AGO
  const cycleProgress = (LAST_SUBMITTED_DAYS_AGO / CYCLE_DAYS) * 100

  const openCount = sectorComplaints.filter((c) => c.status !== 'resolved').length
  const sectorMood = openCount >= 4 ? 'critical' : openCount >= 2 ? 'moderate' : 'healthy'
  const moodConfig = {
    critical: { label: '🔴 Critical', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
    moderate: { label: '⚠️ Moderate', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
    healthy:  { label: '✅ Healthy',  bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
  }
  const mood = moodConfig[sectorMood]

  const myReward = mockRewards.find((r) => r.employeeId === user.id)
  const sectorLeaderboard = mockRewards.filter((r) => r.sector === user.sector).sort((a, b) => b.score - a.score).slice(0, 3)

  const navItems = [
    { label: t('employee.home'),       icon: <Home size={20} />,         tab: 'home' },
    { label: t('employee.complaints'), icon: <MessageSquare size={20} />, tab: 'complaints' },
    { label: t('employee.rewards'),    icon: <Trophy size={20} />,        tab: 'rewards' },
  ]

  return (
    <div className="min-h-screen bg-latte-50 max-w-md mx-auto relative">
      {/* Top strip */}
      <div className="bg-latte-700 px-4 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-latte-500 flex items-center justify-center text-white font-bold text-sm">
              {getInitials(user.name)}
            </div>
            <div>
              <p className="text-white font-semibold">{user.name}</p>
              <p className="text-latte-300 text-xs">{user.id} · {user.sector}</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/') }} className="text-latte-300 text-xs border border-latte-500 px-3 py-1.5 rounded-xl hover:border-latte-400">
            Logout
          </button>
        </div>
        <div className="mt-3">
          <span className="bg-latte-600 text-latte-200 text-xs px-3 py-1 rounded-full">
            {user.roleType === 'technical' ? 'Technical' : 'Non-Technical'} · Employee
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 pb-24 space-y-4">
        {/* HOME TAB */}
        {tab === 'home' && (
          <>
            {/* Still unresolved notice */}
            {(() => {
              const stillOpen = sectorComplaints.filter(c =>
                c.workerConfirmed === false ||
                (c.status === 'escalated' && c.hoursOpen > 24)
              )
              if (stillOpen.length === 0) return null
              return (
                <div className="bg-red-50 border-l-4 border-l-red-500 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-sm font-bold text-red-700 mb-1">⚠️ Your complaint is still unresolved</p>
                  {stillOpen.map(c => (
                    <div key={c.id} className="text-xs text-red-600 mb-1">
                      <span className="font-medium">{c.subCategory}</span> — raised {c.hoursOpen}h ago.{' '}
                      {c.workerConfirmed === false
                        ? 'You reported it as not fixed. It has been re-escalated.'
                        : `Currently with ${c.status === 'escalated' ? 'HR' : 'Admin'}. Awaiting action.`
                      }
                    </div>
                  ))}
                  <p className="text-xs text-red-500 mt-1">You will be notified here when it is resolved.</p>
                </div>
              )
            })()}

            {/* Feedback window */}
            <div className="card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-latte-900">{t('employee.feedbackWindow')}</p>
                  <p className="text-latte-500 text-sm mt-0.5">15-day cycle</p>
                </div>
                {daysRemaining <= 0 ? (
                  <span className="tag bg-green-100 text-green-700 border border-green-200">Open Now</span>
                ) : (
                  <span className="tag bg-amber-100 text-amber-700">{daysRemaining}d left</span>
                )}
              </div>
              <div className="w-full bg-latte-100 rounded-full h-2 mb-2">
                <div className="bg-latte-700 h-2 rounded-full transition-all" style={{ width: `${cycleProgress}%` }} />
              </div>
              <p className="text-latte-400 text-xs">{daysRemaining > 0 ? `Next window opens in ${daysRemaining} days` : 'You can raise a complaint now'}</p>
              {daysRemaining <= 0 && (
                <button onClick={() => navigate('/employee/raise')} className="btn-primary w-full mt-3 text-sm py-2.5">
                  Raise New Issue
                </button>
              )}
            </div>

            {/* My complaints summary */}
            <div className="card">
              <p className="font-semibold text-latte-900 mb-3">My Complaints</p>
              <div className="grid grid-cols-3 gap-3">
                <StatChip label="Total" value={sectorComplaints.length} bg="bg-latte-50" />
                <StatChip label="Pending" value={sectorComplaints.filter((c) => c.status === 'pending').length} bg="bg-amber-50" />
                <StatChip label="Resolved" value={sectorComplaints.filter((c) => c.status === 'resolved').length} bg="bg-green-50" />
              </div>
            </div>

            {/* Sector pulse */}
            <div className={`card ${mood.bg} border ${mood.border}`}>
              <p className="font-semibold text-latte-800 mb-1">{t('employee.sectorPulse')}</p>
              <p className="text-latte-500 text-xs mb-3">{user.sector} this week</p>
              <div className="flex items-center justify-between">
                <span className={`text-base font-semibold ${mood.text}`}>{mood.label}</span>
                <span className="text-latte-500 text-sm">{openCount} open issues</span>
              </div>
            </div>

            {/* Active Poll */}
            <PollCard question="Is the new canteen contractor better?" expiresIn="3h" />

            {/* Quick action */}
            <button
              onClick={() => navigate('/employee/raise')}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base"
            >
              <Plus size={20} /> {t('employee.raiseIssue')}
            </button>
          </>
        )}

        {/* COMPLAINTS TAB */}
        {tab === 'complaints' && (
          <>
            <h3 className="font-semibold text-latte-900">My Complaints</h3>

            {/* Resolution confirmation prompts */}
            {sectorComplaints.filter(c => c.status === 'resolved' && c.workerConfirmed === undefined).map(c => (
              <ResolutionConfirmCard key={c.id} complaint={c} />
            ))}

            {sectorComplaints.length === 0 ? (
              <div className="card text-center py-10">
                <MessageSquare size={36} className="text-latte-300 mx-auto mb-3" />
                <p className="text-latte-400 text-sm">No complaints yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sectorComplaints.map((c) => (
                  <div key={c.id} className="card p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="tag bg-latte-100 text-latte-700 text-xs">{c.category}</span>
                        <span className="tag bg-latte-50 text-latte-500 border border-latte-100 text-xs">{c.subCategory}</span>
                      </div>
                      <StatusBadge status={c.status} size="sm" />
                    </div>
                    <p className="text-latte-500 text-sm line-clamp-2">{c.text}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-latte-400 text-xs flex items-center gap-1">
                        <Clock size={11} /> {timeAgo(c.timestamp)}
                      </span>
                      <span className="text-latte-300 text-xs italic">🔒 Anonymous</span>
                    </div>
                    {c.workerConfirmed === false && (
                      <div className="text-xs text-red-600 bg-red-50 rounded-lg px-2 py-1.5">
                        ⚠️ You reported this as still unresolved — complaint reopened
                      </div>
                    )}
                    {c.workerConfirmed === true && (
                      <div className="text-xs text-green-600 bg-green-50 rounded-lg px-2 py-1.5">
                        ✅ You confirmed this was resolved
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* REWARDS TAB */}
        {tab === 'rewards' && (
          <>
            {/* Reward notification */}
            {(() => {
              const notifications = JSON.parse(localStorage.getItem('empulse_notifications') || '[]')
              const myRewardNotif = notifications.find((n: { employeeId: string; type: string; read: boolean }) =>
                n.employeeId === user.id && n.type === 'reward' && !n.read
              )
              if (!myRewardNotif) return null
              return (
                <div className="card bg-green-50 border-2 border-green-300 animate-fade-in-up">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <p className="font-bold text-green-800">Congratulations!</p>
                      <p className="text-sm text-green-700">You received a Recognition Letter from HR.</p>
                    </div>
                  </div>
                </div>
              )
            })()}

            {myReward ? (
              <>
                <div className="card text-center py-6">
                  <p className="text-latte-500 text-sm mb-1">My Score</p>
                  <div className="relative w-24 h-24 mx-auto my-3">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f5ede0" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6e4e2a" strokeWidth="3"
                        strokeDasharray={`${myReward.score} ${100 - myReward.score}`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-latte-700">{myReward.score}</span>
                  </div>
                  <div className="flex justify-center gap-4 text-sm mt-2">
                    <div className="text-center">
                      <p className="font-bold text-latte-700">🔥 {myReward.streak}</p>
                      <p className="text-latte-400 text-xs">Day streak</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-latte-700">👍 {myReward.votes}</p>
                      <p className="text-latte-400 text-xs">Votes received</p>
                    </div>
                  </div>
                </div>

                {myReward.badges.length > 0 && (
                  <div className="card">
                    <p className="font-semibold text-latte-900 mb-3">My Badges</p>
                    <div className="flex flex-wrap gap-2">
                      {myReward.badges.map((b) => (
                        <span key={b} className="bg-latte-100 text-latte-700 border border-latte-200 rounded-xl px-3 py-1.5 text-sm font-medium">{b}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="card text-center py-8">
                <Trophy size={36} className="text-latte-300 mx-auto mb-2" />
                <p className="text-latte-400 text-sm">No rewards data available yet</p>
              </div>
            )}

            <div className="card">
              <p className="font-semibold text-latte-900 mb-3">Sector Leaderboard</p>
              <p className="text-latte-400 text-xs mb-3">{user.sector} · Top 3</p>
              {sectorLeaderboard.map((r, i) => (
                <div key={r.employeeId} className={`flex items-center gap-3 py-2 ${i < sectorLeaderboard.length - 1 ? 'border-b border-latte-100' : ''}`}>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-latte-200 text-latte-700' : 'bg-latte-100 text-latte-500'}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-latte-800">{r.name}</p>
                    <p className="text-xs text-latte-400">{r.streak}d streak</p>
                  </div>
                  <span className="text-latte-700 font-bold text-sm">{r.score}</span>
                </div>
              ))}
              {sectorLeaderboard.length === 0 && <p className="text-latte-400 text-sm text-center py-4">No data for this sector</p>}
            </div>
          </>
        )}
      </div>

      <BottomNav items={navItems} activeTab={tab} onTabChange={setTab} />
    </div>
  )
}

function StatChip({ label, value, bg }: { label: string; value: number; bg: string }) {
  return (
    <div className={`${bg} rounded-xl p-3 text-center`}>
      <p className="text-xl font-bold text-latte-700">{value}</p>
      <p className="text-latte-400 text-xs mt-0.5">{label}</p>
    </div>
  )
}

function ResolutionConfirmCard({ complaint }: { complaint: Complaint }) {
  const [answered, setAnswered] = useState(false)
  const [answer, setAnswer] = useState<boolean | null>(null)

  if (answered) {
    return (
      <div className={`card border ${answer ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <p className={`text-sm font-medium ${answer ? 'text-green-700' : 'text-red-700'}`}>
          {answer ? '✅ Confirmed — marked as resolved' : '❌ Reported as still unresolved — complaint reopened & escalated'}
        </p>
      </div>
    )
  }

  return (
    <div className="card border-2 border-amber-300 bg-amber-50">
      <p className="text-xs font-semibold text-amber-700 mb-1">⚡ Resolution Confirmation</p>
      <p className="text-sm text-espresso mb-1">
        Your <strong>{complaint.subCategory}</strong> complaint was marked resolved by Admin.
      </p>
      <p className="text-sm font-medium text-espresso mb-3">Was this actually fixed?</p>
      <div className="flex gap-2">
        <button
          onClick={() => { setAnswer(true); setAnswered(true) }}
          className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
        >
          ✅ Yes, it's fixed
        </button>
        <button
          onClick={() => { setAnswer(false); setAnswered(true) }}
          className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
        >
          ❌ No, still a problem
        </button>
      </div>
    </div>
  )
}
