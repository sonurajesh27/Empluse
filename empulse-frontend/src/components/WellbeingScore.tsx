interface WellbeingScoreProps {
  name: string
  employeeId: string
  sector: string
  score: number
  breakdown: {
    attendance: number
    mood: number
    complaints: number
    votes: number
    tenure: number
  }
}

export default function WellbeingScore({ name, employeeId, sector, score, breakdown }: WellbeingScoreProps) {
  const color = score > 70 ? 'text-green-600' : score > 40 ? 'text-amber-600' : 'text-red-600'
  const strokeColor = score > 70 ? '#16a34a' : score > 40 ? '#d97706' : '#dc2626'
  const bgStroke = '#f5ede0'

  return (
    <div className="card">
      <div className="flex items-start gap-4">
        {/* Circular progress */}
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke={bgStroke} strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke={strokeColor} strokeWidth="3"
              strokeDasharray={`${score} ${100 - score}`} strokeLinecap="round" />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${color}`}>
            {score}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-latte-900 text-sm">{name}</p>
          <p className="text-latte-400 text-xs">{employeeId} · {sector}</p>
          <div className="grid grid-cols-5 gap-1 mt-2">
            <MiniBar label="Att" value={breakdown.attendance} />
            <MiniBar label="Mood" value={breakdown.mood} />
            <MiniBar label="Comp" value={breakdown.complaints} />
            <MiniBar label="Vote" value={breakdown.votes} />
            <MiniBar label="Tnr" value={breakdown.tenure} />
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniBar({ label, value }: { label: string; value: number }) {
  const barColor = value > 70 ? 'bg-green-400' : value > 40 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="text-center">
      <div className="w-full h-8 bg-latte-100 rounded-sm relative overflow-hidden">
        <div
          className={`absolute bottom-0 w-full rounded-sm transition-all ${barColor}`}
          style={{ height: `${value}%` }}
        />
      </div>
      <p className="text-[9px] text-latte-400 mt-0.5">{label}</p>
    </div>
  )
}
