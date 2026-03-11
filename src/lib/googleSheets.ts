export interface StudentSummary {
  email: string;
  id: string;
  name: string;
}

export interface AttendanceTotals {
  absent: number;
  late: number;
  present: number;
}

export interface AttendanceByCourseRecord {
  absent: number;
  code: string;
  late: number;
  percentage: number;
  present: number;
}

export interface CourseRecord {
  attendance: number;
  code: string;
  googleClassroomLink?: string;
  grade: string;
  name: string;
  progress: number;
  teacher: string;
}

export interface AnnouncementRecord {
  author: string;
  content: string;
  date: string;
  id: string;
  priority: string;
  read: boolean;
  title: string;
}

export interface DeadlineRecord {
  course: string;
  daysLeft: number;
  dueDate: string;
  icon: string;
  id: string;
  progress: number;
  title: string;
}

export interface DashboardData {
  activeCourses: number;
  announcements: AnnouncementRecord[];
  attendance: AttendanceTotals;
  attendanceByCourse: AttendanceByCourseRecord[];
  canViewAllStudents: boolean;
  completedCourses: number;
  courses: CourseRecord[];
  creditsEnrolled: number;
  daysUntilFinals: number;
  deadlines: DeadlineRecord[];
  email: string;
  enrolledCoursesCount: number;
  firstName: string;
  fullName: string;
  gpa: number;
  lastUpdatedAt: number;
  major: string;
  semesterWeek: number;
  semesterWeeksTotal: number;
  status: string;
  studentId: string;
  students: StudentSummary[];
  studyMode?: string;
  unreadAnnouncements: number;
}

interface LoginParams {
  email: string;
  password: string;
}

interface ChangePasswordParams {
  email: string;
  newPassword: string;
  oldPassword: string;
}

interface GetMyDataParams {
  email: string;
  studentEmail?: string;
}

interface MarkReadParams {
  announcementId: string;
  email: string;
  studentEmail?: string;
}

interface CheckUpdatesParams {
  lastSync: number;
}

interface UpdateStatus {
  needsUpdate: boolean;
  timestamp: number;
}

interface ApiEnvelope<T> {
  data?: T;
  error?: string;
  success?: boolean;
}

interface MockDatabase {
  dashboards: Record<string, DashboardData>;
  lastUpdatedAt: number;
  users: Record<string, string>;
}

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL?.trim();
const MOCK_STORAGE_KEY = "auy-portal-mock-db";
const ADMIN_EMAIL = "teacher@auy.edu.mm";

const STUDENTS: StudentSummary[] = [
  { email: "aung.khant.phyo@student.au.edu.mm", id: "S001", name: "Aung Khant Phyo" },
  { email: "chanmyae.au.edu.mm@gmail.com", id: "S024", name: "Chan Myae" },
  { email: "mi.thu.kha@student.au.edu.mm", id: "S018", name: "Mi Thu Kha" },
];

