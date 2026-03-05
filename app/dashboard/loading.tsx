export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0b] text-white">

      <main className="flex-1 p-8">
        
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-white/10 rounded animate-pulse mb-3"></div>
          <div className="h-4 w-40 bg-white/5 rounded animate-pulse"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[1,2,3].map((i) => (
            <div
              key={i}
              className="bg-[#121214] border border-white/5 p-6 rounded-[1.5rem]"
            >
              <div className="h-10 w-10 bg-white/10 rounded-xl animate-pulse mb-6"></div>

              <div className="h-3 w-24 bg-white/5 rounded animate-pulse mb-3"></div>

              <div className="h-8 w-16 bg-white/10 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {[1,2].map((col) => (
            <div
              key={col}
              className="bg-[#121214] border border-white/5 rounded-[1.5rem] p-6"
            >
              <div className="h-5 w-40 bg-white/10 rounded animate-pulse mb-6"></div>

              <div className="space-y-3">
                {[1,2,3,4].map((row) => (
                  <div
                    key={row}
                    className="h-14 bg-white/5 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}