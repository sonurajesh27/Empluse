import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  AlertTriangle, TrendingDown, Users, MessageSquare,
  ThumbsUp, ThumbsDown, ArrowLeft, Trophy, Flame
} from 'lucide-react'

// ── Mock data ──────────────────────────────────────────────
const categoryData = [
  { name: 'Supervisor', count: 34, negative: 22 },
  { name: 'Canteen', count: 28, negative: 18 },
  { name: 'Shift', count: 21, negative: 14 },
  { name: 'Safety', count: 12, negative: 9 },
  { name: 'Other', count: 8, negative: 3 },
]

const weeklyTrend = [
  { week: 'W1', score: 3.8 },
  { week: 'W2', score: 3.5 },
  { week: 'W3', score: 3.2 },
  { week: 'W4', score: 2.9 },
  { week: 'W5', score: 2.6 },
  { week: 'W6', score: 3.1 },
]

const sentimentData = [
  { name: 'Positive', value: 38 },
  { name: 'Neutral', value: 25 },
  { name: 'Negative', value: 37 },
]

const SENTIMENT_COLORS = ['#6e4e2a', '#d9bfa0', '#ef4444']

const recentFeedback = [
  { id: 1, category: 'Supervisor', sentiment: 'negative', text: 'Supervisor shouts in front of everyone during morning shift.', time: '2h ago', confidence: 'High' },
  { id: 2, category: 'Canteen', sentiment: 'negative', text: 'Food is cold and the break time is too short to finish eating.', time: '3h ago', confidence: 'High' },
  { id: 3, category: 'Shift', sentiment: 'neutral', text: 'Night shift timings are difficult, transport is not available.', time: '5h ago', confidence: 'High' },
  { id: 4, category: 'Safety', sentiment: 'negative', text: 'Floor near machine 4 is wet and nobody is fixing it.', time: '6h ago', confidence: 'Medium' },
  { id: 5, category: 'Supervisor', sentiment: 'positive', text: 'Team leader in B shift is very helpful and fair.', time: '8h ago', confidence: 'High' },
]

const flightRiskWorkers = [
  { id: 'EMP-1042', dept: 'Assembly', riskScore: 87, trend: '↓ dropping 3 weeks' },
  { id: 'EMP-2218', dept: 'Packaging', riskScore: 74, trend: '↓ absent twice' },
  { id: 'EMP-0831', dept: 'Quality', riskScore: 68, trend: '↓ no feedback 2 weeks' },
]

const topWorkers = [
  { id: 'EMP-1103', name: 'Ravi K.', dept: 'Assembly', score: 96, streak: 18, badge: '⭐ Star Performer' },
  { id: 'EMP-2041', name: 'Meena S.', dept: 'Packaging', score: 91, streak: 15, badge: '🔥 Consistent' },
  { id: 'EMP-0712', name: 'Arjun P.', dept: 'Quality', score: 88, streak: 12, badge: '👥 Peer Choice' },
]

const CATEGORY_COLORS: Record<string, string> = {
  Supervisor: 'bg-orange-100 text-orange-700',
  Canteen: 'bg-green-100 text-green-700',
  Shift: 'bg-blue-100 text-blue-700',
  Safety: 'bg-red-100 text-red-700',
  Other: 'bg-latte-100 text-latte-600',
}

const SENTIMENT_TAG: Record<string, string> = {
  positive: 'bg-green-100 text-green-700',
  neutral: 'bg-latte-100 text-latte-600',
  negative: 'bg-red-100 text-red-700',
}

type Tab = 'overview' | 'feedback' | 'risk' | 'rewards'

