/**
 * Claude AI integration for BRCcheck
 * NOTE: In production, route through a Supabase Edge Function to protect the API key.
 * For the demo, calls are made directly from the browser.
 */

const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY

async function callClaude(prompt, maxTokens = 300) {
  if (!API_KEY) return null

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-allow-browser': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) return null
  const data = await res.json()
  return data.content?.[0]?.text || null
}

// ─── Evidence Classifier ─────────────────────────────────────────────────────

const MOCK_CLASSIFY = {
  pdf:  { tipo: 'Documento formal',          nivel: 'Sólido',       observacion: 'Documento estructurado con potencial probatorio alto. Se recomienda complementar con firma o sello.' },
  img:  { tipo: 'Comprobante fotográfico',   nivel: 'Básico',       observacion: 'Evidencia visual que requiere validación adicional con documentos escritos.' },
  doc:  { tipo: 'Comunicación escrita',      nivel: 'Básico',       observacion: 'Comunicación que debe contrastarse con otros documentos del expediente.' },
  other:{ tipo: 'Documento sin clasificar',  nivel: 'Insuficiente', observacion: 'No fue posible determinar el tipo. Adjunta contexto adicional.' },
}

function getMockByExt(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (ext === 'pdf') return MOCK_CLASSIFY.pdf
  if (['jpg','jpeg','png','gif','webp'].includes(ext)) return MOCK_CLASSIFY.img
  if (['doc','docx'].includes(ext)) return MOCK_CLASSIFY.doc
  return MOCK_CLASSIFY.other
}

export async function classifyEvidence(file) {
  // Always return mock if no API key (avoids browser CORS issues in dev)
  if (!API_KEY) return getMockByExt(file.name)

  const prompt = `Analiza este archivo de evidencia y determina: 1) Tipo de evidencia, 2) Nivel de suficiencia para un caso de incumplimiento comercial (Insuficiente/Básico/Sólido/Robusto), 3) Observación de 1 oración sobre qué falta o por qué es relevante. Nombre del archivo: ${file.name}. Responde ÚNICAMENTE en JSON válido con esta estructura exacta: {"tipo": "...", "nivel": "...", "observacion": "..."}`

  try {
    const text = await callClaude(prompt, 200)
    if (!text) return getMockByExt(file.name)
    return JSON.parse(text)
  } catch {
    return getMockByExt(file.name)
  }
}

// ─── Case Summary Generator ───────────────────────────────────────────────────

const MOCK_SUMMARY = `Caso registrado en BRCcheck bajo el estándar de debido proceso institucional. Las partes involucradas presentaron documentación que sustenta el conflicto de naturaleza contractual. El impacto económico documentado y la ausencia de respuesta dentro del plazo estipulado derivaron en la activación del pipeline PACTUM. El expediente se encuentra en proceso de revisión conforme al protocolo BRCcheck v3.0.`

export async function generateCaseSummary(rawFacts, lang = 'es') {
  if (!API_KEY) return MOCK_SUMMARY

  const langInstruction = lang === 'en'
    ? 'Write the summary in English.'
    : 'Escribe el resumen en español.'

  const prompt = `Eres el sistema institucional de BRCcheck (Buró Reputacional Ciudadano). Genera un resumen estructurado con tono formal e institucional del siguiente caso. Incluye: partes involucradas, naturaleza del conflicto, impacto documentado y estado del proceso. Máximo 120 palabras. ${langInstruction}\n\nHechos del caso:\n${rawFacts}`

  try {
    const text = await callClaude(prompt, 400)
    return text || MOCK_SUMMARY
  } catch {
    return MOCK_SUMMARY
  }
}
