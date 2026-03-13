import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy-950 mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div>
            <p className="text-white font-black text-lg tracking-tight mb-1">
              BRC<span className="text-teal-400">check</span>
            </p>
            <p className="text-navy-500 text-xs mb-3">Buró Reputacional Ciudadano</p>
            <p className="text-navy-400 text-xs leading-relaxed mb-3 max-w-xs">
              Infraestructura de evidencia, debido proceso y cumplimiento económico.
            </p>
            <a href="mailto:info@brccheck.com"
              className="text-navy-500 hover:text-teal-400 text-xs transition-colors">
              info@brccheck.com
            </a>
          </div>

          {/* Column 2 — Plataforma */}
          <div>
            <p className="section-label text-navy-600 mb-4">Plataforma</p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/como-funciona" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link to="/buscar" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Buscar Empresas
                </Link>
              </li>
              <li>
                <Link to="/nuevo-caso" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Registrar Caso
                </Link>
              </li>
              <li>
                <Link to="/membresia" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Membresía
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <p className="section-label text-navy-600 mb-4">Legal</p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/aviso-legal" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link to="/etica-legal" className="text-navy-400 hover:text-white text-xs transition-colors">
                  Ética y Estándares
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contacto */}
          <div>
            <p className="section-label text-navy-600 mb-4">Contacto</p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:info@brccheck.com"
                  className="text-navy-400 hover:text-white text-xs transition-colors">
                  info@brccheck.com
                </a>
              </li>
              <li>
                <a href="https://brccheck.com" target="_blank" rel="noopener noreferrer"
                  className="text-navy-400 hover:text-white text-xs transition-colors">
                  brccheck.com
                </a>
              </li>
              <li>
                <p className="text-navy-600 text-xs">Operado por MC&amp;D LLC · Texas, EUA</p>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-navy-900">
          <p className="text-navy-700 text-xs leading-relaxed">
            © 2024–2026 BRCcheck · MC&amp;D LLC · Todos los derechos reservados ·{' '}
            BRCcheck no es un tribunal ni sustituye asesoría legal.
          </p>
        </div>
      </div>
    </footer>
  )
}
