import { useState, useEffect } from 'react'
import { MOCK_CASES, MOCK_COMPANIES } from './mockData'

const LS_CASES     = 'brc_cases'
const LS_COMPANIES = 'brc_companies'

function loadFromStorage() {
  try {
    const rawCases     = localStorage.getItem(LS_CASES)
    const rawCompanies = localStorage.getItem(LS_COMPANIES)
    if (rawCases && rawCompanies) {
      return {
        cases:     JSON.parse(rawCases),
        companies: JSON.parse(rawCompanies),
      }
    }
  } catch (_) {}
  return null
}

function seedStorage() {
  const cases     = JSON.parse(JSON.stringify(MOCK_CASES))
  const companies = JSON.parse(JSON.stringify(MOCK_COMPANIES))
  localStorage.setItem(LS_CASES,     JSON.stringify(cases))
  localStorage.setItem(LS_COMPANIES, JSON.stringify(companies))
  return { cases, companies }
}

function getInitialState() {
  const stored = loadFromStorage()
  if (stored) return stored
  return seedStorage()
}

const initial = getInitialState()
let _cases     = initial.cases
let _companies = initial.companies

// Module-level subscriber set — all hook instances share the same store
const listeners = new Set()

function notify() {
  listeners.forEach(fn => fn({ cases: _cases, companies: _companies }))
}

function persistAndNotify() {
  localStorage.setItem(LS_CASES,     JSON.stringify(_cases))
  localStorage.setItem(LS_COMPANIES, JSON.stringify(_companies))
  notify()
}

export function useCaseStore() {
  const [state, setState] = useState(() => ({ cases: _cases, companies: _companies }))

  useEffect(() => {
    const handler = (newState) => setState({ ...newState })
    listeners.add(handler)
    return () => { listeners.delete(handler) }
  }, [])

  // addBitacoraEntry
  function addBitacoraEntry(caseId, entry) {
    _cases = _cases.map(c => {
      if (c.id !== caseId) return c
      const newEntry = { id: Date.now(), fecha: new Date().toISOString(), ...entry }
      return { ...c, bitacora: [...(c.bitacora || []), newEntry] }
    })
    persistAndNotify()
  }

  // updateCase
  function updateCase(caseId, patch) {
    // Extract internal _nota before merging
    const { _nota, ...cleanPatch } = patch
    _cases = _cases.map(c => {
      if (c.id !== caseId) return c
      return { ...c, ...cleanPatch }
    })
    if (cleanPatch.status !== undefined) {
      const statusLabel =
        cleanPatch.status === 'en_proceso'    ? 'En Proceso' :
        cleanPatch.status === 'en_resolucion' ? 'En Resolución' : 'Resuelto'
      const entryId = Date.now()
      _cases = _cases.map(c => {
        if (c.id !== caseId) return c
        return {
          ...c,
          bitacora: [
            ...(c.bitacora || []),
            {
              id: entryId,
              fecha: new Date().toISOString(),
              tipo: 'estado_actualizado',
              actor: 'Operador BRCcheck',
              descripcion: {
                es: `Estado actualizado a: ${statusLabel}`,
                en: `Status updated to: ${statusLabel}`,
              },
              nota: _nota || null,
            },
          ],
        }
      })
    }
    persistAndNotify()
  }

  // advancePactum
  function advancePactum(caseId, nota) {
    _cases = _cases.map(c => {
      if (c.id !== caseId) return c
      const newNivel = Math.min((c.pactum_nivel || 1) + 1, 4)
      const newStatus = newNivel >= 2 ? 'en_resolucion' : c.status
      const levelNames = {
        1: 'L1 — Negociación',
        2: 'L2 — Mediación',
        3: 'L3 — Arbitraje',
        4: 'L4 — Litigio',
      }
      return {
        ...c,
        pactum_nivel: newNivel,
        status: newStatus,
        bitacora: [
          ...(c.bitacora || []),
          {
            id: Date.now(),
            fecha: new Date().toISOString(),
            tipo: 'pactum_avanzado',
            actor: 'Operador BRCcheck',
            descripcion: {
              es: `PACTUM avanzado a ${levelNames[newNivel]}.`,
              en: `PACTUM advanced to ${levelNames[newNivel]}.`,
            },
            nota: nota || null,
          },
        ],
      }
    })
    persistAndNotify()
  }

  // markDueProcessStep
  function markDueProcessStep(caseId, stepKey, nota) {
    const today = new Date().toISOString().slice(0, 10)
    _cases = _cases.map(c => {
      if (c.id !== caseId) return c
      const updatedSteps = (c.due_process || []).map(s =>
        s.key === stepKey ? { ...s, status: 'done', fecha: today } : s
      )
      const step = updatedSteps.find(s => s.key === stepKey)
      const stepLabel = step ? (typeof step.label === 'object' ? step.label.es : step.label) : stepKey
      return {
        ...c,
        due_process: updatedSteps,
        bitacora: [
          ...(c.bitacora || []),
          {
            id: Date.now(),
            fecha: new Date().toISOString(),
            tipo: 'debido_proceso',
            actor: 'Operador BRCcheck',
            descripcion: {
              es: `Paso de debido proceso completado: ${stepLabel}.`,
              en: `Due process step completed: ${stepLabel}.`,
            },
            nota: nota || null,
          },
        ],
      }
    })
    persistAndNotify()
  }

  // resetStore
  function resetStore() {
    _cases     = JSON.parse(JSON.stringify(MOCK_CASES))
    _companies = JSON.parse(JSON.stringify(MOCK_COMPANIES))
    localStorage.setItem(LS_CASES,     JSON.stringify(_cases))
    localStorage.setItem(LS_COMPANIES, JSON.stringify(_companies))
    notify()
  }

  return {
    cases:               state.cases,
    companies:           state.companies,
    updateCase,
    advancePactum,
    markDueProcessStep,
    addBitacoraEntry,
    resetStore,
  }
}
