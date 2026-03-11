import { useEffect, useState } from "react";

interface ChangePasswordProps {
  onClose: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => Promise<void>;
  open: boolean;
}

export function ChangePassword({ onClose, onSubmit, open }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError(null);
      setLoading(false);
      setSuccess(null);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/28 px-4 py-6 backdrop-blur-sm">
      <div aria-modal="true" className="glass-panel w-full max-w-lg rounded-[32px] bg-white/92 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)]" role="dialog">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Settings</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Change Password</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Confirm your current password before saving a new one to the Users sheet.
            </p>
          </div>
          <button aria-label="Close password modal" className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] bg-white/70 text-lg" onClick={onClose} type="button">
            ×
          </button>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setError(null);
            setSuccess(null);

            if (newPassword.length < 6) {
              setError("Use at least 6 characters for the new password.");
              return;
            }

            if (newPassword !== confirmPassword) {
              setError("The new passwords do not match.");
              return;
            }

            setLoading(true);

            try {
              await onSubmit(currentPassword, newPassword);
              setSuccess("Password updated successfully.");
              window.setTimeout(onClose, 900);
            } catch (submissionError) {
              setError(submissionError instanceof Error ? submissionError.message : "Unable to update password.");
            } finally {
              setLoading(false);
            }
          }}
        >
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Current Password</span>
            <input
              className="premium-input mt-2"
              onChange={(event) => setCurrentPassword(event.target.value)}
              type="password"
              value={currentPassword}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">New Password</span>
            <input
              className="premium-input mt-2"
              onChange={(event) => setNewPassword(event.target.value)}
              type="password"
              value={newPassword}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Confirm New Password</span>
            <input
              className="premium-input mt-2"
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              value={confirmPassword}
            />
          </label>

          {error ? <div className="rounded-[20px] bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
          {success ? <div className="rounded-[20px] bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

          <div className="flex flex-wrap gap-3">
            <button className="primary-button flex-1 px-6 py-4 text-sm" disabled={loading} type="submit">
              {loading ? "Saving..." : "Save Password"}
            </button>
            <button className="secondary-button px-6 py-4 text-sm" onClick={onClose} type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}