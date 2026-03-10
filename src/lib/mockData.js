/**
 * DEMO DATA — Fictional cases for UI demonstration only.
 * Text fields that need translation are stored as { es, en } objects.
 * Use the lf() helper to pick the right language.
 */

/** Pick the right language from a bilingual field */
export function lf(field, lang) {
  if (field && typeof field === 'object' && !Array.isArray(field)) {
    return field[lang] || field.es || ''
  }
  return field || ''
}

export const MOCK_CASES = [
  {
    id: '1',
    titulo: {
      es: 'Constructora Vértice — Incumplimiento de contratos municipales',
      en: 'Constructora Vértice — Unfinished Municipal Infrastructure Contracts',
    },
    empresa: 'Constructora Vértice S.A. de C.V.',
    ciudad: 'Guadalajara, Jalisco',
    riesgo: 'alto',
    conflicto: { es: 'Incumplimiento contractual', en: 'Contract breach' },
    impacto: '$12,500,000 MXN',
    descripcion: {
      es: 'Constructora Vértice obtuvo tres contratos de obra pública para pavimentación y drenaje en colonias del municipio de Guadalajara. Las obras fueron adjudicadas entre 2021 y 2022. Según los denunciantes, se recibieron anticipos del 30% en cada contrato pero los trabajos quedaron inconclusos. Los vecinos afectados documentaron el estado de abandono y presentaron quejas ante la Contraloría Municipal. El caso está en revisión por las autoridades competentes.',
      en: 'Constructora Vértice won three public works contracts for paving and drainage in Guadalajara neighborhoods, awarded between 2021 and 2022. According to whistleblowers, 30% advance payments were received on each contract but the work was left incomplete. Affected residents documented the abandoned sites and filed complaints with the Municipal Comptroller\'s Office. The case is currently under review by the competent authorities.',
    },
    empresas_vinculadas: ['Constructora Vértice S.A. de C.V.', 'Materiales del Occidente S.A.'],
    contactos: [
      { nombre: 'Contraloría Municipal de Guadalajara', rol: 'Autoridad investigadora', email: 'contraloria@guadalajara.gob.mx' },
      { nombre: 'SFP — Secretaría de la Función Pública', rol: 'Supervisión federal', email: 'https://www.gob.mx/sfp' },
    ],
    evidencia: [
      {
        tipo: 'FOTO',
        titulo: {
          es: 'Registro fotográfico de obras inconclusas — Colonia Las Flores (mar. 2023)',
          en: 'Photographic record of unfinished works — Colonia Las Flores (Mar. 2023)',
        },
        url: '#',
        fuente: 'Vecinos organizados',
      },
      {
        tipo: 'DOC',
        titulo: {
          es: 'Contratos de obra pública adjudicados (folio MUN-GDL-2021-0047)',
          en: 'Awarded public works contracts (file MUN-GDL-2021-0047)',
        },
        url: '#',
        fuente: 'Municipio de Guadalajara',
      },
      {
        tipo: 'QUEJA',
        titulo: {
          es: 'Queja formal ante Contraloría Municipal (folio CM-2023-1182)',
          en: 'Formal complaint to Municipal Comptroller (file CM-2023-1182)',
        },
        url: '#',
        fuente: 'Contraloría Municipal',
      },
    ],
    created_at: '2023-03-15T00:00:00Z',
  },

  {
    id: '2',
    titulo: {
      es: 'Grupo Financiero Altavista — Captación no autorizada de ahorro',
      en: 'Grupo Financiero Altavista — Unauthorized Savings Capture',
    },
    empresa: 'Grupo Financiero Altavista S.C.',
    ciudad: 'Monterrey, Nuevo León',
    riesgo: 'alto',
    conflicto: { es: 'Fraude', en: 'Fraud' },
    impacto: '$4,800,000 MXN (~320 afectados)',
    descripcion: {
      es: 'Grupo Financiero Altavista operó entre 2020 y 2022 captando ahorros de pequeños inversionistas bajo la promesa de rendimientos del 18% anual. La empresa no contaba con autorización de la CNBV para operar como entidad financiera. Cuando los ahorradores intentaron retirar sus fondos, los responsables dejaron de responder. Aproximadamente 320 personas presentaron denuncias ante la FGR y la CONDUSEF. El caso se encuentra en etapa de investigación ministerial.',
      en: 'Grupo Financiero Altavista operated between 2020 and 2022 collecting savings from small investors under promises of 18% annual returns. The company was not authorized by the CNBV to operate as a financial entity. When savers tried to withdraw their funds, those responsible stopped responding. Approximately 320 people filed complaints with the FGR and CONDUSEF. The case is currently in the ministerial investigation phase.',
    },
    empresas_vinculadas: ['Grupo Financiero Altavista S.C.', 'Inversiones del Norte S.A.'],
    contactos: [
      { nombre: 'CONDUSEF', rol: 'Orientación a afectados', email: 'asesoria@condusef.gob.mx' },
      { nombre: 'FGR — Fiscalía General de la República', rol: 'Autoridad investigadora', email: 'https://www.gob.mx/fgr' },
    ],
    evidencia: [
      {
        tipo: 'DOC',
        titulo: {
          es: 'Contratos de inversión presentados a afectados (muestra anonimizada)',
          en: 'Investment contracts presented to victims (anonymized sample)',
        },
        url: '#',
        fuente: 'Denunciantes',
      },
      {
        tipo: 'QUEJA',
        titulo: {
          es: 'Denuncias agrupadas ante CONDUSEF — Expediente 2022-NL-4491',
          en: 'Grouped complaints filed with CONDUSEF — File 2022-NL-4491',
        },
        url: '#',
        fuente: 'CONDUSEF',
      },
    ],
    created_at: '2022-08-10T00:00:00Z',
  },

  {
    id: '3',
    titulo: {
      es: 'Industrias Norteño — Vertimiento ilegal en Río Pesquería',
      en: 'Industrias Norteño — Illegal Discharge into Pesquería River',
    },
    empresa: 'Industrias Norteño S.A. de C.V.',
    ciudad: 'Apodaca, Nuevo León',
    riesgo: 'alto',
    conflicto: { es: 'Daño ambiental', en: 'Environmental damage' },
    impacto: '3 km de río contaminado, 5 comunidades afectadas',
    descripcion: {
      es: 'Vecinos de Apodaca documentaron en junio de 2023 el vertimiento de residuos industriales líquidos al Río Pesquería por parte de Industrias Norteño. Las muestras de agua recogidas por un laboratorio independiente arrojaron niveles de metales pesados por encima de los límites permitidos por la NOM-001-SEMARNAT-2021. La empresa no habría renovado su licencia de descarga desde 2019. PROFEPA inició una inspección tras la denuncia ciudadana.',
      en: 'Residents of Apodaca documented in June 2023 the discharge of industrial liquid waste into the Pesquería River by Industrias Norteño. Water samples collected by an independent laboratory showed heavy metal levels above the limits set by NOM-001-SEMARNAT-2021. The company reportedly had not renewed its discharge permit since 2019. PROFEPA initiated an inspection following the citizen complaint.',
    },
    empresas_vinculadas: ['Industrias Norteño S.A. de C.V.'],
    contactos: [
      { nombre: 'PROFEPA — Procuraduría Federal de Protección al Ambiente', rol: 'Autoridad ambiental', email: 'https://www.gob.mx/profepa' },
      { nombre: 'CONAGUA', rol: 'Gestión de cuencas hidrológicas', email: 'https://www.gob.mx/conagua' },
    ],
    evidencia: [
      {
        tipo: 'LAB',
        titulo: {
          es: 'Análisis de agua — Laboratorio Ambiental del Noreste (jun. 2023)',
          en: 'Water analysis — Northeast Environmental Laboratory (Jun. 2023)',
        },
        url: '#',
        fuente: 'Laboratorio certificado',
      },
      {
        tipo: 'FOTO',
        titulo: {
          es: 'Registro fotográfico del punto de descarga (28 jun. 2023)',
          en: 'Photographic record of discharge point (Jun. 28, 2023)',
        },
        url: '#',
        fuente: 'Colectivo Agua Limpia NL',
      },
      {
        tipo: 'DENUNCIA',
        titulo: {
          es: 'Denuncia ciudadana ante PROFEPA (folio PFPA-2023-08-0093)',
          en: 'Citizen complaint filed with PROFEPA (file PFPA-2023-08-0093)',
        },
        url: '#',
        fuente: 'PROFEPA',
      },
    ],
    created_at: '2023-06-28T00:00:00Z',
  },

  {
    id: '4',
    titulo: {
      es: 'Clínica MedExpress Puebla — Cobros irregulares y mala praxis documentada',
      en: 'Clínica MedExpress Puebla — Irregular Billing and Documented Malpractice',
    },
    empresa: 'Clínica MedExpress S.A. de C.V.',
    ciudad: 'Puebla, Puebla',
    riesgo: 'medio',
    conflicto: { es: 'Fraude', en: 'Fraud' },
    impacto: 'Múltiples pacientes afectados',
    descripcion: {
      es: 'Pacientes de Clínica MedExpress presentaron quejas ante la COFEPRIS y la CONAMED entre 2022 y 2023 por cobros por procedimientos no realizados, resultados de laboratorio alterados y diagnósticos sin respaldo clínico. La Comisión Nacional de Arbitraje Médico emitió tres laudos en contra de la clínica. El establecimiento opera con licencia sanitaria vigente pero está sujeto a supervisión reforzada.',
      en: 'Patients of Clínica MedExpress filed complaints with COFEPRIS and CONAMED between 2022 and 2023 for billing for procedures not performed, altered lab results, and diagnoses without clinical support. The National Medical Arbitration Commission issued three rulings against the clinic. The facility operates with a valid health license but is subject to enhanced monitoring.',
    },
    empresas_vinculadas: ['Clínica MedExpress S.A. de C.V.'],
    contactos: [
      { nombre: 'CONAMED — Comisión Nacional de Arbitraje Médico', rol: 'Arbitraje médico', email: 'conamed@salud.gob.mx' },
      { nombre: 'COFEPRIS', rol: 'Regulación sanitaria', email: 'https://www.gob.mx/cofepris' },
    ],
    evidencia: [
      {
        tipo: 'LAUDO',
        titulo: {
          es: 'Laudo CONAMED — Expediente MED-PUE-2023-0031',
          en: 'CONAMED Ruling — File MED-PUE-2023-0031',
        },
        url: '#',
        fuente: 'CONAMED',
      },
      {
        tipo: 'DOC',
        titulo: {
          es: 'Facturas y estados de cuenta presentados por pacientes afectados',
          en: 'Invoices and account statements submitted by affected patients',
        },
        url: '#',
        fuente: 'Denunciantes',
      },
    ],
    created_at: '2023-02-01T00:00:00Z',
  },

  {
    id: '5',
    titulo: {
      es: 'Transportes Rápido Bajío — Subcontratación laboral fraudulenta',
      en: 'Transportes Rápido Bajío — Fraudulent Labor Subcontracting Scheme',
    },
    empresa: 'Transportes Rápido Bajío S.A. de C.V.',
    ciudad: 'León, Guanajuato',
    riesgo: 'medio',
    conflicto: { es: 'Abuso laboral', en: 'Labor abuse' },
    impacto: '~180 trabajadores sin prestaciones de ley',
    descripcion: {
      es: 'Trabajadores de Transportes Rápido Bajío denunciaron ante la STPS en 2023 que la empresa utilizaba un esquema de subcontratación a través de personas morales ficticias para evitar el pago de cuotas al IMSS, reparto de utilidades y prestaciones de ley. Los trabajadores operaban como choferes de carga desde hace más de dos años sin contrato formal. La Inspección Federal del Trabajo inició un procedimiento de verificación.',
      en: 'Workers of Transportes Rápido Bajío filed complaints with the STPS in 2023, stating the company used a subcontracting scheme through fictitious legal entities to avoid paying IMSS contributions, profit sharing, and statutory benefits. Workers had operated as freight drivers for over two years without a formal contract. The Federal Labor Inspectorate initiated a verification procedure.',
    },
    empresas_vinculadas: ['Transportes Rápido Bajío S.A. de C.V.', 'Logística GTO S.A.'],
    contactos: [
      { nombre: 'STPS — Secretaría del Trabajo y Previsión Social', rol: 'Autoridad laboral', email: 'https://www.gob.mx/stps' },
      { nombre: 'IMSS', rol: 'Control de afiliación', email: 'https://www.imss.gob.mx' },
    ],
    evidencia: [
      {
        tipo: 'DENUNCIA',
        titulo: {
          es: 'Denuncia colectiva ante STPS — Expediente IFT-GTO-2023-0214',
          en: 'Collective complaint filed with STPS — File IFT-GTO-2023-0214',
        },
        url: '#',
        fuente: 'Inspección Federal del Trabajo',
      },
      {
        tipo: 'DOC',
        titulo: {
          es: 'Recibos de pago sin desglose de prestaciones (muestra anonimizada)',
          en: 'Pay stubs without benefits breakdown (anonymized sample)',
        },
        url: '#',
        fuente: 'Trabajadores afectados',
      },
    ],
    created_at: '2023-09-05T00:00:00Z',
  },

  {
    id: '6',
    titulo: {
      es: 'Desarrolladora HorizonTe — Venta de lotes sin escrituras entregadas',
      en: 'Desarrolladora HorizonTe — Lot Sales Without Deeds Delivered',
    },
    empresa: 'Desarrolladora HorizonTe S.A. de C.V.',
    ciudad: 'Mérida, Yucatán',
    riesgo: 'bajo',
    conflicto: { es: 'Fraude', en: 'Fraud' },
    impacto: '~$900,000 MXN en pagos no cumplidos',
    descripcion: {
      es: 'Compradores de un fraccionamiento en las afueras de Mérida denunciaron que Desarrolladora HorizonTe recibió pagos de enganche por 40 lotes residenciales sin contar con la autorización de uso de suelo ni el registro ante el Registro Público de la Propiedad. Tras 18 meses de espera, ninguno de los compradores ha recibido escrituras. La Procuraduría del Consumidor (PROFECO) recibió 27 quejas formales.',
      en: 'Buyers of a subdivision on the outskirts of Mérida reported that Desarrolladora HorizonTe collected down payments for 40 residential lots without holding land-use authorization or registration with the Public Property Registry. After 18 months of waiting, none of the buyers have received their deeds. The Federal Consumer Protection Agency (PROFECO) received 27 formal complaints.',
    },
    empresas_vinculadas: ['Desarrolladora HorizonTe S.A. de C.V.'],
    contactos: [
      { nombre: 'PROFECO — Procuraduría Federal del Consumidor', rol: 'Defensa del consumidor', email: 'https://www.gob.mx/profeco' },
      { nombre: 'Registro Público de la Propiedad — Yucatán', rol: 'Verificación registral', email: 'rpp@yucatan.gob.mx' },
    ],
    evidencia: [
      {
        tipo: 'QUEJA',
        titulo: {
          es: 'Quejas agrupadas PROFECO — Expediente YUC-2023-0887',
          en: 'Grouped PROFECO complaints — File YUC-2023-0887',
        },
        url: '#',
        fuente: 'PROFECO',
      },
      {
        tipo: 'DOC',
        titulo: {
          es: 'Promesas de compraventa firmadas por compradores (muestra)',
          en: 'Purchase agreement promises signed by buyers (sample)',
        },
        url: '#',
        fuente: 'Denunciantes',
      },
    ],
    created_at: '2023-11-20T00:00:00Z',
  },
]

export const MOCK_STATS = {
  totalCases:        6,
  highRisk:          3,
  submissions:       2,
  cities:            6,
  companies:         6,
  reportsDownloaded: 0,
}

export const MOCK_MONTHLY = [
  { month: 'Ene', casos: 0 },
  { month: 'Feb', casos: 1 },
  { month: 'Mar', casos: 1 },
  { month: 'Abr', casos: 0 },
  { month: 'May', casos: 0 },
  { month: 'Jun', casos: 1 },
  { month: 'Jul', casos: 0 },
  { month: 'Ago', casos: 1 },
  { month: 'Sep', casos: 1 },
  { month: 'Oct', casos: 0 },
  { month: 'Nov', casos: 1 },
  { month: 'Dic', casos: 0 },
]

// Use risk keys so components can translate them via t(`risk.${key}`)
export const MOCK_RISK_DIST = [
  { key: 'alto',  value: 3, color: '#c11414' },
  { key: 'medio', value: 2, color: '#f59e0b' },
  { key: 'bajo',  value: 1, color: '#22c55e' },
]
