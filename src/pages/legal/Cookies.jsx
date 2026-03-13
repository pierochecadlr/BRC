import { Link } from 'react-router-dom'

const cookieTypes = [
  {
    name: 'Esenciales',
    desc: 'Necesarias para el funcionamiento básico de la plataforma. No pueden desactivarse.',
    examples: 'Sesión de usuario, preferencia de idioma.',
  },
  {
    name: 'Rendimiento',
    desc: 'Nos ayudan a entender cómo los usuarios interactúan con la plataforma para mejorarla.',
    examples: 'Tiempo de carga, páginas visitadas.',
  },
  {
    name: 'Funcionalidad',
    desc: 'Permiten recordar preferencias del usuario para ofrecer una experiencia personalizada.',
    examples: 'Idioma seleccionado, filtros activos.',
  },
  {
    name: 'Analíticas',
    desc: 'Recopilan datos estadísticos sobre el uso de la plataforma de forma agregada y anónima.',
    examples: 'Google Analytics — visitas, tráfico, comportamiento de navegación.',
  },
]

const browserInstructions = [
  {
    name: 'Google Chrome',
    steps: 'Configuración → Privacidad y seguridad → Cookies y otros datos de sitios',
  },
  {
    name: 'Mozilla Firefox',
    steps: 'Preferencias → Privacidad y seguridad → Cookies y datos del sitio',
  },
  {
    name: 'Safari',
    steps: 'Preferencias → Privacidad → Gestionar datos de sitios web',
  },
  {
    name: 'Microsoft Edge',
    steps: 'Configuración → Privacidad, búsqueda y servicios → Cookies',
  },
]

export default function Cookies() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      {/* Breadcrumb */}
      <Link to="/" className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors mb-6 inline-block">
        ← Volver al inicio
      </Link>

      <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
      <h1 className="text-3xl font-black text-navy-950 mb-2">Política de Cookies</h1>
      <p className="text-sm text-ink-400 mb-10">Vigencia: Marzo 2026</p>

      <div className="space-y-8 text-ink-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo al visitarlos.
            Se utilizan para recordar preferencias, mejorar la experiencia del usuario y recopilar información estadística
            sobre el uso del sitio.
          </p>
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
            <li>
              <strong>Stripe</strong> — Procesamiento de pagos seguros. Stripe puede instalar cookies para gestionar
              transacciones y prevenir fraudes. Consulte la política de privacidad de Stripe en{' '}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800 transition-colors">
                stripe.com/privacy
              </a>.
            </li>
            <li>
              <strong>Google Analytics</strong> — Análisis estadístico de visitas y comportamiento de usuario.
              Los datos son anonimizados. Consulte la política de Google en{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800 transition-colors">
                policies.google.com/privacy
              </a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-4">Cómo gestionar las cookies</h2>
          <p className="mb-4">
            Puede configurar su navegador para bloquear o eliminar cookies en cualquier momento.
            Tenga en cuenta que bloquear cookies esenciales puede afectar el funcionamiento de la plataforma.
          </p>
          <div className="space-y-3">
            {browserInstructions.map(b => (
              <div key={b.name} className="bg-ink-50 border border-ink-100 p-3">
                <p className="font-semibold text-navy-950 mb-0.5">{b.name}</p>
                <p className="text-xs text-ink-500">{b.steps}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Contacto</h2>
          <p>
            Para cualquier consulta sobre nuestra política de cookies:{' '}
            <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">
              info@brccheck.com
            </a>
          </p>
        </section>

      </div>

      <div className="mt-12 pt-6 border-t border-ink-100">
        <p className="text-xs text-ink-400">
          © 2024–2026 BRCcheck · MC&amp;D LLC · Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
