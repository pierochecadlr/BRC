import { createClient } from '@supabase/supabase-js'

const supabaseUrl    = import.meta.env.VITE_SUPABASE_URL    || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Mappers — convert flat DB rows to bilingual { es, en } objects ───────────

function mapCase(c) {
  if (!c) return null
  return {
    ...c,
    titulo:      { es: c.titulo,      en: c.titulo_en      || c.titulo },
    descripcion: { es: c.descripcion, en: c.descripcion_en || c.descripcion },
    conflicto:   { es: c.conflicto,   en: c.conflicto_en   || c.conflicto },
    evidencia: (c.evidence || []).map(ev => ({
      ...ev,
      titulo: { es: ev.titulo, en: ev.titulo_en || ev.titulo },
    })),
    contactos: c.contacts || [],
  }
}

// ─── Cases ────────────────────────────────────────────────────────────────────

export async function fetchCases(filters = {}) {
  let query = supabase
    .from('cases')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (filters.search) {
    const q = `%${filters.search}%`
    query = query.or(`titulo.ilike.${q},empresa.ilike.${q},ciudad.ilike.${q}`)
  }
  if (filters.empresa) query = query.ilike('empresa', `%${filters.empresa}%`)
  if (filters.ciudad)  query = query.ilike('ciudad',  `%${filters.ciudad}%`)
  if (filters.riesgo)  query = query.eq('riesgo', filters.riesgo)
  if (filters.from)    query = query.gte('created_at', filters.from)
  if (filters.to)      query = query.lte('created_at', filters.to)

  const { data, error } = await query
  if (error) throw error
  return (data || []).map(mapCase)
}

export async function fetchCaseById(id) {
  const { data, error } = await supabase
    .from('cases')
    .select('*, evidence(*), contacts(*)')
    .eq('id', id)
    .single()
  if (error) throw error
  return mapCase(data)
}

// ─── Submissions ──────────────────────────────────────────────────────────────

export async function submitCase(payload, files = []) {
  // 1. Upload files to storage if any
  const filePaths = []
  for (const file of files) {
    const path = `submissions/${Date.now()}-${file.name.replace(/\s+/g, '_')}`
    const { error: uploadError } = await supabase.storage
      .from('submissions-files')
      .upload(path, file)
    if (!uploadError) filePaths.push(path)
  }

  // 2. Insert submission record
  const { data, error } = await supabase
    .from('submissions')
    .insert([{ ...payload, files: filePaths }])
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export async function fetchSubmissions() {
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updateSubmissionStatus(id, status) {
  const { error } = await supabase
    .from('submissions')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

export async function fetchStats() {
  const [{ count: totalCases }, { count: highRisk }, { count: submissions }] = await Promise.all([
    supabase.from('cases').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('cases').select('*', { count: 'exact', head: true }).eq('riesgo', 'alto').eq('status', 'published'),
    supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ])
  return { totalCases: totalCases || 0, highRisk: highRisk || 0, submissions: submissions || 0 }
}

export async function fetchMonthlyData() {
  const { data, error } = await supabase
    .from('cases')
    .select('created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data || []
}
