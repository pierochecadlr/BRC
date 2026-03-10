import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { ShieldCheck, FileText, Clock, TrendingUp, Check, X, Eye, Lock } from 'lucide-react'
import RiskBadge from '../components/RiskBadge'
import { MOCK_CASES, MOCK_STATS, MOCK_MONTHLY, MOCK_RISK_DIST } from '../lib/mockData'
import clsx from 'clsx'

const ADMIN_PASSWORD = 'brc2025'

function StatCard({ label, value, accent }) {
  return (
    <div className={`bg-white border-l-4 border border-ink-100 px-5 py-4 ${accent}`}>
      <p className="text-2xl font-black text-navy-950 tabular-nums">{value?.toLocaleString()}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mt-1">{label}</p>
    </div>
  )
}

function LoginScreen({ onLogin }) {
  const { t } = useTranslation()
  const [pass, setPass] = useState('')
  const [err, setErr] = useState(false)

  function attempt(e) {
    e.preventDefault()
    if (pass === ADMIN_PASSWORD) { onLogin(); setErr(false) }
    else setErr(true)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white border border-ink-200 p-10 w-full max-w-sm">
        <p className="section-label mb-1">{t('admin.login_title')}</p>
        <p className="text-xs text-ink-400 mb-6">{t('admin.login_restricted')}</p>
        <form onSubmit={attempt} className="space-y-3">
          <div>
            <label className="label">{t('admin.login_pass')}</label>
            <input
              type="password"
              className={clsx('input', err && 'border-crimson-500')}
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          {err && <p className="text-crimson-600 text-xs">{t('admin.login_error')}</p>}
          <button type="submit" className="btn-primary w-full">{t('admin.login_btn')}</button>
        </form>
        <p className="text-xs text-ink-300 mt-5">{t('admin.login_demo')} <code className="bg-ink-100 px-1 text-ink-600">brc2025</code></p>
      </div>
    </div>
  )
}

export default function AdminPanel() {
  const { t } = useTranslation()
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('overview')

  const TABS = [
    { id: 'overview',     label: t('admin.tab_overview') },
    { id: 'submissions',  label: t('admin.tab_submissions') },
    { id: 'cases',        label: t('admin.tab_cases') },
  ]

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-ink-200 pb-5">
        <div>
          <h1 className="page-title">{t('admin.title')}</h1>
          <p className="text-sm text-ink-500 mt-1">{t('admin.subtitle')}</p>
        </div>
        <button onClick={() => setAuthed(false)}
          className="flex items-center gap-1.5 text-xs font-semibold text-crimson-600 border border-crimson-200 px-3 py-1.5 hover:bg-crimson-50 transition-colors">
          <Lock size={12} /> {t('admin.logout')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ink-200 mb-8">
        {TABS.map(({ id, label }) => (
          <button key={id} onClick={() => setTab(id)}
            className={clsx(
              'px-5 py-2.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all',
              tab === id
                ? 'border-navy-950 text-navy-950'
                : 'border-transparent text-ink-400 hover:text-ink-700'
            )}>
            {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label={t('admin.stat_total')}       value={MOCK_STATS.totalCases}  accent="border-l-navy-700" />
            <StatCard label={t('admin.stat_high')}        value={MOCK_STATS.highRisk}    accent="border-l-crimson-600" />
            <StatCard label={t('admin.stat_pending')}     value={MOCK_STATS.submissions} accent="border-l-amber-500" />
            <StatCard label={t('admin.stat_this_month')}  value={18}                     accent="border-l-emerald-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Monthly chart */}
            <div className="bg-white border border-ink-200 p-5">
              <p className="section-label mb-5">{t('admin.chart_monthly')}</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={MOCK_MONTHLY} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f0ec" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8c8270' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#8c8270' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ border: '1px solid #e5e0d8', borderRadius: 0, fontSize: 12 }}
                    cursor={{ fill: '#f7f6f3' }}
                  />
                  <Bar dataKey="casos" fill="#111f3c" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Risk distribution */}
            <div className="bg-white border border-ink-200 p-5">
              <p className="section-label mb-5">{t('admin.chart_risk')}</p>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="60%" height={220}>
                  <PieChart>
                    <Pie data={MOCK_RISK_DIST} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                      dataKey="value" paddingAngle={3}>
                      {MOCK_RISK_DIST.map((entry, i) => (
                        <Cell key={entry.key} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {MOCK_RISK_DIST.map(({ key, value, color }) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="text-sm text-slate-600">{t(`risk.${key}`)}</span>
                      <span className="text-sm font-bold text-navy-900 ml-auto">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submissions */}
      {tab === 'submissions' && (
        <div className="bg-white border border-ink-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-ink-100 bg-ink-50">
            <p className="section-label">{t('admin.submissions_heading')}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink-100">
                  {['#', t('admin.table_empresa'), t('admin.table_ciudad'), t('admin.table_riesgo'), t('admin.table_fecha'), t('admin.table_actions')].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-ink-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_CASES.slice(0, 3).map((c, i) => (
                  <tr key={c.id} className="border-b border-ink-50 hover:bg-ink-50 transition-colors">
                    <td className="px-5 py-3 text-ink-400 text-xs font-mono">#{String(i + 1).padStart(3, '0')}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-navy-900">{c.empresa}</td>
                    <td className="px-5 py-3 text-sm text-ink-500">{c.ciudad}</td>
                    <td className="px-5 py-3"><RiskBadge level={c.riesgo} /></td>
                    <td className="px-5 py-3 text-xs text-ink-400 font-mono">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/cases/${c.id}`}
                          className="p-1.5 border border-ink-200 text-ink-600 hover:border-navy-400 hover:text-navy-700 transition-colors">
                          <Eye size={12} />
                        </Link>
                        <button className="p-1.5 border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors">
                          <Check size={12} />
                        </button>
                        <button className="p-1.5 border border-crimson-200 text-crimson-600 hover:bg-crimson-50 transition-colors">
                          <X size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cases */}
      {tab === 'cases' && (
        <div className="bg-white border border-ink-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-ink-100 bg-ink-50">
            <p className="section-label">{t('admin.cases_heading')} — {MOCK_CASES.length} {t('admin.cases_records')}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink-100">
                  {['#', t('admin.table_empresa'), t('admin.table_ciudad'), t('admin.table_riesgo'), t('admin.table_fecha'), t('admin.table_actions')].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-ink-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_CASES.map((c) => (
                  <tr key={c.id} className="border-b border-ink-50 hover:bg-ink-50 transition-colors">
                    <td className="px-5 py-3 text-xs text-ink-400 font-mono">#{c.id.padStart(4, '0')}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-navy-900 max-w-[200px] truncate">{c.empresa}</td>
                    <td className="px-5 py-3 text-sm text-ink-500">{c.ciudad}</td>
                    <td className="px-5 py-3"><RiskBadge level={c.riesgo} /></td>
                    <td className="px-5 py-3 text-xs text-ink-400 font-mono">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <Link to={`/cases/${c.id}`}
                        className="p-1.5 border border-ink-200 text-ink-600 hover:border-navy-400 hover:text-navy-700 transition-colors inline-flex">
                        <Eye size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
