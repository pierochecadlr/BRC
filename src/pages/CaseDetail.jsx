import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Download, CheckCircle, Sparkles, Loader } from 'lucide-react'
import RiskBadge from '../components/RiskBadge'
import Bitacora from '../components/Bitacora'
import { lf } from '../lib/mockData'
import { useCaseStore } from '../lib/caseStore'
import { generateCaseSummary } from '../lib/claude'

function fmt(d) {
  try { return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }) }
  catch { return d }
}

function fmtShort(d) {
  try { return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) }
  catch { return d }
}

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <p className="section-label">{children}</p>
      <div className="flex-1 h-px bg-ink-100" />
    </div>
  )
}

function DueProcessTimeline({ steps, lang }) {
  return (
    <div className="flex items-center flex-wrap gap-0">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center">
          <div className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold ${
            s.status === 'done'    ? 'text-green-700 bg-green-50 border border-green-200' :
            s.status === 'active'  ? 'text-teal-700 bg-teal-50 border border-teal-300' :
            'text-ink-300 bg-white border border-ink-100'
          }`}>
            <span>{s.status === 'done' ? '✓' : s.status === 'active' ? '●' : '○'}</span>
            <span>{lf(s.label, lang)}</span>
            {s.fecha && s.status === 'done' && (
              <span className="text-[9px] opacity-60">{new Date(s.fecha).toLocaleDateString()}</span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div className="w-6 h-px bg-ink-200 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}

function PactumPanel({ nivel, status, lang, t }) {
  const levels = [
    { n: 1, key: 'l1', label: { es: 'Negociación', en: 'Negotiation' }, desc: { es: 'Resolución directa entre partes', en: 'Direct resolution between parties' } },
    { n: 2, key: 'l2', label: { es: 'Mediación',   en: 'Mediation' },   desc: { es: 'Facilitador neutral',           en: 'Neutral facilitator' } },
    { n: 3, key: 'l3', label: { es: 'Arbitraje',   en: 'Arbitration' }, desc: { es: 'Decisión vinculante',           en: 'Binding decision' } },
    { n: 4, key: 'l4', label: { es: 'Litigio',     en: 'Litigation' },  desc: { es: 'Proceso judicial',              en: 'Court proceedings' } },
  ]
  return (
    <div className="grid grid-cols-2 gap-2">
      {levels.map(l => {
        const isActive = l.n === nivel && status === 'active'
        const isDone   = status === 'resolved' || l.n < nivel
        return (
          <div key={l.n} className={`p-3 border transition-colors ${
            isActive ? 'border-teal-400 bg-teal-50' :
            isDone   ? 'border-green-200 bg-green-50' :
            'border-ink-100 bg-white'
          }`}>
            <p className={`text-xs font-bold ${isActive ? 'text-teal-700' : isDone ? 'text-green-700' : 'text-ink-400'}`}>
              L{l.n} — {lf(l.label, lang)}
            </p>
            <p className="text-[10px] text-ink-400 mt-0.5">{lf(l.desc, lang)}</p>
            {isActive && <span className="text-[9px] font-black text-teal-600 uppercase mt-1 block">● {t('pactum.active')}</span>}
            {isDone && status !== 'resolved' && <span className="text-[9px] font-black text-green-600 uppercase mt-1 block">✓</span>}
            {status === 'resolved' && <span className="text-[9px] font-black text-green-600 uppercase mt-1 block">✓ {t('pactum.resolved')}</span>}
          </div>
        )
      })}
    </div>
  )
}

function EvidenceQuality({ ev, lang, t }) {
  const checks = [
    { key: 'tiene_fecha', label: { es: 'Tiene fecha', en: 'Has date' } },
    { key: 'firmado',     label: { es: 'Firmado',     en: 'Signed' } },
    { key: 'validacion_cruzada', label: { es: 'Validación cruzada', en: 'Cross-validated' } },
  ]
  const score = ev.quality?.score ?? 0
  const color = score >= 80 ? '#1A7A4A' : score >= 50 ? '#C8922A' : '#C0392B'
  const nivelLabel = score >= 80 ? t('evidence_quality.level_robusto') : score >= 50 ? t('evidence_quality.level_solido') : score >= 25 ? t('evidence_quality.level_basico') : t('evidence_quality.level_insuficiente')
  return (
    <div className="mt-2 pl-3 border-l-2 border-ink-100">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-1 flex-1 bg-ink-100">
          <div className="h-full" style={{ width: `${score}%`, backgroundColor: color }} />
        </div>
        <span className="text-[9px] font-bold uppercase" style={{ color }}>{nivelLabel} {score}%</span>
      </div>
      <div className="flex gap-3">
        {checks.map(c => (
          <span key={c.key} className={`text-[9px] font-semibold ${ev.quality?.[c.key] ? 'text-green-600' : 'text-ink-300'}`}>
            {ev.quality?.[c.key] ? '✓' : '✗'} {lf(c.label, lang)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function CaseDetail() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const { cases, companies } = useCaseStore()
  const caso = cases.find(c => c.id === id)
  const company = caso ? companies.find(co => co.id === caso.empresa_id) : null
  const [reply, setReply] = useState({ name: '', company: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)
  const [summary, setSummary]     = useState('')
  const [loadingAI, setLoadingAI] = useState(false)

  async function handleGenerateSummary() {
    if (!caso) return
    setLoadingAI(true)
    const rawFacts = `Empresa: ${caso.empresa}. Contraparte: ${caso.contraparte}. Conflicto: ${lf(caso.conflicto, lang)}. Impacto: ${caso.impacto}. Descripción: ${lf(caso.descripcion, lang)}`
    const result = await generateCaseSummary(rawFacts, lang)
    setSummary(result)
    setLoadingAI(false)
  }

  if (!caso) return (
    <div className="max-w-5xl mx-auto px-5 py-20 text-center text-ink-400">
      <p className="font-medium">{t('case_detail.not_found')}</p>
      <Link to="/buscar" className="mt-3 inline-flex items-center gap-1 text-sm text-teal-600 hover:underline">
        <ArrowLeft size={13} /> {t('case_detail.back')}
      </Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">

      <div className="flex items-center gap-3 mb-6">
        <Link to={`/empresa/${caso.empresa_id}`} className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-teal-600 transition-colors">
          <ArrowLeft size={12} /> {caso.empresa}
        </Link>
        <span className="text-ink-200">/</span>
        <span className="text-xs text-ink-400 font-mono">{caso.folio}</span>
      </div>

      {/* Header */}
      <div className="bg-white border border-ink-200 p-6 mb-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <RiskBadge level={caso.riesgo} size="md" />
              <span className="text-xs text-ink-400 font-mono">{caso.folio}</span>
            </div>
            <h1 className="text-xl font-bold text-navy-950 leading-snug">{lf(caso.titulo, lang)}</h1>
          </div>
          <Link to={`/caso/${caso.id}/report`} className="btn-primary flex items-center gap-2 flex-shrink-0">
            <Download size={13} /> {t('case_detail.download_pdf')}
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-500">
          <span>{caso.empresa}</span>
          <span>vs.</span>
          <span className="font-semibold text-ink-700">{caso.contraparte}</span>
          <span>·</span>
          <span>{caso.ciudad}</span>
          <span>·</span>
          <span>{fmt(caso.created_at)}</span>
        </div>
      </div>

      {/* Legal disclaimer */}
      <div className="bg-amber-50 border border-amber-200 border-t-0 px-6 py-3 mb-8 flex items-start gap-2.5">
        <span className="text-amber-500 text-sm font-bold flex-shrink-0 mt-px">!</span>
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-bold">{t('case_detail.disclaimer_title')}: </span>
          {t('case_detail.disclaimer_text')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main */}
        <div className="lg:col-span-2 space-y-10">

          {/* Summary */}
          <div>
            <SectionHeading>{t('case_detail.section_summary')}</SectionHeading>
            <p className="text-sm text-ink-700 leading-relaxed mb-6">{lf(caso.descripcion, lang)}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                [t('case_detail.conflicto'), lf(caso.conflicto, lang)],
                [t('case_detail.impacto'),   caso.impacto],
                [t('case_detail.ciudad'),    caso.ciudad],
                [t('case_detail.fecha'),     fmt(caso.created_at)],
              ].map(([label, val]) => (
                <div key={label} className="bg-ink-50 border border-ink-100 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-navy-900">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Due Process Engine */}
          <div>
            <SectionHeading>{t('modules.due_process')}</SectionHeading>
            <DueProcessTimeline steps={caso.due_process} lang={lang} />
          </div>

          {/* Evidence Vault */}
          {caso.evidencia?.length > 0 && (
            <div>
              <SectionHeading>{t('modules.evidence_vault')}</SectionHeading>
              <div className="space-y-3">
                {caso.evidencia.map((ev, i) => (
                  <div key={i} className="bg-white border border-ink-100 px-4 py-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-navy-100 text-navy-700 flex-shrink-0">
                        {ev.tipo}
                      </span>
                      {ev.version && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-navy-100 text-navy-600 border border-navy-200 flex-shrink-0">
                          {ev.version}
                        </span>
                      )}
                      <p className="text-sm text-ink-700 flex-1">{lf(ev.titulo, lang)}</p>
                      <span className="text-[10px] text-ink-400 font-semibold flex-shrink-0">{ev.fuente}</span>
                      {ev.status && (
                        <span className={[
                          'text-[9px] font-black uppercase px-1.5 py-0.5 flex-shrink-0',
                          ev.status === 'verificado' ? 'bg-green-100 text-green-700 border border-green-200' :
                          ev.status === 'pendiente'  ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                                       'bg-crimson-100 text-crimson-700 border border-crimson-200'
                        ].join(' ')}>
                          {ev.status === 'verificado' ? '✓ ' : ev.status === 'pendiente' ? '⏳ ' : '✗ '}{ev.status}
                        </span>
                      )}
                    </div>
                    {/* Hash + upload timestamp */}
                    {(ev.hash || ev.uploaded_at) && (
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        {ev.hash && (
                          <span className="font-mono text-[10px] text-ink-400">
                            {ev.hash.slice(0, 15)}…
                          </span>
                        )}
                        {ev.uploaded_at && (
                          <span className="text-[10px] text-ink-400">
                            Subido: {fmtShort(ev.uploaded_at)}
                          </span>
                        )}
                      </div>
                    )}
                    {ev.quality && <EvidenceQuality ev={ev} lang={lang} t={t} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bitácora de Acciones */}
          <div>
            <SectionHeading>{t('modules.bitacora')}</SectionHeading>
            <Bitacora
              entries={caso.bitacora || []}
              lang={lang}
            />
          </div>

          {/* AI Case Summary */}
          <div>
            <SectionHeading>{t('ai.summary_title')}</SectionHeading>
            {summary ? (
              <div className="bg-teal-50 border border-teal-200 p-4 text-sm text-teal-900 leading-relaxed">
                {summary}
              </div>
            ) : (
              <button
                onClick={handleGenerateSummary}
                disabled={loadingAI}
                className="flex items-center gap-2 px-4 py-2.5 border border-teal-300 text-teal-700 text-sm font-semibold hover:bg-teal-50 transition-colors disabled:opacity-50"
              >
                {loadingAI ? <Loader size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {loadingAI ? t('ai.generating') : t('ai.generate_summary')}
              </button>
            )}
          </div>

          {/* Right of Reply */}
          <div>
            <SectionHeading>{t('case_detail.section_reply')}</SectionHeading>
            <p className="text-sm text-ink-500 mb-5">{t('case_detail.reply_subtitle')}</p>
            {sent ? (
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-4">
                <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                <p className="text-sm font-medium text-emerald-800">{t('case_detail.reply_success')}</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="label">{t('case_detail.reply_name')}</label>
                    <input required className="input" value={reply.name} onChange={e => setReply(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">{t('case_detail.reply_company')}</label>
                    <input required className="input" value={reply.company} onChange={e => setReply(p => ({ ...p, company: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="label">{t('case_detail.reply_email')}</label>
                  <input required type="email" className="input" value={reply.email} onChange={e => setReply(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label className="label">{t('case_detail.reply_message')}</label>
                  <textarea required rows={4} className="input resize-none" value={reply.message} onChange={e => setReply(p => ({ ...p, message: e.target.value }))} />
                </div>
                <button type="submit" className="btn-primary">{t('case_detail.reply_submit')}</button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {/* PACTUM Pipeline */}
          <div className="bg-white border border-ink-200 p-5">
            <p className="section-label mb-4">{t('pactum.title')}</p>
            <PactumPanel nivel={caso.pactum_nivel} status={caso.pactum_status} lang={lang} t={t} />
          </div>

          {/* Credential (if resolved) */}
          {caso.credencial && (
            <div className="border border-green-300 bg-green-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">
                {t('modules.credentials')}
              </p>
              <p className="text-sm font-bold text-green-900">{t('company.credential_title')}</p>
              <p className="text-[10px] text-green-700 font-mono mt-1">#{caso.credencial.folio}</p>
              <p className="text-[10px] text-green-600 mt-1">{fmt(caso.credencial.emitida)}</p>
            </div>
          )}

          {/* Company link */}
          {company && (
            <div className="bg-white border border-ink-200 p-5">
              <p className="section-label mb-3">{t('company.profile')}</p>
              <Link to={`/empresa/${company.id}`}
                className="flex items-center justify-between text-sm font-semibold text-navy-800 hover:text-teal-700 transition-colors">
                {company.nombre}
                <span className="text-xs font-black tabular-nums" style={{ color: '#C0392B' }}>
                  RS {company.rs_score}
                </span>
              </Link>
            </div>
          )}

          {/* Download */}
          <div className="bg-navy-950 text-white p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-navy-400 mb-2">{t('case_detail.report_full')}</p>
            <p className="text-sm text-navy-300 leading-relaxed mb-4">{t('case_detail.report_desc')}</p>
            <Link to={`/caso/${caso.id}/report`}
              className="btn-danger text-sm w-full flex items-center justify-center gap-2">
              <Download size={13} /> {t('case_detail.download_pdf')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
