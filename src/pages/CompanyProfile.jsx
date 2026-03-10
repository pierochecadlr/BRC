import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Award, CheckCircle, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ReputationScore from '../components/ReputationScore'
import RsBadge from '../components/RsBadge'
import { MOCK_COMPANIES, MOCK_CASES, rsColor, lf } from '../lib/mockData'

function fmt(d) {
  try { return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }) }
  catch { return d }
}

function DueProcessMini({ steps, lang }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {steps.map((s, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className={`text-[10px] font-semibold ${
            s.status === 'done' ? 'text-green-600' :
            s.status === 'active' ? 'text-teal-600' : 'text-ink-300'
          }`}>
            {s.status === 'done' ? '✓' : s.status === 'active' ? '●' : '○'} {lf(s.label, lang)}
          </span>
          {i < steps.length - 1 && <span className="text-ink-200 text-[10px]">→</span>}
        </span>
      ))}
    </div>
  )
}

export default function CompanyProfile() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  const company = MOCK_COMPANIES.find(c => c.id === id)
  const cases   = MOCK_CASES.filter(c => c.empresa_id === id)

  if (!company) return (
    <div className="max-w-5xl mx-auto px-5 py-20 text-center text-ink-400">
      <p>{t('common.not_found')}</p>
      <Link to="/buscar" className="mt-3 inline-flex items-center gap-1 text-sm text-teal-600 hover:underline">
        <ArrowLeft size={13} /> {t('case_detail.back')}
      </Link>
    </div>
  )

  const credRef = useRef(null)

  async function downloadCredential(caso) {
    const el = credRef.current
    if (!el) return
    const canvas = await html2canvas(el, { scale: 3, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('l', 'mm', [120, 80])
    pdf.addImage(imgData, 'PNG', 0, 0, 120, 80)
    pdf.save('BRCcheck-Credencial-' + (caso?.credencial?.folio || 'CRED') + '.pdf')
  }

  const activeCases   = cases.filter(c => c.status !== 'resuelto')
  const resolvedCases = cases.filter(c => c.status === 'resuelto')

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <Link to="/buscar" className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-teal-600 transition-colors mb-6">
        <ArrowLeft size={12} /> {t('case_detail.back')}
      </Link>

      {/* Header */}
      <div className="bg-white border border-ink-200 p-6 mb-1">
        <div className="flex items-start gap-6 flex-wrap">
          <ReputationScore score={company.rs_score} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">
              {lf(company.sector, lang)} · {company.ciudad}
            </p>
            <h1 className="text-2xl font-bold text-navy-950 mb-3">{company.nombre}</h1>
            <RsBadge score={company.rs_score} lang={lang} showScore />
            <div className="flex gap-6 mt-4 text-sm">
              <div>
                <p className="font-black text-navy-950 text-xl">{company.casos_activos}</p>
                <p className="text-[10px] text-ink-400 uppercase tracking-wider font-medium">{t('company.active_cases')}</p>
              </div>
              <div>
                <p className="font-black text-navy-950 text-xl">{company.casos_resueltos}</p>
                <p className="text-[10px] text-ink-400 uppercase tracking-wider font-medium">{t('company.resolved_cases')}</p>
              </div>
              <div>
                <p className="font-black text-navy-950 text-xl">{company.credenciales}</p>
                <p className="text-[10px] text-ink-400 uppercase tracking-wider font-medium">{t('company.credentials')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* RS Breakdown */}
        <div className="bg-white border border-ink-200 p-5">
          <p className="section-label mb-4">{t('company.rs_breakdown')}</p>
          <div className="space-y-3">
            {company.rs_breakdown.map(dim => (
              <div key={dim.key}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-ink-600 font-medium">{lf(dim.label, lang)}</p>
                  <p className="text-xs font-bold tabular-nums" style={{ color: rsColor(dim.score) }}>{dim.score}</p>
                </div>
                <div className="h-1.5 bg-ink-100 w-full">
                  <div className="h-full transition-all" style={{ width: `${dim.score}%`, backgroundColor: rsColor(dim.score) }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cases */}
        <div className="lg:col-span-2 space-y-4">

          {/* Credential badge if any */}
          {company.credenciales > 0 && (
            <div className="border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3 mb-3">
                <Award size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700">{t('company.credential_title')}</p>
                  <p className="text-xs text-green-700 mt-0.5">{t('company.credential_desc', { n: company.credenciales })}</p>
                </div>
              </div>
              {/* Hidden printable credential card */}
              <div ref={credRef} style={{
                background: 'linear-gradient(135deg, #1B3557 0%, #0D111C 100%)',
                padding: '20px 24px', width: '360px', position: 'absolute', left: '-9999px', top: 0,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 900, fontSize: 18, letterSpacing: -0.5 }}>BRC<span style={{ color: '#0D7377' }}>check</span></p>
                    <p style={{ color: '#0D7377', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>Buró Reputacional Ciudadano</p>
                  </div>
                  <div style={{ background: '#1A7A4A', padding: '3px 8px' }}>
                    <p style={{ color: '#fff', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>✓ Verificado</p>
                  </div>
                </div>
                <p style={{ color: '#C8922A', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>Cumplimiento Verificado</p>
                <p style={{ color: '#fff', fontSize: 15, fontWeight: 800, marginBottom: 12 }}>{company.nombre}</p>
                {resolvedCases.filter(rc => rc.credencial).slice(0, 1).map(rc => (
                  <div key={rc.id}>
                    <p style={{ color: '#8899aa', fontSize: 9, fontWeight: 600, fontFamily: 'monospace' }}>Folio: {rc.credencial.folio}</p>
                    <p style={{ color: '#8899aa', fontSize: 9, marginTop: 2 }}>Emitida: {new Date(rc.credencial.emitida).toLocaleDateString('es-MX')}</p>
                  </div>
                ))}
                <p style={{ color: '#445566', fontSize: 8, marginTop: 12, borderTop: '1px solid #223344', paddingTop: 8 }}>brccheck.com · info@brccheck.com</p>
              </div>
              <button
                onClick={() => downloadCredential(resolvedCases.find(rc => rc.credencial))}
                className="flex items-center gap-1.5 text-xs font-semibold text-green-700 border border-green-300 px-3 py-1.5 hover:bg-green-100 transition-colors"
              >
                <Download size={11} /> Descargar credencial PDF
              </button>
            </div>
          )}

          {/* Active cases */}
          {activeCases.length > 0 && (
            <div>
              <p className="section-label mb-3">{t('company.active_cases')}</p>
              <div className="flex flex-col gap-px">
                {activeCases.map(caso => (
                  <div key={caso.id} className="bg-white border border-ink-100 p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">
                          {caso.folio} · {lf(caso.conflicto, lang)}
                        </p>
                        <p className="font-semibold text-navy-900 text-sm">{lf(caso.titulo, lang)}</p>
                      </div>
                      <Link to={`/caso/${caso.id}`}
                        className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex-shrink-0 border border-teal-200 px-3 py-1 hover:bg-teal-50 transition-colors">
                        {t('cases.view_detail')}
                      </Link>
                    </div>
                    <DueProcessMini steps={caso.due_process} lang={lang} />
                    <div className="mt-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5"
                        style={{ background: '#0D737718', color: '#0D7377', border: '1px solid #0D737740' }}>
                        L{caso.pactum_nivel} PACTUM
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resolved cases */}
          {resolvedCases.length > 0 && (
            <div>
              <p className="section-label mb-3">{t('company.resolved_cases')}</p>
              <div className="flex flex-col gap-px">
                {resolvedCases.map(caso => (
                  <div key={caso.id} className="bg-white border border-ink-100 p-4 flex items-start gap-3">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm">{lf(caso.titulo, lang)}</p>
                      <p className="text-xs text-ink-400 mt-1">{fmt(caso.created_at)}</p>
                      {caso.credencial && (
                        <p className="text-[10px] font-bold text-green-700 mt-1">
                          CRED #{caso.credencial.folio} · {fmt(caso.credencial.emitida)}
                        </p>
                      )}
                    </div>
                    <Link to={`/caso/${caso.id}`}
                      className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex-shrink-0">
                      {t('cases.view_detail')}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cases.length === 0 && (
            <div className="bg-white border border-ink-100 py-12 text-center">
              <CheckCircle size={28} className="text-green-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-ink-500">{t('company.no_cases')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
