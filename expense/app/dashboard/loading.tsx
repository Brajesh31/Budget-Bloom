export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8" aria-busy="true" aria-label="Loading dashboard">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="h-12 w-56 rounded-lg bg-slate-200" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-28 rounded-xl border bg-white p-5">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="mt-5 h-6 w-32 rounded bg-slate-200" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="h-80 rounded-xl border bg-white" />
          <div className="h-80 rounded-xl border bg-white" />
        </div>
      </div>
      <span className="sr-only">Loading your budgets and expenses...</span>
    </main>
  );
}
