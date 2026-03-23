import { FileText, Plus, Clock, CheckCircle2, XCircle, MessageSquare, Send } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useState } from 'react';

export default function Requests() {
  const { requests, currentStudent, loading } = useStudent();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'General',
    subject: '',
    description: '',
  });

  if (loading) return <LoadingSpinner message="Loading requests..." />;

  const myRequests = requests.filter(
    (r) => r.StudentID === currentStudent?.StudentID
  );

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'resolved':
      case 'completed':
        return { icon: CheckCircle2, bg: 'bg-success/10 text-success', label: status };
      case 'pending':
      case 'submitted':
        return { icon: Clock, bg: 'bg-warning/10 text-warning', label: status };
      case 'rejected':
      case 'denied':
        return { icon: XCircle, bg: 'bg-danger/10 text-danger', label: status };
      default:
        return { icon: Clock, bg: 'bg-surface text-text-muted', label: status || 'Pending' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would POST to the API
    alert('Request submitted! (Demo mode)');
    setShowForm(false);
    setFormData({ type: 'General', subject: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            Requests
          </h1>
          <p className="text-text-secondary mt-1">Submit and track your requests</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="card-premium p-6 space-y-4 animate-scale-in"
        >
          <h3 className="text-base font-bold text-text-primary">Submit a Request</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option>General</option>
                <option>Academic</option>
                <option>Administrative</option>
                <option>IT Support</option>
                <option>Financial</option>
                <option>Transcript</option>
                <option>Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief subject"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Describe your request in detail..."
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-text-secondary hover:bg-surface transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all"
            >
              <Send className="w-4 h-4" />
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Requests List */}
      {myRequests.length === 0 ? (
        <div className="card-premium p-12 text-center animate-fade-in stagger-1" style={{ opacity: 0 }}>
          <FileText className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-muted">No requests submitted yet</p>
          <p className="text-xs text-text-muted mt-1">Click "New Request" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myRequests
            .sort((a, b) => new Date(b.SubmittedDate).getTime() - new Date(a.SubmittedDate).getTime())
            .map((request, i) => {
              const style = getStatusStyle(request.Status);
              const Icon = style.icon;
              return (
                <div
                  key={request.RequestID || i}
                  className={`card-premium p-5 animate-fade-in stagger-${(i % 8) + 1}`}
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="text-sm font-bold text-text-primary">{request.Subject}</h3>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase flex-shrink-0 ${style.bg}`}>
                          {style.label}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted line-clamp-2 mb-2">{request.Description}</p>
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span className="px-2 py-0.5 rounded-md bg-surface font-medium">{request.Type}</span>
                        <span className="font-mono">{request.SubmittedDate}</span>
                      </div>
                      {request.Response && (
                        <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                          <div className="flex items-center gap-1 mb-1">
                            <MessageSquare className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-bold text-primary">Response</span>
                          </div>
                          <p className="text-xs text-text-secondary">{request.Response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

