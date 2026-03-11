interface SyncStatusProps {
  lastSync: number | null;
  lastUpdatedAt?: number;
  onRefresh: () => Promise<void>;
  syncing: boolean;
}

function formatTime(value?: number | null) {
  if (!value) {
    return "Waiting for first sync";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  }).format(new Date(value));
}

export function SyncStatus({ lastSync, lastUpdatedAt, onRefresh, syncing }: SyncStatusProps) {
  return (
    <div className="glass-panel animate-fade-up flex flex-col gap-3 rounded-[26px] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="eyebrow">Sync Status</p>
        <p className="mt-2 text-sm font-medium text-slate-900">Last synced {formatTime(lastSync)}</p>
        <p className="mt-1 text-xs text-slate-500">Sheet updated {formatTime(lastUpdatedAt)}</p>
      </div>
      <button className="secondary-button inline-flex items-center gap-2 px-5 py-3 text-sm" onClick={() => void onRefresh()} type="button">
        {syncing ? <span className="sync-spinner" /> : null}
        Refresh Now
      </button>
    </div>
  );
}