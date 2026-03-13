import { Link } from 'react-router-dom'

export default function Terminos() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      {/* Breadcrumb */}
      <Link to="/" className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors mb-6 inline-block">
        ← Volver al inicio
      </Link>

      <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
      <h1 className="text-3xl font-black text-navy-950 mb-2">Términos de Uso</h1>
      <p className="text-sm text-ink-400 mb-10">Vigencia: Marzo 2026</p>

      <div className="space-y-8 text-ink-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Aceptación de los términos</h2>
          <p>
            El uso del sitio web <strong>brccheck.com</strong> y sus servicios implica la aceptación plena e incondicional
            de estos Términos de Uso. Si no está de acuerdo con alguno de los términos, le recomendamos abstenerse de utilizar
            la plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Naturaleza de la plataforma</h2>
          <p>
            BRCcheck es una plataforma de <strong>documentación cívica y reputacional</strong>. No es un tribunal, no
            proporciona asesoría legal, no sustituye a autoridades judiciales o administrativas, y no emite resoluciones
            vinculantes. Toda información publicada tiene carácter informativo y documental.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Uso permitido</h2>
          <p>
            BRCcheck está diseñado para la <strong>documentación de conflictos comerciales</strong> con evidencia verificable.
            El usuario acepta utilizar la plataforma únicamente con fines legítimos, proporcionando información verídica
            y con soporte documental.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Contenido del usuario</h2>
          <p className="mb-2">
            El usuario es enteramente responsable de la veracidad, exactitud y legalidad del contenido que sube a la
            plataforma. BRCcheck se reserva el derecho de <strong>moderar, editar o eliminar</strong> cualquier contenido
            que incumpla estos términos, sea falso, difamatorio o ilegal.
          </p>
          <p>
            La publicación de contenido no implica que BRCcheck avale, certifique ni valide las afirmaciones del usuario.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Propiedad intelectual</h2>
          <p>
            Todo el contenido de la plataforma —incluyendo diseño, código, marcas, logotipos, textos y metodología—
            es propiedad de <strong>BRCcheck / MC&amp;D LLC</strong>, protegido por las leyes de propiedad intelectual
            aplicables. Queda prohibida su reproducción total o parcial sin autorización expresa.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Limitación de responsabilidad</h2>
          <p>
            BRCcheck <strong>no verifica independientemente</strong> la exactitud del contenido aportado por usuarios.
            La plataforma actúa como intermediario documental y no asume responsabilidad por daños derivados del uso
            de la información publicada. El usuario asume toda responsabilidad por las decisiones que tome con base
            en el contenido de la plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Modificaciones</h2>
          <p>
            BRCcheck puede modificar estos Términos de Uso en cualquier momento, notificando a los usuarios registrados
            con al menos <strong>15 días de antelación</strong>. El uso continuado de la plataforma después de la
            notificación implica aceptación de los nuevos términos.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Jurisdicción</h2>
          <p>
            Estos términos se rigen e interpretan conforme a las leyes del <strong>Estado de Texas, EUA</strong>.
            Cualquier controversia se someterá a la jurisdicción de los tribunales competentes de dicho estado.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Contacto</h2>
          <p>
            Para consultas sobre estos Términos de Uso:{' '}
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
