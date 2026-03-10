import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search as SearchIcon, ArrowRight } from 'lucide-react'
import ReputationScore from '../components/ReputationScore'
import RsBadge from '../components/RsBadge'
import { MOCK_COMPANIES, lf } from '../lib/mockData'

const RS_FILTERS = ['', 'verificado', 'medio', 'riesgo']

const chipStyle = {
  '':         'border-ink-300 text-ink-600 hover:border-ink-500',
  verificado: 'border-green-300 text-green-700 hover:bg-green-50',
  medio:      'border-yellow-300 text-yellow-700 hover:bg-yellow-50',
  riesgo:     'border-red-300 text-red-700 hover:bg-red-50',
}
const chipActive = {
  '':         'bg-navy-950 border-navy-950 text-white',
  verificado: 'bg-green-600 border-green-600 text-white',
  medio:      'bg-yellow-500 border-yellow-500 text-white',
  riesgo:     'bg-red-600 border-red-600 text-white',
}

export default function Search() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const [query, setQuery]   = useState('')
  const [filter, setFilter] = useState('')

  function getStatus(score) {
    if (score >= 71) return 'verificado'
    if (score >= 41) return 'medio'
    return 'riesgo'
  }

  const filtered = useMemo(() => MOCK_COMPANIES.filter(co => {
    const q = query.toLowerCase()
    const matchQuery = !query || co.nombre.toLowerCase().includes(q) || co.ciudad.toLowerCase().includes(q) || lf(co.sector, lang).toLowerCase().includes(q)
    const matchFilter = !filter || getStatus(co.rs_score) === filter
    return matchQuery && matchFilter
  }), [query, filter, lang])

  const filterLabels = {
    '':         t('cases.risk_all'),
    verificado: t('company.verified'),
    medio:      t('company.medium_risk'),
    riesgo:     t('company.high_risk'),
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <div className="border-b border-ink-200 pb-5 mb-6">
        <h1 className="page-title">{t('company.search')}</h1>
        <p className="text-sm text-ink-500 mt-1">{t('cases.subtitle')}</p>
      </div>

      {/* Search */}
      <div className="bg-white border border-ink-200 p-4 mb-4">
        <div className="relative">
          <SearchIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            className="input pl-9 bg-ink-50"
            placeholder={t('company.search_placeholder')}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* RS filter chips */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1.5 flex-wrap">
          {RS_FILTERS.map(f => (
            <button key={f}
              onClick={() => setFilter(filter === f ? '' : f)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border transition-colors ${filter === f ? chipActive[f] : chipStyle[f]}`}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <p className="text-xs text-ink-400">{filtered.length} {t('cases.case_plural')}</p>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-ink-100 py-16 text-center">
          <p className="text-sm text-ink-400">{t('cases.no_results')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-px">
          {filtered.map(co => (
            <Link key={co.id} to={`/empresa/${co.id}`}
              className="group flex items-center justify-between bg-white border border-ink-100 hover:border-ink-300 px-5 py-4 transition-colors">
              <div className="flex items-center gap-5">
                <ReputationScore score={co.rs_score} size="md" />
                <div>
                  <p className="font-bold text-navy-950 text-sm group-hover:text-teal-700 transition-colors">
                    {co.nombre}
                  </p>
                  <p className="text-xs text-ink-400 mt-0.5">{co.ciudad} · {lf(co.sector, lang)}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-ink-400 font-medium">
                    <span>{co.casos_activos} {t('company.active_cases_short')}</span>
                    <span>·</span>
                    <span>{co.credenciales} {t('company.credentials')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <RsBadge score={co.rs_score} lang={lang} />
                <ArrowRight size={14} className="text-ink-300 group-hover:text-teal-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
