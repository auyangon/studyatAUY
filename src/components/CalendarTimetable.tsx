import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  AlertCircle, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { 
  getTodayClasses, 
  getWeekSchedule, 
  getStudentAssignments,
  getUpcomingAssignments
} from '../data/studentData';

interface CalendarTimetableProps {
  email: string;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarTimetable: React.FC<CalendarTimetableProps> = ({ email }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'assignments'>('today');
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const todayClasses = useMemo(() => getTodayClasses(email), [email]);
  const weekSchedule = useMemo(() => getWeekSchedule(email), [email]);
  const upcomingAssignments = useMemo(() => getUpcomingAssignments(email, 14), [email]);
  const allAssignments = useMemo(() => getStudentAssignments(email), [email]);

  const today = new Date();
  const currentDay = today.getDay();
  const currentDate = today.getDate();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();

  // Generate week dates
  const getWeekDatesFixed = (offset: number) => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + (offset * 7));
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDatesFixed(currentWeekOffset);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDueDate = (dateStr: string) => {
    const dueDate = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days left`;
    
    return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getAssignmentStatusColor = (status: string, dueDate: string) => {
    if (status === 'submitted') return 'bg-green-100 text-green-700';
    const due = new Date(dueDate);
    if (due < today) return 'bg-red-100 text-red-700';
    return 'bg-amber-100 text-amber-700';
  };

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'Lecture':
        return 'bg-blue-100 text-blue-700';
      case 'Lab':
        return 'bg-purple-100 text-purple-700';
      case 'Tutorial':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Glassmorphism */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-6 text-white">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Schedule & Calendar</h1>
          <p className="text-blue-100">
            {DAYS[currentDay]}, {currentMonth} {currentDate}, {currentYear}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'today' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Today's Classes
        </button>
        <button
          onClick={() => setActiveTab('week')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'week' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Weekly Schedule
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'assignments' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Assignments
        </button>
      </div>

      {/* Today's Classes View */}
      {activeTab === 'today' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
          
          {todayClasses.length > 0 ? (
            <div className="grid gap-4">
              {todayClasses.map((cls, index) => (
                <div 
                  key={cls.id}
                  className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
                  
                  <div className="flex items-start justify-between ml-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getClassTypeColor(cls.type)}`}>
                          {cls.type}
                        </span>
                        <span className="text-sm text-gray-500">{cls.courseId}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{cls.courseName}</h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {cls.room}, {cls.building}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-gray-400" />
                          {cls.teacherName}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{formatTime(cls.startTime).split(' ')[0]}</div>
                      <div className="text-sm text-gray-400">{formatTime(cls.startTime).split(' ')[1]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No classes today</h3>
              <p className="text-gray-500">Enjoy your day off!</p>
            </div>
          )}

          {/* Upcoming Assignments Preview */}
          {upcomingAssignments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
              <div className="grid gap-3">
                {upcomingAssignments.slice(0, 3).map(assignment => (
                  <div 
                    key={assignment.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        assignment.status === 'submitted' ? 'bg-green-100' : 'bg-amber-100'
                      }`}>
                        {assignment.status === 'submitted' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-sm text-gray-500">{assignment.courseId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        assignment.status === 'submitted' ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {formatDueDate(assignment.dueDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Weekly Schedule View */}
      {activeTab === 'week' && (
        <div className="space-y-4">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">This Week</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentWeekOffset(prev => prev - 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm text-gray-600 px-3">
                {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <button
                onClick={() => setCurrentWeekOffset(prev => prev + 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Week Grid */}
          <div className="grid grid-cols-7 gap-3">
            {DAYS.map((day, dayIndex) => {
              const date = weekDates[dayIndex];
              const isToday = date.toDateString() === today.toDateString();
              const dayClasses = weekSchedule[dayIndex] || [];
              
              return (
                <div 
                  key={day}
                  className={`min-h-[300px] rounded-xl border ${
                    isToday 
                      ? 'border-blue-200 bg-blue-50/50' 
                      : 'border-gray-100 bg-white'
                  }`}
                >
                  <div className={`p-3 text-center border-b ${
                    isToday ? 'border-blue-200' : 'border-gray-100'
                  }`}>
                    <p className="text-xs font-medium text-gray-500 uppercase">{SHORT_DAYS[dayIndex]}</p>
                    <p className={`text-lg font-semibold ${
                      isToday ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </p>
                  </div>
                  
                  <div className="p-2 space-y-2">
                    {dayClasses.map(cls => (
                      <div 
                        key={cls.id}
                        className={`p-2 rounded-lg text-xs cursor-pointer hover:opacity-80 transition-opacity ${
                          cls.type === 'Lecture' ? 'bg-blue-100 text-blue-700' :
                          cls.type === 'Lab' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        <p className="font-semibold truncate">{cls.courseId}</p>
                        <p className="opacity-75">{formatTime(cls.startTime)}</p>
                      </div>
                    ))}
                    
                    {dayClasses.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">No classes</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Assignments View */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Assignments</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {allAssignments.filter(a => a.status === 'pending').length} pending
              </span>
            </div>
          </div>

          {/* Assignment Cards */}
          <div className="space-y-3">
            {allAssignments.map((assignment, index) => (
              <div 
                key={assignment.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        getAssignmentStatusColor(assignment.status, assignment.dueDate)
                      }`}>
                        {assignment.status === 'submitted' ? 'Submitted' : 
                         new Date(assignment.dueDate) < today ? 'Overdue' : 'Pending'}
                      </span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {assignment.courseId}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{assignment.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })} at {assignment.dueTime}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        {assignment.maxScore} points
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className={`text-lg font-bold ${
                      assignment.status === 'submitted' ? 'text-green-600' :
                      new Date(assignment.dueDate) < today ? 'text-red-600' : 'text-amber-600'
                    }`}>
                      {formatDueDate(assignment.dueDate)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {allAssignments.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarTimetable;
