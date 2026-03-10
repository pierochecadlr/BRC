/**
 * DEMO DATA — BRCcheck MVP
 * Company-centric architecture with Reputation Score (RS) 0-100
 */

export function lf(field, lang) {
  if (field && typeof field === 'object' && !Array.isArray(field)) {
    return field[lang] || field.es || ''
  }
  return field || ''
}

export function rsColor(score) {
  if (score >= 71) return '#1A7A4A'
  if (score >= 41) return '#C8922A'
  return '#C0392B'
}

export function rsStatus(score) {
  if (score >= 71) return 'verificado'
  if (score >= 41) return 'medio'
  return 'riesgo'
}

export const MOCK_COMPANIES = [
  {
    id: 'nexo',
    nombre: 'Constructora Nexo S.A. de C.V.',
    ciudad: 'Ciudad de México',
    sector: { es: 'Construcción', en: 'Construction' },
    rs_score: 34,
    casos_activos: 2,
    casos_resueltos: 0,
    credenciales: 0,
    rs_breakdown: [
      { key: 'cumplimiento',  label: { es: 'Cumplimiento contractual',      en: 'Contract compliance' },      score: 20 },
      { key: 'respuesta',     label: { es: 'Respuesta a notificaciones',    en: 'Response to notifications' }, score: 45 },
      { key: 'historial',     label: { es: 'Historial de resoluciones',     en: 'Resolution history' },        score: 30 },
      { key: 'transparencia', label: { es: 'Transparencia documental',      en: 'Documentary transparency' },  score: 40 },
      { key: 'tiempo',        label: { es: 'Tiempo de resolución',          en: 'Resolution time' },           score: 35 },
    ],
    created_at: '2023-01-15T00:00:00Z',
  },
  {
    id: 'pacifico',
    nombre: 'Distribuidora Pacífico S.A.',
    ciudad: 'Guadalajara, Jalisco',
    sector: { es: 'Distribución', en: 'Distribution' },
    rs_score: 78,
    casos_activos: 0,
    casos_resueltos: 1,
    credenciales: 1,
    rs_breakdown: [
      { key: 'cumplimiento',  label: { es: 'Cumplimiento contractual',      en: 'Contract compliance' },      score: 85 },
      { key: 'respuesta',     label: { es: 'Respuesta a notificaciones',    en: 'Response to notifications' }, score: 75 },
      { key: 'historial',     label: { es: 'Historial de resoluciones',     en: 'Resolution history' },        score: 80 },
      { key: 'transparencia', label: { es: 'Transparencia documental',      en: 'Documentary transparency' },  score: 72 },
      { key: 'tiempo',        label: { es: 'Tiempo de resolución',          en: 'Resolution time' },           score: 78 },
    ],
    created_at: '2022-06-10T00:00:00Z',
  },
  {
    id: 'andrade',
    nombre: 'Grupo Comercial Andrade',
    ciudad: 'Monterrey, Nuevo León',
    sector: { es: 'Comercial', en: 'Commercial' },
    rs_score: 95,
    casos_activos: 0,
    casos_resueltos: 0,
    credenciales: 3,
    rs_breakdown: [
      { key: 'cumplimiento',  label: { es: 'Cumplimiento contractual',      en: 'Contract compliance' },      score: 98 },
      { key: 'respuesta',     label: { es: 'Respuesta a notificaciones',    en: 'Response to notifications' }, score: 95 },
      { key: 'historial',     label: { es: 'Historial de resoluciones',     en: 'Resolution history' },        score: 92 },
      { key: 'transparencia', label: { es: 'Transparencia documental',      en: 'Documentary transparency' },  score: 95 },
      { key: 'tiempo',        label: { es: 'Tiempo de resolución',          en: 'Resolution time' },           score: 95 },
    ],
    created_at: '2021-03-20T00:00:00Z',
  },
]

