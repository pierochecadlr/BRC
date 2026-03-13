import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Database, ShieldCheck, Scale, GitBranch, BadgeCheck, ArrowRight } from 'lucide-react'

const MODULE_ICONS = [
  <Database size={22} />,
  <ShieldCheck size={22} />,
  <Scale size={22} />,
  <GitBranch size={22} />,
  <BadgeCheck size={22} />,
]

export default function ComoFunciona() {
  const { t } = useTranslation()

  const modules = t('como_funciona.modules', { returnObjects: true })
  const steps   = t('como_funciona.steps',   { returnObjects: true })
  const posiciones = t('como_funciona.posiciones', { returnObjects: true })
  const notItems = t('como_funciona.not_items', { returnObjects: true })
  const yesItems = t('como_funciona.yes_items', { returnObjects: true })

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
            {t('como_funciona.hero_badge')}
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-5">
            {t('como_funciona.hero_title')}{' '}
            <span className="text-teal-400">{t('como_funciona.hero_title_highlight')}</span>
          </h1>
          <p className="text-navy-300 text-base leading-relaxed mb-8 max-w-2xl">
            {t('como_funciona.hero_subtitle')}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/buscar" className="btn-primary">{t('como_funciona.cta_search')}</Link>
            <Link to="/nuevo-caso" className="btn-ghost-white">{t('como_funciona.cta_register')}</Link>
          </div>
        </div>
      </section>

      {/* Section 1 — What is BRCcheck? */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <p className="section-label mb-8">{t('como_funciona.what_is')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* What it's NOT */}
          <div className="bg-white border border-ink-100 p-6">
            <p className="text-xs font-black uppercase tracking-widest text-crimson-600 mb-4">
              {t('como_funciona.what_not_badge')}
            </p>
            <ul className="space-y-2.5">
              {notItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-crimson-500 mt-0.5 font-bold">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What it DOES */}
          <div className="md:col-span-2 bg-white border border-ink-100 p-6">
            <p className="text-xs font-black uppercase tracking-widest text-teal-600 mb-4">
              {t('como_funciona.what_yes_badge')}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {yesItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-teal-500 mt-0.5 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 — 5 Modules */}
      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-8">
            {t('como_funciona.arch_badge')}
          </p>
          <h2 className="text-2xl font-black mb-8">{t('como_funciona.modules_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m, i) => (
              <div key={i} className="bg-navy-900 border border-navy-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-teal-400">{MODULE_ICONS[i]}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-navy-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="font-black text-white text-sm mb-0.5">{m.title}</p>
                <p className="text-teal-400 text-xs font-semibold mb-3">{m.subtitle}</p>
                <p className="text-navy-300 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Step by step */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <p className="section-label mb-8">{t('como_funciona.process_title')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="bg-white border border-ink-100 p-5">
              <span className="inline-block text-2xl font-black text-teal-500 mb-3">{i + 1}</span>
              <h3 className="font-bold text-navy-950 text-sm mb-1.5">{s.title}</h3>
              <p className="text-xs text-ink-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Positioning */}
      <section className="bg-ink-50 border-t border-ink-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
          <p className="section-label mb-2">{t('como_funciona.positioning_title')}</p>
          <p className="text-sm text-ink-500 mb-8">{t('como_funciona.positioning_sub')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posiciones.map((p, i) => (
              <div key={i} className="bg-white border border-ink-100 p-5 flex items-start gap-3">
                <ArrowRight size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-semibold text-navy-950">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="border border-teal-500 bg-teal-500 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
              {t('como_funciona.cta_badge')}
            </p>
            <h2 className="text-xl font-black text-white mb-1">{t('como_funciona.cta_title')}</h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              {t('como_funciona.cta_desc')}
            </p>
          </div>
          <Link to="/nuevo-caso"
            className="flex-shrink-0 bg-white text-teal-700 font-bold px-6 py-2.5 text-sm hover:bg-teal-50 transition-colors">
            {t('como_funciona.cta_btn')}
          </Link>
        </div>
      </section>
    </div>
  )
}
