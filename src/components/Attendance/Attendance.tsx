import { ClipboardCheck, CheckCircle2, XCircle, AlertCircle, Clock, BarChart3 } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useState } from 'react';

export default function Attendance() {
  const { attendance, courses, enrollments, currentStudent, loading } = useStudent();
  const [filterCourse, setFilterCourse] = useState<string>('all');

  if (loading) return <LoadingSpinner message="Loading attendance..." />;

  const studentAttendance = attendance.filter(
    (a) => a.StudentID === currentStudent?.StudentID
  );
  const enrolledCourses = courses.filter((c) =>
    enrollments.some(
      (e) => e.StudentID === currentStudent?.StudentID && e.CourseID === c.CourseID
    )
  );

  const filtered =
    filterCourse === 'all'
      ? studentAttendance
      : studentAttendance.filter((a) => a.CourseID === filterCourse);

  const present = filtered.filter((a) => a.Status?.toLowerCase() === 'present').length;
  const absent = filtered.filter((a) => a.Status?.toLowerCase() === 'absent').length;
  const late = filtered.filter((a) => a.Status?.toLowerCase() === 'late').length;
  const excused = filtered.filter((a) => a.Status?.toLowerCase() === 'excused').length;
  const total = filtered.length;
  const rate = total > 0 ? Math.round((present / total) * 100) : 100;

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'present':
        return { icon: CheckCircle2, bg: 'bg-success/10 text-success', label: 'Present' };
      case 'absent':
        return { icon: XCircle, bg: 'bg-danger/10 text-danger', label: 'Absent' };
      case 'late':
        return { icon: Clock, bg: 'bg-warning/10 text-warning', label: 'Late' };
      case 'excused':
        return { icon: AlertCircle, bg: 'bg-info/10 text-info', label: 'Excused' };
      default:
        return { icon: AlertCircle, bg: 'bg-surface text-text-muted', label: status };
    }
  };

  // Per-course summary
  const courseSummary = enrolledCourses.map((c) => {
    const records = studentAttendance.filter((a) => a.CourseID === c.CourseID);
    const p = records.filter((a) => a.Status?.toLowerCase() === 'present').length;
    const t = records.length;
    return {
      ...c,
      present: p,
      total: t,
      rate: t > 0 ? Math.round((p / t) * 100) : 100,
    };
  });

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2">
          <ClipboardCheck className="w-8 h-8 text-primary" />
          Attendance
        </h1>
        <p className="text-text-secondary mt-1">Track your class attendance records</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Rate', value: `${rate}%`, color: 'text-primary' },
          { label: 'Present', value: present, color: 'text-success' },
          { label: 'Absent', value: absent, color: 'text-danger' },
          { label: 'Late', value: late, color: 'text-warning' },
          { label: 'Excused', value: excused, color: 'text-info' },
        ].map((s, i) => (
          <div key={s.label} className={`card-premium p-4 text-center animate-fade-in stagger-${i + 1}`} style={{ opacity: 0 }}>
            <p className={`font-mono text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Course Summary */}
      <div className="card-premium p-5 animate-fade-in stagger-6" style={{ opacity: 0 }}>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-primary">By Course</h2>
        </div>
        <div className="space-y-3">
          {courseSummary.map((c) => (
            <div key={c.CourseID} className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{c.CourseName}</p>
                <p className="text-xs text-text-muted">{c.present}/{c.total} classes</p>
              </div>
              <div className="w-32 h-2 rounded-full bg-surface overflow-hidden flex-shrink-0">
                <div
                  className={`h-full rounded-full transition-all ${
                    c.rate >= 80 ? 'bg-success' : c.rate >= 60 ? 'bg-warning' : 'bg-danger'
                  }`}
                  style={{ width: `${c.rate}%` }}
                />
              </div>
              <span className="font-mono text-sm font-bold text-text-primary w-12 text-right flex-shrink-0">
                {c.rate}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter + Records */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest">Records</h2>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Courses</option>
            {enrolledCourses.map((c) => (
              <option key={c.CourseID} value={c.CourseID}>{c.CourseName}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <ClipboardCheck className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No attendance records</p>
          </div>
        ) : (
          <div className="card-premium overflow-hidden divide-y divide-border-light">
            {filtered
              .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
              .map((record, i) => {
                const style = getStatusStyle(record.Status);
                const Icon = style.icon;
                return (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-surface transition-colors">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{record.CourseName}</p>
                      <p className="text-xs text-text-muted">{record.Date}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${style.bg}`}>
                      {style.label}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

