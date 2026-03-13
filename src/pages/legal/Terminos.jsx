import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Terminos() {
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
          <h1 className="text-3xl font-black text-navy-950 mb-2">Términos de Uso</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: Marzo 2026</p>
          <div className="space-y-8 text-ink-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Aceptación de los términos</h2>
              <p>El uso del sitio web <strong>brccheck.com</strong> y sus servicios implica la aceptación plena e incondicional de estos Términos de Uso. Si no está de acuerdo con alguno de los términos, le recomendamos abstenerse de utilizar la plataforma.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Naturaleza de la plataforma</h2>
              <p>BRCcheck es una plataforma de <strong>documentación cívica y reputacional</strong>. No es un tribunal, no proporciona asesoría legal, no sustituye a autoridades judiciales o administrativas, y no emite resoluciones vinculantes. Toda información publicada tiene carácter informativo y documental.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Uso permitido</h2>
              <p>BRCcheck está diseñado para la <strong>documentación de conflictos comerciales</strong> con evidencia verificable. El usuario acepta utilizar la plataforma únicamente con fines legítimos, proporcionando información verídica y con soporte documental.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Contenido del usuario</h2>
              <p className="mb-2">El usuario es enteramente responsable de la veracidad, exactitud y legalidad del contenido que sube a la plataforma. BRCcheck se reserva el derecho de <strong>moderar, editar o eliminar</strong> cualquier contenido que incumpla estos términos, sea falso, difamatorio o ilegal.</p>
              <p>La publicación de contenido no implica que BRCcheck avale, certifique ni valide las afirmaciones del usuario.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Propiedad intelectual</h2>
              <p>Todo el contenido de la plataforma —incluyendo diseño, código, marcas, logotipos, textos y metodología— es propiedad de <strong>BRCcheck / MC&amp;D LLC</strong>, protegido por las leyes de propiedad intelectual aplicables. Queda prohibida su reproducción total o parcial sin autorización expresa.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Limitación de responsabilidad</h2>
              <p>BRCcheck <strong>no verifica independientemente</strong> la exactitud del contenido aportado por usuarios. La plataforma actúa como intermediario documental y no asume responsabilidad por daños derivados del uso de la información publicada.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Modificaciones</h2>
              <p>BRCcheck puede modificar estos Términos de Uso en cualquier momento, notificando a los usuarios registrados con al menos <strong>15 días de antelación</strong>.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Jurisdicción</h2>
              <p>Estos términos se rigen e interpretan conforme a las leyes del <strong>Estado de Texas, EUA</strong>.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Contacto</h2>
              <p>Para consultas sobre estos Términos de Uso: <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">info@brccheck.com</a></p>
            </section>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-black text-navy-950 mb-2">Terms of Use</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: March 2026</p>
          <div className="space-y-8 text-ink-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Acceptance of Terms</h2>
              <p>Using the website <strong>brccheck.com</strong> and its services constitutes full and unconditional acceptance of these Terms of Use. If you disagree with any of the terms, we recommend refraining from using the platform.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Nature of the Platform</h2>
              <p>BRCcheck is a <strong>civic and reputational documentation</strong> platform. It is not a court, does not provide legal advice, does not replace judicial or administrative authorities, and does not issue binding decisions. All published information is informational and documentary in nature.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Permitted Use</h2>
              <p>BRCcheck is designed for <strong>documenting commercial disputes</strong> with verifiable evidence. Users agree to use the platform solely for legitimate purposes, providing truthful information with documentary support.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">User Content</h2>
              <p className="mb-2">Users are entirely responsible for the truthfulness, accuracy, and legality of the content they upload. BRCcheck reserves the right to <strong>moderate, edit, or remove</strong> any content that violates these terms, is false, defamatory, or illegal.</p>
              <p>Publishing content does not imply that BRCcheck endorses, certifies, or validates the user's claims.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Intellectual Property</h2>
              <p>All platform content — including design, code, trademarks, logos, texts, and methodology — is the property of <strong>BRCcheck / MC&amp;D LLC</strong> and is protected by applicable intellectual property laws. Reproduction in whole or in part without express authorization is prohibited.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Limitation of Liability</h2>
              <p>BRCcheck does <strong>not independently verify</strong> the accuracy of user-submitted content. The platform acts as a documentary intermediary and assumes no responsibility for damages arising from the use of published information.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Modifications</h2>
              <p>BRCcheck may modify these Terms of Use at any time, notifying registered users with at least <strong>15 days' notice</strong>.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Jurisdiction</h2>
              <p>These terms are governed and interpreted in accordance with the laws of the <strong>State of Texas, USA</strong>.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Contact</h2>
              <p>For inquiries about these Terms of Use: <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">info@brccheck.com</a></p>
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
