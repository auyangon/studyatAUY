import { ExternalLink, BookOpen, Search, Star, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Resource {
  name: string;
  icon: string;
  description: string;
  url: string;
  category: string;
  gradient: string;
  hoverGradient: string;
  tag?: string;
}

const resources: Resource[] = [
  {
    name: 'Project Gutenberg',
    icon: 'ðŸ“–',
    description: '70,000+ free eBooks â€” classic literature and academic texts',
    url: 'https://gutenberg.org',
    category: 'eBooks',
    gradient: 'from-rose-50 to-orange-50',
    hoverGradient: 'hover:from-rose-100 hover:to-orange-100',
    tag: 'Popular',
  },
  {
    name: 'OpenStax',
    icon: 'ðŸ“š',
    description: 'Free, peer-reviewed college textbooks across disciplines',
    url: 'https://openstax.org',
    category: 'Textbooks',
    gradient: 'from-blue-50 to-indigo-50',
    hoverGradient: 'hover:from-blue-100 hover:to-indigo-100',
    tag: 'Recommended',
  },
  {
    name: 'Khan Academy',
    icon: 'ðŸŽ“',
    description: 'Free video lessons in math, science, humanities & more',
    url: 'https://khanacademy.org',
    category: 'Video Courses',
    gradient: 'from-emerald-50 to-teal-50',
    hoverGradient: 'hover:from-emerald-100 hover:to-teal-100',
    tag: 'Essential',
  },
  {
    name: 'Open Yale Courses',
    icon: 'ðŸ›ï¸',
    description: 'Free access to Yale\'s introductory courses and lectures',
    url: 'https://oyc.yale.edu',
    category: 'University Courses',
    gradient: 'from-sky-50 to-blue-50',
    hoverGradient: 'hover:from-sky-100 hover:to-blue-100',
  },
  {
    name: 'MIT OpenCourseWare',
    icon: 'ðŸ”¬',
    description: 'Free MIT course materials for virtually every subject',
    url: 'https://ocw.mit.edu',
    category: 'University Courses',
    gradient: 'from-purple-50 to-violet-50',
    hoverGradient: 'hover:from-purple-100 hover:to-violet-100',
    tag: 'Premium',
  },
  {
    name: 'JSTOR',
    icon: 'ðŸ“„',
    description: 'Academic journals, books & primary sources (free account)',
    url: 'https://jstor.org',
    category: 'Journals',
    gradient: 'from-amber-50 to-yellow-50',
    hoverGradient: 'hover:from-amber-100 hover:to-yellow-100',
  },
  {
    name: 'Google Scholar',
    icon: 'ðŸ”',
    description: 'Search scholarly literature across all disciplines',
    url: 'https://scholar.google.com',
    category: 'Search',
    gradient: 'from-cyan-50 to-sky-50',
    hoverGradient: 'hover:from-cyan-100 hover:to-sky-100',
    tag: 'Essential',
  },
  {
    name: 'Internet Archive',
    icon: 'ðŸŒ',
    description: 'Millions of free books, movies, software, and more',
    url: 'https://archive.org',
    category: 'Archive',
    gradient: 'from-fuchsia-50 to-pink-50',
    hoverGradient: 'hover:from-fuchsia-100 hover:to-pink-100',
  },
];

const researchTools = [
  { name: 'Zotero', url: 'https://zotero.org', desc: 'Free reference manager' },
  { name: 'Grammarly', url: 'https://grammarly.com', desc: 'Writing assistant' },
  { name: 'Purdue OWL', url: 'https://owl.purdue.edu', desc: 'Citation guidelines' },
  { name: 'Wolfram Alpha', url: 'https://wolframalpha.com', desc: 'Computational engine' },
];

export default function Library() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(resources.map((r) => r.category)))];

  const filtered = resources.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === 'All' || r.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#0d3028] p-8 sm:p-10">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-light blur-[80px]" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-3xl">
                ðŸ“š
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                  AUY Digital Library
                </h1>
                <p className="text-white/60 text-sm mt-0.5">
                  Free academic resources for liberal arts and science students
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First Year Banner */}
      <div className="card-premium p-5 flex items-center gap-4 bg-gradient-to-r from-accent/5 to-amber-50/50 border-accent/20 animate-fade-in stagger-1" style={{ opacity: 0 }}>
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
          â­
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            Recommended for First-Year Students
            <Sparkles className="w-4 h-4 text-accent" />
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Start with Khan Academy and OpenStax for foundational courses, then use Google Scholar for research papers.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 animate-fade-in stagger-2" style={{ opacity: 0 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-white border border-border text-text-secondary hover:border-primary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((resource, i) => (
          <a
            key={resource.name}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative bg-white rounded-[20px] border border-border-light p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 hover:scale-[1.02] hover:border-transparent animate-fade-in stagger-${(i % 8) + 1}`}
            style={{ opacity: 0 }}
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${resource.gradient} ${resource.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative z-10">
              {/* Tag */}
              {resource.tag && (
                <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-lg bg-accent/10 text-accent text-[10px] font-bold uppercase">
                  {resource.tag}
                </span>
              )}

              {/* Icon */}
              <div className="text-[48px] mb-4 transition-transform duration-300 group-hover:scale-110">
                {resource.icon}
              </div>

              {/* Category */}
              <span className="inline-block px-2.5 py-0.5 rounded-lg bg-surface text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 group-hover:bg-white/60">
                {resource.category}
              </span>

              {/* Name */}
              <h3 className="text-base font-bold text-text-primary mb-1.5">
                {resource.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {resource.description}
              </p>

              {/* Visit Link */}
              <div className="flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all">
                Visit
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Research Tools */}
      <div className="animate-fade-in" style={{ opacity: 0, animationDelay: '0.4s', animationFillMode: 'forwards' }}>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold text-text-primary">Research Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {researchTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-premium p-4 flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <BookOpen className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{tool.name}</p>
                <p className="text-xs text-text-muted">{tool.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Citation Help */}
      <div className="animate-fade-in" style={{ opacity: 0, animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        <div className="card-premium p-6 bg-gradient-to-r from-surface to-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-2xl flex-shrink-0">
              âœï¸
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary mb-1">Citation Help</h3>
              <p className="text-sm text-text-muted mb-3">
                Need help citing sources? Use these guides for proper academic citations.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'APA Style', url: 'https://apastyle.apa.org' },
                  { label: 'MLA Style', url: 'https://style.mla.org' },
                  { label: 'Chicago Style', url: 'https://www.chicagomanualofstyle.org' },
                  { label: 'Citation Generator', url: 'https://www.citationmachine.net' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-primary/5 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

