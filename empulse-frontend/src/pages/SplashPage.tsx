import { useNavigate } from 'react-router-dom'
import { BrainCircuit } from 'lucide-react'
import { useLanguage, Language } from '../context/LanguageContext'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
]

export default function SplashPage() {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="min-h-screen bg-latte-50 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#6e4e2a 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <div className="mb-8 flex flex-col items-center gap-4 relative z-10">
        {/* Logo with glow animation */}
        <div className="bg-latte-700 text-white p-5 rounded-3xl shadow-lg animate-fade-in-up animate-pulse-glow">
          <BrainCircuit size={48} />
        </div>

        {/* Title with gradient */}
        <h1 className="text-6xl font-bold tracking-tight animate-fade-in-up stagger-2 gradient-text">
          {t('splash.title')}
        </h1>

        <p className="text-latte-600 text-lg font-medium tracking-wide uppercase animate-fade-in-up stagger-3">
          {t('splash.tagline')}
        </p>

        <p className="text-latte-500 text-base max-w-sm leading-relaxed mt-1 animate-fade-in-up stagger-4">
          {t('splash.subtitle')}
        </p>
      </div>

      {/* Language selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-xs animate-fade-in-up stagger-5 relative z-10">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              language === lang.code
                ? 'bg-latte-700 text-white shadow-md scale-105'
                : 'bg-latte-100 text-latte-600 hover:bg-latte-200 hover:scale-105'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-xs space-y-3 animate-fade-in-up stagger-6 relative z-10">
        <button
          onClick={() => navigate('/role')}
          className="btn-primary w-full text-lg py-4 animate-pulse-glow"
        >
          {t('splash.enter')}
        </button>
      </div>

      {/* Stats strip removed — clean design */}

      <p className="mt-10 text-latte-300 text-xs animate-fade-in-up stagger-7 relative z-10">
        Designed for Indian Manufacturing Floors · Confidential & Anonymous
      </p>

      <button
        onClick={() => navigate('/demo-guide')}
        className="mt-3 text-latte-300 text-xs hover:text-latte-500 transition-colors underline relative z-10"
      >
        Demo Guide
      </button>
    </div>
  )
}
