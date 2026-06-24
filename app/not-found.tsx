import Link from 'next/link';

const gold = '#c9a96e';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6">
      <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>404</p>
      <h1 className="font-display font-bold italic text-white text-4xl md:text-6xl mb-4">Page Not Found</h1>
      <p className="text-white/40 text-sm md:text-base mb-10 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-8 py-4 text-[12px] font-bold tracking-widest uppercase transition-all hover:opacity-80"
          style={{ backgroundColor: gold, color: '#000' }}
        >
          Go Home
        </Link>
        <Link
          href="/marketplace"
          className="px-8 py-4 text-[12px] font-bold tracking-widest uppercase border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
        >
          View Talent
        </Link>
      </div>
    </div>
  );
}