const BASE_DASHBOARDS: Record<string, DashboardData> = {
  "aung.khant.phyo@student.au.edu.mm": {
    activeCourses: 5,
    announcements: [
      {
        author: "Academic Office",
        content: "Final examinations begin next month. Review the updated exam seating plan and room assignments in the campus notice board.",
        date: "2026-04-15",
        id: "1",
        priority: "HIGH",
        read: false,
        title: "Final Exam Schedule",
      },
      {
        author: "Student Affairs",
        content: "Course registration for summer tutorials opens this Friday at 10:00 AM through the registrar office.",
        date: "2026-03-18",
        id: "2",
        priority: "MEDIUM",
        read: false,
        title: "Summer Tutorial Registration",
      },
      {
        author: "Administration",
        content: "University offices will close during Thingyan. Online class activities resume on the next working day.",
        date: "2026-03-20",
        id: "3",
        priority: "HIGH",
        read: true,
        title: "Thingyan Holiday Notice",
      },
    ],
    attendance: { absent: 3, late: 4, present: 121 },
    attendanceByCourse: [
      { absent: 1, code: "BUS101", late: 1, percentage: 92, present: 28 },
      { absent: 0, code: "ENG101", late: 1, percentage: 96, present: 27 },
      { absent: 1, code: "CSC201", late: 1, percentage: 89, present: 24 },
      { absent: 1, code: "ECO110", late: 1, percentage: 88, present: 23 },
      { absent: 0, code: "MAT120", late: 0, percentage: 98, present: 19 },
    ],
    canViewAllStudents: false,
    completedCourses: 1,
    courses: [
      {
        attendance: 92,
        code: "BUS101",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "A-",
        name: "Introduction to Business",
        progress: 74,
        teacher: "Prof. Johnson",
      },
      {
        attendance: 96,
        code: "ENG101",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "A",
        name: "English Composition",
        progress: 78,
        teacher: "Dr. Smith",
      },
      {
        attendance: 89,
        code: "CSC201",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "B+",
        name: "Computer Applications",
        progress: 72,
        teacher: "Prof. Lin",
      },
      {
        attendance: 88,
        code: "ECO110",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "B",
        name: "Microeconomics",
        progress: 71,
        teacher: "Dr. Carter",
      },
      {
        attendance: 98,
        code: "MAT120",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "A",
        name: "Business Mathematics",
        progress: 80,
        teacher: "Dr. Hlaing",
      },
    ],
    creditsEnrolled: 15,
    daysUntilFinals: 34,
    deadlines: [
      { course: "BUS101", daysLeft: 6, dueDate: "2026-03-15", icon: "📝", id: "d1", progress: 76, title: "BUS101 Assignment" },
      { course: "ENG101", daysLeft: 9, dueDate: "2026-03-18", icon: "✍️", id: "d2", progress: 62, title: "ENG101 Essay" },
      { course: "CSC201", daysLeft: 12, dueDate: "2026-03-21", icon: "💻", id: "d3", progress: 55, title: "CSC201 Lab Report" },
    ],
    email: "aung.khant.phyo@student.au.edu.mm",
    enrolledCoursesCount: 5,
    firstName: "Aung",
    fullName: "Aung Khant Phyo",
    gpa: 3.57,
    lastUpdatedAt: 1_768_000_100_000,
    major: "ISP program",
    semesterWeek: 8,
    semesterWeeksTotal: 16,
    status: "Active",
    studentId: "S001",
    students: STUDENTS,
    studyMode: "OnCampus",
    unreadAnnouncements: 2,
  },
  "chanmyae.au.edu.mm@gmail.com": {
    activeCourses: 6,
    announcements: [
      {
        author: "Academic Office",
        content: "Final examinations start next month. Please review the latest exam schedule and room list before the end of the week.",
        date: "2026-04-15",
        id: "1",
        priority: "HIGH",
        read: false,
        title: "Final Exam Schedule",
      },
      {
        author: "Administration",
        content: "The university will be closed for the Thingyan holiday. Digital coursework remains visible through Google Classroom.",
        date: "2026-03-20",
        id: "2",
        priority: "HIGH",
        read: false,
        title: "Thingyan Holiday Notice",
      },
      {
        author: "Student Affairs",
        content: "Student clubs are now accepting sign-ups for the spring showcase. Submit your interest form before Friday.",
        date: "2026-03-12",
        id: "3",
        priority: "LOW",
        read: true,
        title: "Spring Showcase Sign-ups",
      },
      {
        author: "Registrar",
        content: "Updated add-drop policy forms are available at the registrar counter and by request from your advisor.",
        date: "2026-03-10",
        id: "4",
        priority: "MEDIUM",
        read: true,
        title: "Updated Add-Drop Procedure",
      },
    ],
    attendance: { absent: 2, late: 5, present: 108 },
    attendanceByCourse: [
      { absent: 2, code: "BUS101", late: 2, percentage: 86.67, present: 26 },
      { absent: 0, code: "ENG101", late: 1, percentage: 96.43, present: 27 },
      { absent: 0, code: "MAT120", late: 0, percentage: 100, present: 24 },
      { absent: 0, code: "ECO110", late: 1, percentage: 92.86, present: 26 },
      { absent: 0, code: "CSC201", late: 1, percentage: 90.32, present: 28 },
      { absent: 0, code: "COM210", late: 0, percentage: 95.83, present: 23 },
    ],
    canViewAllStudents: false,
    completedCourses: 0,
    courses: [
      {
        attendance: 86.67,
        code: "BUS101",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "B",
        name: "Introduction to Business",
        progress: 75,
        teacher: "Prof. Johnson",
      },
      {
        attendance: 96.43,
        code: "ENG101",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "B+",
        name: "English Composition",
        progress: 78,
        teacher: "Dr. Smith",
      },
      {
        attendance: 100,
        code: "MAT120",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "A",
        name: "Business Mathematics",
        progress: 82,
        teacher: "Dr. Hlaing",
      },
      {
        attendance: 92.86,
        code: "ECO110",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "B",
        name: "Microeconomics",
        progress: 73,
        teacher: "Dr. Carter",
      },
      {
        attendance: 90.32,
        code: "CSC201",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "B+",
        name: "Computer Applications",
        progress: 76,
        teacher: "Prof. Lin",
      },
      {
        attendance: 95.83,
        code: "COM210",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "A-",
        name: "Business Communication",
        progress: 74,
        teacher: "Prof. Marina",
      },
    ],
    creditsEnrolled: 18,
    daysUntilFinals: 38,
    deadlines: [
      { course: "BUS101", daysLeft: 5, dueDate: "2026-03-15", icon: "📝", id: "d1", progress: 70, title: "BUS101 Assignment" },
      { course: "ENG101", daysLeft: 8, dueDate: "2026-03-18", icon: "✍️", id: "d2", progress: 58, title: "ENG101 Essay" },
      { course: "CSC201", daysLeft: 11, dueDate: "2026-03-21", icon: "💻", id: "d3", progress: 46, title: "CSC201 Presentation" },
      { course: "ECO110", daysLeft: 15, dueDate: "2026-03-25", icon: "📘", id: "d4", progress: 38, title: "ECO110 Case Study" },
      { course: "MAT120", daysLeft: 18, dueDate: "2026-03-28", icon: "📐", id: "d5", progress: 31, title: "MAT120 Problem Set" },
      { course: "COM210", daysLeft: 22, dueDate: "2026-04-01", icon: "🎤", id: "d6", progress: 24, title: "COM210 Speech Draft" },
    ],
    email: "chanmyae.au.edu.mm@gmail.com",
    enrolledCoursesCount: 6,
    firstName: "Chan",
    fullName: "Chan Myae",
    gpa: 3.0,
    lastUpdatedAt: 1_768_000_223_000,
    major: "ISP program",
    semesterWeek: 8,
    semesterWeeksTotal: 16,
    status: "Active",
    studentId: "S024",
    students: STUDENTS,
    studyMode: "OnCampus",
    unreadAnnouncements: 2,
  },
  "mi.thu.kha@student.au.edu.mm": {
    activeCourses: 4,
    announcements: [
      {
        author: "Academic Office",
        content: "Please review the presentation rubric updates shared for the capstone seminar this week.",
        date: "2026-03-16",
        id: "1",
        priority: "MEDIUM",
        read: false,
        title: "Capstone Rubric Update",
      },
      {
        author: "Administration",
        content: "Campus library hours are extended during midterm week from 8 AM to 8 PM.",
        date: "2026-03-11",
        id: "2",
        priority: "LOW",
        read: true,
        title: "Library Hours Extended",
      },
    ],
    attendance: { absent: 1, late: 2, present: 89 },
    attendanceByCourse: [
      { absent: 0, code: "ENG101", late: 0, percentage: 98, present: 24 },
      { absent: 0, code: "HIS205", late: 1, percentage: 93, present: 27 },
      { absent: 1, code: "BUS250", late: 1, percentage: 87, present: 20 },
      { absent: 0, code: "COM210", late: 0, percentage: 96, present: 18 },
    ],
    canViewAllStudents: false,
    completedCourses: 2,
    courses: [
      {
        attendance: 98,
        code: "ENG101",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "A",
        name: "English Composition",
        progress: 81,
        teacher: "Dr. Smith",
      },
      {
        attendance: 93,
        code: "HIS205",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "A-",
        name: "Modern Asian History",
        progress: 76,
        teacher: "Prof. Martin",
      },
      {
        attendance: 87,
        code: "BUS250",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "B+",
        name: "Marketing Principles",
        progress: 73,
        teacher: "Prof. Dawson",
      },
      {
        attendance: 96,
        code: "COM210",
        googleClassroomLink: "https://classroom.google.com/",
        grade: "A",
        name: "Business Communication",
        progress: 80,
        teacher: "Prof. Marina",
      },
    ],
    creditsEnrolled: 12,
    daysUntilFinals: 42,
    deadlines: [
      { course: "BUS250", daysLeft: 7, dueDate: "2026-03-17", icon: "📣", id: "d1", progress: 68, title: "BUS250 Campaign Draft" },
      { course: "HIS205", daysLeft: 14, dueDate: "2026-03-24", icon: "📜", id: "d2", progress: 44, title: "HIS205 Source Review" },
    ],
    email: "mi.thu.kha@student.au.edu.mm",
    enrolledCoursesCount: 4,
    firstName: "Mi",
    fullName: "Mi Thu Kha",
    gpa: 3.74,
    lastUpdatedAt: 1_768_000_180_000,
    major: "Business Administration",
    semesterWeek: 8,
    semesterWeeksTotal: 16,
    status: "Active",
    studentId: "S018",
    students: STUDENTS,
    studyMode: "OnCampus",
    unreadAnnouncements: 1,
  },
};

