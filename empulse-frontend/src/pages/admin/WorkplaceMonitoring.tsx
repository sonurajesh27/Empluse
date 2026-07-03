import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Camera, AlertTriangle, Shield, Eye, Users,
  Activity, Radio
} from 'lucide-react'

interface Detection {
  id: string
  type: string
  camera: string
  department: string
  confidence: number
  risk: 'low' | 'medium' | 'high' | 'critical'
  emotions: { person: string; emotion: string; confidence: number }[]
  summary: string
  timestamp: string
}

const MOCK_DETECTIONS: Detection[] = [
  {
    id: 'DET-001',
    type: 'Possible Physical Altercation',
    camera: 'Assembly Line 2',
    department: 'Assembly',
    confidence: 95.4,
    risk: 'critical',
    emotions: [
      { person: 'Person A', emotion: 'Angry', confidence: 92 },
      { person: 'Person B', emotion: 'Fear', confidence: 89 },
    ],
    summary: 'Two individuals detected in aggressive posture. Rapid arm movements. Elevated emotion scores.',
    timestamp: new Date().toLocaleString('en-IN'),
  },
  {
    id: 'DET-002',
    type: 'Safety Violation — No Helmet',
    camera: 'Welding Bay 1',
    department: 'Welding',
    confidence: 88.2,
    risk: 'high',
    emotions: [
      { person: 'Worker', emotion: 'Neutral', confidence: 74 },
    ],
    summary: 'Worker detected without safety helmet near welding station. PPE compliance violation.',
    timestamp: new Date(Date.now() - 120000).toLocaleString('en-IN'),
  },
  {
    id: 'DET-003',
    type: 'Worker Fall Detected',
    camera: 'Packaging Zone',
    department: 'Packaging',
    confidence: 82.7,
    risk: 'critical',
    emotions: [
      { person: 'Worker', emotion: 'Surprise', confidence: 67 },
    ],
    summary: 'Sudden change in body position detected. Possible slip/fall. Medical attention may be required.',
    timestamp: new Date(Date.now() - 300000).toLocaleString('en-IN'),
  },
  {
    id: 'DET-004',
    type: 'Crowd Gathering',
    camera: 'Canteen Exit',
    department: 'Common Area',
    confidence: 71.5,
    risk: 'medium',
    emotions: [
      { person: 'Group', emotion: 'Angry', confidence: 58 },
    ],
    summary: '8+ persons gathered outside normal break time. Elevated negative emotions detected in group.',
    timestamp: new Date(Date.now() - 600000).toLocaleString('en-IN'),
  },
]

