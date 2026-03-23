import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useState } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const dayColors: Record<string, string> = {
  monday: 'from-blue-500 to-blue-600',
  tuesday: 'from-emerald-500 to-emerald-600',
  wednesday: 'from-purple-500 to-purple-600',
  thursday: 'from-amber-500 to-amber-600',
  friday: 'from-rose-500 to-rose-600',
};

export default function Schedule() {
  const { schedule, enrollments, currentStudent, loading } = useStudent();
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  if (loading) return <LoadingSpinner message="Loading schedule..." />;

  const enrolledCourseIds = new Set(
    enrollments
      .filter((e) => e.StudentID === currentStudent?.StudentID)
      .map((e) => e.CourseID)
  );

  const mySchedule = schedule.filter((s) => enrolledCourseIds.has(s.CourseID));

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [selectedDay, setSelectedDay] = useState(today);

  const getScheduleForDay = (day: string) =>
    mySchedule
      .filter((s) => s.Day?.toLowerCase() === day.toLowerCase())
      .sort((a, b) => (a.StartTime || '').localeCompare(b.StartTime || ''));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2">
            <Calendar className="w-8 h-8 text-primary" />
            Schedule
          </h1>
          <p className="text-text-secondary mt-1">Your weekly class schedule</p>
        </div>
        <div className="flex rounded-xl border border-border bg-white overflow-hidden">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              viewMode === 'week' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              viewMode === 'day' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface'
            }`}
          >
            Day
          </button>
        </div>
      </div>

      {viewMode === 'day' && (
        <div className="flex gap-2 overflow-x-auto pb-2 animate-fade-in stagger-1" style={{ opacity: 0 }}>
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedDay === day
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white border border-border text-text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {viewMode === 'week' ? (
        <div className="space-y-6">
          {DAYS.map((day, di) => {
            const items = getScheduleForDay(day);
            const isToday = day.toLowerCase() === today.toLowerCase();
            return (
              <div key={day} className={`animate-fade-in stagger-${di + 1}`} style={{ opacity: 0 }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${dayColors[day.toLowerCase()] || 'from-gray-400 to-gray-500'}`} />
                  <h2 className="text-sm font-bold text-text-primary">
                    {day}
                    {isToday && (
                      <span className="ml-2 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold">
                        TODAY
                      </span>
                    )}
                  </h2>
                </div>
                {items.length === 0 ? (
                  <div className="ml-6 py-4 text-sm text-text-muted">No classes</div>
                ) : (
                  <div className="ml-6 space-y-2">
                    {items.map((item, i) => (
                      <div
                        key={i}
                        className={`card-premium p-4 flex items-center gap-4 ${isToday ? 'border-primary/20' : ''}`}
                      >
                        <div className="text-center flex-shrink-0 w-16">
                          <p className="font-mono text-sm font-bold text-primary">{item.StartTime}</p>
                          <p className="font-mono text-[10px] text-text-muted">{item.EndTime}</p>
                        </div>
                        <div className={`w-1 h-10 rounded-full bg-gradient-to-b ${dayColors[day.toLowerCase()] || 'from-gray-400 to-gray-500'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-text-primary truncate">{item.CourseName}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.Room || 'TBA'}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {item.Instructor}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in stagger-2" style={{ opacity: 0 }}>
          {getScheduleForDay(selectedDay).length === 0 ? (
            <div className="card-premium p-12 text-center">
              <Calendar className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-muted">No classes on {selectedDay}</p>
            </div>
          ) : (
            getScheduleForDay(selectedDay).map((item, i) => (
              <div key={i} className="card-premium p-5 flex items-center gap-5">
                <div className="text-center flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex flex-col items-center justify-center">
                    <Clock className="w-4 h-4 text-primary mb-0.5" />
                    <p className="font-mono text-xs font-bold text-primary">{item.StartTime}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-text-primary">{item.CourseName}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Room {item.Room || 'TBA'}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {item.Instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.StartTime} - {item.EndTime}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

