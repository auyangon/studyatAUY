import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Folder, 
  Film, 
  Download, 
  Search, 
  Filter, 
  Grid, 
  List,
  File,
  Image,
  Link,
  ChevronRight,
  ChevronDown,
  Eye,
  Clock,
  BookOpen,
  FileQuestion,
  Video
} from 'lucide-react';
import { LearningMaterial, getStudentMaterials } from '../data/studentData';

interface LearningMaterialsProps {
  email: string;
}

const LearningMaterials: React.FC<LearningMaterialsProps> = ({ email }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [previewMaterial, setPreviewMaterial] = useState<LearningMaterial | null>(null);

  const materials = useMemo(() => getStudentMaterials(email), [email]);

  const categories = ['All', 'Lecture Notes', 'Assignments', 'Study Materials', 'Past Papers', 'Videos', 'Resources'];
  const courses = useMemo(() => {
    const uniqueCourses = [...new Set(materials.map(m => m.courseId))];
    return ['All', ...uniqueCourses];
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
      const matchesCourse = selectedCourse === 'All' || m.courseId === selectedCourse;
      return matchesSearch && matchesCategory && matchesCourse;
    });
  }, [materials, searchQuery, selectedCategory, selectedCourse]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const getFileIcon = (type: string, isExpanded?: boolean) => {
    switch (type) {
      case 'folder':
        return isExpanded ? <Folder className="w-6 h-6 text-blue-500 fill-current" /> : <Folder className="w-6 h-6 text-amber-500 fill-current" />;
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'doc':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'ppt':
        return <Film className="w-6 h-6 text-orange-500" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-500" />;
      case 'link':
        return <Link className="w-6 h-6 text-blue-400" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Lecture Notes':
        return <BookOpen className="w-4 h-4" />;
      case 'Assignments':
        return <FileQuestion className="w-4 h-4" />;
      case 'Videos':
        return <Video className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Materials</h1>
          <p className="text-gray-500 mt-1">Browse and download course materials</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[160px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          {/* Course Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[120px]"
          >
            {courses.map(course => (
              <option key={course} value={course}>{course === 'All' ? 'All Courses' : course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMaterials.map(material => (
            <div
              key={material.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => material.type === 'folder' ? toggleFolder(material.id) : setPreviewMaterial(material)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-gray-50 rounded-xl">
                  {getFileIcon(material.type)}
                </div>
                {material.type !== 'folder' && (
                  <button 
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-blue-50 rounded-lg transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Simulate download
                      alert(`Downloading: ${material.title}`);
                    }}
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                  </button>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{material.title}</h3>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                  {material.courseId}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(material.uploadedAt)}
                </span>
                {material.fileSize && <span>{material.fileSize}</span>}
                {material.duration && <span>{material.duration}</span>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Size/Duration</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMaterials.map(material => (
                <tr 
                  key={material.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => material.type === 'folder' ? toggleFolder(material.id) : setPreviewMaterial(material)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(material.type, expandedFolders.has(material.id))}
                      <span className="font-medium text-gray-900">{material.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                      {material.courseId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      {getCategoryIcon(material.category)}
                      {material.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {material.fileSize || material.duration || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(material.uploadedAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {material.type !== 'folder' ? (
                      <button 
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Downloading: ${material.title}`);
                        }}
                      >
                        <Download className="w-4 h-4 text-blue-600" />
                      </button>
                    ) : (
                      expandedFolders.has(material.id) ? 
                        <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No materials found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Preview Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setPreviewMaterial(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-xl">
                    {getFileIcon(previewMaterial.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{previewMaterial.title}</h2>
                    <p className="text-sm text-gray-500">{previewMaterial.courseName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewMaterial(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-medium text-gray-900">{previewMaterial.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Course</p>
                  <p className="font-medium text-gray-900">{previewMaterial.courseId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Uploaded</p>
                  <p className="font-medium text-gray-900">{formatDate(previewMaterial.uploadedAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Size</p>
                  <p className="font-medium text-gray-900">{previewMaterial.fileSize || previewMaterial.duration || 'N/A'}</p>
                </div>
              </div>
              
              {previewMaterial.description && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-gray-700">{previewMaterial.description}</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => {
                  alert(`Downloading: ${previewMaterial.title}`);
                  setPreviewMaterial(null);
                }}
                className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              {previewMaterial.type === 'video' && (
                <button
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningMaterials;
