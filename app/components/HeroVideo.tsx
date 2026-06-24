'use client';

export default function HeroVideo() {
  return (
    <>
      {/* Desktop: original hero reel */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/Des/des-21.jpg"
        className="absolute inset-0 w-full h-full object-cover object-top hidden md:block"
      >
        <source src="/videos/hero-dez.mp4" type="video/mp4" />
      </video>

      {/* Mobile: original hero reel */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/Des/des-21.jpg"
        className="absolute inset-0 w-full h-full object-cover object-top md:hidden"
      >
        <source src="/videos/hero-dez.mp4" type="video/mp4" />
      </video>
    </>
  );
}
