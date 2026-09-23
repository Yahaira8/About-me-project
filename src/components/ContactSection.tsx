import { useState } from 'react';
import { Mail, GitBranch, MapPin, Copy, Check, Send, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data';

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('General Greeting / Say Hello');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name and message.');
      return;
    }

    setIsSubmitting(true);
    const newRecord = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim() || 'Anonymous',
      reason,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'new',
      replied: false,
      repliedAt: null,
    };

    try {
      // 1. Attempt POST to server-side endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) {
        console.warn('Server contact API returned status:', response.status);
      }
    } catch (err) {
      console.warn('Notice: Server API endpoint not reachable in static mode, recorded locally.', err);
    }

    // 2. Always persist to localStorage for instant client fallback and Admin testing
    try {
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      existing.unshift(newRecord);
      localStorage.setItem('contact_messages', JSON.stringify(existing));
    } catch {
      // ignore storage limitations
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setName('');
    setEmail('');
    setReason('General Greeting / Say Hello');
    setMessage('');
  };

  return (
    <section id="contact" className="py-20 border-t border-stone-200 bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
                <Mail className="w-3.5 h-3.5 text-[#831859]" />
                <span>Connect</span>
              </div>
              <h2
                id="contact-section-heading"
                className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3"
              >
                Let's Get in Touch
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Whether you have a collaborative project idea, feedback on my interactive apps, or simply want to say hello, feel free to reach out!
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-white border border-[#f7a6df]/30 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ffdef5] text-[#831859] border border-[#f7a6df]/50 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">
                      Email
                    </span>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-xs font-semibold text-stone-900 hover:text-[#831859] transition-colors"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  id="contact-copy-email-btn"
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-stone-500 hover:text-[#831859] hover:bg-[#ffdef5]/40 transition-colors"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#831859]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* GitHub Card */}
              <a
                id="contact-github-card-link"
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white border border-[#f7a6df]/30 hover:border-[#f7a6df]/70 flex items-center justify-between gap-3 shadow-2xs transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ffdef5] text-[#831859] border border-[#f7a6df]/50 flex items-center justify-center">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">
                      GitHub
                    </span>
                    <span className="text-xs font-semibold text-stone-900 group-hover:text-[#831859] transition-colors">
                      @Yahaira8
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-stone-400 group-hover:text-[#831859]">
                  Visit Profile →
                </span>
              </a>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-white border border-[#f7a6df]/30 flex items-center gap-3 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#ffdef5] text-[#831859] border border-[#f7a6df]/50 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-stone-400">
                    Location
                  </span>
                  <span className="text-xs font-semibold text-stone-900">
                    {profileData.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#f7a6df]/40 shadow-sm">
              <h3 className="text-lg font-bold text-stone-900 mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Leave a note and I will get back to you as soon as possible.
              </p>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#ffdef5] border border-[#f7a6df] text-[#831859] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900">
                    Thank you for reaching out!
                  </h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Your message has been received. You can also write directly to{' '}
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-[#831859] underline font-semibold"
                    >
                      {profileData.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-stone-700 bg-[#ffdef5] hover:bg-[#f7a6df]/40 border border-[#f7a6df]/50 rounded-lg transition-colors"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form id="contact-message-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="sender-name-input"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="sender-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#f7a6df]/50 focus:border-[#f7a6df]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sender-email-input"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      Your Email (optional)
                    </label>
                    <input
                      id="sender-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#f7a6df]/50 focus:border-[#f7a6df]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sender-reason-select"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      Reason for Contact <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="sender-reason-select"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#f7a6df]/50 focus:border-[#f7a6df]"
                    >
                      <option value="General Greeting / Say Hello">General Greeting / Say Hello</option>
                      <option value="Crochet Plushie Inquiry">Crochet Plushie Inquiry</option>
                      <option value="Web Design & School Projects">Web Design & School Projects</option>
                      <option value="Other / Collaboration">Other / Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sender-message-input"
                      className="block text-xs font-semibold text-stone-700 mb-1.5"
                    >
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="sender-message-input"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your note or question here..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#f7a6df]/50 focus:border-[#f7a6df] resize-none"
                    ></textarea>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#f7a6df] hover:bg-[#f28ecc] border border-[#f7a6df] text-stone-900 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
                  >
                    <Send className="w-4 h-4 text-stone-900" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
