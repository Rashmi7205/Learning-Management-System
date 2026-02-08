import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailsLoader() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      {/* Skeleton Header */}
      <div className="h-20 border-b border-white/5 animate-pulse bg-white/5" />

      {/* Hero Skeleton */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-4 w-32 bg-white/10 rounded-full" />
              <Skeleton className="h-16 w-3/4 bg-white/10 rounded-2xl" />
              <Skeleton className="h-24 w-full bg-white/10 rounded-2xl" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 bg-white/10" />
                  <Skeleton className="h-4 w-32 bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-8 border-b border-white/10 pb-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-20 bg-white/10" />
              ))}
            </div>
            <Skeleton className="aspect-video w-full rounded-3xl bg-white/5 border border-white/10" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-[500px] w-full rounded-[32px] bg-white/5 border border-white/10" />
          </div>
        </div>
      </main>
    </div>
  );
}
