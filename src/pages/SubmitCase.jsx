import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle, ArrowRight, ArrowLeft, Send, Upload, X as XIcon, FileText, Image, Film, Loader, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import { classifyEvidence } from '../lib/claude'

const TOTAL_STEPS = 3

const ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.mp4,.mov,.avi'

function fileIcon(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (['mp4', 'mov', 'avi'].includes(ext)) return <Film size={13} />
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return <Image size={13} />
  return <FileText size={13} />
}

function fmtSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function FileUploadZone({ files, setFiles, t }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [aiResults, setAiResults] = useState({})
  const [loadingIdx, setLoadingIdx] = useState(null)

  async function addFiles(list) {
    const arr = Array.from(list)
    setFiles(prev => {
      const startIdx = prev.length
      // Trigger classification after state update via setTimeout
      arr.forEach((file, offset) => {
        const idx = startIdx + offset
        setTimeout(async () => {
          setLoadingIdx(idx)
          const result = await classifyEvidence(file)
          setAiResults(r => ({ ...r, [idx]: result }))
          setLoadingIdx(null)
        }, 0)
      })
      return [...prev, ...arr]
    })
  }

  function remove(idx) {
    setFiles(prev => prev.filter((_, i) => i !== idx))
    setAiResults(prev => {
      const next = {}
      Object.keys(prev).forEach(k => {
        const ki = parseInt(k)
        if (ki < idx) next[ki] = prev[k]
        else if (ki > idx) next[ki - 1] = prev[k]
      })
      return next
    })
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const nivelColor = {
    'Insuficiente': '#C0392B',
    'Básico': '#C8922A',
    'Sólido': '#0D7377',
    'Robusto': '#1A7A4A',
    'Insufficient': '#C0392B',
    'Basic': '#C8922A',
    'Solid': '#0D7377',
    'Robust': '#1A7A4A',
  }

  return (
    <div>
      <label className="label">{t('submit.files_label')}</label>
      <p className="text-xs text-ink-400 mb-2">{t('submit.files_desc')}</p>

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={clsx(
          'border-2 border-dashed cursor-pointer transition-colors p-6 text-center',
          dragging ? 'border-navy-500 bg-navy-50' : 'border-ink-200 hover:border-navy-400'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT}
          className="hidden"
          onChange={e => addFiles(e.target.files)}
        />
        <Upload size={22} className="mx-auto text-ink-400 mb-2" />
        <p className="text-sm font-semibold text-ink-600">{t('submit.files_btn')}</p>
        <p className="text-xs text-ink-400 mt-1">{t('submit.files_or')}</p>
        <p className="text-[10px] text-ink-300 mt-2 uppercase tracking-wider">
          PDF · DOC · JPG · PNG · MP4 · MOV
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-2 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="bg-ink-50 border border-ink-100">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-navy-600 flex-shrink-0">{fileIcon(f.name)}</span>
                  <span className="text-xs text-ink-700 truncate">{f.name}</span>
                  <span className="text-[10px] text-ink-400 flex-shrink-0 ml-1">{fmtSize(f.size)}</span>
                </div>
                <button type="button" onClick={() => remove(i)}
                  className="text-ink-400 hover:text-crimson-600 transition-colors ml-3 flex-shrink-0">
                  <XIcon size={13} />
                </button>
              </div>
              {loadingIdx === i && (
                <div className="px-3 pb-2 flex items-center gap-2 text-teal-600 text-xs">
                  <Loader size={11} className="animate-spin" />
                  <span>{t('ai.analyzing')}</span>
                </div>
              )}
              {aiResults[i] && (
                <div className="mx-3 mb-2 bg-teal-50 border border-teal-200 px-3 py-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles size={11} className="text-teal-600 flex-shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700">{t('ai.classify_title')}</span>
                    <span className="ml-auto text-[10px] font-black uppercase"
                      style={{ color: nivelColor[aiResults[i].nivel] || '#0D7377' }}>
                      {aiResults[i].nivel}
                    </span>
                  </div>
                  <p className="text-[10px] text-teal-800 font-semibold">{aiResults[i].tipo}</p>
                  <p className="text-[10px] text-teal-700 mt-0.5 leading-relaxed">{aiResults[i].observacion}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const RISK_LEVELS = ['alto', 'medio', 'bajo']

const riskStyle = {
  alto:  { active: 'border-crimson-600 bg-crimson-50  text-crimson-700', idle: 'border-ink-200 text-ink-400 hover:border-crimson-300' },
  medio: { active: 'border-amber-500   bg-amber-50    text-amber-700',   idle: 'border-ink-200 text-ink-400 hover:border-amber-300' },
  bajo:  { active: 'border-emerald-500 bg-emerald-50  text-emerald-700', idle: 'border-ink-200 text-ink-400 hover:border-emerald-300' },
}

function StepBar({ step }) {
  const { t } = useTranslation()
  const steps = [t('submit.step1_title'), t('submit.step2_title'), t('submit.step3_title')]
  return (
    <div className="flex items-center gap-0 mb-8 border border-ink-200 bg-white overflow-hidden">
      {steps.map((label, i) => {
        const n = i + 1
        const active = step === n
        const done   = step > n
        return (
          <div key={n} className={clsx(
            'flex-1 flex items-center gap-2 px-4 py-3 text-xs font-semibold transition-colors',
            active ? 'bg-navy-950 text-white' : done ? 'bg-ink-100 text-ink-500' : 'bg-white text-ink-300',
            i < 2 && 'border-r border-ink-200'
          )}>
            <span className={clsx(
              'w-5 h-5 flex items-center justify-center text-[10px] font-black flex-shrink-0',
              active ? 'bg-white text-navy-950' : done ? 'bg-emerald-500 text-white' : 'border border-ink-300 text-ink-400'
            )}>
              {done ? '✓' : n}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function SubmitCase() {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState([])
  const [form, setForm] = useState({
    empresa: '', ciudad: '', titulo: '', descripcion: '',
    riesgo: 'medio', impacto: '', conflicto: '',
    evidencia_url: '', nombre: '', email: ''
  })

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const fieldError = k => errors[k] && <p className="text-crimson-600 text-xs mt-1">{t('submit.required')}</p>

  function validate1() {
    const e = {}
    if (!form.empresa)     e.empresa     = true
    if (!form.ciudad)      e.ciudad      = true
    if (!form.titulo)      e.titulo      = true
    if (!form.descripcion) e.descripcion = true
    setErrors(e); return Object.keys(e).length === 0
  }
  function validate2() {
    const e = {}
    if (!form.conflicto) e.conflicto = true
    if (!form.impacto)   e.impacto   = true
    setErrors(e); return Object.keys(e).length === 0
  }

  function next() {
    if (step === 1 && !validate1()) return
    if (step === 2 && !validate2()) return
    setStep(s => s + 1); setErrors({})
  }
  function back() { setStep(s => s - 1); setErrors({}) }

  const conflictOptions = [
    { key: 'conflicto_fraud',      label: t('submit.conflicto_fraud') },
    { key: 'conflicto_corruption', label: t('submit.conflicto_corruption') },
    { key: 'conflicto_contract',   label: t('submit.conflicto_contract') },
    { key: 'conflicto_env',        label: t('submit.conflicto_env') },
    { key: 'conflicto_labor',      label: t('submit.conflicto_labor') },
    { key: 'conflicto_other',      label: t('submit.conflicto_other') },
  ]

  if (done) return (
    <div className="max-w-md mx-auto px-5 py-20 text-center">
      <div className="bg-white border border-ink-200 p-10">
        <CheckCircle size={40} className="text-emerald-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-navy-950 mb-2">{t('submit.success_title')}</h2>
        <p className="text-sm text-ink-500 leading-relaxed mb-8">{t('submit.success_text')}</p>
        <Link to="/buscar" className="btn-primary inline-flex items-center gap-2">
          <ArrowRight size={14} /> {t('submit.success_btn')}
        </Link>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
      <div className="border-b border-ink-200 pb-5 mb-8">
        <h1 className="page-title">{t('submit.title')}</h1>
        <p className="text-sm text-ink-500 mt-1">{t('submit.subtitle')}</p>
      </div>

      <StepBar step={step} />

      <div className="bg-white border border-ink-200 p-6">

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">{t('submit.empresa')} *</label>
                <input className={clsx('input', errors.empresa && 'border-crimson-500')}
                  placeholder={t('submit.empresa_ph')} value={form.empresa} onChange={set('empresa')} />
                {fieldError('empresa')}
              </div>
              <div>
                <label className="label">{t('submit.ciudad')} *</label>
                <input className={clsx('input', errors.ciudad && 'border-crimson-500')}
                  placeholder={t('submit.ciudad_ph')} value={form.ciudad} onChange={set('ciudad')} />
                {fieldError('ciudad')}
              </div>
            </div>
            <div>
              <label className="label">{t('submit.titulo')} *</label>
              <input className={clsx('input', errors.titulo && 'border-crimson-500')}
                placeholder={t('submit.titulo_ph')} value={form.titulo} onChange={set('titulo')} />
              {fieldError('titulo')}
            </div>
            <div>
              <label className="label">{t('submit.descripcion')} *</label>
              <textarea rows={5} className={clsx('input resize-none', errors.descripcion && 'border-crimson-500')}
                placeholder={t('submit.descripcion_ph')} value={form.descripcion} onChange={set('descripcion')} />
              {fieldError('descripcion')}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="label">{t('submit.riesgo')}</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {RISK_LEVELS.map(r => (
                  <button key={r} type="button"
                    onClick={() => setForm(p => ({ ...p, riesgo: r }))}
                    className={clsx(
                      'py-3 border-2 text-xs font-bold uppercase tracking-widest transition-all',
                      form.riesgo === r ? riskStyle[r].active : riskStyle[r].idle
                    )}>
                    {t(`risk.${r}`)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">{t('submit.conflicto')} *</label>
              <select className={clsx('input', errors.conflicto && 'border-crimson-500')}
                value={form.conflicto} onChange={set('conflicto')}>
                <option value="">{t('submit.conflicto_select')}</option>
                {conflictOptions.map(({ label }) => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
              {fieldError('conflicto')}
            </div>
            <div>
              <label className="label">{t('submit.impacto')} *</label>
              <input className={clsx('input', errors.impacto && 'border-crimson-500')}
                placeholder={t('submit.impacto_ph')} value={form.impacto} onChange={set('impacto')} />
              {fieldError('impacto')}
            </div>
            <div>
              <label className="label">{t('submit.evidencia_url')}</label>
              <input type="url" className="input" placeholder={t('submit.evidencia_ph')}
                value={form.evidencia_url} onChange={set('evidencia_url')} />
            </div>
            <FileUploadZone files={files} setFiles={setFiles} t={t} />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-5">
            <p className="section-label mb-3">{t('submit.confirm_title')}</p>
            <div className="border border-ink-100 divide-y divide-ink-100">
              {[
                [t('submit.empresa'),   form.empresa],
                [t('submit.ciudad'),    form.ciudad],
                [t('submit.titulo'),    form.titulo],
                [t('submit.conflicto'), form.conflicto],
                [t('submit.riesgo'),    t(`risk.${form.riesgo}`)],
                [t('submit.impacto'),   form.impacto],
                [t('submit.files_label'), files.length > 0 ? t('submit.files_count', { count: files.length }) : '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center px-4 py-2.5 text-sm">
                  <span className="text-ink-500">{k}</span>
                  <span className="font-semibold text-navy-900 text-right max-w-[200px] truncate">{v || '—'}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="label">{t('submit.nombre_denunciante')}</label>
                <input className="input" value={form.nombre} onChange={set('nombre')} />
              </div>
              <div>
                <label className="label">{t('submit.email_denunciante')}</label>
                <input type="email" className="input" value={form.email} onChange={set('email')} />
              </div>
            </div>
            <p className="text-xs text-ink-400 leading-relaxed border-t border-ink-100 pt-4">
              {t('submit.confirm_text')}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-ink-100">
          {step > 1 ? (
            <button onClick={back} className="btn-ghost flex items-center gap-2 text-sm">
              <ArrowLeft size={14} /> {t('submit.btn_back')}
            </button>
          ) : <div />}

          {step < TOTAL_STEPS ? (
            <button onClick={next} className="btn-primary flex items-center gap-2 text-sm">
              {t('submit.btn_next')} <ArrowRight size={14} />
            </button>
          ) : (
            <button onClick={() => setDone(true)} className="btn-danger flex items-center gap-2 text-sm">
              <Send size={14} /> {t('submit.btn_submit')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
