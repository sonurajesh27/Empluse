import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Upload, CheckCircle2, AlertTriangle, Clock, MapPin } from 'lucide-react'

const LOCATIONS = [
  'Assembly Line',
  'Packaging',
  'Warehouse',
  'Production Floor',
  'Canteen',
  'Other',
]

interface Incident {
  id: string
  imagePreview: string | null
  location: string
  description: string
  timestamp: string
  status: string
}

const mockIncidents: Incident[] = [
  {
    id: 'INC-001',
    imagePreview: null,
    location: 'Production Floor',
    description: 'Worker not wearing safety helmet near heavy machinery. Photographed during morning shift inspection.',
    timestamp: '2024-01-17 09:15 AM',
    status: 'Pending Review',
  },
  {
    id: 'INC-002',
    imagePreview: null,
    location: 'Warehouse',
    description: 'Spill on floor near loading dock. Slip hazard. Reported by shift supervisor.',
    timestamp: '2024-01-16 02:30 PM',
    status: 'Under Investigation',
  },
  {
    id: 'INC-003',
    imagePreview: null,
    location: 'Assembly Line',
    description: 'Fire exit blocked by stacked boxes. Safety violation.',
    timestamp: '2024-01-15 11:00 AM',
    status: 'Resolved',
  },
]

export default function IncidentDetection() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!location || !description) return
    const newIncident: Incident = {
      id: `INC-${String(incidents.length + 1).padStart(3, '0')}`,
      imagePreview,
      location,
      description,
      timestamp: new Date().toLocaleString('en-IN'),
      status: 'Pending Review',
    }
    setIncidents([newIncident, ...incidents])
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setLocation('')
      setDescription('')
      setImagePreview(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-1.5 text-latte-300 hover:text-white text-sm mb-3">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="flex items-center gap-2">
          <Camera size={20} className="text-white" />
          <h1 className="text-white font-bold text-xl">Incident Detection</h1>
        </div>
        <p className="text-latte-300 text-sm mt-1">Report workplace safety incidents with visual evidence</p>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card text-center animate-fade-in-up">
            <p className="text-2xl font-bold text-latte-700 number-animate">{incidents.length}</p>
            <p className="text-xs text-latte-500">Total Incidents</p>
          </div>
          <div className="card text-center animate-fade-in-up stagger-2">
            <p className="text-2xl font-bold text-amber-600 number-animate">{incidents.filter(i => i.status === 'Pending Review').length}</p>
            <p className="text-xs text-latte-500">Pending</p>
          </div>
          <div className="card text-center animate-fade-in-up stagger-3">
            <p className="text-2xl font-bold text-green-600 number-animate">{incidents.filter(i => i.status === 'Resolved').length}</p>
            <p className="text-xs text-latte-500">Resolved</p>
          </div>
        </div>

        {/* Submit form */}
        <div className="card space-y-4">
          <h3 className="font-semibold text-latte-900 flex items-center gap-2">
            <Upload size={16} /> Report New Incident
          </h3>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-latte-700 mb-1.5">Incident Image</label>
            <div className="border-2 border-dashed border-latte-200 rounded-xl p-4 text-center hover:border-latte-400 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center"
                  >×</button>
                </div>
              ) : (
                <label className="cursor-pointer block py-6">
                  <Camera size={32} className="mx-auto text-latte-300 mb-2" />
                  <p className="text-sm text-latte-500">Click to upload image or screenshot</p>
                  <p className="text-xs text-latte-400 mt-1">PNG, JPG up to 10MB</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-latte-700 mb-1.5">Incident Location</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="input-field">
              <option value="">Select location</option>
              {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-latte-700 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the incident in detail..."
              rows={3}
              className="input-field resize-none"
            />
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-2 text-sm text-latte-500 bg-latte-50 rounded-xl px-3 py-2">
            <Clock size={14} />
            <span>Timestamp: {new Date().toLocaleString('en-IN')}</span>
            <span className="text-xs text-latte-400">(auto-generated)</span>
          </div>

          {/* Submit */}
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in-up">
              <CheckCircle2 size={20} className="text-green-500" />
              <div>
                <p className="text-sm font-semibold text-green-700">Incident Reported Successfully</p>
                <p className="text-xs text-green-600">HR and Admin have been notified.</p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!location || !description}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Upload size={16} /> Submit Incident Report
            </button>
          )}
        </div>

        {/* Recent incidents */}
        <div>
          <h3 className="font-semibold text-latte-900 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} /> Recent Incidents
          </h3>
          <div className="space-y-3">
            {incidents.map((inc, i) => (
              <div key={inc.id} className={`card card-hover animate-fade-in-up stagger-${(i % 5) + 1}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-latte-400">{inc.id}</span>
                    <span className={`tag ${
                      inc.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' :
                      inc.status === 'Under Investigation' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>{inc.status}</span>
                  </div>
                  <span className="text-xs text-latte-400">{inc.timestamp}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-latte-500 mb-2">
                  <MapPin size={12} />
                  <span>{inc.location}</span>
                </div>
                <p className="text-sm text-latte-700">{inc.description}</p>
                {inc.imagePreview && (
                  <img src={inc.imagePreview} alt="Evidence" className="mt-2 rounded-lg max-h-32 object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Future note */}
        <div className="card bg-latte-50 border-latte-200 text-center py-4">
          <p className="text-xs text-latte-500">
            🔮 <strong>Future:</strong> Image upload will be replaced by AI Computer Vision that automatically detects 
            workplace hazards, violence, and safety violations from CCTV feeds in real-time.
          </p>
        </div>
      </div>
    </div>
  )
}