function cloneDashboard(dashboard: DashboardData): DashboardData {
  return {
    ...dashboard,
    announcements: dashboard.announcements.map((announcement) => ({ ...announcement })),
    attendance: { ...dashboard.attendance },
    attendanceByCourse: dashboard.attendanceByCourse.map((attendance) => ({ ...attendance })),
    courses: dashboard.courses.map((course) => ({ ...course })),
    deadlines: dashboard.deadlines.map((deadline) => ({ ...deadline })),
    students: dashboard.students.map((student) => ({ ...student })),
  };
}

function getDefaultMockDatabase(): MockDatabase {
  return {
    dashboards: Object.fromEntries(
      Object.entries(BASE_DASHBOARDS).map(([email, dashboard]) => [email, cloneDashboard(dashboard)]),
    ),
    lastUpdatedAt: Date.now(),
    users: {
      [ADMIN_EMAIL]: "admin123",
      "aung.khant.phyo@student.au.edu.mm": "student123",
      "chanmyae.au.edu.mm@gmail.com": "student123",
      "mi.thu.kha@student.au.edu.mm": "student123",
    },
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getMockDatabase(): MockDatabase {
  if (typeof window === "undefined") {
    return getDefaultMockDatabase();
  }

  const stored = window.localStorage.getItem(MOCK_STORAGE_KEY);

  if (!stored) {
    const nextDatabase = getDefaultMockDatabase();
    window.localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(nextDatabase));
    return nextDatabase;
  }

  return JSON.parse(stored) as MockDatabase;
}

function saveMockDatabase(database: MockDatabase) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(database));
}

