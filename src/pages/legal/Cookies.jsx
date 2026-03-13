import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const COOKIE_TYPES = {
  es: [
    { name: 'Esenciales', desc: 'Necesarias para el funcionamiento básico de la plataforma. No pueden desactivarse.', examples: 'Sesión de usuario, preferencia de idioma.' },
    { name: 'Rendimiento', desc: 'Nos ayudan a entender cómo los usuarios interactúan con la plataforma para mejorarla.', examples: 'Tiempo de carga, páginas visitadas.' },
    { name: 'Funcionalidad', desc: 'Permiten recordar preferencias del usuario para ofrecer una experiencia personalizada.', examples: 'Idioma seleccionado, filtros activos.' },
    { name: 'Analíticas', desc: 'Recopilan datos estadísticos sobre el uso de la plataforma de forma agregada y anónima.', examples: 'Google Analytics — visitas, tráfico, comportamiento de navegación.' },
  ],
  en: [
    { name: 'Essential', desc: 'Required for the platform to function. Cannot be disabled.', examples: 'User session, language preference.' },
    { name: 'Performance', desc: 'Help us understand how users interact with the platform to improve it.', examples: 'Load time, pages visited.' },
    { name: 'Functionality', desc: 'Remember user preferences to provide a personalized experience.', examples: 'Selected language, active filters.' },
    { name: 'Analytics', desc: 'Collect statistical data about platform usage in an aggregated, anonymous way.', examples: 'Google Analytics — visits, traffic, browsing behavior.' },
  ],
}

const BROWSER_STEPS = {
  es: [
    { name: 'Google Chrome', steps: 'Configuración → Privacidad y seguridad → Cookies y otros datos de sitios' },
    { name: 'Mozilla Firefox', steps: 'Preferencias → Privacidad y seguridad → Cookies y datos del sitio' },
    { name: 'Safari', steps: 'Preferencias → Privacidad → Gestionar datos de sitios web' },
    { name: 'Microsoft Edge', steps: 'Configuración → Privacidad, búsqueda y servicios → Cookies' },
  ],
  en: [
    { name: 'Google Chrome', steps: 'Settings → Privacy and security → Cookies and other site data' },
    { name: 'Mozilla Firefox', steps: 'Preferences → Privacy & Security → Cookies and Site Data' },
    { name: 'Safari', steps: 'Preferences → Privacy → Manage Website Data' },
    { name: 'Microsoft Edge', steps: 'Settings → Privacy, search, and services → Cookies' },
  ],
}

export default function Cookies() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const back = t('legal_pages.back')
  const rights = t('legal_pages.rights')
  const updated = t('legal_pages.updated')

  const cookieTypes = COOKIE_TYPES[lang]
  const browserSteps = BROWSER_STEPS[lang]

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <Link to="/" className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors mb-6 inline-block">
        {back}
      </Link>

      <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Legal</p>

      {lang === 'es' ? (
        <>
          <h1 className="text-3xl font-black text-navy-950 mb-2">Política de Cookies</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: Marzo 2026</p>
          <div className="space-y-8 text-ink-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">¿Qué son las cookies?</h2>
              <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo al visitarlos. Se utilizan para recordar preferencias, mejorar la experiencia del usuario y recopilar información estadística sobre el uso del sitio.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-4">Tipos de cookies que usamos</h2>
              <div className="space-y-4">
                {cookieTypes.map(ct => (
                  <div key={ct.name} className="bg-white border border-ink-100 p-4">
                    <p className="font-bold text-navy-950 mb-1">{ct.name}</p>
                    <p className="mb-1">{ct.desc}</p>
                    <p className="text-xs text-ink-400"><strong>Ejemplos:</strong> {ct.examples}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Cookies de terceros</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Stripe</strong> — Procesamiento de pagos seguros. Consulte la política de privacidad de Stripe en <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 transition-colors">stripe.com/privacy</a>.</li>
                <li><strong>Google Analytics</strong> — Análisis estadístico de visitas. Los datos son anonimizados.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-4">Cómo gestionar las cookies</h2>
              <p className="mb-4">Puede configurar su navegador para bloquear o eliminar cookies en cualquier momento. Bloquear cookies esenciales puede afectar el funcionamiento de la plataforma.</p>
              <div className="space-y-3">
                {browserSteps.map(b => (
                  <div key={b.name} className="bg-ink-50 border border-ink-100 p-3">
                    <p className="font-semibold text-navy-950 mb-0.5">{b.name}</p>
                    <p className="text-xs text-ink-500">{b.steps}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Contacto</h2>
              <p>Para cualquier consulta sobre nuestra política de cookies: <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">info@brccheck.com</a></p>
            </section>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-black text-navy-950 mb-2">Cookie Policy</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: March 2026</p>
          <div className="space-y-8 text-ink-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">What are cookies?</h2>
              <p>Cookies are small text files that websites store on your device when you visit them. They are used to remember preferences, improve the user experience, and collect statistical information about how the site is used.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-4">Types of cookies we use</h2>
              <div className="space-y-4">
                {cookieTypes.map(ct => (
                  <div key={ct.name} className="bg-white border border-ink-100 p-4">
                    <p className="font-bold text-navy-950 mb-1">{ct.name}</p>
                    <p className="mb-1">{ct.desc}</p>
                    <p className="text-xs text-ink-400"><strong>Examples:</strong> {ct.examples}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Third-party cookies</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Stripe</strong> — Secure payment processing. See Stripe's privacy policy at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 transition-colors">stripe.com/privacy</a>.</li>
                <li><strong>Google Analytics</strong> — Statistical analysis of visits. Data is anonymized.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-4">Managing cookies</h2>
              <p className="mb-4">You can configure your browser to block or delete cookies at any time. Blocking essential cookies may affect platform functionality.</p>
              <div className="space-y-3">
                {browserSteps.map(b => (
                  <div key={b.name} className="bg-ink-50 border border-ink-100 p-3">
                    <p className="font-semibold text-navy-950 mb-0.5">{b.name}</p>
                    <p className="text-xs text-ink-500">{b.steps}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Contact</h2>
              <p>For any inquiries about our cookie policy: <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">info@brccheck.com</a></p>
            </section>
          </div>
        </>
      )}

      <div className="mt-12 pt-6 border-t border-ink-100">
        <p className="text-xs text-ink-400">{rights}</p>
      </div>
    </div>
  )
}
