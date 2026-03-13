import {
  Bell, FileCheck, ArrowUpCircle, CheckSquare, RefreshCw, Award, Clock, Circle,
} from 'lucide-react'
import { lf } from '../lib/mockData'

function fmt(d) {
  try {
    return new Date(d).toLocaleDateString('es-MX', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return d
  }
}

const TIPO_CONFIG = {
  notificacion:      { Icon: Bell,           color: '#0D7377',  bg: '#0D737715', label: 'Notificación' },
  evidencia_agregada:{ Icon: FileCheck,       color: '#1B3557',  bg: '#1B355715', label: 'Evidencia' },
  pactum_avanzado:   { Icon: ArrowUpCircle,   color: '#C8922A',  bg: '#C8922A15', label: 'PACTUM' },
  debido_proceso:    { Icon: CheckSquare,     color: '#1A7A4A',  bg: '#1A7A4A15', label: 'Debido Proceso' },
  estado_actualizado:{ Icon: RefreshCw,       color: '#2563EB',  bg: '#2563EB15', label: 'Estado' },
  credencial_emitida:{ Icon: Award,           color: '#1A7A4A',  bg: '#1A7A4A15', label: 'Credencial' },
  plazo_vencido:     { Icon: Clock,           color: '#C0392B',  bg: '#C0392B15', label: 'Plazo' },
}

function getConfig(tipo) {
  return TIPO_CONFIG[tipo] || { Icon: Circle, color: '#8c8270', bg: '#8c827015', label: tipo }
}

export default function Bitacora({ entries, lang }) {
  if (!entries || entries.length === 0) {
    return (
      <p className="text-sm text-ink-400 italic py-4">Sin entradas en la bitácora.</p>
    )
  }

  const sorted = [...entries].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-ink-100" style={{ marginLeft: '0.5px' }} />

      <div className="space-y-0">
        {sorted.map((entry, idx) => {
          const { Icon, color, bg, label } = getConfig(entry.tipo)
          const isLast = idx === sorted.length - 1

          return (
            <div key={entry.id ?? idx} className="relative flex gap-4 pb-5">
              {/* Icon dot */}
              <div
                className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 border-white"
                style={{ backgroundColor: bg, boxShadow: `0 0 0 2px ${color}30` }}
              >
                <Icon size={15} style={{ color }} />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1.5 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5"
                      style={{ backgroundColor: bg, color }}
                    >
                      {label}
                    </span>
                    <span className="text-xs font-semibold text-ink-700">{entry.actor}</span>
                  </div>
                  <span className="text-[10px] text-ink-400 font-mono whitespace-nowrap flex-shrink-0">
                    {fmt(entry.fecha)}
                  </span>
                </div>

                <p className="text-sm text-ink-700 leading-relaxed">
                  {lf(entry.descripcion, lang)}
                </p>

                {entry.nota && (
                  <div className="mt-2 px-3 py-2 bg-teal-50 border border-teal-200 text-xs text-teal-800 leading-relaxed">
                    <span className="font-bold text-teal-600">Nota: </span>
                    {entry.nota}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
