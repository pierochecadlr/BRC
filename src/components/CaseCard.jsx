import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { lf } from '../lib/mockData'

function fmt(d) {
  try { return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) }
  catch { return d }
}

const riskBar = { alto: 'bg-crimson-600', medio: 'bg-amber-500', bajo: 'bg-emerald-500' }
const riskText = { alto: 'text-crimson-700', medio: 'text-amber-700', bajo: 'text-emerald-700' }

export default function CaseCard({ caso }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  return (
    <Link
      to={`/cases/${caso.id}`}
      className="group flex bg-white border border-ink-100 hover:border-ink-300 transition-colors duration-150"
    >
      {/* Risk bar */}
      <div className={clsx('w-1 flex-shrink-0', riskBar[caso.riesgo] || 'bg-ink-300')} />

      {/* Content */}
      <div className="flex-1 px-5 py-4 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">
              {lf(caso.conflicto, lang)} · {caso.ciudad}
            </p>
            <h3 className="font-bold text-navy-950 text-sm leading-snug group-hover:text-crimson-700
                           transition-colors line-clamp-2">
              {lf(caso.titulo, lang)}
            </h3>
            <p className="text-xs text-ink-500 mt-1.5 line-clamp-1">{caso.empresa}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className={clsx('text-[10px] font-black uppercase tracking-widest', riskText[caso.riesgo])}>
              {t(`risk.${caso.riesgo}`)}
            </p>
            <p className="text-[10px] text-ink-400 mt-1 font-mono">{fmt(caso.created_at)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
