import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'

const TIER_STYLES = [
  {
    borderClass: 'border-teal-200',
    headerClass: 'bg-teal-500',
    ctaClass: 'bg-teal-500 hover:bg-teal-600 text-white',
    ctaHref: '/nuevo-caso',
    ctaExternal: false,
  },
  {
    borderClass: 'border-yellow-300',
    headerClass: 'bg-[#C8922A]',
    ctaClass: 'bg-[#C8922A] hover:bg-[#b07a22] text-white',
    ctaHref: 'https://buy.stripe.com/placeholder_founder',
    ctaExternal: true,
  },
  {
    borderClass: 'border-navy-300',
    headerClass: 'bg-navy-950',
    ctaClass: 'bg-navy-950 hover:bg-navy-800 text-white',
    ctaHref: 'mailto:info@brccheck.com?subject=Aliado Legal BRCcheck',
    ctaExternal: true,
  },
  {
    borderClass: 'border-red-300',
    headerClass: 'bg-crimson-700',
    ctaClass: 'bg-crimson-700 hover:bg-red-800 text-white',
    ctaHref: 'mailto:info@brccheck.com?subject=Plan Institucional BRCcheck',
    ctaExternal: true,
  },
]

export default function Membresia() {
  const { t } = useTranslation()
  const tiers = t('membresia.tiers', { returnObjects: true })

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
            {t('membresia.hero_badge')}
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-5">
            {t('membresia.hero_title')}{' '}
            <span className="text-teal-400">{t('membresia.hero_title_highlight')}</span>
          </h1>
          <p className="text-navy-300 text-base leading-relaxed max-w-xl">
            {t('membresia.hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {tiers.map((tier, i) => {
            const style = TIER_STYLES[i]
            return (
              <div key={i}
                className={`flex flex-col border-2 ${style.borderClass} overflow-hidden`}>
                {/* Header */}
                <div className={`${style.headerClass} px-5 py-4`}>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {tier.name}
                  </p>
                  <p className="text-white font-black text-2xl leading-none">
                    {tier.price}
                    {tier.priceNote && (
                      <span className="text-sm font-normal text-white/70 ml-1">{tier.priceNote}</span>
                    )}
                  </p>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 bg-white p-5">
                  <p className="text-sm text-ink-600 leading-relaxed mb-5">{tier.desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink-700">
                        <Check size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {style.ctaExternal ? (
                    <a href={style.ctaHref}
                      target={style.ctaHref.startsWith('mailto') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`block text-center font-bold px-5 py-2.5 text-sm transition-colors ${style.ctaClass}`}>
                      {tier.cta}
                    </a>
                  ) : (
                    <Link to={style.ctaHref}
                      className={`block text-center font-bold px-5 py-2.5 text-sm transition-colors ${style.ctaClass}`}>
                      {tier.cta}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Donation section */}
      <section className="bg-ink-50 border-t border-ink-100">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 text-center">
          <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">
            {t('membresia.donation_badge')}
          </p>
          <h2 className="text-2xl font-black text-navy-950 mb-3">
            {t('membresia.donation_title')}
          </h2>
          <p className="text-sm text-ink-500 leading-relaxed mb-8 max-w-lg mx-auto">
            {t('membresia.donation_desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a href="https://buy.stripe.com/placeholder_donation_10"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary text-center w-full sm:w-auto">
              {t('membresia.donate_10')}
            </a>
            <a href="https://buy.stripe.com/placeholder_donation_25"
              target="_blank" rel="noopener noreferrer"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 text-sm transition-colors text-center w-full sm:w-auto">
              {t('membresia.donate_25')}
            </a>
          </div>
          <p className="text-xs text-ink-400">
            {t('membresia.stripe_note')} ·{' '}
            <a href="mailto:info@brccheck.com" className="hover:text-navy-950 transition-colors">
              info@brccheck.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
