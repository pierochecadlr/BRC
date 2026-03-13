import { Link } from 'react-router-dom'

export default function AvisoLegal() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      {/* Breadcrumb */}
      <Link to="/" className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors mb-6 inline-block">
        ← Volver al inicio
      </Link>

      <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
      <h1 className="text-3xl font-black text-navy-950 mb-2">Aviso Legal</h1>
      <p className="text-sm text-ink-400 mb-10">Vigencia: Marzo 2026</p>

      <div className="space-y-8 text-ink-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Naturaleza de la plataforma</h2>
          <p>
            BRCcheck es una plataforma de carácter <strong>informativo y de documentación cívica</strong>.
            Toda la información publicada tiene propósito documental y no constituye en ningún caso asesoría legal,
            resolución judicial, sanción administrativa ni pronunciamiento oficial de ningún tipo.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Limitación de responsabilidad</h2>
          <p>
            BRCcheck <strong>no verifica independientemente</strong> la exactitud, veracidad o completitud
            del contenido aportado por los usuarios. La plataforma actúa como intermediario documental que
            estructura y presenta la información recibida con el soporte probatorio proporcionado.
          </p>
          <p className="mt-3">
            BRCcheck no será responsable de ningún daño directo, indirecto, incidental o consecuente derivado
            del uso de la información publicada en la plataforma. Las decisiones tomadas con base en dicha
            información son responsabilidad exclusiva del usuario.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Propiedad intelectual</h2>
          <p>
            <strong>© 2024–2026 MC&amp;D LLC / BRCcheck. Todos los derechos reservados.</strong>
          </p>
          <p className="mt-2">
            El diseño, código fuente, metodología, marcas, logotipos, textos y demás contenidos de la plataforma
            BRCcheck son propiedad exclusiva de MC&amp;D LLC. Queda prohibida su reproducción, distribución,
            modificación o uso comercial sin autorización expresa y por escrito.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Ley aplicable</h2>
          <p>
            Este Aviso Legal se rige por las leyes del <strong>Estado de Texas, EUA</strong>.
            Cualquier controversia derivada del uso de la plataforma se resolverá ante los tribunales
            competentes de dicho estado, salvo acuerdo expreso en contrario.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Contacto</h2>
          <p>
            Para consultas legales o notificaciones formales:{' '}
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
