import { useState, useEffect } from 'react';
import {
  getStudentProfile,
  getStudentEnrollments,
  getStudentAttendance,
  getStudentAnnouncements,
  getUnreadAnnouncementCount,
  markAnnouncementAsRead,
  calculateGPA,
  Student,
  Enrollment,
  AttendanceSummary,
  Announcement
} from '../data/studentData';
import LearningMaterials from './LearningMaterials';
import CalendarTimetable from './CalendarTimetable';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

type TabType = 'overview' | 'courses' | 'grades' | 'attendance' | 'announcements' | 'materials' | 'calendar';

export function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceSummary[]>([]);
  const [announcements, setAnnouncements] = useState<{ announcement: Announcement; isRead: boolean; notificationId: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<{ announcement: Announcement; isRead: boolean } | null>(null);

  const loadData = () => {
    setIsLoading(true);
    const profile = getStudentProfile(userEmail);
    const studentEnrollments = getStudentEnrollments(userEmail);
    const studentAttendance = profile ? getStudentAttendance(profile.studentId) : [];
    const studentAnnouncements = getStudentAnnouncements(userEmail);

    setStudent(profile || null);
    setEnrollments(studentEnrollments);
    setAttendance(studentAttendance);
    setAnnouncements(studentAnnouncements);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [userEmail]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadData();
      setIsRefreshing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const handleMarkAsRead = (announcementId: number) => {
    markAnnouncementAsRead(userEmail, announcementId);
    setAnnouncements(getStudentAnnouncements(userEmail));
  };

  const handleAnnouncementClick = (item: { announcement: Announcement; isRead: boolean }) => {
    setSelectedAnnouncement(item);
    if (!item.isRead) {
      handleMarkAsRead(item.announcement.id);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const gpa = calculateGPA(enrollments);
  const unreadCount = getUnreadAnnouncementCount(userEmail);
  const totalCredits = enrollments.reduce((sum, e) => sum + e.credits, 0);
  const avgAttendance = attendance.length > 0
    ? Math.round((attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">
          Welcome back, {student?.studentName}!
        </h2>
        <p className="opacity-90 mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Current GPA</p>
              <p className="text-2xl font-bold text-slate-900">{gpa.toFixed(2)}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Credits</p>
              <p className="text-2xl font-bold text-slate-900">{totalCredits}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Avg Attendance</p>
              <p className="text-2xl font-bold text-slate-900">{avgAttendance}%</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Unread Announcements</p>
              <p className="text-2xl font-bold text-slate-900">{unreadCount}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">Current Courses</h3>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrollments.slice(0, 3).map((enrollment, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
                  {enrollment.courseId}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  enrollment.grade === 'A' ? 'bg-green-100 text-green-700' :
                  enrollment.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {enrollment.grade}
                </span>
              </div>
              <h4 className="font-medium text-slate-900 mb-1">{enrollment.courseName}</h4>
              <p className="text-sm text-slate-500">{enrollment.teacherName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-900">Current Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((enrollment, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                {enrollment.courseId}
              </span>
              <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${
                enrollment.grade === 'A' ? 'bg-green-100 text-green-700' :
                enrollment.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {enrollment.grade}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{enrollment.courseName}</h3>
            <div className="space-y-2 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {enrollment.teacherName}
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {enrollment.credits} Credits
              </div>
            </div>
            <a
              href={enrollment.googleClassroomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-200 transition-all"
            >
              Open Classroom
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGrades = () => {
    const totalPoints = enrollments.reduce((sum, e) => {
      const gradePoints: Record<string, number> = { 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0 };
      return sum + (gradePoints[e.grade] || 0);
    }, 0);
    const avgGrade = enrollments.length > 0 ? (totalPoints / enrollments.length).toFixed(1) : '0';

    return (
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-slate-900">Grades & Academic Progress</h2>

        {/* GPA Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Circular GPA */}
            <div className="relative h-32 w-32">
              <svg className="h-32 w-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradientBlue)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(gpa / 4) * 352} 352`}
                />
                <defs>
                  <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">{gpa.toFixed(1)}</span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500">Total Credits</p>
                <p className="text-2xl font-bold text-slate-900">{totalCredits}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500">Courses</p>
                <p className="text-2xl font-bold text-slate-900">{enrollments.length}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500">Average Grade</p>
                <p className="text-2xl font-bold text-slate-900">{avgGrade}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Course Grades</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course Name</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Credits</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Grade</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Teacher</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrollments.map((enrollment, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {enrollment.courseId}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-900">{enrollment.courseName}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{enrollment.credits}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold px-2 py-1 rounded ${
                        enrollment.grade === 'A' ? 'bg-green-100 text-green-700' :
                        enrollment.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {enrollment.grade}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{enrollment.teacherName}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        enrollment.grade === 'A' || enrollment.grade === 'B'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {enrollment.grade === 'A' || enrollment.grade === 'B' ? 'Good Standing' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAttendance = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-900">Attendance Overview</h2>

      {attendance.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
          <svg className="h-16 w-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-slate-500">Attendance records will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendance.map((record, idx) => {
            const percentage = Math.round(record.percentage * 100);
            const course = enrollments.find(e => e.courseId === record.courseId);
            
            let statusColor = 'green';
            if (percentage < 70) statusColor = 'red';
            else if (percentage < 85) statusColor = 'orange';

            return (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {record.courseId}
                    </span>
                    <p className="text-sm text-slate-500 mt-1">{course?.courseName}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    statusColor === 'green' ? 'bg-green-100 text-green-700' :
                    statusColor === 'orange' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        statusColor === 'green' ? 'bg-green-500' :
                        statusColor === 'orange' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <p className="text-green-600 font-semibold">{record.present}</p>
                    <p className="text-green-600 text-xs">Present</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-600 font-semibold">{record.late}</p>
                    <p className="text-yellow-600 text-xs">Late</p>
                  </div>
                  <div className="p-2 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-semibold">{record.absent}</p>
                    <p className="text-red-600 text-xs">Absent</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-4 text-center">
                  Out of {record.totalClasses} classes • Updated: {new Date(record.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-900">Announcements</h2>

      {announcements.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
          <svg className="h-16 w-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <p className="text-slate-500">No new announcements</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleAnnouncementClick(item)}
              className={`bg-white rounded-xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md ${
                item.isRead ? 'border-slate-100' : 'border-blue-200 bg-blue-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.announcement.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.announcement.priority.toUpperCase()}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.announcement.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                      item.announcement.category === 'Holiday' ? 'bg-green-100 text-green-700' :
                      item.announcement.category === 'Assignment' ? 'bg-purple-100 text-purple-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.announcement.category}
                    </span>
                    {!item.isRead && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.announcement.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{item.announcement.content}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>By {item.announcement.author}</span>
                    <span>•</span>
                    <span>{new Date(item.announcement.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    {item.announcement.targetCourses !== 'ALL' && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600 font-medium">{item.announcement.targetCourses}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900 hidden sm:block">Student Portal</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <svg className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden sm:inline">Sync</span>
              </button>

              {/* User Info */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  {student?.studentName ? getInitials(student.studentName) : '?'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-900">{student?.studentName}</p>
                  <p className="text-xs text-slate-500">{student?.studentId}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 sticky top-24">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'courses'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-medium">Courses</span>
              </button>

              <button
                onClick={() => setActiveTab('grades')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'grades'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">Grades & GPA</span>
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'attendance'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Attendance</span>
              </button>

              <button
                onClick={() => setActiveTab('announcements')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'announcements'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="font-medium">Announcements</span>
                {unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'calendar'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Calendar</span>
              </button>

              <button
                onClick={() => setActiveTab('materials')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'materials'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-medium">Materials</span>
              </button>
            </nav>

            {/* Profile Card (in sidebar on desktop) */}
            {student && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mt-4">
                <h3 className="font-semibold text-slate-900 mb-3">Student Profile</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ID:</span>
                    <span className="text-slate-900 font-medium">{student.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Major:</span>
                    <span className="text-slate-900 font-medium">{student.major}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mode:</span>
                    <span className="text-slate-900 font-medium">{student.studyMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="text-green-600 font-medium">{student.status}</span>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'courses' && renderCourses()}
            {activeTab === 'grades' && renderGrades()}
            {activeTab === 'attendance' && renderAttendance()}
            {activeTab === 'announcements' && renderAnnouncements()}
            {activeTab === 'calendar' && <CalendarTimetable email={userEmail} />}
            {activeTab === 'materials' && <LearningMaterials email={userEmail} />}
          </main>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fadeIn z-50">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Data synchronized successfully
        </div>
      )}

      {/* Announcement Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedAnnouncement(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                selectedAnnouncement.announcement.priority === 'high'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {selectedAnnouncement.announcement.priority.toUpperCase()}
              </span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                selectedAnnouncement.announcement.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                selectedAnnouncement.announcement.category === 'Holiday' ? 'bg-green-100 text-green-700' :
                selectedAnnouncement.announcement.category === 'Assignment' ? 'bg-purple-100 text-purple-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {selectedAnnouncement.announcement.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{selectedAnnouncement.announcement.title}</h3>
            <p className="text-slate-600 mb-4">{selectedAnnouncement.announcement.content}</p>
            <div className="flex items-center gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4">
              <span>By {selectedAnnouncement.announcement.author}</span>
              <span>•</span>
              <span>{new Date(selectedAnnouncement.announcement.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="mt-4 w-full py-2 px-4 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
