type SyncStatusProps = {
  syncing: boolean;
  error: string | null;
  lastSync: number;
  onRefresh: () => void;
  visible: boolean;
};

const formatTime = (timestamp: number) => {
  if (!timestamp) {
    return "Never";
  }
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
};

export const SyncStatus = ({ syncing, error, lastSync, onRefresh, visible }: SyncStatusProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
      <p className="text-[#4b5563]">
        {syncing ? "Syncing updates..." : `Last sync: ${formatTime(lastSync)}`}
        {error ? ` • Error: ${error}` : ""}
      </p>
      <button
        type="button"
        onClick={onRefresh}
        className="rounded-2xl bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] px-3 py-1.5 text-xs font-medium text-white"
      >
        Refresh now
      </button>
    </div>
  );
};