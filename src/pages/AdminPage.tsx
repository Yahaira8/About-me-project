import { useState } from 'react';
import { Lock, ShieldCheck, CheckCircle2, Clock, Filter, LogOut, AlertCircle, RefreshCw } from 'lucide-react';

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  reason?: string;
  message: string;
  timestamp: string;
  status?: string;
  replied?: boolean;
  repliedAt?: string | null;
}

export const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ContactRecord[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'replied'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        // also merge local storage if any
        const local = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        const combinedMap = new Map<string, ContactRecord>();
        [...data, ...local].forEach((item: ContactRecord) => {
          if (item?.id) combinedMap.set(item.id, item);
        });
        setMessages(Array.from(combinedMap.values()));
        return;
      }
    } catch {
      // fallback to localStorage
    }
    const local = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    setMessages(local);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword('');
        fetchMessages();
      } else {
        const data = await res.json().catch(() => ({}));
        setAuthError(data.error || 'Incorrect administrator password. Please try again.');
      }
    } catch {
      // In case client-only preview without server, support password check
      if (password === 'yahaira2026') {
        setIsAuthenticated(true);
        setPassword('');
        fetchMessages();
      } else {
        setAuthError('Incorrect administrator password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkReplied = async (id: string) => {
    setUpdatingId(id);
    try {
      await fetch('/api/contact/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch {
      // ignore server issue
    }

    // Update in local state & localStorage
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? { ...msg, replied: true, status: 'replied', repliedAt: new Date().toISOString() }
          : msg
      )
    );

    try {
      const local = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      const updated = local.map((msg: ContactRecord) =>
        msg.id === id
          ? { ...msg, replied: true, status: 'replied', repliedAt: new Date().toISOString() }
          : msg
      );
      localStorage.setItem('contact_messages', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setUpdatingId(null);
  };

  const filteredMessages = messages.filter((msg) => {
    if (activeFilter === 'new') return !msg.replied && msg.status !== 'replied';
    if (activeFilter === 'replied') return msg.replied || msg.status === 'replied';
    return true;
  });

  const newCount = messages.filter((m) => !m.replied && m.status !== 'replied').length;
  const repliedCount = messages.filter((m) => m.replied || m.status === 'replied').length;

  return (
    <div id="admin-dashboard-page" className="pt-28 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5 text-[#831859]" />
            <span>Admin Security & Management</span>
          </div>
          <h1
            id="admin-heading"
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3"
          >
            Contact Messages Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Secure administrative console for reviewing incoming student notes, inquiries, and status tracking.
          </p>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto p-6 sm:p-8 bg-white rounded-2xl border border-[#f7a6df]/50 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#ffdef5] text-[#831859] flex items-center justify-center mx-auto mb-4 border border-[#f7a6df]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 text-center mb-1">
              Admin Access Required
            </h2>
            <p className="text-xs text-stone-500 text-center mb-6">
              Enter the teacher/admin password stored in environment secrets to manage records.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-password-input"
                  className="block text-xs font-semibold text-stone-700 mb-1.5"
                >
                  Administrator Password
                </label>
                <input
                  id="admin-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#f7a6df]/50 focus:border-[#f7a6df]"
                />
              </div>

              {authError && (
                <div
                  id="admin-auth-error-banner"
                  className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                id="admin-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-[#f7a6df] hover:bg-[#f28ecc] border border-[#f7a6df] text-stone-900 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isLoading ? 'Verifying...' : 'Unlock Dashboard'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Management View */
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#f7a6df]/40 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Authenticated Session</span>
                </div>
                <button
                  type="button"
                  onClick={fetchMessages}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                  title="Refresh Messages"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock Dashboard</span>
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold text-stone-500">Total Inquiries</span>
                <div className="text-2xl font-bold text-stone-900 mt-1">{messages.length}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#ffdef5]/60 border border-[#f7a6df]/50 shadow-xs">
                <span className="text-xs font-semibold text-[#831859]">New / Unanswered</span>
                <div className="text-2xl font-bold text-[#831859] mt-1">{newCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 shadow-xs">
                <span className="text-xs font-semibold text-emerald-800">Replied / Resolved</span>
                <div className="text-2xl font-bold text-emerald-900 mt-1">{repliedCount}</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <Filter className="w-4 h-4 text-stone-500" />
              <span className="text-xs font-semibold text-stone-600 mr-2">Filter Records:</span>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All ({messages.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('new')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activeFilter === 'new'
                    ? 'bg-[#f7a6df] text-stone-900 font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                New ({newCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('replied')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activeFilter === 'replied'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Replied ({repliedCount})
              </button>
            </div>

            {/* Records List */}
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
                No contact inquiries found matching this filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((record) => {
                  const isReplied = record.replied || record.status === 'replied';
                  return (
                    <div
                      key={record.id}
                      className="p-5 rounded-2xl bg-white border border-[#f7a6df]/40 shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isReplied
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-[#ffdef5] text-[#831859] border border-[#f7a6df]'
                            }`}
                          >
                            {isReplied ? 'Replied' : 'New Inquiry'}
                          </span>
                          <span className="text-xs font-bold text-stone-900">{record.name}</span>
                          <span className="text-xs text-stone-500">&bull; {record.email}</span>
                        </div>

                        <div className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(record.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      {record.reason && (
                        <div className="text-xs font-semibold text-[#831859] bg-[#ffdef5]/40 px-2.5 py-1 rounded inline-block">
                          Topic: {record.reason}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                        {record.message}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-stone-400 font-mono">ID: {record.id}</span>
                        {!isReplied ? (
                          <button
                            type="button"
                            disabled={updatingId === record.id}
                            onClick={() => handleMarkReplied(record.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark as Replied</span>
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Replied {record.repliedAt ? `(${new Date(record.repliedAt).toLocaleDateString()})` : ''}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
