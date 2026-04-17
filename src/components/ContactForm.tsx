"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Check, AlertCircle, User, Mail, MessageSquare } from "lucide-react"

type Status = "idle" | "sending" | "sent" | "error"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!name.trim()) e.name = "Please enter your name"
    if (!email.trim()) e.email = "Please enter your email"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format"
    if (message.trim().length < 10) e.message = "Message must be at least 10 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    setStatus("sending")
    await new Promise((r) => setTimeout(r, 900))

    try {
      const subject = encodeURIComponent(`Portfolio contact — ${name}`)
      const body = encodeURIComponent(
        `${message}\n\n— ${name}\n${email}`,
      )
      window.location.href = `mailto:joemunene984@gmail.com?subject=${subject}&body=${body}`
      setStatus("sent")
      setTimeout(() => {
        setStatus("idle")
        setName("")
        setEmail("")
        setMessage("")
      }, 2500)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 2500)
    }
  }

  const Field = ({
    id,
    label,
    icon,
    children,
    error,
  }: {
    id: string
    label: string
    icon: React.ReactNode
    children: React.ReactNode
    error?: string
  }) => (
    <div className="text-left">
      <label htmlFor={id} className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
        {icon}
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-red-400 font-mono text-[11px] mt-1.5"
          >
            <AlertCircle className="w-3 h-3" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const inputCls =
    "w-full bg-bg-card/60 backdrop-blur-md border border-border-color rounded-lg px-4 py-3 text-white font-mono text-sm outline-none transition-colors focus:border-primary/60 focus:bg-bg-card/80 placeholder:text-text-muted/40"

  return (
    <form
      onSubmit={onSubmit}
      className="relative bg-bg-card/40 backdrop-blur-xl border border-border-color rounded-2xl p-6 sm:p-8 text-left space-y-5 max-w-lg mx-auto"
    >
      <Field id="name" label="Name" icon={<User className="w-3.5 h-3.5" />} error={errors.name}>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
          placeholder="Your name"
          disabled={status === "sending" || status === "sent"}
        />
      </Field>

      <Field id="email" label="Email" icon={<Mail className="w-3.5 h-3.5" />} error={errors.email}>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="you@example.com"
          disabled={status === "sending" || status === "sent"}
        />
      </Field>

      <Field id="message" label="Message" icon={<MessageSquare className="w-3.5 h-3.5" />} error={errors.message}>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-none`}
          rows={5}
          placeholder="What's on your mind..."
          disabled={status === "sending" || status === "sent"}
        />
      </Field>

      <motion.button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        whileHover={status === "idle" ? { scale: 1.02 } : undefined}
        whileTap={status === "idle" ? { scale: 0.98 } : undefined}
        className="relative w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-bg-dark font-mono font-semibold rounded-lg overflow-hidden disabled:opacity-80 transition-all"
        data-cursor="hover"
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.span>
          )}
          {status === "sending" && (
            <motion.span
              key="sending"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <motion.span
                className="w-4 h-4 border-2 border-bg-dark border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              Sending...
            </motion.span>
          )}
          {status === "sent" && (
            <motion.span
              key="sent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Opening email client...
            </motion.span>
          )}
          {status === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Something went wrong
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="text-[11px] text-text-muted/60 text-center font-mono">
        Opens your email client. Or DM me directly:{" "}
        <a
          href="mailto:joemunene984@gmail.com"
          className="text-primary hover:underline"
        >
          joemunene984@gmail.com
        </a>
      </p>
    </form>
  )
}
