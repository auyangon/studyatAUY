import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useRealtimeData } from "./hooks/useRealtimeData";
import { Login } from "./components/Login";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ProfileCard } from "./components/ProfileCard";
import { CourseProgressCard } from "./components/CourseProgressCard";
import { AttendanceSummaryCard } from "./components/AttendanceSummaryCard";
import { AnnouncementsCard } from "./components/AnnouncementsCard";
import { DeadlinesCard } from "./components/DeadlinesCard";
import { QuickStatsCard } from "./components/QuickStatsCard";
import { SyncStatus } from "./components/SyncStatus";
import { ChangePassword } from "./components/ChangePassword";

export function App() {
  const { isAuthenticated, login, logout, userEmail, authLoading, authError } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
  const [clock, setClock] = useState(new Date());
  
  const { data, loading, error, refresh, markRead, syncing, lastSync } = useRealtimeData(userEmail);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
      <div className="text-2xl font-semibold text-[#1e3c2c]">Loading AUY Portal...</div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Login error={authError} loading={authLoading} onSubmit={login} />;
  }

  if (loading || !data) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
      <div className="text-2xl font-semibold text-[#1e3c2c]">Loading your dashboard...</div>
    </div>;
  }

  const filteredCourses = (data.courses || []).filter(c => 
    !search || [c.code, c.name, c.teacher].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredAnnouncements = (data.announcements || []).filter(a => 
    !search || [a.title, a.content, a.author].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredDeadlines = (data.deadlines || []).filter(d => 
    !search || [d.title, d.course].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  const urgentCount = (data.deadlines || []).filter(d => d.daysLeft <= 7).length;
  const attendanceRate = data.attendance?.present && data.attendance?.total 
    ? Math.round((data.attendance.present / data.attendance.total) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Sidebar 
        activePage={activePage}
        onPageChange={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        courseCount={data.courses?.length || 0}
        unreadCount={data.unreadAnnouncements || 0}
        userName={data.fullName || "Student"}
        onLogout={logout}
      />
      
      <div className="lg:ml-64">
        <Header 
          firstName={data.firstName || "Student"}
          clock={clock}
          search={search}
          onSearchChange={setSearch}
          onMenuToggle={() => setSidebarOpen(true)}
          syncing={syncing}
          canViewAllStudents={data.canViewAllStudents || false}
          students={data.students || []}
          selectedEmail={userEmail}
          onStudentChange={() => {}}
        />

        <main className="p-6">
          {data.canViewAllStudents && (
            <SyncStatus 
              syncing={syncing}
              lastSync={lastSync}
              onRefresh={refresh}
              visible={true}
            />
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
              Error: {error}
            </div>
          )}

          {activePage === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ProfileCard 
                email={data.email}
                fullName={data.fullName || ""}
                studentId={data.studentId || ""}
                major={data.major || ""}
                status={data.status || "Active"}
                studyMode={data.studyMode || "OnCampus"}
                gpa={data.gpa || 0}
                enrolledCoursesCount={data.courses?.length || 0}
              />
              <QuickStatsCard 
                gpa={data.gpa || 0}
                attendanceRate={attendanceRate}
                courseCount={data.courses?.length || 0}
                unreadCount={data.unreadAnnouncements || 0}
                activeCourses={data.courses?.length || 0}
                completedCourses={0}
                creditsEnrolled={18}
                daysUntilFinals={38}
                semesterWeek={8}
                semesterWeeksTotal={16}
              />
              <CourseProgressCard courses={filteredCourses} />
              <AttendanceSummaryCard 
                attendance={data.attendance || { present: 0, late: 0, absent: 0, total: 0 }}
                attendanceByCourse={data.attendanceByCourse || []}
              />
              <AnnouncementsCard 
                announcements={filteredAnnouncements}
                disabled={syncing}
                onMarkRead={markRead}
              />
              <DeadlinesCard deadlines={filteredDeadlines} />
            </div>
          )}

          {activePage === "courses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CourseProgressCard courses={filteredCourses} />
              <QuickStatsCard 
                gpa={data.gpa || 0}
                attendanceRate={attendanceRate}
                courseCount={data.courses?.length || 0}
                unreadCount={data.unreadAnnouncements || 0}
                activeCourses={data.courses?.length || 0}
                completedCourses={0}
                creditsEnrolled={18}
                daysUntilFinals={38}
                semesterWeek={8}
                semesterWeeksTotal={16}
              />
            </div>
          )}

          {activePage === "settings" && (
            <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-lg font-semibold text-gray-900">{userEmail}</p>
                </div>
                <button
                  onClick={() => setPasswordModal(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] text-white font-bold rounded-xl hover:shadow-lg transition"
                >
                  Change Password
                </button>
                <button
                  onClick={logout}
                  className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {passwordModal && (
        <ChangePassword
          open={passwordModal}
          onClose={() => setPasswordModal(false)}
          onSubmit={async (oldPass, newPass) => {
            await changePasswordRequest({ email: userEmail, oldPassword: oldPass, newPassword: newPass });
            setPasswordModal(false);
          }}
        />
      )}
    </div>
  );
}
