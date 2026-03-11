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
  const { isAuthenticated, login, logout, userEmail, authLoading } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
  const [clock, setClock] = useState(new Date());
  
  const { data, loading, error, refresh, syncing, lastSync } = useRealtimeData(userEmail);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login onSubmit={login} />;
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c5a572] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1e3c2c]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-gray-900">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        courseCount={data.enrollments?.length || 6}
        unreadCount={data.notifications?.filter((n: any) => !n.read).length || 0}
        userName={data.student?.studentName || "Student"}
        onLogout={logout}
      />
      
      <div className="lg:ml-64">
        <Header
          firstName={data.student?.studentName?.split(' ')[0] || "Student"}
          clock={clock}
          search={search}
          onSearchChange={setSearch}
          onMenuToggle={() => setSidebarOpen(true)}
          syncing={syncing}
          canViewAllStudents={data.canViewAllStudents || false}
          students={data.canViewAllStudents ? [{ id: data.student?.studentId, name: data.student?.studentName, email: data.student?.email }] : []}
          selectedEmail={data.student?.email || ""}
          onStudentChange={() => {}}
        />

        <main className="p-6">
          {data.canViewAllStudents && (
            <SyncStatus syncing={syncing} lastSync={lastSync} onRefresh={refresh} visible={true} />
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>
          )}

          {activePage === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <ProfileCard
                email={data.student?.email || ""}
                fullName={data.student?.studentName || ""}
                studentId={data.student?.studentId || ""}
                major={data.student?.major || ""}
                status={data.student?.status || "Active"}
                studyMode={data.student?.studyMode || "OnCampus"}
                gpa={3.0}
                enrolledCoursesCount={data.enrollments?.length || 0}
              />
              <QuickStatsCard
                gpa={3.0}
                attendanceRate={75}
                courseCount={data.enrollments?.length || 0}
                unreadCount={data.notifications?.filter((n: any) => !n.read).length || 0}
                activeCourses={data.enrollments?.length || 0}
                completedCourses={0}
                creditsEnrolled={18}
                daysUntilFinals={38}
                semesterWeek={8}
                semesterWeeksTotal={16}
              />
              <CourseProgressCard courses={data.courses || []} enrollments={data.enrollments || []} />
              <AttendanceSummaryCard 
                attendance={{ present: 100, late: 10, absent: 10 }}
                attendanceByCourse={(data.courses || []).map((c: any) => ({ code: c.courseCode, percentage: 85 }))}
              />
              <AnnouncementsCard announcements={data.announcements || []} disabled={syncing} onMarkRead={() => {}} />
              <DeadlinesCard deadlines={[]} />
            </div>
          )}
        </main>
      </div>

      <ChangePassword open={passwordModal} onClose={() => setPasswordModal(false)} onSubmit={() => {}} />
    </div>
  );
}
