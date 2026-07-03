import { useNavigate } from 'react-router-dom'
import { Factory, BarChart3, ShieldCheck, Crown, ChevronLeft } from 'lucide-react'

const roles = [
  {
    icon: <Factory size={36} />,
    title: 'Employee',
    description: 'Submit feedback & view your status',
    path: '/verify',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    roleState: 'employee',
  },
  {
    icon: <BarChart3 size={36} />,
    title: 'HR Manager',
    description: 'View escalated issues & insights',
    path: '/pin-login',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
    roleState: 'hr',
  },
  {
    icon: <ShieldCheck size={36} />,
    title: 'Admin',
    description: 'Manage all complaints & operations',
    path: '/pin-login',
    bg: 'bg-latte-50',
    border: 'border-latte-200',
    iconBg: 'bg-latte-100 text-latte-700',
    roleState: 'admin',
  },
  {
    icon: <Crown size={36} />,
    title: 'Owner',
    description: 'Full audit access · Unfiltered truth',
    path: '/pin-login',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconBg: 'bg-purple-100 text-purple-700',
    roleState: 'owner',
  },
]

export default function RoleSelectPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-latte-50 flex flex-col px-6 py-10 max-w-xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-latte-500 text-sm mb-8 hover:text-latte-700 transition-colors w-fit"
      >
        <ChevronLeft size={18} /> Back
      </button>

      <h1 className="text-3xl font-bold text-latte-900 mb-2">Who are you?</h1>
      <p className="text-latte-400 text-sm mb-8">Select your role to continue</p>

      <div className="flex flex-col gap-4">
        {roles.map((r) => (
          <button
            key={r.title}
            onClick={() => navigate(r.path, { state: { role: r.roleState } })}
            className={`card flex items-center gap-5 text-left hover:shadow-md active:scale-[0.98] transition-all duration-150 ${r.bg} ${r.border}`}
          >
            <div className={`p-3 rounded-2xl ${r.iconBg}`}>{r.icon}</div>
            <div>
              <p className="font-semibold text-latte-900 text-lg">{r.title}</p>
              <p className="text-latte-500 text-sm mt-0.5">{r.description}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-auto pt-12 text-center text-latte-300 text-xs">
        All submissions are anonymous and encrypted
      </p>
    </div>
  )
}