const RISK_STYLE = {
  critical: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-700', dot: 'bg-red-500' },
  high: { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700', dot: 'bg-orange-500' },
  medium: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700', dot: 'bg-amber-500' },
  low: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700', dot: 'bg-green-500' },
}

export default function WorkplaceMonitoring() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [detections, setDetections] = useState<Detection[]>(MOCK_DETECTIONS)
  const [analyzing, setAnalyzing] = useState(false)
  const [lastScan, setLastScan] = useState<string>('—')

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch {
      alert('Camera access denied or not available')
    }
  }

  // Simulate AI analysis every 3 seconds when camera is active
  useEffect(() => {
    if (!cameraActive) return
    const interval = setInterval(() => {
      setAnalyzing(true)
      setLastScan(new Date().toLocaleTimeString('en-IN'))
      setTimeout(() => setAnalyzing(false), 800)
    }, 3000)
    return () => clearInterval(interval)
  }, [cameraActive])

  const criticalCount = detections.filter(d => d.risk === 'critical').length
  const highCount = detections.filter(d => d.risk === 'high').length

  return (
    <div className="min-h-screen bg-latte-50">
      {/* Header */}
      <div className="bg-latte-700 px-4 pt-10 pb-4 sticky top-0 z-10">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-1.5 text-latte-300 hover:text-white text-sm mb-3">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Eye size={20} className="text-white" />
              <h1 className="text-white font-bold text-xl">AI Workplace Monitoring</h1>
            </div>
            <p className="text-latte-300 text-sm mt-1">Real-time safety detection & emotion analysis</p>
          </div>
          <div className="flex items-center gap-2">
            {cameraActive && (
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="card text-center animate-fade-in-up">
            <p className="text-2xl font-bold text-latte-700">{detections.length}</p>
            <p className="text-xs text-latte-500">Total Alerts</p>
          </div>
          <div className="card text-center animate-fade-in-up stagger-2">
            <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            <p className="text-xs text-latte-500">Critical</p>
          </div>
          <div className="card text-center animate-fade-in-up stagger-3">
            <p className="text-2xl font-bold text-orange-600">{highCount}</p>
            <p className="text-xs text-latte-500">High Risk</p>
          </div>
          <div className="card text-center animate-fade-in-up stagger-4">
            <p className="text-xs text-latte-500 mb-1">Last Scan</p>
            <p className="text-sm font-mono text-latte-700">{lastScan}</p>
          </div>
        </div>

        {/* Camera feed */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera size={16} className="text-latte-700" />
              <p className="font-semibold text-latte-900">Live Camera Feed</p>
            </div>
            {!cameraActive ? (
              <button onClick={startCamera} className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
                <Radio size={14} /> Start Camera
              </button>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                <Activity size={14} className={analyzing ? 'animate-spin' : ''} />
                {analyzing ? 'Analyzing...' : 'Monitoring'}
              </span>
            )}
          </div>

          <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-latte-400">
                <Camera size={48} className="mb-2 opacity-30" />
                <p className="text-sm">Click "Start Camera" to begin monitoring</p>
              </div>
            )}
            {/* Overlay indicators */}
            {cameraActive && analyzing && (
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-500/80 text-white text-xs px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                AI Scanning...
              </div>
            )}
            {cameraActive && !analyzing && (
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-500/80 text-white text-xs px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-white" />
                No threats detected
              </div>
            )}
          </div>

          <p className="text-xs text-latte-400 mt-2 text-center">
            Camera: Laptop Webcam · Analysis: 1 frame/second · Model: YOLOv8 + DeepFace
          </p>
        </div>

        {/* Incident alerts */}
        <div>
          <h3 className="font-semibold text-latte-900 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} /> Recent AI Detections
          </h3>
          <div className="space-y-3">
            {detections.map((det, i) => {
              const style = RISK_STYLE[det.risk]
              return (
                <div key={det.id} className={`card border-l-4 ${style.border} animate-fade-in-up stagger-${(i % 5) + 1}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`tag ${style.bg} ${style.text}`}>{det.risk.toUpperCase()}</span>
                        <span className="text-xs font-mono text-latte-400">{det.id}</span>
                      </div>
                      <p className="font-semibold text-latte-900 text-sm">{det.type}</p>
                    </div>
                    <span className="text-xs text-latte-400">{det.timestamp}</span>
                  </div>

                  <p className="text-sm text-latte-600 mb-2">{det.summary}</p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs bg-latte-100 text-latte-600 px-2 py-1 rounded-lg">📷 {det.camera}</span>
                    <span className="text-xs bg-latte-100 text-latte-600 px-2 py-1 rounded-lg">🏭 {det.department}</span>
                    <span className="text-xs bg-latte-100 text-latte-600 px-2 py-1 rounded-lg">🎯 {det.confidence}%</span>
                  </div>

                  {/* Emotions */}
                  <div className="flex flex-wrap gap-2">
                    {det.emotions.map((em, j) => (
                      <span key={j} className={`text-xs px-2 py-1 rounded-lg border ${
                        em.emotion === 'Angry' ? 'bg-red-50 border-red-200 text-red-700' :
                        em.emotion === 'Fear' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                        em.emotion === 'Surprise' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                        'bg-latte-50 border-latte-200 text-latte-600'
                      }`}>
                        {em.person}: {em.emotion} ({em.confidence}%)
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Ethical disclaimer */}
        <div className="card bg-latte-50 border-latte-200 text-center py-4">
          <Shield size={16} className="mx-auto text-latte-500 mb-2" />
          <p className="text-xs text-latte-500 max-w-md mx-auto">
            This AI-generated report is intended to assist workplace safety monitoring. 
            All alerts, detected emotions, and incidents require human verification before any action is taken.
            No employee identification or employment decisions are made by this system.
          </p>
        </div>
      </div>
    </div>
  )
}
