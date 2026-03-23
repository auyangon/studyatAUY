import { BookOpen, Clock, GraduationCap, Star, ChevronRight } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const courseColors = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-violet-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-sky-600',
  'from-lime-500 to-green-600',
  'from-fuchsia-500 to-purple-600',
];

export default function Courses() {
  const { courses, enrollments, currentStudent, loading } = useStudent();

  if (loading) return <LoadingSpinner message="Loading courses..." />;

  const studentEnrollments = enrollments.filter(
    (e) => e.StudentID === currentStudent?.StudentID
  );
  const enrolledCourseIds = new Set(studentEnrollments.map((e) => e.CourseID));

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-extrabold text-text-primary">Courses</h1>
        <p className="text-text-secondary mt-1">
          Manage and explore your enrolled courses
        </p>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4 animate-fade-in stagger-1" style={{ opacity: 0 }}>
          Your Courses ({studentEnrollments.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses
            .filter((c) => enrolledCourseIds.has(c.CourseID))
            .map((course, i) => {
              const enrollment = studentEnrollments.find(
                (e) => e.CourseID === course.CourseID
              );
              return (
                <div
                  key={course.CourseID}
                  className={`card-premium overflow-hidden animate-fade-in stagger-${(i % 8) + 1}`}
                  style={{ opacity: 0 }}
                >
                  <div className={`h-2 bg-gradient-to-r ${courseColors[i % courseColors.length]}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-surface text-[11px] font-bold text-text-muted uppercase tracking-wide">
                        {course.CourseID}
                      </span>
                      {enrollment?.Grade && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-sm font-bold">
                          <Star className="w-3.5 h-3.5" />
                          {enrollment.Grade}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-text-primary mb-1 line-clamp-2">
                      {course.CourseName}
                    </h3>
                    <p className="text-xs text-text-muted mb-4 line-clamp-2">
                      {course.Description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {course.Instructor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.Credits} cr
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* All Available Courses */}
      {courses.filter((c) => !enrolledCourseIds.has(c.CourseID)).length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">
            Available Courses
          </h2>
          <div className="card-premium divide-y divide-border-light overflow-hidden">
            {courses
              .filter((c) => !enrolledCourseIds.has(c.CourseID))
              .map((course) => (
                <div
                  key={course.CourseID}
                  className="flex items-center gap-4 p-4 hover:bg-surface transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary">{course.CourseName}</p>
                    <p className="text-xs text-text-muted">
                      {course.Department} Â· {course.Instructor} Â· {course.Credits} credits
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

