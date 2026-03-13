import { Link } from 'react-router-dom'

export default function EticaLegal() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      {/* Breadcrumb */}
      <Link to="/" className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors mb-6 inline-block">
        ← Volver al inicio
      </Link>

      <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
      <h1 className="text-3xl font-black text-navy-950 mb-2">Estándares Éticos y Legales</h1>
      <p className="text-sm text-ink-400 mb-10">Vigencia: Marzo 2026</p>

      <div className="space-y-8 text-ink-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-3">Principios fundamentales</h2>
          <div className="space-y-3">
            {[
              { title: 'Exactitud factual', desc: 'Todo caso publicado debe estar respaldado por evidencia documental verificable. Sin evidencia, no hay publicación.' },
              { title: 'Derecho de réplica', desc: 'Toda empresa o persona mencionada tiene garantizado el derecho a presentar su posición oficial antes de cualquier publicación.' },
              { title: 'Evaluación de severidad', desc: 'BRCcheck clasifica los casos por nivel de riesgo (Alto, Medio, Bajo) con base en criterios objetivos y documentados.' },
              { title: 'Propósito legítimo', desc: 'La plataforma opera exclusivamente para documentar conflictos comerciales con fin informativo y de cumplimiento. No se admiten casos con motivación personal sin fundamento.' },
              { title: 'Transparencia', desc: 'Todas las decisiones editoriales están documentadas y son trazables. Los usuarios pueden conocer el estado y razonamiento de su caso en todo momento.' },
            ].map(p => (
              <div key={p.title} className="bg-white border border-ink-100 p-4">
                <p className="font-bold text-navy-950 mb-1">{p.title}</p>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Lo que BRCcheck NO es</h2>
          <ul className="space-y-2">
            {[
              'No es un tribunal ni emite resoluciones vinculantes.',
              'No es una agencia gubernamental ni actúa con autoridad pública.',
              'No proporciona asesoría legal ni sustituye la consulta con un abogado.',
              'No es una red social de quejas anónimas sin fundamento.',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-crimson-500 font-bold mt-0.5">×</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Lo que BRCcheck SÍ hace</h2>
          <ul className="space-y-2">
            {[
              'Estructura información con estándar probatorio claro y verificable.',
              'Reduce la asimetría de información entre ciudadanos y empresas.',
              'Genera presión reputacional legítima, basada en hechos documentados.',
              'Incentiva la solución negociada antes de recurrir al sistema judicial.',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-teal-500 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Procedimiento de réplica</h2>
          <p>
            Toda empresa o persona identificada en un caso recibe una <strong>notificación formal</strong> antes de la
            publicación. Dispone de un plazo de <strong>15 días hábiles</strong> para presentar su réplica, aportar
            evidencia contradictoria o solicitar aclaraciones. La respuesta de la empresa queda registrada y publicada
            junto al expediente.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Moderación editorial</h2>
          <p>
            El equipo editorial de BRCcheck revisa toda la evidencia recibida antes de su publicación. Esta revisión
            evalúa la suficiencia probatoria, coherencia factual y cumplimiento con los estándares éticos de la plataforma.
            BRCcheck se reserva el derecho de rechazar o solicitar documentación adicional en cualquier caso.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">Apelaciones</h2>
          <p>
            Los sujetos de un expediente pueden apelar cualquier decisión editorial de BRCcheck enviando su solicitud
            formal a{' '}
            <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">
              info@brccheck.com
            </a>{' '}
            con el número de expediente y la documentación de respaldo. BRCcheck responderá en un plazo de 10 días hábiles.
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
