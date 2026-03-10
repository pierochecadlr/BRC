import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ExternalLink, Download, CheckCircle } from 'lucide-react'
import RiskBadge from '../components/RiskBadge'
import { MOCK_CASES, lf } from '../lib/mockData'

function fmt(d) {
  try { return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }) }
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

export default function CaseDetail() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const caso = MOCK_CASES.find(c => c.id === id)
  const [reply, setReply] = useState({ name: '', company: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  if (!caso) return (
    <div className="max-w-5xl mx-auto px-5 py-20 text-center text-ink-400">
      <p className="font-medium">{t('case_detail.not_found')}</p>
      <Link to="/cases" className="mt-3 inline-flex items-center gap-1 text-sm text-navy-700 hover:underline">
        <ArrowLeft size={13} /> {t('case_detail.back')}
      </Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">

      <Link to="/cases" className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-navy-700 transition-colors mb-6">
        <ArrowLeft size={12} /> {t('case_detail.back')}
      </Link>

      {/* Header */}
      <div className="bg-white border border-ink-200 p-6 mb-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <RiskBadge level={caso.riesgo} size="md" />
              <span className="text-xs text-ink-400 font-mono">#{caso.id.padStart(4, '0')}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-950 leading-snug">{lf(caso.titulo, lang)}</h1>
          </div>
          <Link to={`/cases/${caso.id}/report`} className="btn-primary flex items-center gap-2 flex-shrink-0">
            <Download size={13} /> PDF
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-500">
          <span>{caso.empresa}</span>
          <span>{caso.ciudad}</span>
          <span>{fmt(caso.created_at)}</span>
          <span className="font-semibold text-ink-700">{lf(caso.conflicto, lang)}</span>
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

            {caso.empresas_vinculadas?.length > 0 && (
              <div className="mt-5">
                <p className="section-label mb-2">{t('case_detail.empresas_vinculadas')}</p>
                <div className="flex flex-wrap gap-2">
                  {caso.empresas_vinculadas.map(e => (
                    <span key={e} className="text-xs border border-navy-200 text-navy-700 px-3 py-1 bg-navy-50">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Evidence & Sources */}
          {caso.evidencia?.length > 0 && (
            <div>
              <SectionHeading>{t('case_detail.section_evidence')}</SectionHeading>
              <div className="space-y-px">
                {caso.evidencia.map((ev, i) => (
                  <div key={i}
                    className="flex items-center justify-between bg-white border border-ink-100 px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[10px] font-black uppercase px-1.5 py-0.5 flex-shrink-0 bg-navy-100 text-navy-700">
                        {ev.tipo}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm text-ink-700 truncate">{lf(ev.titulo, lang)}</p>
                        <p className="text-[10px] text-ink-400 font-semibold">{ev.fuente}</p>
                      </div>
                    </div>
                    <a href={ev.url} target="_blank" rel="noopener noreferrer"
                       className="text-ink-400 hover:text-navy-700 transition-colors flex-shrink-0 ml-3">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right of reply */}
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
                    <input required className="input" value={reply.name}
                      onChange={e => setReply(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">{t('case_detail.reply_company')}</label>
                    <input required className="input" value={reply.company}
                      onChange={e => setReply(p => ({ ...p, company: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="label">{t('case_detail.reply_email')}</label>
                  <input required type="email" className="input" value={reply.email}
                    onChange={e => setReply(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label className="label">{t('case_detail.reply_message')}</label>
                  <textarea required rows={4} className="input resize-none" value={reply.message}
                    onChange={e => setReply(p => ({ ...p, message: e.target.value }))} />
                </div>
                <button type="submit" className="btn-primary">{t('case_detail.reply_submit')}</button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {/* Contacts / Authorities */}
          {caso.contactos?.length > 0 && (
            <div className="bg-white border border-ink-200 p-5">
              <p className="section-label mb-4">{t('case_detail.section_contacts')}</p>
              <ul className="divide-y divide-ink-100">
                {caso.contactos.map((c, i) => (
                  <li key={i} className="py-3 first:pt-0 last:pb-0">
                    <p className="text-sm font-semibold text-navy-900">{c.nombre}</p>
                    <p className="text-xs text-ink-500 mt-0.5">{c.rol}</p>
                    {c.email && (
                      <a href={c.email.startsWith('http') ? c.email : `mailto:${c.email}`}
                        target={c.email.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-xs text-navy-600 hover:underline mt-1 block truncate">
                        {c.email.startsWith('http') ? t('common.official_source') : c.email}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Download */}
          <div className="bg-navy-950 text-white p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-navy-400 mb-2">
              {t('case_detail.report_full')}
            </p>
            <p className="text-sm text-navy-300 leading-relaxed mb-4">
              {t('case_detail.report_desc')}
            </p>
            <Link to={`/cases/${caso.id}/report`}
              className="btn-danger text-sm w-full flex items-center justify-center gap-2">
              <Download size={13} /> {t('case_detail.download_pdf')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
