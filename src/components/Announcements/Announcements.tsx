import { Megaphone, AlertTriangle, Info, Bell, Search } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useState } from 'react';

export default function Announcements() {
  const { announcements, loading } = useStudent();
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  if (loading) return <LoadingSpinner message="Loading announcements..." />;

  const filtered = announcements.filter((a) => {
    const matchSearch =
      a.Title?.toLowerCase().includes(search.toLowerCase()) ||
      a.Content?.toLowerCase().includes(search.toLowerCase());
    const matchPriority =
      filterPriority === 'all' || a.Priority?.toLowerCase() === filterPriority.toLowerCase();
    return matchSearch && matchPriority;
  }).sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

  const getPriorityStyle = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
      case 'urgent':
        return {
          icon: AlertTriangle,
          badge: 'bg-red-100 text-red-600',
          border: 'border-l-red-500',
          emoji: 'ðŸ”´',
        };
      case 'medium':
        return {
          icon: Bell,
          badge: 'bg-amber-100 text-amber-600',
          border: 'border-l-amber-500',
          emoji: 'ðŸŸ¡',
        };
      default:
        return {
          icon: Info,
          badge: 'bg-blue-100 text-blue-600',
          border: 'border-l-blue-500',
          emoji: 'ðŸ”µ',
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2">
          <Megaphone className="w-8 h-8 text-primary" />
          Announcements
        </h1>
        <p className="text-text-secondary mt-1">Stay updated with the latest news and notices</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in stagger-1" style={{ opacity: 0 }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search announcements..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${
                filterPriority === p
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white border border-border text-text-secondary hover:border-primary'
              }`}
            >
              {p === 'all' ? 'All' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      {filtered.length === 0 ? (
        <div className="card-premium p-12 text-center animate-fade-in stagger-2" style={{ opacity: 0 }}>
          <Megaphone className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-muted">No announcements found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((announcement, i) => {
            const style = getPriorityStyle(announcement.Priority);
            return (
              <div
                key={announcement.AnnouncementID || i}
                className={`card-premium p-5 border-l-4 ${style.border} animate-fade-in stagger-${(i % 8) + 1}`}
                style={{ opacity: 0 }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-bold text-text-primary">{announcement.Title}</h3>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase flex-shrink-0 ${style.badge}`}>
                    {announcement.Priority || 'Normal'}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {announcement.Content}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="font-medium">{announcement.Author}</span>
                  <span>Â·</span>
                  <span className="font-mono">{announcement.Date}</span>
                  {announcement.Category && (
                    <>
                      <span>Â·</span>
                      <span className="px-2 py-0.5 rounded-md bg-surface text-text-muted font-medium">
                        {announcement.Category}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

