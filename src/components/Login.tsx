import { useState } from "react";

interface LoginProps {
  error: string | null;
  loading: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
}

export function Login({ error, loading, onSubmit }: LoginProps) {
  const [email, setEmail] = useState("chanmyae.au.edu.mm@gmail.com");
  const [password, setPassword] = useState("student123");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--portal-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-drift absolute left-[-6rem] top-[-6rem] h-80 w-80 rounded-full bg-[#88d8c0]/18 blur-3xl" />
        <div className="animate-float-delayed absolute bottom-[-6rem] right-[-4rem] h-[26rem] w-[26rem] rounded-full bg-[#d4b28c]/18 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_31rem]">
        <section className="feature-panel relative rounded-[44px] px-8 py-10 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-40 w-40 rounded-full bg-white/24 blur-3xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#173328]/62">AUY Student Portal</p>
          <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#173328] sm:text-5xl lg:text-[4.5rem] lg:leading-[0.95]">
            American University of Yangon
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#173328]/72 sm:text-lg">
            A premium, responsive student workspace for courses, attendance, deadlines, analytics, and live Google Sheet updates.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium text-[#173328]/74">
            {[
              "30 second sync cadence",
              "Email and password access",
              "Seafoam and pearl AUY UI",
            ].map((item) => (
              <span key={item} className="rounded-full border border-white/50 bg-white/34 px-4 py-2 backdrop-blur-xl">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-14 max-w-xl rounded-[30px] border border-white/50 bg-white/34 px-6 py-6 backdrop-blur-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#173328]/56">Portal Experience</p>
            <p className="mt-4 text-lg font-semibold text-[#173328]">Calm, premium widgets for study life at AUY</p>
            <p className="mt-3 text-sm leading-7 text-[#173328]/66">
              Review your courses, announcements, deadlines, and attendance from a single responsive workspace designed to feel cleaner and more elevated.
            </p>
          </div>
        </section>

        <section className="glass-panel rounded-[38px] bg-white/88 p-8 shadow-[0_30px_70px_rgba(30,60,44,0.14)] sm:p-10">
          <p className="eyebrow">Sign In</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Access your AUY dashboard</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Use your portal email and password to load your personalized record from Google Sheets.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              void onSubmit(email, password);
            }}
          >
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                aria-label="Email"
                className="premium-input mt-2"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@au.edu.mm"
                type="email"
                value={email}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                aria-label="Password"
                className="premium-input mt-2"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                type="password"
                value={password}
              />
            </label>

            <div className="widget-panel px-5 py-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Test account</p>
              <p className="mt-2">chanmyae.au.edu.mm@gmail.com / student123</p>
            </div>

            {error ? (
              <div className="rounded-[20px] bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
            ) : null}

            <button className="primary-button flex w-full items-center justify-center gap-3 px-6 py-4 text-base" disabled={loading} type="submit">
              {loading ? <span className="sync-spinner border-white/30 border-t-white" /> : null}
              Sign In
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}