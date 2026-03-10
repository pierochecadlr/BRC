import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

const cls = {
  alto:  'risk-alto',
  medio: 'risk-medio',
  bajo:  'risk-bajo',
}

export default function RiskBadge({ level, size = 'sm' }) {
  const { t } = useTranslation()
  return (
    <span className={clsx(
      'inline-flex items-center font-semibold uppercase tracking-wider',
      size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
      cls[level] || cls.bajo
    )}>
      {t(`risk.${level}`)}
    </span>
  )
}
