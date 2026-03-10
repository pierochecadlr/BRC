import { rsColor, rsStatus } from '../lib/mockData'

const labels = {
  verificado: { es: 'Cumplimiento Verificado', en: 'Verified Compliance' },
  medio:      { es: 'Riesgo Medio',            en: 'Medium Risk' },
  riesgo:     { es: 'Riesgo Alto',             en: 'High Risk' },
}

export default function RsBadge({ score, lang = 'es', showScore = false }) {
  const status = rsStatus(score)
  const color  = rsColor(score)
  const label  = labels[status]?.[lang] || labels[status]?.es

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', fontSize: '0.65rem', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.06em',
      backgroundColor: color + '18', color, border: `1px solid ${color}40`,
    }}>
      ● {label}{showScore ? ` · ${score}` : ''}
    </span>
  )
}
