import {
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

export default function Dashboard() {
  const {
    currentStudent,
    courses,
    enrollments,
    attendance,
    quests,
    studentQuests,
    announcements,
    schedule,
    loading,
  } = useStudent();

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  const studentEnrollments = enrollments.filter(
    (e) => e.StudentID === currentStudent?.StudentID
  );
  const enrolledCourseIds = studentEnrollments.map((e) => e.CourseID);
  const enrolledCourses = courses.filter((c) =>
    enrolledCourseIds.includes(c.CourseID)
  );

  const studentAttendance = attendance.filter(
    (a) => a.StudentID === currentStudent?.StudentID
  );
  const presentCount = studentAttendance.filter(
    (a) => a.Status?.toLowerCase() === 'present'
  ).length;
  const attendanceRate =
    studentAttendance.length > 0
      ? Math.round((presentCount / studentAttendance.length) * 100)
      : 100;

  const myQuests = studentQuests.filter(
    (sq) => sq.StudentID === currentStudent?.StudentID
  );
  const completedQuests = myQuests.filter(
    (sq) => sq.Status?.toLowerCase() === 'completed' || sq.Status?.toLowerCase() === 'graded'
  );
  const totalPoints = completedQuests.reduce(
    (sum, sq) => sum + (parseInt(sq.Score) || 0),
    0
  );

  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
    .slice(0, 3);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = schedule.filter(
    (s) => s.Day?.toLowerCase() === today.toLowerCase() &&
      enrolledCourseIds.includes(s.CourseID)
  );

  const statCards = [
    {
      label: 'Enrolled Courses',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Current GPA',
      value: currentStudent?.GPA || 'â€”',
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Attendance',
      value: `${attendanceRate}%`,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Quest Points',
      value: totalPoints,
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="animate-fade-in">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-text-primary">
              Welcome back, {currentStudent?.Name?.split(' ')[0] || 'Student'}
              <Sparkles className="inline w-7 h-7 ml-2 text-accent" />
            </h1>
            <p className="text-text-secondary mt-1">
              Here's what's happening with your academic journey today.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-text-primary">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              {currentStudent?.Year ? `Year ${currentStudent.Year}` : ''} Â· {currentStudent?.Major || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className={`card-premium p-5 animate-fade-in stagger-${i + 1}`}
            style={{ opacity: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-muted" />
            </div>
            <p className="font-mono text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 card-premium p-6 animate-fade-in stagger-5" style={{ opacity: 0 }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-text-primary">Today's Schedule</h2>
            </div>
            <span className="text-xs font-medium text-text-muted bg-surface px-3 py-1 rounded-full">
              {today}
            </span>
          </div>
          {todaySchedule.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-2xl bg-surface mx-auto flex items-center justify-center mb-3">
                <CalendarDays className="w-6 h-6 text-text-muted" />
              </div>
              <p className="text-sm text-text-muted">No classes scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaySchedule.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-surface hover:bg-surface-hover transition-colors group"
                >
                  <div className="w-16 text-center flex-shrink-0">
                    <p className="font-mono text-sm font-bold text-primary">{item.StartTime}</p>
                    <p className="text-[10px] text-text-muted">{item.EndTime}</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{item.CourseName}</p>
                    <p className="text-xs text-text-muted">
                      Room {item.Room} Â· {item.Instructor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Announcements */}
        <div className="card-premium p-6 animate-fade-in stagger-6" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-text-primary">Announcements</h2>
          </div>
          {recentAnnouncements.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-10">No announcements</p>
          ) : (
            <div className="space-y-3">
              {recentAnnouncements.map((a, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-surface hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-semibold text-text-primary line-clamp-1">{a.Title}</p>
                    {a.Priority?.toLowerCase() === 'high' && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-md bg-red-100 text-red-600 text-[10px] font-bold flex-shrink-0">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted line-clamp-2">{a.Content}</p>
                  <p className="text-[10px] text-text-muted mt-2 font-mono">{a.Date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Quests */}
      <div className="card-premium p-6 animate-fade-in stagger-7" style={{ opacity: 0 }}>
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle2 className="w-5 h-5 text-success" />
          <h2 className="text-lg font-bold text-text-primary">Active Quests</h2>
          <span className="ml-auto text-xs font-mono text-text-muted">
            {completedQuests.length}/{myQuests.length} completed
          </span>
        </div>
        {myQuests.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-8">No active quests</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quests
              .filter((q) => myQuests.some((mq) => mq.QuestID === q.QuestID))
              .slice(0, 6)
              .map((quest) => {
                const myQ = myQuests.find((mq) => mq.QuestID === quest.QuestID);
                const isDone = myQ?.Status?.toLowerCase() === 'completed' || myQ?.Status?.toLowerCase() === 'graded';
                return (
                  <div
                    key={quest.QuestID}
                    className={`p-3.5 rounded-2xl border ${
                      isDone ? 'border-success/30 bg-success/5' : 'border-border-light bg-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <Clock className="w-4 h-4 text-warning" />
                      )}
                      <span className="text-xs font-bold text-text-muted uppercase">{quest.Type}</span>
                    </div>
                    <p className="text-sm font-semibold text-text-primary line-clamp-1">{quest.Title}</p>
                    <p className="text-xs text-text-muted mt-1">
                      {quest.Points} pts Â· Due {quest.Deadline}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

