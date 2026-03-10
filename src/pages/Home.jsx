import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import CaseCard from '../components/CaseCard'
import { MOCK_CASES, MOCK_STATS, lf } from '../lib/mockData'

const riskColor = { alto: 'text-crimson-600', medio: 'text-amber-600', bajo: 'text-emerald-600' }

function FeaturedCase({ caso }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  return (
    <Link to={`/cases/${caso.id}`}
      className="group block bg-white border border-ink-100 hover:border-ink-300 transition-colors p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-3">
        {t('home.featured_label')} · {caso.ciudad}
      </p>
      <div className={`text-xs font-black uppercase tracking-widest mb-2 ${riskColor[caso.riesgo]}`}>
        ● {t(`risk.${caso.riesgo}`)}
      </div>
      <h2 className="text-xl font-bold text-navy-950 leading-snug group-hover:text-crimson-700
                     transition-colors mb-2">
        {lf(caso.titulo, lang)}
      </h2>
      <p className="text-sm text-ink-500 mb-1">{caso.empresa}</p>
      <p className="text-sm text-ink-400 leading-relaxed line-clamp-3">{lf(caso.descripcion, lang)}</p>
      <p className="mt-4 text-xs font-semibold text-navy-700 group-hover:text-crimson-600 transition-colors
                    flex items-center gap-1.5">
        {t('home.featured_read')} <ArrowRight size={12} />
      </p>
    </Link>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const featured = MOCK_CASES[1]
  const recent   = MOCK_CASES.slice(0, 5)

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-label text-navy-500 mb-4">{t('home.hero_org')}</p>
            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-5">
              {t('home.hero_title')}
              <br />
              <span className="text-crimson-400">{t('home.hero_title_highlight')}</span>
            </h1>
            <p className="text-navy-300 text-base leading-relaxed mb-8 max-w-lg">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/cases" className="btn-danger">{t('home.cta_search')}</Link>
              <Link to="/submit" className="btn-ghost-white">{t('home.cta_submit')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex divide-x divide-navy-800">
            {[
              { n: MOCK_STATS.totalCases,       l: t('home.stats_cases') },
              { n: MOCK_STATS.highRisk,          l: t('home.stats_high_risk') },
              { n: MOCK_STATS.cities,            l: t('home.stats_cities') },
              { n: MOCK_STATS.reportsDownloaded, l: t('home.stats_reports') },
            ].map(({ n, l }) => (
              <div key={l} className="px-6 py-4 first:pl-0">
                <p className="text-white font-black text-xl tabular-nums">{n.toLocaleString()}</p>
                <p className="text-navy-500 text-[10px] uppercase tracking-wider font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: recent cases */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className="section-label">{t('home.section_recent')}</p>
              <Link to="/cases"
                className="text-xs font-semibold text-navy-700 hover:text-crimson-600 transition-colors
                           flex items-center gap-1">
                {t('home.view_all')} <ArrowRight size={11} />
              </Link>
            </div>
            <div className="flex flex-col gap-0.5">
              {recent.map(c => <CaseCard key={c.id} caso={c} />)}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <FeaturedCase caso={featured} />

            {/* Risk breakdown */}
            <div className="bg-white border border-ink-100 p-5">
              <p className="section-label mb-4">{t('home.risk_distribution')}</p>
              <div className="space-y-3">
                {[
                  { label: t('home.stats_high_risk'), n: MOCK_STATS.highRisk, w: 83, color: 'bg-crimson-500' },
                  { label: t('risk.medio'),            n: 1,                  w: 17, color: 'bg-amber-400' },
                  { label: t('risk.bajo'),             n: 0,                  w: 0,  color: 'bg-emerald-500' },
                ].map(({ label, n, w, color }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-ink-600 font-medium">{label}</p>
                      <p className="text-xs font-bold text-ink-800 font-mono">{n}</p>
                    </div>
                    <div className="h-1.5 bg-ink-100 w-full">
                      <div className={`h-full ${color}`} style={{ width: `${w}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="border border-crimson-200 bg-crimson-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-crimson-700 mb-2">
                {t('home.cta_box_title')}
              </p>
              <p className="text-sm text-ink-600 leading-relaxed mb-4">
                {t('home.cta_box_desc')}
              </p>
              <Link to="/submit" className="btn-danger text-sm w-full flex justify-center">
                {t('home.cta_submit')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
