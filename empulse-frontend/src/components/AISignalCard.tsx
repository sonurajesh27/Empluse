import { AISignal } from '../data/mockAISignals'

interface Props {
  signal: AISignal
  compact?: boolean
}

const SEVERITY_STYLE: Record<string, string> = {
  critical: 'bg-red-50 border-red-300 border-l-red-500',
  warning:  'bg-orange-50 border-orange-200 border-l-orange-400',
  info:     'bg-blue-50 border-blue-200 border-l-blue-400',
}

const SEVERITY_TITLE: Record<string, string> = {
  critical: 'text-red-700',
  warning:  'text-orange-700',
  info:     'text-blue-700',
}

const SEVERITY_DETAIL: Record<string, string> = {
  critical: 'text-red-600',
  warning:  'text-orange-600',
  info:     'text-blue-600',
}

export default function AISignalCard({ signal, compact = false }: Props) {
  return (
    <div className={`border border-l-4 rounded-xl px-4 py-3 ${SEVERITY_STYLE[signal.severity]}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className={`text-sm font-semibold ${SEVERITY_TITLE[signal.severity]}`}>{signal.title}</p>
          {!compact && (
            <p className={`text-xs mt-1 leading-relaxed ${SEVERITY_DETAIL[signal.severity]}`}>{signal.detail}</p>
          )}
          {compact && (
            <p className={`text-xs mt-0.5 line-clamp-1 ${SEVERITY_DETAIL[signal.severity]}`}>{signal.detail}</p>
          )}
        </div>
        <span className="text-xs text-latte-400 whitespace-nowrap shrink-0">{signal.timestamp}</span>
      </div>
      {signal.affectedId && (
        <p className="text-xs text-latte-400 mt-1.5">→ {signal.affectedId}</p>
      )}
      <p className="text-xs text-latte-300 mt-1">🤖 AI-generated signal</p>
    </div>
  )
}
