import { useState } from 'react'

const SECTORS = ['Asm A', 'Asm B', 'Pkg', 'QC', 'Weld', 'Paint', 'WH', 'Maint']

// Mock weekly mood data (1-5 scale)
const weeklyMoodData: Record<string, number[]> = {
  'Asm A':  [3.2, 2.8, 3.0, 2.5, 3.1, 2.9],
  'Asm B':  [3.5, 3.3, 3.1, 3.4, 3.0, 3.2],
  'Pkg':    [2.8, 3.0, 2.6, 3.2, 2.4, 2.7],
  'QC':     [3.8, 3.6, 3.5, 3.9, 3.7, 3.4],
  'Weld':   [2.2, 2.0, 1.8, 1.9, 2.1, 1.7],
  'Paint':  [2.5, 2.3, 2.8, 2.2, 2.6, 2.4],
  'WH':     [3.9, 3.7, 4.0, 3.8, 3.6, 3.5],
  'Maint':  [3.3, 3.5, 3.2, 3.4, 3.6, 3.1],
}

function getMoodColor(score: number): string {
  if (score >= 3.5) return 'bg-green-200 border-green-300'
  if (score >= 2.5) return 'bg-amber-200 border-amber-300'
  return 'bg-red-200 border-red-300'
}

function getMoodTextColor(score: number): string {
  if (score >= 3.5) return 'text-green-800'
  if (score >= 2.5) return 'text-amber-800'
  return 'text-red-800'
}

export default function MoodTimeSlider() {
  const [weekIndex, setWeekIndex] = useState(5) // default to most recent

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-latte-900 text-sm">Mood Heatmap</p>
          <p className="text-latte-400 text-xs">Sector mood over time</p>
        </div>
        <span className="text-xs bg-latte-100 text-latte-600 px-2 py-1 rounded-lg">
          Week {weekIndex + 1}
        </span>
      </div>

      {/* Sector grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {SECTORS.map((sector) => {
          const score = weeklyMoodData[sector]?.[weekIndex] ?? 3.0
          return (
            <div
              key={sector}
              className={`p-3 rounded-xl border text-center transition-all duration-500 ${getMoodColor(score)}`}
            >
              <p className={`text-xs font-semibold ${getMoodTextColor(score)}`}>{sector}</p>
              <p className={`text-lg font-bold mt-0.5 ${getMoodTextColor(score)}`}>{score.toFixed(1)}</p>
            </div>
          )
        })}
      </div>

      {/* Slider */}
      <div className="px-1">
        <input
          type="range"
          min={0}
          max={5}
          value={weekIndex}
          onChange={(e) => setWeekIndex(Number(e.target.value))}
          className="w-full h-2 bg-latte-200 rounded-lg appearance-none cursor-pointer accent-latte-700"
        />
        <div className="flex justify-between mt-1 text-[10px] text-latte-400">
          <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-3 justify-center text-xs text-latte-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 inline-block" />≥3.5</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-200 inline-block" />2.5-3.4</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200 inline-block" />&lt;2.5</span>
      </div>
    </div>
  )
}
