// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'https://auy-portal-worker.weathered-feather-02ca.workers.dev';

export interface Student {
  studentId: string;
  email: string;
  studentName: string;
  major: string;
  studyMode: string;
  status: string;
}

export interface Enrollment {
  enrollmentId: string;
  courseId: string;
  courseName: string;
  teacherName: string;
  credits: number;
  grade: string;
  googleClassroomLink: string;
}

export interface Material {
  materialId: string;
  courseId: string;
  title: string;
  type: string;
  description: string;
  fileUrl: string;
  uploadedBy: string;
  uploadDate: string;
  week: string;
  tags: string;
}

export interface Schedule {
  scheduleId: string;
  courseId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
  type: string;
}

export interface Deadline {
  deadlineId: string;
  courseId: string;
  title: string;
  type: string;
  dueDate: string;
  dueTime: string;
  weight: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: string;
  category: string;
  targetCourses: string;
  read: boolean;
}

export interface Attendance {
  studentId: string;
  courseId: string;
  totalClasses: number;
  present: number;
  late: number;
  absent: number;
  percentage: number;
}

export const api = {
  setToken: (token: string) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  clearToken: () => localStorage.removeItem('token'),

  async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': Bearer  }),
      ...options.headers
    };
    const res = await fetch(${API_URL}, { ...options, headers });
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetch(${API_URL}/api/login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  getStudent: () => api.request('/api/student'),
  getEnrollments: () => api.request('/api/enrollments'),
  getMaterials: () => api.request('/api/materials'),
  getSchedule: () => api.request('/api/schedule'),
  getDeadlines: () => api.request('/api/deadlines'),
  getAnnouncements: () => api.request('/api/announcements'),
  getAttendance: () => api.request('/api/attendance'),
  markAnnouncementRead: (id: number) => api.request('/api/notifications/read', {
    method: 'POST',
    body: JSON.stringify({ announcementId: id })
  })
};
