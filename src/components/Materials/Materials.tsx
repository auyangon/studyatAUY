import { FolderOpen, FileText, Download, Search, BookOpen, Video, File, Presentation } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useState } from 'react';

export default function Materials() {
  const { courses, enrollments, currentStudent, loading } = useStudent();
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  if (loading) return <LoadingSpinner message="Loading materials..." />;

  const studentEnrollments = enrollments.filter(
    (e) => e.StudentID === currentStudent?.StudentID
  );
  const enrolledCourses = courses.filter((c) =>
    studentEnrollments.some((e) => e.CourseID === c.CourseID)
  );

  // Generate sample materials based on enrolled courses
  const materials = enrolledCourses.flatMap((course) => [
    {
      id: `${course.CourseID}-syllabus`,
      courseId: course.CourseID,
      courseName: course.CourseName,
      title: `${course.CourseName} - Syllabus`,
      type: 'document',
      date: '2025-01-15',
    },
    {
      id: `${course.CourseID}-lecture1`,
      courseId: course.CourseID,
      courseName: course.CourseName,
      title: `Week 1 - Introduction & Overview`,
      type: 'slides',
      date: '2025-01-20',
    },
    {
      id: `${course.CourseID}-reading`,
      courseId: course.CourseID,
      courseName: course.CourseName,
      title: `Recommended Readings`,
      type: 'document',
      date: '2025-01-22',
    },
    {
      id: `${course.CourseID}-video`,
      courseId: course.CourseID,
      courseName: course.CourseName,
      title: `Lecture Recording - Week 1`,
      type: 'video',
      date: '2025-01-20',
    },
  ]);

  const filteredMaterials = materials.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.courseName.toLowerCase().includes(search.toLowerCase());
    const matchCourse = selectedCourse === 'all' || m.courseId === selectedCourse;
    return matchSearch && matchCourse;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'slides': return <Presentation className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-50 text-blue-500';
      case 'video': return 'bg-red-50 text-red-500';
      case 'slides': return 'bg-amber-50 text-amber-500';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2">
          <FolderOpen className="w-8 h-8 text-primary" />
          Course Materials
        </h1>
        <p className="text-text-secondary mt-1">Access lecture notes, slides, and resources</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in stagger-1" style={{ opacity: 0 }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        >
          <option value="all">All Courses</option>
          {enrolledCourses.map((c) => (
            <option key={c.CourseID} value={c.CourseID}>
              {c.CourseName}
            </option>
          ))}
        </select>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="card-premium p-12 text-center animate-fade-in stagger-2" style={{ opacity: 0 }}>
          <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-muted">No materials found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredMaterials.map((mat, i) => (
            <div
              key={mat.id}
              className={`card-premium p-4 flex items-center gap-4 animate-fade-in stagger-${(i % 8) + 1}`}
              style={{ opacity: 0 }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeColor(mat.type)}`}>
                {getIcon(mat.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">{mat.title}</p>
                <p className="text-xs text-text-muted">{mat.courseName} Â· {mat.date}</p>
              </div>
              <button className="w-9 h-9 rounded-xl bg-surface hover:bg-primary hover:text-white flex items-center justify-center text-text-muted transition-all flex-shrink-0">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

