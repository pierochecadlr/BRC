import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PRINCIPLES = {
  es: [
    { title: 'Exactitud factual', desc: 'Todo caso publicado debe estar respaldado por evidencia documental verificable. Sin evidencia, no hay publicación.' },
    { title: 'Derecho de réplica', desc: 'Toda empresa o persona mencionada tiene garantizado el derecho a presentar su posición oficial antes de cualquier publicación.' },
    { title: 'Evaluación de severidad', desc: 'BRCcheck clasifica los casos por nivel de riesgo (Alto, Medio, Bajo) con base en criterios objetivos y documentados.' },
    { title: 'Propósito legítimo', desc: 'La plataforma opera exclusivamente para documentar conflictos comerciales con fin informativo y de cumplimiento. No se admiten casos con motivación personal sin fundamento.' },
    { title: 'Transparencia', desc: 'Todas las decisiones editoriales están documentadas y son trazables. Los usuarios pueden conocer el estado y razonamiento de su caso en todo momento.' },
  ],
  en: [
    { title: 'Factual Accuracy', desc: 'Every published case must be supported by verifiable documentary evidence. No evidence, no publication.' },
    { title: 'Right of Reply', desc: 'Every company or person mentioned is guaranteed the right to submit their official position before any publication.' },
    { title: 'Severity Assessment', desc: 'BRCcheck classifies cases by risk level (High, Medium, Low) based on objective, documented criteria.' },
    { title: 'Legitimate Purpose', desc: 'The platform operates exclusively to document commercial disputes for informational and compliance purposes. Cases with unfounded personal motives are not accepted.' },
    { title: 'Transparency', desc: 'All editorial decisions are documented and traceable. Users can know the status and reasoning behind their case at all times.' },
  ],
}

const NOT_ITEMS = {
  es: ['No es un tribunal ni emite resoluciones vinculantes.', 'No es una agencia gubernamental ni actúa con autoridad pública.', 'No proporciona asesoría legal ni sustituye la consulta con un abogado.', 'No es una red social de quejas anónimas sin fundamento.'],
  en: ['Is not a court and does not issue binding decisions.', 'Is not a government agency and does not act with public authority.', 'Does not provide legal advice or replace consulting with a lawyer.', 'Is not a social network for unfounded anonymous complaints.'],
}

const YES_ITEMS = {
  es: ['Estructura información con estándar probatorio claro y verificable.', 'Reduce la asimetría de información entre ciudadanos y empresas.', 'Genera presión reputacional legítima, basada en hechos documentados.', 'Incentiva la solución negociada antes de recurrir al sistema judicial.'],
  en: ['Structures information to a clear, verifiable evidentiary standard.', 'Reduces information asymmetry between citizens and companies.', 'Generates legitimate reputational pressure based on documented facts.', 'Incentivizes negotiated resolution before resorting to the judicial system.'],
}

export default function EticaLegal() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const back = t('legal_pages.back')
  const rights = t('legal_pages.rights')
  const updated = t('legal_pages.updated')

  const principles = PRINCIPLES[lang]
  const notItems = NOT_ITEMS[lang]
  const yesItems = YES_ITEMS[lang]

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <Link to="/" className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors mb-6 inline-block">
        {back}
      </Link>

      <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Legal</p>

      {lang === 'es' ? (
        <>
          <h1 className="text-3xl font-black text-navy-950 mb-2">Estándares Éticos y Legales</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: Marzo 2026</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-black text-navy-950 mb-2">Ethics & Legal Standards</h1>
          <p className="text-sm text-ink-400 mb-10">{updated}: March 2026</p>
        </>
      )}

      <div className="space-y-8 text-ink-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-3">
            {lang === 'es' ? 'Principios fundamentales' : 'Core Principles'}
          </h2>
          <div className="space-y-3">
            {principles.map(p => (
              <div key={p.title} className="bg-white border border-ink-100 p-4">
                <p className="font-bold text-navy-950 mb-1">{p.title}</p>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">
            {lang === 'es' ? 'Lo que BRCcheck NO es' : 'What BRCcheck is NOT'}
          </h2>
          <ul className="space-y-2">
            {notItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-crimson-500 font-bold mt-0.5">×</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">
            {lang === 'es' ? 'Lo que BRCcheck SÍ hace' : 'What BRCcheck DOES'}
          </h2>
          <ul className="space-y-2">
            {yesItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-teal-500 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">
            {lang === 'es' ? 'Procedimiento de réplica' : 'Reply Process'}
          </h2>
          {lang === 'es' ? (
            <p>Toda empresa o persona identificada en un caso recibe una <strong>notificación formal</strong> antes de la publicación. Dispone de un plazo de <strong>15 días hábiles</strong> para presentar su réplica, aportar evidencia contradictoria o solicitar aclaraciones.</p>
          ) : (
            <p>Every company or person identified in a case receives a <strong>formal notification</strong> before publication. They have <strong>15 business days</strong> to submit their reply, provide contradictory evidence, or request clarifications.</p>
          )}
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">
            {lang === 'es' ? 'Moderación editorial' : 'Editorial Moderation'}
          </h2>
          {lang === 'es' ? (
            <p>El equipo editorial de BRCcheck revisa toda la evidencia recibida antes de su publicación. Esta revisión evalúa la suficiencia probatoria, coherencia factual y cumplimiento con los estándares éticos de la plataforma.</p>
          ) : (
            <p>BRCcheck's editorial team reviews all submitted evidence before publication. This review evaluates evidentiary sufficiency, factual consistency, and compliance with the platform's ethical standards.</p>
          )}
        </section>

        <section>
          <h2 className="text-base font-bold text-navy-950 mb-2">
            {lang === 'es' ? 'Apelaciones' : 'Appeals'}
          </h2>
          <p>
            {lang === 'es'
              ? 'Los sujetos de un expediente pueden apelar cualquier decisión editorial enviando su solicitud formal a '
              : 'Subjects of a case file may appeal any editorial decision by sending a formal request to '}
            <a href="mailto:info@brccheck.com" className="text-teal-600 hover:text-teal-800 transition-colors">
              info@brccheck.com
            </a>
            {lang === 'es'
              ? ' con el número de expediente y documentación de respaldo. BRCcheck responderá en un plazo de 10 días hábiles.'
              : ' with the case number and supporting documentation. BRCcheck will respond within 10 business days.'}
          </p>
        </section>

      </div>

      <div className="mt-12 pt-6 border-t border-ink-100">
        <p className="text-xs text-ink-400">{rights}</p>
      </div>
    </div>
  )
}
