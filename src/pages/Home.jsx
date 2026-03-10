import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Shield, FileCheck, Handshake } from 'lucide-react'
import ReputationScore from '../components/ReputationScore'
import RsBadge from '../components/RsBadge'
import { MOCK_COMPANIES, MOCK_STATS, lf } from '../lib/mockData'

export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const featured = MOCK_COMPANIES[0] // Constructora Nexo — high risk company

  const steps = [
    { icon: <FileCheck size={20} />, title: t('home.step1_title'), desc: t('home.step1_desc') },
    { icon: <Shield size={20} />,    title: t('home.step2_title'), desc: t('home.step2_desc') },
    { icon: <Handshake size={20} />, title: t('home.step3_title'), desc: t('home.step3_desc') },
  ]

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="flex-1 max-w-2xl">
              <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">{t('home.hero_org')}</p>
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-5">
                {t('home.hero_title')}
                <br />
                <span className="text-teal-400">{t('home.hero_title_highlight')}</span>
              </h1>
              <p className="text-navy-300 text-base leading-relaxed mb-8 max-w-lg">
                {t('home.hero_subtitle')}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/buscar" className="btn-primary">{t('home.cta_search')}</Link>
                <Link to="/nuevo-caso" className="btn-ghost-white">{t('home.cta_submit')}</Link>
                <a href="mailto:info@brccheck.com?subject=Inversionistas%20BRCcheck"
                  className="text-xs font-semibold text-navy-400 border border-navy-700 px-4 py-2 hover:border-teal-500 hover:text-teal-400 transition-colors">
                  {t('home.cta_investors')}
                </a>
              </div>
            </div>

            {/* Featured company RS widget */}
            <Link to={`/empresa/${featured.id}`}
              className="group bg-navy-900 border border-navy-700 hover:border-teal-500 transition-colors p-6 min-w-[260px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-navy-500 mb-4">
                {t('home.featured_label')}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <ReputationScore score={featured.rs_score} size="md" />
                <div>
                  <p className="text-white font-bold text-sm leading-snug">{featured.nombre}</p>
                  <p className="text-navy-400 text-xs mt-1">{featured.ciudad}</p>
                  <div className="mt-2">
                    <RsBadge score={featured.rs_score} lang={lang} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-teal-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {t('home.view_profile')} <ArrowRight size={12} />
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex divide-x divide-navy-800">
            {[
              { n: MOCK_STATS.totalCases,   l: t('home.stats_cases') },
              { n: MOCK_STATS.companies,    l: t('home.stats_companies') },
              { n: MOCK_STATS.credenciales, l: t('home.stats_credentials') },
              { n: MOCK_STATS.highRisk,     l: t('home.stats_high_risk') },
            ].map(({ n, l }) => (
              <div key={l} className="px-6 py-4 first:pl-0">
                <p className="text-white font-black text-xl tabular-nums">{n}</p>
                <p className="text-navy-500 text-[10px] uppercase tracking-wider font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <p className="section-label mb-8">{t('home.how_it_works')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="bg-white border border-ink-100 p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-teal-500">{s.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-ink-400">0{i+1}</span>
              </div>
              <h3 className="font-bold text-navy-900 mb-1">{s.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Companies ── */}
      <section className="bg-ink-50 border-t border-ink-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
          <div className="flex items-center justify-between mb-6">
            <p className="section-label">{t('home.section_companies')}</p>
            <Link to="/buscar" className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1">
              {t('home.view_all')} <ArrowRight size={11} />
            </Link>
          </div>
          <div className="flex flex-col gap-px">
            {MOCK_COMPANIES.map(co => (
              <Link key={co.id} to={`/empresa/${co.id}`}
                className="group flex items-center justify-between bg-white border border-ink-100 hover:border-ink-300 px-5 py-4 transition-colors">
                <div className="flex items-center gap-4">
                  <ReputationScore score={co.rs_score} size="sm" />
                  <div>
                    <p className="font-bold text-navy-950 text-sm group-hover:text-teal-700 transition-colors">
                      {co.nombre}
                    </p>
                    <p className="text-xs text-ink-400 mt-0.5">{co.ciudad} · {lf(co.sector, lang)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <RsBadge score={co.rs_score} lang={lang} />
                  <ArrowRight size={14} className="text-ink-300 group-hover:text-teal-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="border border-teal-200 bg-teal-50 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">{t('home.cta_box_title')}</p>
            <p className="text-sm text-ink-600 leading-relaxed max-w-md">{t('home.cta_box_desc')}</p>
          </div>
          <Link to="/nuevo-caso" className="btn-primary flex-shrink-0">{t('home.cta_submit')}</Link>
        </div>
      </section>
    </div>
  )
}
