export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0b]">
      <div className="flex flex-col items-center gap-6">

        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-gray-400 text-sm tracking-wide">
          Carregando autenticação...
        </p>

      </div>
    </main>
  );
}