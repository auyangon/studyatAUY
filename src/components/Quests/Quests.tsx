import { Swords, CheckCircle2, Clock, AlertTriangle, Trophy, Target, Zap } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

export default function Quests() {
  const { quests, studentQuests, currentStudent, loading } = useStudent();

  if (loading) return <LoadingSpinner message="Loading quests..." />;

  const myQuests = studentQuests.filter(
    (sq) => sq.StudentID === currentStudent?.StudentID
  );

  const questsWithStatus = quests.map((q) => {
    const myQ = myQuests.find((mq) => mq.QuestID === q.QuestID);
    return { ...q, myStatus: myQ?.Status || 'Not Started', myScore: myQ?.Score, myFeedback: myQ?.Feedback };
  });

  const completed = questsWithStatus.filter(
    (q) => q.myStatus.toLowerCase() === 'completed' || q.myStatus.toLowerCase() === 'graded'
  );
  const inProgress = questsWithStatus.filter(
    (q) => q.myStatus.toLowerCase() === 'in progress' || q.myStatus.toLowerCase() === 'submitted'
  );
  const pending = questsWithStatus.filter(
    (q) => q.myStatus.toLowerCase() === 'not started' || q.myStatus.toLowerCase() === 'pending'
  );
  const totalPoints = completed.reduce((s, q) => s + (parseInt(q.myScore || '0') || 0), 0);
  const maxPoints = quests.reduce((s, q) => s + (parseInt(q.Points) || 0), 0);

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'completed' || s === 'graded')
      return { bg: 'bg-success/10 text-success', icon: CheckCircle2, text: 'Completed' };
    if (s === 'in progress' || s === 'submitted')
      return { bg: 'bg-info/10 text-info', icon: Clock, text: 'In Progress' };
    if (s === 'overdue')
      return { bg: 'bg-danger/10 text-danger', icon: AlertTriangle, text: 'Overdue' };
    return { bg: 'bg-surface text-text-muted', icon: Target, text: 'Not Started' };
  };

  const getTypeIcon = (type: string) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('assignment') || t.includes('homework')) return 'ðŸ“';
    if (t.includes('quiz') || t.includes('test')) return 'ðŸ“‹';
    if (t.includes('project')) return 'ðŸš€';
    if (t.includes('lab')) return 'ðŸ”¬';
    if (t.includes('essay') || t.includes('paper')) return 'âœï¸';
    return 'âš¡';
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2">
          <Swords className="w-8 h-8 text-primary" />
          Quests
        </h1>
        <p className="text-text-secondary mt-1">Track your assignments, projects, and challenges</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Points', value: totalPoints, max: maxPoints, icon: Trophy, color: 'text-accent' },
          { label: 'Completed', value: completed.length, icon: CheckCircle2, color: 'text-success' },
          { label: 'In Progress', value: inProgress.length, icon: Zap, color: 'text-info' },
          { label: 'Pending', value: pending.length, icon: Target, color: 'text-text-muted' },
        ].map((s, i) => (
          <div key={s.label} className={`card-premium p-4 animate-fade-in stagger-${i + 1}`} style={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs font-medium text-text-muted">{s.label}</span>
            </div>
            <p className="font-mono text-2xl font-bold text-text-primary">
              {s.value}
              {s.max !== undefined && (
                <span className="text-sm text-text-muted font-normal">/{s.max}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Quest List */}
      <div className="space-y-3">
        {questsWithStatus.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Swords className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No quests available</p>
          </div>
        ) : (
          questsWithStatus.map((quest, i) => {
            const badge = getStatusBadge(quest.myStatus);
            const StatusIcon = badge.icon;
            return (
              <div
                key={quest.QuestID}
                className={`card-premium p-5 animate-fade-in stagger-${(i % 8) + 1}`}
                style={{ opacity: 0 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-2xl flex-shrink-0">
                    {getTypeIcon(quest.Type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="text-base font-bold text-text-primary">{quest.Title}</h3>
                      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${badge.bg}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {badge.text}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted line-clamp-1 mb-2">{quest.Description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                      <span className="font-medium">{quest.CourseName}</span>
                      <span>Â·</span>
                      <span className="font-mono font-bold text-accent">{quest.Points} pts</span>
                      <span>Â·</span>
                      <span>Due {quest.Deadline}</span>
                      {quest.myScore && (
                        <>
                          <span>Â·</span>
                          <span className="text-success font-bold">Score: {quest.myScore}</span>
                        </>
                      )}
                    </div>
                    {quest.myFeedback && (
                      <p className="mt-2 text-xs text-info bg-info/5 px-3 py-2 rounded-xl">
                        ðŸ’¬ {quest.myFeedback}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

