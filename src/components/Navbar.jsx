import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Normalise — browser may give 'en-US', 'es-MX', etc.
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  const switchTo = lang === 'es' ? 'en' : 'es'
  const toggleLang = () => i18n.changeLanguage(switchTo)

  const links = [
    { to: '/',       label: t('nav.home') },
    { to: '/cases',  label: t('nav.cases') },
    { to: '/submit', label: t('nav.submit') },
  ]

  const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <nav className="bg-navy-950 border-b border-navy-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center h-14 gap-8">

          {/* Wordmark */}
          <Link to="/" className="flex-shrink-0 flex items-baseline gap-2">
            <span className="text-white font-black text-lg tracking-tight">
              BRC<span className="text-crimson-500">.</span>
            </span>
            <span className="text-navy-500 text-xs font-medium hidden sm:inline">
              {t('nav.tagline')}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            {links.map(({ to, label }) => (
              <Link key={to} to={to}
                className={clsx(
                  'px-3 py-1 text-sm transition-colors duration-100',
                  isActive(to)
                    ? 'text-white font-semibold'
                    : 'text-navy-400 hover:text-white font-medium'
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 ml-auto">

            {/* Language switcher — shows both, highlights current */}
            <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
              <button
                onClick={() => lang !== 'es' && i18n.changeLanguage('es')}
                className={clsx(
                  'px-1.5 py-0.5 transition-colors',
                  lang === 'es'
                    ? 'text-white border-b border-white'
                    : 'text-navy-500 hover:text-navy-300'
                )}
              >
                ES
              </button>
              <span className="text-navy-700">|</span>
              <button
                onClick={() => lang !== 'en' && i18n.changeLanguage('en')}
                className={clsx(
                  'px-1.5 py-0.5 transition-colors',
                  lang === 'en'
                    ? 'text-white border-b border-white'
                    : 'text-navy-500 hover:text-navy-300'
                )}
              >
                EN
              </button>
            </div>

            <Link to="/admin"
              className="hidden md:block text-navy-500 hover:text-navy-300 text-xs transition-colors">
              {t('nav.admin')}
            </Link>

            <button onClick={() => setOpen(!open)}
              className="md:hidden text-navy-400 hover:text-white transition-colors p-1">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-navy-800 bg-navy-950 px-5 py-4 space-y-0.5">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className={clsx(
                'block py-2.5 text-sm border-b border-navy-800/50',
                isActive(to) ? 'text-white font-semibold' : 'text-navy-400'
              )}>
              {label}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)}
            className="block py-2.5 text-xs text-navy-600">
            {t('nav.admin')}
          </Link>
          {/* Language switcher in mobile */}
          <div className="flex items-center gap-3 pt-3 mt-1 border-t border-navy-800">
            {['es', 'en'].map(l => (
              <button key={l} onClick={() => { i18n.changeLanguage(l); setOpen(false) }}
                className={clsx(
                  'text-xs font-bold uppercase tracking-widest px-2 py-1',
                  lang === l ? 'text-white border border-white/30' : 'text-navy-500 hover:text-navy-300'
                )}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
