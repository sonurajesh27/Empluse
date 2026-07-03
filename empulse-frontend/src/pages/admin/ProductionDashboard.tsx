import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Factory, Cpu, AlertTriangle, BrainCircuit } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts'

const shiftData = [
  { shift: 'Shift A', output: 450 },
  { shift: 'Shift B', output: 380 },
  { shift: 'Shift C', output: 290 },
]

const machines = [
  { id: 1, name: 'CNC Mill #1', status: 'green', statusText: 'Running' },
  { id: 2, name: 'CNC Mill #2', status: 'green', statusText: 'Running' },
  { id: 3, name: 'Lathe #1', status: 'amber', statusText: 'Maintenance Due' },
  { id: 4, name: 'Lathe #2', status: 'green', statusText: 'Running' },
  { id: 5, name: 'Press #1', status: 'red', statusText: 'Down' },
  { id: 6, name: 'Welder #1', status: 'amber', statusText: 'Slow' },
  { id: 7, name: 'Welder #2', status: 'green', statusText: 'Running' },
  { id: 8, name: 'Robot Arm', status: 'green', statusText: 'Running' },
]

const downtimeData = [
  { day: 'Mon', hours: 1.2 },
  { day: 'Tue', hours: 0.8 },
  { day: 'Wed', hours: 2.5 },
  { day: 'Thu', hours: 1.8 },
  { day: 'Fri', hours: 3.2 },
  { day: 'Sat', hours: 0.5 },
  { day: 'Sun', hours: 0.3 },
]

const moodVsProductionData = [
  { sector: 'Asm A', mood: 3.8, production: 92 },
  { sector: 'Asm B', mood: 3.2, production: 85 },
  { sector: 'Welding', mood: 1.9, production: 68 },
  { sector: 'Packaging', mood: 4.1, production: 95 },
  { sector: 'QC', mood: 3.5, production: 88 },
  { sector: 'Paint', mood: 2.4, production: 72 },
]

const statusColor: Record<string, { bg: string; dot: string; text: string }> = {
  green: { bg: 'bg-green-50 border-green-200', dot: 'bg-green-500', text: 'text-green-700' },
  amber: { bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-500', text: 'text-amber-700' },
  red: { bg: 'bg-red-50 border-red-200', dot: 'bg-red-500', text: 'text-red-700' },
}

export default function ProductionDashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-1.5 text-latte-300 hover:text-white text-sm mb-3">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="flex items-center gap-2">
          <Factory size={20} className="text-white" />
          <h1 className="text-white font-bold text-xl">Production Dashboard</h1>
        </div>
        <p className="text-latte-300 text-sm mt-1">Real-time production metrics & AI correlations</p>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto space-y-5">
        {/* Output per shift */}
        <div className="card">
          <p className="font-semibold text-latte-900 mb-1">Output per Shift</p>
          <p className="text-latte-400 text-xs mb-4">Units produced today</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={shiftData} barSize={40}>
              <XAxis dataKey="shift" tick={{ fontSize: 12, fill: '#6e4e2a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#b08050' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ead9c2', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="output" fill="#6e4e2a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Machine status grid */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={16} className="text-latte-700" />
            <p className="font-semibold text-latte-900">Machine Status</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {machines.map((m) => {
              const colors = statusColor[m.status]
              return (
                <div key={m.id} className={`border rounded-xl p-3 ${colors.bg}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                    <span className={`text-xs font-medium ${colors.text}`}>{m.statusText}</span>
                  </div>
                  <p className="text-sm font-medium text-latte-800">{m.name}</p>
                </div>
              )
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-latte-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" />Running</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />Warning</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" />Down</span>
          </div>
        </div>

        {/* AI Insight correlation */}
        <div className="card bg-latte-50 border-latte-200">
          <div className="flex items-start gap-3">
            <BrainCircuit size={20} className="text-latte-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-latte-900 mb-1">AI Insight</p>
              <p className="text-sm text-latte-700">
                Production dropped <strong className="text-red-600">12%</strong> in Welding — correlates with{' '}
                <strong className="text-red-600">5 safety complaints</strong> this week.
              </p>
              <p className="text-xs text-latte-500 mt-2">
                Recommendation: Address safety concerns to restore output. Historical pattern shows 85% correlation between unresolved safety issues and production decline.
              </p>
            </div>
          </div>
        </div>

        {/* Downtime chart */}
        <div className="card">
          <p className="font-semibold text-latte-900 mb-1">Downtime This Week</p>
          <p className="text-latte-400 text-xs mb-4">Hours of machine downtime per day</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={downtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ead9c2" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#b08050' }} />
              <YAxis tick={{ fontSize: 11, fill: '#b08050' }} unit="h" />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ead9c2', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="hours" stroke="#6e4e2a" strokeWidth={2} dot={{ fill: '#6e4e2a', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sector mood vs production */}
        <div className="card">
          <p className="font-semibold text-latte-900 mb-1">Mood vs Production Correlation</p>
          <p className="text-latte-400 text-xs mb-4">Sector mood score (0-5) vs production % target</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={moodVsProductionData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ead9c2" />
              <XAxis dataKey="sector" tick={{ fontSize: 10, fill: '#b08050' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#b08050' }} domain={[0, 5]} label={{ value: 'Mood', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#b08050' } }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#b08050' }} domain={[0, 100]} label={{ value: 'Prod %', angle: 90, position: 'insideRight', style: { fontSize: 10, fill: '#b08050' } }} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ead9c2', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="mood" fill="#c4a07a" radius={[4, 4, 0, 0]} name="Mood Score" />
              <Bar yAxisId="right" dataKey="production" fill="#6e4e2a" radius={[4, 4, 0, 0]} name="Production %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-start gap-2">
            <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              <strong>Welding</strong> and <strong>Paint Shop</strong> show strong negative correlation between low mood and low production output.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