function unwrapResponse<T>(payload: unknown): T {
  const maybeEnvelope = payload as ApiEnvelope<T>;

  if (typeof maybeEnvelope === "object" && maybeEnvelope !== null && "success" in maybeEnvelope) {
    if (maybeEnvelope.success === false) {
      throw new Error(maybeEnvelope.error || "Request failed.");
    }

    return (maybeEnvelope.data as T) ?? (payload as T);
  }

  return payload as T;
}

async function request<T>(action: string, params: Record<string, string | number | undefined>): Promise<T> {
  if (!APPS_SCRIPT_URL) {
    return mockRequest<T>(action, params);
  }

  const body = new URLSearchParams({ action });

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      body.set(key, String(value));
    }
  });

  const response = await fetch(APPS_SCRIPT_URL, {
    body: body.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "POST",
  });

  const text = await response.text();
  let payload: unknown;

  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error("Apps Script returned an unreadable response.");
  }

  if (!response.ok) {
    const message = (payload as ApiEnvelope<T>).error || "Apps Script request failed.";
    throw new Error(message);
  }

  return unwrapResponse<T>(payload);
}

async function mockRequest<T>(action: string, params: Record<string, string | number | undefined>): Promise<T> {
  const database = getMockDatabase();

  switch (action) {
    case "login": {
      const email = normalizeEmail(String(params.email || ""));
      const password = String(params.password || "");

      if (!database.users[email] || database.users[email] !== password) {
        throw new Error("Invalid email or password.");
      }

      return { email } as T;
    }
    case "changePassword": {
      const email = normalizeEmail(String(params.email || ""));
      const oldPassword = String(params.oldPassword || "");
      const newPassword = String(params.newPassword || "");

      if (database.users[email] !== oldPassword) {
        throw new Error("Current password is incorrect.");
      }

      database.users[email] = newPassword;
      database.lastUpdatedAt = Date.now();
      saveMockDatabase(database);
      return { success: true } as T;
    }
    case "getMyData": {
      const requesterEmail = normalizeEmail(String(params.email || ""));
      const targetStudentEmail = normalizeEmail(String(params.studentEmail || requesterEmail));
      const canViewAllStudents = requesterEmail === ADMIN_EMAIL;
      const dashboard = database.dashboards[canViewAllStudents ? targetStudentEmail : requesterEmail];

      if (!database.users[requesterEmail]) {
        throw new Error("User account not found.");
      }

      if (!dashboard) {
        throw new Error("Student record not found.");
      }

      return {
        ...cloneDashboard(dashboard),
        canViewAllStudents,
        lastUpdatedAt: database.lastUpdatedAt,
        students: STUDENTS,
      } as T;
    }
    case "markRead": {
      const requesterEmail = normalizeEmail(String(params.email || ""));
      const targetStudentEmail = normalizeEmail(String(params.studentEmail || requesterEmail));
      const dashboard = database.dashboards[requesterEmail === ADMIN_EMAIL ? targetStudentEmail : requesterEmail];
      const announcementId = String(params.announcementId || "");

      if (!dashboard) {
        throw new Error("Student record not found.");
      }

      dashboard.announcements = dashboard.announcements.map((announcement) =>
        announcement.id === announcementId ? { ...announcement, read: true } : announcement,
      );
      dashboard.unreadAnnouncements = dashboard.announcements.filter((announcement) => !announcement.read).length;
      database.lastUpdatedAt = Date.now();
      saveMockDatabase(database);
      return { success: true } as T;
    }
    case "checkUpdates": {
      const lastSync = Number(params.lastSync || 0);
      return {
        needsUpdate: database.lastUpdatedAt > lastSync,
        timestamp: database.lastUpdatedAt,
      } as T;
    }
    default:
      throw new Error(`Unsupported action: ${action}`);
  }
}

export function login(params: LoginParams) {
  return request<{ email: string }>("login", { ...params });
}

export function changePassword(params: ChangePasswordParams) {
  return request<{ success: boolean }>("changePassword", { ...params });
}

export function getMyData(params: GetMyDataParams) {
  return request<DashboardData>("getMyData", { ...params });
}

export function markRead(params: MarkReadParams) {
  return request<{ success: boolean }>("markRead", { ...params });
}

export function checkUpdates(params: CheckUpdatesParams) {
  return request<UpdateStatus>("checkUpdates", { ...params });
}