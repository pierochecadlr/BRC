import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AvisoLegal() {
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
          <h1 className="text-3xl font-black text-navy-950 mb-2">Aviso Legal</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: Marzo 2026</p>
          <div className="space-y-8 text-ink-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Naturaleza de la plataforma</h2>
              <p>BRCcheck es una plataforma de carácter <strong>informativo y de documentación cívica</strong>. Toda la información publicada tiene propósito documental y no constituye asesoría legal, resolución judicial, sanción administrativa ni pronunciamiento oficial de ningún tipo.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Limitación de responsabilidad</h2>
              <p>BRCcheck <strong>no verifica independientemente</strong> la exactitud, veracidad o completitud del contenido aportado por los usuarios. La plataforma actúa como intermediario documental que estructura y presenta la información recibida.</p>
              <p className="mt-3">BRCcheck no será responsable de ningún daño directo, indirecto, incidental o consecuente derivado del uso de la información publicada en la plataforma.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Propiedad intelectual</h2>
              <p><strong>© 2024–2026 MC&amp;D LLC / BRCcheck. Todos los derechos reservados.</strong></p>
              <p className="mt-2">El diseño, código fuente, metodología, marcas, logotipos, textos y demás contenidos de la plataforma BRCcheck son propiedad exclusiva de MC&amp;D LLC. Queda prohibida su reproducción, distribución, modificación o uso comercial sin autorización expresa y por escrito.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Ley aplicable</h2>
              <p>Este Aviso Legal se rige por las leyes del <strong>Estado de Texas, EUA</strong>. Cualquier controversia se resolverá ante los tribunales competentes de dicho estado.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Contacto</h2>
              <p>Para consultas legales o notificaciones formales: <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">info@brccheck.com</a></p>
            </section>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-black text-navy-950 mb-2">Legal Notice</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: March 2026</p>
          <div className="space-y-8 text-ink-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Nature of the Platform</h2>
              <p>BRCcheck is an <strong>informational and civic documentation</strong> platform. All published information is documentary in purpose and does not constitute legal advice, judicial decisions, administrative sanctions, or any kind of official pronouncement.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Limitation of Liability</h2>
              <p>BRCcheck does <strong>not independently verify</strong> the accuracy, truthfulness, or completeness of user-submitted content. The platform acts as a documentary intermediary that structures and presents the information received.</p>
              <p className="mt-3">BRCcheck shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of information published on the platform.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Intellectual Property</h2>
              <p><strong>© 2024–2026 MC&amp;D LLC / BRCcheck. All rights reserved.</strong></p>
              <p className="mt-2">The design, source code, methodology, trademarks, logos, texts, and other content of the BRCcheck platform are the exclusive property of MC&amp;D LLC. Reproduction, distribution, modification, or commercial use without express written authorization is prohibited.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Applicable Law</h2>
              <p>This Legal Notice is governed by the laws of the <strong>State of Texas, USA</strong>. Any disputes shall be resolved before the competent courts of that state.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-navy-950 mb-2">Contact</h2>
              <p>For legal inquiries or formal notices: <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">info@brccheck.com</a></p>
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