export default function HRDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'risk', label: 'Flight Risk' },
    { id: 'rewards', label: 'Rewards' },
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="bg-white border-b border-latte-100 px-5 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-latte-400 hover:text-latte-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-semibold text-espresso leading-tight">EmPulse Dashboard</h1>
          <p className="text-xs text-latte-400">HR & Manager View</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-latte-500">Live</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-latte-100 px-5">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all
                ${activeTab === tab.id
                  ? 'border-latte-700 text-latte-700'
                  : 'border-transparent text-latte-400 hover:text-latte-600'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <>
            {/* Alert banner */}
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-700">Attrition Risk Alert</p>
                <p className="text-xs text-red-500 mt-0.5">3 workers showing early exit signals this week. Review Flight Risk tab.</p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MessageSquare, val: '103', label: 'Total Feedback', sub: 'This month', color: 'text-latte-700' },
                { icon: TrendingDown, val: '2.6', label: 'Avg Mood Score', sub: '↓ from 3.8 (W1)', color: 'text-red-600' },
                { icon: ThumbsDown, val: '37%', label: 'Negative', sub: 'Sentiment this week', color: 'text-red-500' },
                { icon: Users, val: '3', label: 'At Risk', sub: 'Flight risk workers', color: 'text-orange-600' },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="card">
                    <Icon className={`w-5 h-5 mb-2 ${s.color}`} />
                    <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-sm font-medium text-espresso">{s.label}</p>
                    <p className="text-xs text-latte-400 mt-0.5">{s.sub}</p>
                  </div>
                )
              })}
            </div>

            {/* Mood trend chart */}
            <div className="card">
              <p className="text-sm font-semibold text-espresso mb-4">Mood Trend (6 Weeks)</p>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={weeklyTrend}>
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#b08050' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[1, 5]} tick={{ fontSize: 12, fill: '#b08050' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #ead9c2', borderRadius: 8, fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#6e4e2a" strokeWidth={2.5} dot={{ fill: '#6e4e2a', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category bar chart */}
            <div className="card">
              <p className="text-sm font-semibold text-espresso mb-4">Complaints by Category</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={categoryData} barSize={28}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#b08050' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#b08050' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #ead9c2', borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="count" fill="#d9bfa0" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="negative" fill="#6e4e2a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2 justify-center">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-latte-300 inline-block" /><span className="text-xs text-latte-500">Total</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-mocha inline-block" /><span className="text-xs text-latte-500">Negative</span></div>
              </div>
            </div>

            {/* Sentiment pie */}
            <div className="card">
              <p className="text-sm font-semibold text-espresso mb-4">Sentiment Breakdown</p>
              <div className="flex items-center justify-center">
                <PieChart width={220} height={160}>
                  <Pie data={sentimentData} cx={110} cy={75} outerRadius={65} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                    {sentimentData.map((_, i) => <Cell key={i} fill={SENTIMENT_COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ead9c2', borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </div>
            </div>
          </>
        )}

        {/* ── FEEDBACK TAB ── */}
        {activeTab === 'feedback' && (
          <>
            <div>
              <h2 className="text-base font-semibold text-espresso mb-1">Recent Feedback</h2>
              <p className="text-sm text-latte-500 mb-4">All submissions are anonymous. AI-categorized & translated.</p>
            </div>

            <div className="space-y-3">
              {recentFeedback.map((fb) => (
                <div key={fb.id} className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`tag ${CATEGORY_COLORS[fb.category]}`}>{fb.category}</span>
                    <span className={`tag ${SENTIMENT_TAG[fb.sentiment]}`}>{fb.sentiment}</span>
                    <span className="ml-auto text-xs text-latte-300">{fb.time}</span>
                  </div>
                  <p className="text-sm text-espresso leading-relaxed">{fb.text}</p>
                  <p className="text-xs text-latte-300 mt-2">Confidence: {fb.confidence} · AI processed</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── FLIGHT RISK TAB ── */}
        {activeTab === 'risk' && (
          <>
            <div>
              <h2 className="text-base font-semibold text-espresso mb-1">Flight Risk Workers</h2>
              <p className="text-sm text-latte-500 mb-4">Workers showing early attrition signals. Act before they resign.</p>
            </div>

            <div className="space-y-3">
              {flightRiskWorkers.map((w) => (
                <div key={w.id} className="card border-l-4 border-l-red-400">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-espresso">{w.id}</p>
                      <p className="text-sm text-latte-500">{w.dept} Department</p>
                      <p className="text-xs text-red-500 mt-1">{w.trend}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-500">{w.riskScore}</p>
                      <p className="text-xs text-latte-400">risk score</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-latte-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${w.riskScore}%` }} />
                  </div>
                  <button className="mt-3 text-xs text-latte-600 font-medium hover:text-latte-800 transition-colors">
                    Schedule check-in →
                  </button>
                </div>
              ))}
            </div>

            <div className="card bg-latte-50">
              <p className="text-xs text-latte-600 leading-relaxed">
                <strong>How risk score is calculated:</strong> Mood trend (40%) + Attendance pattern (30%) + Feedback engagement (20%) + Tenure (10%). Score above 65 triggers an alert.
              </p>
            </div>
          </>
        )}

        {/* ── REWARDS TAB ── */}
        {activeTab === 'rewards' && (
          <>
            <div>
              <h2 className="text-base font-semibold text-espresso mb-1">Top Performers</h2>
              <p className="text-sm text-latte-500 mb-4">This month's recognized workers. Rewards auto-generated.</p>
            </div>

            <div className="space-y-3">
              {topWorkers.map((w, i) => (
                <div key={w.id} className="card">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                      ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-latte-200 text-latte-700' : 'bg-orange-100 text-orange-700'}`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-espresso">{w.name}</p>
                      <p className="text-sm text-latte-500">{w.dept} · {w.id}</p>
                      <span className="tag bg-latte-100 text-latte-700 mt-1">{w.badge}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-mocha">{w.score}</p>
                      <p className="text-xs text-latte-400">score</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-latte-500">{w.streak}-day attendance streak</span>
                    <button className="ml-auto text-xs bg-latte-700 text-white px-3 py-1.5 rounded-lg hover:bg-latte-800 transition-colors">
                      Generate Letter
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Reward formula */}
            <div className="card bg-latte-50">
              <p className="text-sm font-semibold text-espresso mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-mocha" /> Score Formula
              </p>
              <div className="space-y-1 text-xs text-latte-600">
                <div className="flex justify-between"><span>Attendance</span><span>40%</span></div>
                <div className="flex justify-between"><span>Tenure</span><span>20%</span></div>
                <div className="flex justify-between"><span>Feedback consistency</span><span>20%</span></div>
                <div className="flex justify-between"><span>Peer nominations</span><span>20%</span></div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
