import { Link } from 'react-router-dom'
import { Database, ShieldCheck, Scale, GitBranch, BadgeCheck, ArrowRight } from 'lucide-react'

const modules = [
  {
    num: '01',
    icon: <Database size={22} />,
    title: 'Evidence Vault',
    subtitle: 'Bóveda Probatoria',
    desc: 'Almacenamiento estructurado de documentos con validación de fecha, firma y fuente. Cada archivo recibe hash criptográfico para garantizar su integridad.',
  },
  {
    num: '02',
    icon: <ShieldCheck size={22} />,
    title: 'Proof-of-Integrity Layer',
    subtitle: 'Capa de Verificación',
    desc: 'Sistema de clasificación con IA (Claude) que evalúa la calidad probatoria y asigna nivel de suficiencia: Insuficiente, Básico, Sólido o Robusto.',
  },
  {
    num: '03',
    icon: <Scale size={22} />,
    title: 'Due Process Engine',
    subtitle: 'Motor de Debido Proceso',
    desc: 'Garantiza que toda empresa sea notificada formalmente antes de cualquier publicación. Plazo de 15 días para ejercer derecho de réplica.',
  },
  {
    num: '04',
    icon: <GitBranch size={22} />,
    title: 'Resolution Pipeline',
    subtitle: 'PACTUM (L1 → L4)',
    desc: 'Invitación estructurada a resolver: L1 Negociación → L2 Mediación → L3 Arbitraje → L4 Litigio. Reduce costos y tiempos frente al sistema judicial.',
  },
  {
    num: '05',
    icon: <BadgeCheck size={22} />,
    title: 'Credential & Trust Layer',
    subtitle: 'Credenciales Verificables',
    desc: 'Si la empresa resuelve el conflicto, recibe una credencial digital verificable que convierte el cumplimiento en activo reputacional público.',
  },
]

const steps = [
  { n: '1', title: 'Registro del caso', desc: 'Denunciante carga hechos y evidencia con documentos verificables.' },
  { n: '2', title: 'Clasificación IA', desc: 'Claude analiza y califica la evidencia automáticamente.' },
  { n: '3', title: 'Notificación', desc: 'Empresa recibe aviso formal con plazo de 15 días para responder.' },
  { n: '4', title: 'Derecho de réplica', desc: 'Empresa puede responder y aportar su propia evidencia.' },
  { n: '5', title: 'Revisión del panel', desc: 'Equipo BRCcheck evalúa ambas partes con criterio objetivo.' },
  { n: '6', title: 'Publicación', desc: 'Caso publicado con toda la trazabilidad documental.' },
  { n: '7', title: 'PACTUM', desc: 'Invitación estructurada a resolver el conflicto antes de litigar.' },
  { n: '8', title: 'Credencial', desc: 'Si se resuelve, se emite credencial verificable de cumplimiento.' },
]

const posiciones = [
  'Sistema de auditoría social probatoria',
  'Infraestructura privada de evidencia y cumplimiento',
  'Capa de trazabilidad reputacional verificable',
  'Mecanismo de reducción de litigios',
  'Herramienta de compliance para pymes',
]

export default function ComoFunciona() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">Plataforma</p>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-5">
            Cómo Funciona <span className="text-teal-400">BRCcheck</span>
          </h1>
          <p className="text-navy-300 text-base leading-relaxed mb-8 max-w-2xl">
            Infraestructura institucional de evidencia, debido proceso y cumplimiento.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/buscar" className="btn-primary">Buscar empresas</Link>
            <Link to="/nuevo-caso" className="btn-ghost-white">Registrar caso</Link>
          </div>
        </div>
      </section>

      {/* Section 1 — ¿Qué es BRCcheck? */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <p className="section-label mb-8">¿Qué es BRCcheck?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lo que NO es */}
          <div className="bg-white border border-ink-100 p-6">
            <p className="text-xs font-black uppercase tracking-widest text-crimson-600 mb-4">Lo que NO es</p>
            <ul className="space-y-2.5">
              {[
                'No impone sanciones',
                'No sustituye al sistema judicial',
                'No determina culpabilidad',
                'No es una plataforma de denuncias anónimas',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-crimson-500 mt-0.5 font-bold">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lo que SÍ hace */}
          <div className="md:col-span-2 bg-white border border-ink-100 p-6">
            <p className="text-xs font-black uppercase tracking-widest text-teal-600 mb-4">Lo que SÍ hace</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Estructura evidencia con estándar probatorio',
                'Garantiza notificación y derecho de réplica',
                'Genera presión legítima basada en hechos',
                'Incentiva resolución antes de litigar',
                'Convierte reputación en activo verificable',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-teal-500 mt-0.5 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 — Los 5 Módulos */}
      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-8">Arquitectura</p>
          <h2 className="text-2xl font-black mb-8">Los 5 Módulos de BRCcheck</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map(m => (
              <div key={m.num} className="bg-navy-900 border border-navy-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-teal-400">{m.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-navy-500">{m.num}</span>
                </div>
                <p className="font-black text-white text-sm mb-0.5">{m.title}</p>
                <p className="text-teal-400 text-xs font-semibold mb-3">{m.subtitle}</p>
                <p className="text-navy-300 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Proceso paso a paso */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <p className="section-label mb-8">El Proceso Paso a Paso</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(s => (
            <div key={s.n} className="bg-white border border-ink-100 p-5">
              <span className="inline-block text-2xl font-black text-teal-500 mb-3">{s.n}</span>
              <h3 className="font-bold text-navy-950 text-sm mb-1.5">{s.title}</h3>
              <p className="text-xs text-ink-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Posicionamiento */}
      <section className="bg-ink-50 border-t border-ink-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
          <p className="section-label mb-2">Posicionamiento</p>
          <p className="text-sm text-ink-500 mb-8">BRCcheck puede presentarse como:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posiciones.map(p => (
              <div key={p} className="bg-white border border-ink-100 p-5 flex items-start gap-3">
                <ArrowRight size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-semibold text-navy-950">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="border border-teal-500 bg-teal-500 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Empieza ahora</p>
            <h2 className="text-xl font-black text-white mb-1">¿Tienes un caso?</h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              Registra tu caso con evidencia estructurada y garantía de debido proceso.
            </p>
          </div>
          <Link to="/nuevo-caso"
            className="flex-shrink-0 bg-white text-teal-700 font-bold px-6 py-2.5 text-sm hover:bg-teal-50 transition-colors">
            Registrar caso
          </Link>
        </div>
      </section>
    </div>
  )
}
