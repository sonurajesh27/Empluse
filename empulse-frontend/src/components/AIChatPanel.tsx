import { useState, useRef, useEffect } from 'react'
import { BrainCircuit, X, Send } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
}

const RESPONSES: { keywords: string[]; response: string }[] = [
  { keywords: ['canteen', 'food'], response: 'This month: 6 canteen complaints. 4 from Packaging, 2 from QC. Main issue: Food quality poor.' },
  { keywords: ['welding', 'safety'], response: 'Welding sector has 5 open safety complaints. Risk level: Critical.' },
  { keywords: ['murugan', 'admin'], response: 'Admin Murugan has 2 fake resolutions flagged and 3 SLA breaches.' },
  { keywords: ['worst', 'red'], response: 'Worst sector: Welding (score 1.9/5). 5 open complaints, 2 SLA breaches.' },
  { keywords: ['resign', 'leave', 'risk'], response: '3 workers at high flight risk: EMP-1002 (87%), EMP-1004 (74%), EMP-1006 (68%)' },
]

function getAIResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const r of RESPONSES) {
    if (r.keywords.some(k => lower.includes(k))) {
      return r.response
    }
  }
  return 'I can help with: complaints, sectors, rewards, risk analysis. Try asking about a specific sector or person.'
}

export default function AIChatPanel() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: ++idRef.current, text: input.trim(), sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    const userInput = input.trim()
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const aiResponse = getAIResponse(userInput)
      const aiMsg: Message = { id: ++idRef.current, text: aiResponse, sender: 'ai' }
      setMessages(prev => [...prev, aiMsg])
      setTyping(false)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-latte-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-latte-800 active:scale-95 transition-all"
          aria-label="Open AI Chat"
        >
          <BrainCircuit size={24} />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-0 right-0 z-50 w-full max-w-sm h-[70vh] bg-white border border-latte-200 rounded-t-2xl shadow-2xl flex flex-col sm:right-6 sm:bottom-6 sm:rounded-2xl sm:h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-latte-100">
            <div className="flex items-center gap-2">
              <BrainCircuit size={18} className="text-latte-700" />
              <span className="font-semibold text-latte-900 text-sm">EmPulse AI</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-latte-400 hover:text-latte-700 transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <BrainCircuit size={32} className="text-latte-200 mx-auto mb-2" />
                <p className="text-latte-400 text-sm">Ask me about complaints, sectors, or workers</p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-latte-700 text-white'
                    : 'mr-auto bg-latte-50 text-latte-800 border border-latte-100'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="mr-auto bg-latte-50 border border-latte-100 px-3 py-2 rounded-xl text-sm text-latte-400">
                <span className="animate-pulse">●●●</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-latte-100 px-3 py-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a sector or person..."
              className="flex-1 bg-latte-50 border border-latte-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-latte-400 placeholder-latte-300"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="bg-latte-700 text-white p-2 rounded-xl hover:bg-latte-800 disabled:opacity-50 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