export const MOCK_CASES = [
  {
    id: 'BRC-001',
    folio: 'BRC-001',
    empresa_id: 'nexo',
    empresa: 'Constructora Nexo S.A. de C.V.',
    contraparte: 'Proveedor Materiales del Norte S.A.',
    titulo: {
      es: 'Incumplimiento de contrato de obra — Constructora Nexo vs. Proveedor Materiales del Norte',
      en: 'Construction Contract Breach — Constructora Nexo vs. Proveedor Materiales del Norte',
    },
    conflicto: { es: 'Incumplimiento contractual', en: 'Contract breach' },
    impacto: '$2,800,000 MXN',
    ciudad: 'Ciudad de México',
    riesgo: 'alto',
    descripcion: {
      es: 'Constructora Nexo S.A. de C.V. recibió materiales de construcción defectuosos por parte del Proveedor Materiales del Norte. A pesar de múltiples notificaciones formales, la empresa no respondió dentro del plazo estipulado en el contrato. El monto total del contrato asciende a $2,800,000 MXN. El caso ingresó al sistema BRCcheck el 1 de octubre de 2023 y actualmente se encuentra en la fase de revisión del Motor de Debido Proceso.',
      en: 'Constructora Nexo S.A. de C.V. received defective construction materials from Proveedor Materiales del Norte. Despite multiple formal notifications, the company did not respond within the timeframe stipulated in the contract. The total contract value amounts to $2,800,000 MXN. The case entered the BRCcheck system on October 1, 2023, and is currently in the review phase of the Due Process Engine.',
    },
    modulo_activo: 'due_process',
    due_process: [
      { key: 'notificacion',  label: { es: 'Notificación',   en: 'Notification' },  status: 'done',    fecha: '2023-10-01' },
      { key: 'plazo_replica', label: { es: 'Plazo réplica',  en: 'Reply period' },  status: 'done',    fecha: '2023-10-15' },
      { key: 'revision',      label: { es: 'En revisión',    en: 'Under review' },  status: 'active',  fecha: null },
      { key: 'publicado',     label: { es: 'Publicado',      en: 'Published' },     status: 'pending', fecha: null },
    ],
    pactum_nivel: 1,
    pactum_status: 'active',
    evidencia: [
      {
        tipo: 'CONTRATO',
        titulo: { es: 'Contrato de obra BRC-001-A (firmado por ambas partes)', en: 'Construction contract BRC-001-A (signed by both parties)' },
        url: '#', fuente: 'Denunciante', status: 'verificado',
        quality: { tiene_fecha: true, firmado: true, validacion_cruzada: false, score: 67 },
      },
      {
        tipo: 'NOTIF',
        titulo: { es: 'Notificación formal — 1er aviso (correo certificado)', en: 'Formal notification — 1st notice (certified mail)' },
        url: '#', fuente: 'Denunciante', status: 'verificado',
        quality: { tiene_fecha: true, firmado: true, validacion_cruzada: true, score: 100 },
      },
      {
        tipo: 'FOTO',
        titulo: { es: 'Registro fotográfico de materiales defectuosos', en: 'Photographic record of defective materials' },
        url: '#', fuente: 'Denunciante', status: 'pendiente',
        quality: { tiene_fecha: true, firmado: false, validacion_cruzada: false, score: 33 },
      },
    ],
    status: 'en_proceso',
    created_at: '2023-10-01T00:00:00Z',
  },
  {
    id: 'BRC-002',
    folio: 'BRC-002',
    empresa_id: 'nexo',
    empresa: 'Constructora Nexo S.A. de C.V.',
    contraparte: 'Consultoría Estratégica Veritas S.C.',
    titulo: {
      es: 'Falta de pago por servicios de consultoría — 90 días de mora documentada',
      en: 'Non-payment for consulting services — 90 days of documented default',
    },
    conflicto: { es: 'Incumplimiento de pago', en: 'Payment default' },
    impacto: '$450,000 MXN',
    ciudad: 'Ciudad de México',
    riesgo: 'alto',
    descripcion: {
      es: 'Consultoría Estratégica Veritas S.C. prestó servicios de asesoría durante 6 meses a Constructora Nexo. Al término del proyecto, la empresa incumplió el pago de tres facturas consecutivas por un total de $450,000 MXN. Los intentos de contacto fueron ignorados durante 90 días. El caso fue escalado al nivel de Mediación dentro del pipeline PACTUM.',
      en: 'Consultoría Estratégica Veritas S.C. provided advisory services for 6 months to Constructora Nexo. Upon project completion, the company defaulted on three consecutive invoices totaling $450,000 MXN. Contact attempts were ignored for 90 days. The case was escalated to the Mediation level within the PACTUM pipeline.',
    },
    modulo_activo: 'resolution',
    due_process: [
      { key: 'notificacion',  label: { es: 'Notificación',   en: 'Notification' },  status: 'done',  fecha: '2023-07-15' },
      { key: 'plazo_replica', label: { es: 'Plazo réplica',  en: 'Reply period' },  status: 'done',  fecha: '2023-07-29' },
      { key: 'revision',      label: { es: 'En revisión',    en: 'Under review' },  status: 'done',  fecha: '2023-08-05' },
      { key: 'publicado',     label: { es: 'Publicado',      en: 'Published' },     status: 'done',  fecha: '2023-08-10' },
    ],
    pactum_nivel: 2,
    pactum_status: 'active',
    evidencia: [
      {
        tipo: 'FACTURA',
        titulo: { es: 'Facturas 001, 002, 003 — servicios de consultoría (sin pagar)', en: 'Invoices 001, 002, 003 — consulting services (unpaid)' },
        url: '#', fuente: 'Consultoría Veritas', status: 'verificado',
        quality: { tiene_fecha: true, firmado: true, validacion_cruzada: true, score: 100 },
      },
      {
        tipo: 'CONTRATO',
        titulo: { es: 'Contrato de prestación de servicios firmado', en: 'Signed services agreement' },
        url: '#', fuente: 'Consultoría Veritas', status: 'verificado',
        quality: { tiene_fecha: true, firmado: true, validacion_cruzada: false, score: 67 },
      },
    ],
    status: 'en_resolucion',
    created_at: '2023-07-15T00:00:00Z',
  },
  {
    id: 'BRC-003',
    folio: 'BRC-003',
    empresa_id: 'pacifico',
    empresa: 'Distribuidora Pacífico S.A.',
    contraparte: 'Logística Express del Bajío S.A.',
    titulo: {
      es: 'Negligencia en entrega — Resuelta con acuerdo firmado. Credencial emitida.',
      en: 'Delivery negligence — Resolved with signed agreement. Credential issued.',
    },
    conflicto: { es: 'Incumplimiento de entrega', en: 'Delivery breach' },
    impacto: '$180,000 MXN',
    ciudad: 'Guadalajara, Jalisco',
    riesgo: 'bajo',
    descripcion: {
      es: 'Distribuidora Pacífico recibió una denuncia por demoras reiteradas en entregas programadas. Tras el proceso de Due Process, la empresa respondió dentro del plazo, presentó evidencia de fuerza mayor y llegó a un acuerdo de compensación con la contraparte. El caso se cerró exitosamente y se emitió credencial de Cumplimiento Verificado.',
      en: 'Distribuidora Pacífico received a complaint for repeated delays in scheduled deliveries. Following the Due Process procedure, the company responded within the deadline, presented force majeure evidence, and reached a compensation agreement with the counterparty. The case was successfully closed and a Verified Compliance credential was issued.',
    },
    modulo_activo: 'credentials',
    due_process: [
      { key: 'notificacion',  label: { es: 'Notificación',   en: 'Notification' },  status: 'done', fecha: '2023-04-01' },
      { key: 'plazo_replica', label: { es: 'Plazo réplica',  en: 'Reply period' },  status: 'done', fecha: '2023-04-15' },
      { key: 'revision',      label: { es: 'En revisión',    en: 'Under review' },  status: 'done', fecha: '2023-04-20' },
      { key: 'publicado',     label: { es: 'Publicado',      en: 'Published' },     status: 'done', fecha: '2023-04-22' },
    ],
    pactum_nivel: 1,
    pactum_status: 'resolved',
    credencial: {
      folio: 'CRED-2023-0047',
      emitida: '2023-05-10T00:00:00Z',
    },
    evidencia: [
      {
        tipo: 'ACUERDO',
        titulo: { es: 'Acuerdo de resolución firmado por ambas partes', en: 'Resolution agreement signed by both parties' },
        url: '#', fuente: 'BRCcheck', status: 'verificado',
        quality: { tiene_fecha: true, firmado: true, validacion_cruzada: true, score: 100 },
      },
    ],
    status: 'resuelto',
    created_at: '2023-04-01T00:00:00Z',
  },
]

export const MOCK_STATS = {
  totalCases: 3,
  highRisk: 2,
  submissions: 1,
  companies: 3,
  credenciales: 4,
  reportsDownloaded: 0,
}

export const MOCK_MONTHLY = [
  { month: 'Abr', casos: 1 },
  { month: 'May', casos: 0 },
  { month: 'Jun', casos: 0 },
  { month: 'Jul', casos: 1 },
  { month: 'Ago', casos: 0 },
  { month: 'Sep', casos: 0 },
  { month: 'Oct', casos: 1 },
  { month: 'Nov', casos: 0 },
]

export const MOCK_RISK_DIST = [
  { key: 'alto',  value: 2, color: '#C0392B' },
  { key: 'medio', value: 0, color: '#C8922A' },
  { key: 'bajo',  value: 1, color: '#1A7A4A' },
]
