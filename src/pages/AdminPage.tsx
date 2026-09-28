import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
  LogOut,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface ContactRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
  message: string;
  timestamp: string;
  status: 'new' | 'replied';
  replied: boolean;
  repliedAt: string | null;
}

type FilterType = 'all' | 'new' | 'replied';

const responseError = async (response: Response, fallback: string) => {
  const data = await response.json().catch(() => ({}));
  return typeof data.error === 'string' ? data.error : fallback;
};

export const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [replyError, setReplyError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [messages, setMessages] = useState<ContactRecord[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const lockDashboard = useCallback((message = 'Your admin session expired. Please sign in again.') => {
    setToken(null);
    setMessages([]);
    setAuthError(message);
  }, []);

  const fetchMessages = useCallback(async (authToken: string, showLoading = true) => {
    if (showLoading) setIsRefreshing(true);
    setLoadError('');
    try {
      const response = await fetch('/api/contact', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status === 401) {
        lockDashboard();
        return;
      }
      if (!response.ok) {
        setLoadError(await responseError(response, 'Could not load contact messages. Please try again.'));
        return;
      }
      const data: unknown = await response.json();
      if (!Array.isArray(data)) {
        setLoadError('The server returned an invalid contact message list.');
        return;
      }
      setMessages((data as ContactRecord[]).slice().sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    } catch {
      setLoadError('Could not reach the server to load contact messages. Please try again.');
    } finally {
      if (showLoading) setIsRefreshing(false);
    }
  }, [lockDashboard]);

  useEffect(() => {
    if (!token) return;
    const interval = window.setInterval(() => {
      void fetchMessages(token, false);
    }, 30000);
    return () => window.clearInterval(interval);
  }, [token, fetchMessages]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError('');
    setLoadError('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setAuthError(await responseError(response, 'Incorrect administrator password. Please try again.'));
        return;
      }
      const data = await response.json().catch(() => null);
      if (data?.authenticated !== true || typeof data.token !== 'string' || !data.token) {
        setAuthError('The server did not return a valid authenticated session.');
        return;
      }
      setPassword('');
      setToken(data.token);
      await fetchMessages(data.token);
    } catch {
      setAuthError('Could not reach the server to verify your password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkReplied = async (id: string) => {
    if (!token) return;
    setUpdatingId(id);
    setReplyError('');
    try {
      const response = await fetch('/api/contact/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (response.status === 401) {
        lockDashboard();
        return;
      }
      if (!response.ok) {
        setReplyError(await responseError(response, 'Could not mark this message as replied.'));
        return;
      }
      const data = await response.json().catch(() => null);
      if (data?.success !== true || !data.item || data.item.id !== id) {
        setReplyError('The server did not confirm that this message was updated.');
        return;
      }
      const updatedItem = data.item as ContactRecord;
      setMessages((previous) =>
        previous
          .map((record) => (record.id === id ? updatedItem : record))
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      );
    } catch {
      setReplyError('Could not reach the server to update this message. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const sortedMessages = useMemo(
    () => messages.slice().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [messages]
  );
  const newCount = messages.filter((message) => !message.replied && message.status !== 'replied').length;
  const repliedCount = messages.length - newCount;
  const replyRate = messages.length === 0 ? 0 : Math.round((repliedCount / messages.length) * 100);
  const reasonCounts = useMemo(() => {
    const counts = new Map<string, number>();
    messages.forEach(({ reason }) => {
      const label = reason?.trim() || 'Unspecified';
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count || a.reason.localeCompare(b.reason));
  }, [messages]);
  const maxReasonCount = Math.max(1, ...reasonCounts.map(({ count }) => count));
  const filteredMessages = sortedMessages.filter((message) => {
    if (activeFilter === 'new') return !message.replied && message.status !== 'replied';
    if (activeFilter === 'replied') return message.replied || message.status === 'replied';
    return true;
  });

  const handleLock = () => {
    setToken(null);
    setMessages([]);
    setLoadError('');
    setReplyError('');
    setAuthError('');
    setActiveFilter('all');
  };

  return (
    <div id="admin-dashboard-page" className="relative pt-28 pb-24 bg-transparent min-h-screen">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5 text-[#831859]" />
            <span>Admin Security &amp; Management</span>
          </div>
          <h1
            id="admin-heading"
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3"
          >
            <span className="neon-flowing-glow">Contact Messages Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Secure administrative console for reviewing incoming student notes, inquiries, and status tracking.
          </p>
        </div>

        {!token ? (
          <div className="neon-card max-w-md mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#ffdef5] text-[#831859] flex items-center justify-center mx-auto mb-4 border border-[#f7a6df]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 text-center mb-1">Admin Access Required</h2>
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
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#f7a6df]/50 focus:border-[#f7a6df]"
                />
              </div>
              {authError && (
                <div
                  id="admin-auth-error-banner"
                  role="alert"
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
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#f7a6df]/40 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Authenticated Session</span>
                </div>
                <button
                  type="button"
                  onClick={() => void fetchMessages(token)}
                  disabled={isRefreshing}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors disabled:opacity-50"
                  aria-label="Refresh messages"
                  title="Refresh Messages"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <button
                type="button"
                onClick={handleLock}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Dashboard</span>
              </button>
            </div>

            {loadError && (
              <div role="alert" className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loadError}</span>
              </div>
            )}
            {replyError && (
              <div role="alert" className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{replyError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold text-stone-500">Total</span>
                <div className="text-2xl font-bold text-stone-900 mt-1">{messages.length}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#ffdef5]/60 border border-[#f7a6df]/50 shadow-xs">
                <span className="text-xs font-semibold text-[#831859]">New</span>
                <div className="text-2xl font-bold text-[#831859] mt-1">{newCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 shadow-xs">
                <span className="text-xs font-semibold text-emerald-800">Replied</span>
                <div className="text-2xl font-bold text-emerald-900 mt-1">{repliedCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#f7a6df]/50 shadow-xs">
                <span className="text-xs font-semibold text-stone-500">Reply Rate</span>
                <div className="text-2xl font-bold text-[#831859] mt-1">{replyRate}%</div>
              </div>
            </div>

            <section
              aria-labelledby="messages-by-reason-heading"
              className="p-5 rounded-2xl bg-white border border-[#f7a6df]/40 shadow-xs"
            >
              <h2 id="messages-by-reason-heading" className="text-base font-serif font-bold text-stone-900 mb-4">
                Messages by Reason
              </h2>
              {reasonCounts.length === 0 ? (
                <p className="text-sm text-stone-500">No messages to chart yet.</p>
              ) : (
                <ul className="space-y-3" aria-label="Message counts by reason">
                  {reasonCounts.map(({ reason, count }) => (
                    <li key={reason} className="grid grid-cols-[minmax(5rem,8rem)_1fr_auto] items-center gap-3">
                      <span className="text-xs font-medium text-stone-700 break-words">{reason}</span>
                      <div className="h-3 overflow-hidden rounded-full bg-stone-100">
                        <div
                          aria-hidden="true"
                          className="h-full rounded-full bg-[#DD83C9] transition-[width]"
                          style={{ width: `${(count / maxReasonCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-stone-600" aria-label={`${count} messages`}>
                        {count}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
              <Filter className="w-4 h-4 text-stone-500" />
              <span className="text-xs font-semibold text-stone-600 mr-2">Filter Records:</span>
              {(['all', 'new', 'replied'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeFilter === filter
                      ? filter === 'new'
                        ? 'bg-[#f7a6df] text-stone-900 font-bold'
                        : filter === 'replied'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {filter === 'all' ? `All (${messages.length})` : filter === 'new' ? `New (${newCount})` : `Replied (${repliedCount})`}
                </button>
              ))}
            </div>

            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
                No contact inquiries found matching this filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((record) => {
                  const isReplied = record.replied || record.status === 'replied';
                  return (
                    <article key={record.id} className="neon-card p-5 rounded-2xl bg-white shadow-xs space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isReplied
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-[#ffdef5] text-[#831859] border border-[#f7a6df]'
                            }`}
                          >
                            {isReplied ? 'Replied' : 'New Inquiry'}
                          </span>
                          <span className="text-xs font-bold text-stone-900">
                            {record.firstName} {record.lastName}
                          </span>
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
                            onClick={() => void handleMarkReplied(record.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-60"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{updatingId === record.id ? 'Updating...' : 'Mark as Replied'}</span>
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>
                              Replied {record.repliedAt ? `(${new Date(record.repliedAt).toLocaleDateString()})` : ''}
                            </span>
                          </span>
                        )}
                      </div>
                    </article>
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