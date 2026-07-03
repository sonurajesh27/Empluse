import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Upload, Shield, CheckCircle2, FileText, Image, Mic } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const ISSUE_TYPES = [
  'Harassment',
  'Sexual Harassment',
  'Discrimination',
  'Theft',
  'Physical Violence',
  'Threats / Intimidation',
  'Wage Theft / Illegal Deductions',
  'Unsafe Working Conditions (life-threatening)',
  'Other Serious Issue',
]

export default function ReportLegal() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [issueType, setIssueType] = useState('')
  const [description, setDescription] = useState('')
  const [evidence, setEvidence] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setEvidence(prev => [...prev, ...Array.from(files)])
    }
  }

  const handleSubmit = () => {
    if (!issueType || !description) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-latte-50 flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-latte-900 mb-2">Report Submitted Securely</h2>
        <p className="text-sm text-latte-500 mb-2">
          Your report has been sent directly to HR and Legal Department.
        </p>
        <p className="text-xs text-latte-400 mb-6">
          This bypasses Admin completely. Your identity is protected. You will be contacted confidentially if needed.
        </p>
        <div className="card w-full text-left space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-latte-500">Type</span>
            <span className="text-latte-800 font-medium">{issueType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-latte-500">Evidence</span>
            <span className="text-latte-800 font-medium">{evidence.length} file(s)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-latte-500">Status</span>
            <span className="text-purple-700 font-medium">Sent to Legal</span>
          </div>
        </div>
        <button onClick={() => navigate('/employee')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-latte-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-purple-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <button onClick={() => navigate('/employee')} className="flex items-center gap-1.5 text-purple-200 hover:text-white text-sm mb-3">
          <ChevronLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-white" />
          <h1 className="text-white font-bold text-xl">Report Serious Issue</h1>
        </div>
        <p className="text-purple-200 text-sm mt-1">Goes directly to HR + Legal. Bypasses Admin.</p>
      </div>

      <div className="px-4 py-6 space-y-5">

        {/* Privacy notice */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 flex items-start gap-3">
          <Shield size={16} className="text-purple-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-purple-700">Your identity is protected</p>
            <p className="text-xs text-purple-600 mt-0.5">
              This report is anonymous and encrypted. It goes directly to HR and Legal — Admin cannot see it.
              You will not face any retaliation for reporting.
            </p>
          </div>
        </div>

        {/* Issue type */}
        <div className="card">
          <label className="block text-sm font-medium text-latte-700 mb-2">Type of Issue</label>
          <div className="flex flex-wrap gap-2">
            {ISSUE_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setIssueType(type)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  issueType === type
                    ? 'bg-purple-700 text-white border-purple-700'
                    : 'bg-white text-latte-700 border-latte-200 hover:border-purple-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="card">
          <label className="block text-sm font-medium text-latte-700 mb-2">
            What happened? (describe in detail)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the incident — when, where, who was involved, what happened..."
            rows={5}
            className="input-field resize-none"
          />
          <p className="text-xs text-latte-400 mt-1">Write in any language. AI will translate for Legal team.</p>
        </div>

        {/* Evidence upload */}
        <div className="card">
          <label className="block text-sm font-medium text-latte-700 mb-2">
            Upload Evidence (optional but recommended)
          </label>
          <div className="border-2 border-dashed border-latte-200 rounded-xl p-4 text-center hover:border-purple-300 transition-colors">
            <label className="cursor-pointer block py-3">
              <Upload size={28} className="mx-auto text-latte-400 mb-2" />
              <p className="text-sm text-latte-500">Upload photos, documents, audio recordings</p>
              <p className="text-xs text-latte-400 mt-1">PDF, Image, Audio, Video — max 100MB</p>
              <input type="file" multiple accept="image/*,audio/*,video/*,.pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          {evidence.length > 0 && (
            <div className="mt-3 space-y-2">
              {evidence.map((file, i) => (
                <div key={i} className="flex items-center gap-2 bg-latte-50 rounded-lg px-3 py-2">
                  {file.type.includes('image') ? <Image size={14} className="text-blue-500" /> :
                   file.type.includes('audio') ? <Mic size={14} className="text-purple-500" /> :
                   <FileText size={14} className="text-latte-500" />}
                  <span className="text-xs text-latte-700 flex-1 truncate">{file.name}</span>
                  <span className="text-xs text-latte-400">{(file.size / 1024).toFixed(0)}KB</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!issueType || !description}
          className="w-full py-4 bg-purple-700 text-white rounded-xl font-medium hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Shield size={18} /> Submit to Legal Department
        </button>

        <p className="text-xs text-latte-400 text-center">
          ⚠️ Filing false reports is a serious matter. Only report genuine issues.
        </p>
      </div>
    </div>
  )
}
