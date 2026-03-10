import { rsColor } from '../lib/mockData'

export default function ReputationScore({ score, size = 'md' }) {
  const color = rsColor(score)
  const sizes = {
    sm:  { w: 72,  r: 28, sw: 6,  fs: '1rem',   sub: '0.5rem' },
    md:  { w: 100, r: 38, sw: 8,  fs: '1.4rem',  sub: '0.6rem' },
    lg:  { w: 140, r: 54, sw: 10, fs: '2rem',    sub: '0.7rem' },
  }
  const { w, r, sw, fs, sub } = sizes[size] || sizes.md
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div style={{ position: 'relative', width: w, height: w, flexShrink: 0 }}>
      <svg width={w} height={w} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={w/2} cy={w/2} r={r} fill="none" stroke="#e5e0d8" strokeWidth={sw} />
        <circle cx={w/2} cy={w/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: fs, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: sub, color: '#8c8270', fontWeight: 700, marginTop: 2 }}>/100</span>
      </div>
    </div>
  )
}
