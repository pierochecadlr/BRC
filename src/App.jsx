import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import CompanyProfile from './pages/CompanyProfile'
import CaseDetail from './pages/CaseDetail'
import CaseReport from './pages/CaseReport'
import SubmitCase from './pages/SubmitCase'
import AdminPanel from './pages/AdminPanel'

function DemoBanner() {
  const { t } = useTranslation()
  return (
    <div className="bg-navy-950 border-b border-navy-800 text-center text-[11px] font-medium py-1.5 px-4 text-navy-400">
      {t('common.demo_notice')}
    </div>
  )
}

function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
      <p className="text-7xl font-extrabold text-ink-100 mb-4">404</p>
      <p className="text-lg font-semibold text-ink-400 mb-6">{t('common.not_found')}</p>
      <a href="/" className="btn-primary inline-flex">{t('common.go_home')}</a>
    </div>
  )
}

function Loading() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-center h-40 text-ink-400 text-sm">
      {t('common.loading')}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <DemoBanner />
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/"                    element={<Home />} />
              <Route path="/buscar"              element={<Search />} />
              <Route path="/empresa/:id"         element={<CompanyProfile />} />
              <Route path="/caso/:id"            element={<CaseDetail />} />
              <Route path="/caso/:id/report"     element={<CaseReport />} />
              <Route path="/nuevo-caso"          element={<SubmitCase />} />
              <Route path="/admin"               element={<AdminPanel />} />
              <Route path="*"                    element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
