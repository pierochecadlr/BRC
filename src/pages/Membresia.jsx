import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

const tiers = [
  {
    id: 'ciudadano',
    name: 'Ciudadano Verificado',
    price: 'Gratis',
    priceNote: '',
    color: 'teal',
    badgeClass: 'bg-teal-100 text-teal-700',
    borderClass: 'border-teal-200',
    headerClass: 'bg-teal-500',
    desc: 'Acceso básico a la plataforma. Consulta casos públicos y registra el tuyo.',
    features: [
      'Búsqueda de empresas',
      'Consulta de expedientes',
      '1 caso activo',
      'Chatbot de orientación',
    ],
    cta: 'Registrarse gratis',
    ctaHref: '/nuevo-caso',
    ctaExternal: false,
    ctaClass: 'bg-teal-500 hover:bg-teal-600 text-white',
  },
  {
    id: 'fundador',
    name: 'Colaborador Fundador',
    price: '$49',
    priceNote: 'USD/mes',
    color: 'gold',
    badgeClass: 'bg-yellow-100 text-yellow-700',
    borderClass: 'border-yellow-300',
    headerClass: 'bg-[#C8922A]',
    desc: 'Apoya la operación de BRCcheck y accede a funciones avanzadas.',
    features: [
      'Todo lo del plan anterior',
      'Casos ilimitados',
      'Reportes PDF descargables',
      'Prioridad en revisión',
      'Badge "Fundador"',
    ],
    cta: 'Suscribirse',
    ctaHref: 'https://buy.stripe.com/placeholder_founder',
    ctaExternal: true,
    ctaClass: 'bg-[#C8922A] hover:bg-[#b07a22] text-white',
  },
  {
    id: 'aliado',
    name: 'Aliado Legal',
    price: '$199',
    priceNote: 'USD/mes',
    color: 'navy',
    badgeClass: 'bg-navy-100 text-navy-700',
    borderClass: 'border-navy-300',
    headerClass: 'bg-navy-950',
    desc: 'Para abogados, despachos y consultores que usan BRCcheck como herramienta de compliance.',
    features: [
      'Todo lo del plan anterior',
      'API de consulta',
      'Credenciales verificables',
      'Panel de clientes',
      'Soporte prioritario',
      'Badge "Aliado Legal"',
    ],
    cta: 'Contactar',
    ctaHref: 'mailto:info@brccheck.com?subject=Aliado Legal BRCcheck',
    ctaExternal: true,
    ctaClass: 'bg-navy-950 hover:bg-navy-800 text-white',
  },
  {
    id: 'institucion',
    name: 'Institución / Empresa',
    price: 'A convenir',
    priceNote: '',
    color: 'crimson',
    badgeClass: 'bg-red-100 text-red-700',
    borderClass: 'border-red-300',
    headerClass: 'bg-crimson-700',
    desc: 'Para instituciones, medios, organismos y empresas que quieren integrar BRCcheck en sus procesos de due diligence.',
    features: [
      'Todo lo del plan anterior',
      'Integración API personalizada',
      'White-label disponible',
      'SLA garantizado',
      'Cuenta dedicada',
    ],
    cta: 'Hablar con el equipo',
    ctaHref: 'mailto:info@brccheck.com?subject=Plan Institucional BRCcheck',
    ctaExternal: true,
    ctaClass: 'bg-crimson-700 hover:bg-red-800 text-white',
  },
]

export default function Membresia() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">Membresía</p>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-5">
            Únete a <span className="text-teal-400">BRCcheck</span>
          </h1>
          <p className="text-navy-300 text-base leading-relaxed max-w-xl">
            Elige el nivel que mejor se adapta a tu rol.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {tiers.map(tier => (
            <div key={tier.id}
              className={`flex flex-col border-2 ${tier.borderClass} overflow-hidden`}>
              {/* Header */}
              <div className={`${tier.headerClass} px-5 py-4`}>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">{tier.name}</p>
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
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <Check size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.ctaExternal ? (
                  <a href={tier.ctaHref}
                    target={tier.ctaHref.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className={`block text-center font-bold px-5 py-2.5 text-sm transition-colors ${tier.ctaClass}`}>
                    {tier.cta}
                  </a>
                ) : (
                  <Link to={tier.ctaHref}
                    className={`block text-center font-bold px-5 py-2.5 text-sm transition-colors ${tier.ctaClass}`}>
                    {tier.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Donation section */}
      <section className="bg-ink-50 border-t border-ink-100">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 text-center">
          <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Contribución ética</p>
          <h2 className="text-2xl font-black text-navy-950 mb-3">
            Apoya BRCcheck con una Contribución Ética
          </h2>
          <p className="text-sm text-ink-500 leading-relaxed mb-8 max-w-lg mx-auto">
            Tu aportación mantiene BRCcheck transparente, independiente y orientado a la comunidad.
            Cada contribución ayuda a cubrir costos operativos y desarrollo de la plataforma.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a href="https://buy.stripe.com/placeholder_donation_10"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary text-center w-full sm:w-auto">
              Donar $10
            </a>
            <a href="https://buy.stripe.com/placeholder_donation_25"
              target="_blank" rel="noopener noreferrer"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 text-sm transition-colors text-center w-full sm:w-auto">
              Donar $25
            </a>
          </div>
          <p className="text-xs text-ink-400">
            Pagos seguros procesados por Stripe · <a href="mailto:info@brccheck.com" className="hover:text-navy-950 transition-colors">info@brccheck.com</a>
          </p>
        </div>
      </section>
    </div>
  )
}
