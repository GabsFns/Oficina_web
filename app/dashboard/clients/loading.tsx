export default function Loading() {
  return (
    <div className="p-8 space-y-6">

      <div className="h-8 w-48 bg-white/5 rounded animate-pulse"></div>

      <div className="space-y-3">

        {[1,2,3,4,5].map((i) => (
          <div
            key={i}
            className="h-16 bg-[#121214] border border-white/5 rounded-xl animate-pulse"
          />
        ))}

      </div>

    </div>
  );
}