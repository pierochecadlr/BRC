import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Privacidad() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const back = t('legal_pages.back')
  const rights = t('legal_pages.rights')
  const updated = t('legal_pages.updated')

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <Link to="/" className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors mb-6 inline-block">
        {back}
      </Link>

      <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Legal</p>

      {lang === 'es' ? (
        <>
          <h1 className="text-3xl font-black text-navy-950 mb-2">Aviso de Privacidad</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: Marzo 2026</p>
          <div className="space-y-8 text-ink-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Responsable de los datos</h2>
              <p>Behavioral Risk Check (BRC), operado por <strong>MC&amp;D LLC</strong>, con domicilio en el Estado de Texas, EUA. Para cualquier consulta sobre privacidad, escríbenos a <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">info@brccheck.com</a>.</p>
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
              <p>El tratamiento de sus datos se realiza con base en el <strong>consentimiento del usuario</strong> al utilizar la plataforma, o bajo <strong>interés legítimo</strong> de BRCcheck para garantizar la integridad y transparencia del servicio.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Derechos del usuario</h2>
              <p className="mb-2">Usted tiene derecho a <strong>acceder, rectificar, suprimir y portar</strong> sus datos personales en cualquier momento. Para ejercer estos derechos, contacte a:</p>
              <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors font-medium">info@brccheck.com</a>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Cookies</h2>
              <p>BRCcheck utiliza cookies esenciales, de rendimiento y analíticas. Para más información, consulte nuestra <Link to="/cookies" className="text-teal-600 hover:text-teal-800 transition-colors">Política de Cookies</Link>.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Retención de datos</h2>
              <p>Los datos se conservan por un período de <strong>5 años</strong> desde la última actividad del usuario, salvo obligación legal que exija un período mayor.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Jurisdicción y cumplimiento normativo</h2>
              <p>Esta política se rige por las leyes del <strong>Estado de Texas, EUA</strong>. BRCcheck opera en cumplimiento con el <strong>GDPR</strong> y la <strong>CCPA</strong>, en la medida aplicable.</p>
            </section>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-black text-navy-950 mb-2">Privacy Policy</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: March 2026</p>
          <div className="space-y-8 text-ink-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Data Controller</h2>
              <p>Behavioral Risk Check (BRC), operated by <strong>MC&amp;D LLC</strong>, based in the State of Texas, USA. For any privacy inquiry, contact us at <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">info@brccheck.com</a>.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Data We Collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name and email address (provided voluntarily)</li>
                <li>Documents uploaded to the platform</li>
                <li>IP address and browsing data</li>
                <li>Usage and interaction data</li>
              </ul>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Purpose of Processing</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Operating the BRCcheck platform</li>
                <li>Content moderation and evidence verification</li>
                <li>Statistical analysis and service improvement</li>
                <li>Compliance with applicable legal obligations</li>
              </ul>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Legal Basis</h2>
              <p>Data processing is based on <strong>user consent</strong> when using the platform, or on BRCcheck's <strong>legitimate interest</strong> in ensuring the integrity and transparency of the service.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">User Rights</h2>
              <p className="mb-2">You have the right to <strong>access, rectify, delete, and port</strong> your personal data at any time. To exercise these rights, contact:</p>
              <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors font-medium">info@brccheck.com</a>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Cookies</h2>
              <p>BRCcheck uses essential, performance, and analytics cookies. For more information, see our <Link to="/cookies" className="text-teal-600 hover:text-teal-800 transition-colors">Cookie Policy</Link>.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Data Retention</h2>
              <p>Data is retained for <strong>5 years</strong> from the user's last activity, unless a legal obligation requires a longer period.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Jurisdiction & Compliance</h2>
              <p>This policy is governed by the laws of the <strong>State of Texas, USA</strong>. BRCcheck operates in compliance with the <strong>GDPR</strong> and the <strong>CCPA</strong>, to the extent applicable.</p>
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
