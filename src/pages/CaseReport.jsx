import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Printer, Download } from 'lucide-react'
import RiskBadge from '../components/RiskBadge'
import { MOCK_CASES, lf } from '../lib/mockData'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

function fmt(d) {
  try { return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }) }
  catch { return d }
}

const RISK_COLOR = { alto: '#c11414', medio: '#f59e0b', bajo: '#22c55e' }
const RISK_PCT   = { alto: 85, medio: 55, bajo: 25 }

function RiskGauge({ level, gaugeLabel }) {
  const pct   = RISK_PCT[level] || 0
  const color = RISK_COLOR[level] || '#22c55e'
  const r     = 38
  const circ  = 2 * Math.PI * r
  const dash  = (pct / 100) * circ

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color,
        }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>{pct}%</span>
        </div>
      </div>
      <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
        {gaugeLabel}
      </span>
    </div>
  )
}

export default function CaseReport() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const caso = MOCK_CASES.find(c => c.id === id)
  const reportRef = useRef(null)

  const handleDownloadPDF = async () => {
    const el = reportRef.current
    if (!el) return
    const canvas = await html2canvas(el, { scale: 2, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const w = pdf.internal.pageSize.getWidth()
    const h = (canvas.height * w) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, w, h)
    pdf.save(`BRC-Caso-${caso?.id || 'report'}.pdf`)
  }

  if (!caso) return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-center text-ink-400">
      <p>{t('case_detail.not_found')}</p>
      <Link to="/cases" className="mt-4 inline-flex items-center gap-2 text-navy-700 font-medium hover:underline">
        <ArrowLeft size={14} /> {t('case_detail.back')}
      </Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6 no-print">
        <Link to={`/cases/${caso.id}`}
          className="flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors">
          <ArrowLeft size={14} /> {t('report.back')}
        </Link>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn-ghost flex items-center gap-2 text-sm">
            <Printer size={15} /> {t('report.print')}
          </button>
          <button onClick={handleDownloadPDF} className="btn-primary flex items-center gap-2 text-sm">
            <Download size={15} /> {t('report.download')}
          </button>
        </div>
      </div>

      {/* Printable report */}
      <div ref={reportRef} className="bg-white border border-ink-200 overflow-hidden">

        {/* Header */}
        <div className="bg-navy-950 text-white px-8 py-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-black text-2xl tracking-tight">
                BRC<span className="text-crimson-400">.</span>
              </p>
              <p className="text-navy-400 text-xs mt-0.5">{t('nav.tagline')}</p>
            </div>
            <div className="text-right text-xs text-navy-400">
              <p className="font-semibold text-white text-sm">{t('report.title')}</p>
              <p className="mt-0.5">{t('report.date')}: {fmt(new Date().toISOString())}</p>
              <p>{t('report.id_label')}: #{caso.id.padStart(6, '0')}</p>
            </div>
          </div>
        </div>

        {/* Risk gauge + title */}
        <div className="px-8 py-6 border-b border-ink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-navy-950 mb-2">{lf(caso.titulo, lang)}</h1>
            <div className="flex flex-wrap gap-3 text-sm text-ink-500">
              <span>{caso.empresa}</span>
              <span>·</span>
              <span>{caso.ciudad}</span>
              <span>·</span>
              <span>{fmt(caso.created_at)}</span>
            </div>
          </div>
          <RiskGauge level={caso.riesgo} gaugeLabel={t('case_detail.gauge_label')} />
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {[
              [t('case_detail.conflicto'), lf(caso.conflicto, lang)],
              [t('case_detail.impacto'),   caso.impacto],
              [t('case_detail.risk_label'), <RiskBadge level={caso.riesgo} />],
            ].map(([label, val]) => (
              <div key={label} className="bg-ink-50 border border-ink-100 p-3 text-center">
                <p className="text-[10px] text-ink-400 font-bold uppercase tracking-widest mb-1">{label}</p>
                <p className="font-bold text-navy-900 text-sm">{val}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="section-label mb-2 border-b border-ink-100 pb-2">{t('case_detail.section_summary')}</p>
            <p className="text-sm text-ink-700 leading-relaxed">{lf(caso.descripcion, lang)}</p>
          </div>

          {/* Linked companies */}
          {caso.empresas_vinculadas?.length > 0 && (
            <div>
              <p className="section-label mb-2 border-b border-ink-100 pb-2">{t('case_detail.empresas_vinculadas')}</p>
              <div className="flex flex-wrap gap-2">
                {caso.empresas_vinculadas.map(e => (
                  <span key={e} className="text-xs border border-navy-200 text-navy-700 px-3 py-1 bg-navy-50">{e}</span>
                ))}
              </div>
            </div>
          )}

          {/* Evidence / Sources */}
          {caso.evidencia?.length > 0 && (
            <div>
              <p className="section-label mb-2 border-b border-ink-100 pb-2">{t('case_detail.section_evidence')}</p>
              <ul className="space-y-2">
                {caso.evidencia.map((ev, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-navy-100 text-navy-700 flex-shrink-0 mt-0.5">
                      {ev.tipo}
                    </span>
                    <div>
                      <p className="text-ink-700">{lf(ev.titulo, lang)}</p>
                      <p className="text-[10px] text-ink-400 font-semibold mt-0.5">{ev.fuente}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contacts */}
          {caso.contactos?.length > 0 && (
            <div>
              <p className="section-label mb-2 border-b border-ink-100 pb-2">{t('case_detail.section_contacts')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caso.contactos.map((c, i) => (
                  <div key={i} className="bg-ink-50 border border-ink-100 p-3 text-sm">
                    <p className="font-semibold text-navy-800">{c.nombre}</p>
                    <p className="text-ink-500 text-xs">{c.rol}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-ink-50 border-t border-ink-100 px-8 py-4 text-xs text-ink-400 flex justify-between">
          <span>{t('case_detail.disclaimer_text').slice(0, 110)}…</span>
          <span className="font-medium flex-shrink-0 ml-4">{t('report.footer_brand')}</span>
        </div>
      </div>
    </div>
  )
}
