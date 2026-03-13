import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, X, Send, Loader, Sparkles } from 'lucide-react'
import { askOrientationBot } from '../lib/claude'

export default function ChatBot() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: lang === 'es'
        ? '¡Hola! Soy el asistente de BRCcheck. ¿En qué te puedo orientar? Puedo ayudarte a saber si tu caso califica o qué evidencia necesitas.'
        : 'Hi! I\'m the BRCcheck assistant. How can I help? I can tell you if your case qualifies or what evidence you need.',
    },
  ])
  const bottomRef = useRef(null)

  useEffect(() => {
    setMessages([{ role: 'bot', text: t('chatbot.greeting') }])
  }, [lang])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send() {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: q }])
    setLoading(true)
    const answer = await askOrientationBot(q, lang)
    setMessages(m => [...m, { role: 'bot', text: answer }])
    setLoading(false)
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 shadow-lg transition-all"
        >
          <Sparkles size={15} />
          <span className="text-sm font-semibold">{t('chatbot.open')}</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 flex flex-col bg-white border border-ink-200 shadow-2xl"
          style={{ maxHeight: '520px' }}>

          {/* Header */}
          <div className="flex items-center justify-between bg-navy-950 text-white px-4 py-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-teal-400" />
              <span className="text-sm font-bold">{t('chatbot.title')}</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-navy-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-navy-950 text-white'
                    : 'bg-ink-50 border border-ink-100 text-ink-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-ink-50 border border-ink-100 px-3 py-2 flex items-center gap-2 text-xs text-ink-400">
                  <Loader size={11} className="animate-spin" /> {t('chatbot.thinking')}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-ink-300 px-4 pb-1 flex-shrink-0">{t('chatbot.disclaimer')}</p>

          {/* Input */}
          <div className="flex border-t border-ink-200 flex-shrink-0">
            <input
              className="flex-1 px-3 py-2.5 text-sm outline-none text-ink-700 placeholder:text-ink-300"
              placeholder={t('chatbot.placeholder')}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-3 text-teal-600 hover:text-teal-800 disabled:text-ink-300 transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
