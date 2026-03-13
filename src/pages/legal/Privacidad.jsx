import { Link } from 'react-router-dom'

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      {/* Breadcrumb */}
      <Link to="/" className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors mb-6 inline-block">
        ← Volver al inicio
      </Link>

      <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
      <h1 className="text-3xl font-black text-navy-950 mb-2">Aviso de Privacidad</h1>
      <p className="text-sm text-ink-400 mb-10">Vigencia: Marzo 2026</p>

      <div className="space-y-8 text-ink-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Responsable de los datos</h2>
          <p>
            Behavioral Risk Check (BRC), operado por <strong>MC&amp;D LLC</strong>, con domicilio en el Estado de Texas, EUA.
            Para cualquier consulta sobre privacidad, escríbenos a{' '}
            <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">
              info@brccheck.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Datos que recopilamos</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre y correo electrónico (proporcionados voluntariamente)</li>
            <li>Documentos cargados a la plataforma</li>
            <li>Dirección IP y datos de navegación</li>
            <li>Datos de uso e interacción con la plataforma</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Finalidad del tratamiento</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Operación de la plataforma BRCcheck</li>
            <li>Moderación de contenido y verificación de evidencia</li>
            <li>Análisis estadístico y mejora del servicio</li>
            <li>Cumplimiento de obligaciones legales aplicables</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Base legal</h2>
          <p>
            El tratamiento de sus datos se realiza con base en el <strong>consentimiento del usuario</strong> al utilizar la
            plataforma, o bajo <strong>interés legítimo</strong> de BRCcheck para garantizar la integridad y transparencia del servicio.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Derechos del usuario</h2>
          <p className="mb-2">
            Usted tiene derecho a <strong>acceder, rectificar, suprimir y portar</strong> sus datos personales en cualquier momento.
            Para ejercer estos derechos, contacte a:
          </p>
          <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors font-medium">
            info@brccheck.com
          </a>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Cookies</h2>
          <p>
            BRCcheck utiliza cookies esenciales, de rendimiento y analíticas. Para más información, consulte nuestra{' '}
            <Link to="/cookies" className="text-teal-600 hover:text-teal-800 transition-colors">
              Política de Cookies
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Retención de datos</h2>
          <p>
            Los datos se conservan por un período de <strong>5 años</strong> desde la última actividad del usuario, salvo
            obligación legal que exija un período mayor.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Jurisdicción y cumplimiento normativo</h2>
          <p>
            Esta política se rige por las leyes del <strong>Estado de Texas, EUA</strong>.
            BRCcheck opera en cumplimiento con el <strong>GDPR</strong> (Reglamento General de Protección de Datos de la UE)
            y la <strong>CCPA</strong> (California Consumer Privacy Act), en la medida aplicable.
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
