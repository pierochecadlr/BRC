import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-navy-950 mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div>
            <p className="text-white font-black text-lg tracking-tight">
              BRC<span className="text-crimson-500">.</span>
            </p>
            <p className="text-navy-500 text-xs mt-1">Buró Reputacional Ciudadano</p>
            <p className="text-navy-400 text-xs mt-3 max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>
            <a href="mailto:info@brccheck.com"
               className="text-navy-500 hover:text-navy-300 text-xs mt-3 block transition-colors">
              info@brccheck.com
            </a>
          </div>

          {/* Nav */}
          <div className="flex gap-12 text-sm">
            <div>
              <p className="section-label text-navy-600 mb-3">{t('footer.links')}</p>
              <ul className="space-y-2">
                <li><Link to="/" className="text-navy-400 hover:text-white text-xs transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/cases" className="text-navy-400 hover:text-white text-xs transition-colors">{t('nav.cases')}</Link></li>
                <li><Link to="/submit" className="text-navy-400 hover:text-white text-xs transition-colors">{t('nav.submit')}</Link></li>
              </ul>
            </div>
            <div>
              <p className="section-label text-navy-600 mb-3">{t('footer.legal')}</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-navy-400 hover:text-white text-xs transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="text-navy-400 hover:text-white text-xs transition-colors">{t('footer.terms')}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-900 flex items-center justify-between">
          <p className="text-navy-700 text-xs">© {new Date().getFullYear()} BRCcheck. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
