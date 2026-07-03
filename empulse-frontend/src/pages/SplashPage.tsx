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
    <div className="min-h-screen bg-latte-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="bg-latte-700 text-white p-5 rounded-3xl shadow-md">
          <BrainCircuit size={48} />
        </div>
        <h1 className="text-6xl font-bold text-latte-700 tracking-tight">{t('splash.title')}</h1>
        <p className="text-latte-600 text-lg font-medium tracking-wide uppercase">
          {t('splash.tagline')}
        </p>
        <p className="text-latte-500 text-base max-w-sm leading-relaxed mt-1">
          {t('splash.subtitle')}
        </p>
      </div>

      {/* Language selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-xs">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              language === lang.code
                ? 'bg-latte-700 text-white'
                : 'bg-latte-100 text-latte-600 hover:bg-latte-200'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-xs space-y-3">
        <button
          onClick={() => navigate('/role')}
          className="btn-primary w-full text-lg py-4"
        >
          {t('splash.enter')}
        </button>
      </div>

      <p className="mt-12 text-latte-300 text-xs">
        Designed for Indian Manufacturing Floors · Confidential & Anonymous
      </p>

      <button
        onClick={() => navigate('/demo-guide')}
        className="mt-3 text-latte-300 text-xs hover:text-latte-400 transition-colors underline"
      >
        Demo Guide
      </button>
    </div>
  )
}
