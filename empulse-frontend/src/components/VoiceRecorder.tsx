import { useState } from 'react'
import { Mic, MicOff, CheckCircle2 } from 'lucide-react'

interface Props {
  onRecorded?: () => void
}

type RecordState = 'idle' | 'recording' | 'done'

export default function VoiceRecorder({ onRecorded }: Props) {
  const [state, setState] = useState<RecordState>('idle')
  const [seconds, setSeconds] = useState(0)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)

  const startRecording = () => {
    setState('recording')
    setSeconds(0)
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    setIntervalId(id)
  }

  const stopRecording = () => {
    if (intervalId) clearInterval(intervalId)
    setState('done')
    onRecorded?.()
  }

  const reset = () => {
    setState('idle')
    setSeconds(0)
  }

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {state === 'done' ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-300 flex items-center justify-center">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <p className="text-green-600 font-semibold">Recording saved ({formatTime(seconds)})</p>
          <button onClick={reset} className="text-latte-500 text-sm underline">Record again</button>
        </div>
      ) : (
        <>
          <button
            onClick={state === 'idle' ? startRecording : stopRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200
              ${state === 'recording'
                ? 'bg-red-100 border-2 border-red-400 animate-pulse'
                : 'bg-latte-100 border-2 border-latte-300 hover:bg-latte-200'
              }`}
          >
            {state === 'recording' ? (
              <MicOff size={40} className="text-red-500" />
            ) : (
              <Mic size={40} className="text-latte-600" />
            )}
          </button>
          <p className="text-latte-600 text-sm font-medium">
            {state === 'idle' ? 'Tap to start recording' : `Recording… ${formatTime(seconds)}`}
          </p>
          {state === 'idle' && (
            <p className="text-latte-400 text-xs">Speak in Tamil or English</p>
          )}
        </>
      )}
    </div>
  )
}
