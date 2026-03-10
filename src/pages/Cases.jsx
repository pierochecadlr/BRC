import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X, ChevronDown } from 'lucide-react'
import CaseCard from '../components/CaseCard'
import { MOCK_CASES, lf } from '../lib/mockData'
import clsx from 'clsx'

const RISK_LEVELS = ['', 'alto', 'medio', 'bajo']

const riskChip = {
  '':    'border-ink-300 text-ink-600 hover:border-ink-500',
  alto:  'border-crimson-300 text-crimson-700 bg-crimson-50 hover:bg-crimson-100',
  medio: 'border-amber-300  text-amber-700   bg-amber-50   hover:bg-amber-100',
  bajo:  'border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100',
}
const riskChipActive = {
  '':    'bg-navy-950 border-navy-950 text-white',
  alto:  'bg-crimson-600 border-crimson-600 text-white',
  medio: 'bg-amber-500   border-amber-500   text-white',
  bajo:  'bg-emerald-600 border-emerald-600 text-white',
}

export default function Cases() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const [search,  setSearch]  = useState('')
  const [empresa, setEmpresa] = useState('')
  const [ciudad,  setCiudad]  = useState('')
  const [riesgo,  setRiesgo]  = useState('')
  const [from,    setFrom]    = useState('')
  const [to,      setTo]      = useState('')
  const [expand,  setExpand]  = useState(false)

  const filtered = useMemo(() => MOCK_CASES.filter(c => {
    const q = search.toLowerCase()
    return (
      (!search  || lf(c.titulo, lang).toLowerCase().includes(q) || c.empresa.toLowerCase().includes(q) || c.ciudad.toLowerCase().includes(q) || lf(c.descripcion, lang).toLowerCase().includes(q)) &&
      (!empresa || c.empresa.toLowerCase().includes(empresa.toLowerCase())) &&
      (!ciudad  || c.ciudad.toLowerCase().includes(ciudad.toLowerCase())) &&
      (!riesgo  || c.riesgo === riesgo) &&
      (!from    || new Date(c.created_at) >= new Date(from)) &&
      (!to      || new Date(c.created_at) <= new Date(to))
    )
  }), [search, empresa, ciudad, riesgo, from, to, lang])

  const hasFilters = search || empresa || ciudad || riesgo || from || to
  function clear() { setSearch(''); setEmpresa(''); setCiudad(''); setRiesgo(''); setFrom(''); setTo('') }

  const countLabel = filtered.length === 1 ? t('cases.case_singular') : t('cases.case_plural')

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <div className="border-b border-ink-200 pb-5 mb-6">
        <h1 className="page-title">{t('cases.title')}</h1>
        <p className="text-sm text-ink-500 mt-1">{t('cases.subtitle')}</p>
      </div>

      {/* Search bar */}
      <div className="bg-white border border-ink-200 p-4 mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              className="input pl-9 bg-ink-50 border-ink-200"
              placeholder={t('cases.search_placeholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setExpand(!expand)}
            className={clsx(
              'flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border transition-colors',
              expand ? 'border-navy-700 text-navy-700 bg-navy-50' : 'border-ink-300 text-ink-600 hover:border-ink-500'
            )}
          >
            {t('cases.filter_btn')}
            <ChevronDown size={13} className={clsx('transition-transform', expand && 'rotate-180')} />
          </button>
          {hasFilters && (
            <button onClick={clear}
              className="flex items-center gap-1 px-3 text-xs font-semibold border border-crimson-200 text-crimson-600 hover:bg-crimson-50 transition-colors">
              <X size={12} /> {t('cases.clear_btn')}
            </button>
          )}
        </div>

        {expand && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-ink-100">
            <div>
              <label className="label">{t('cases.filter_empresa')}</label>
              <input className="input" value={empresa} onChange={e => setEmpresa(e.target.value)} />
            </div>
            <div>
              <label className="label">{t('cases.filter_ciudad')}</label>
              <input className="input" value={ciudad} onChange={e => setCiudad(e.target.value)} />
            </div>
            <div>
              <label className="label">{t('cases.filter_from')}</label>
              <input type="date" className="input" value={from} onChange={e => setFrom(e.target.value)} />
            </div>
            <div>
              <label className="label">{t('cases.filter_to')}</label>
              <input type="date" className="input" value={to} onChange={e => setTo(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Risk chips + count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          {RISK_LEVELS.map(r => {
            const active = riesgo === r
            return (
              <button key={r}
                onClick={() => setRiesgo(active ? '' : r)}
                className={clsx(
                  'px-3 py-1 text-[10px] font-bold uppercase tracking-widest border transition-colors',
                  active ? riskChipActive[r] : riskChip[r]
                )}>
                {r ? t(`risk.${r}`) : t('cases.risk_all')}
              </button>
            )
          })}
        </div>
        <p className="text-xs text-ink-400 font-medium tabular-nums">
          {filtered.length} {countLabel}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-ink-100 py-16 text-center">
          <p className="text-sm text-ink-400">{t('cases.no_results')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {filtered.map(c => <CaseCard key={c.id} caso={c} />)}
        </div>
      )}
    </div>
  )
}
