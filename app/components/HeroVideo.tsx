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
        <source src="/videos/drone-clip-mid.mp4" type="video/mp4" />
      </video>

      {/* Mobile: drone clip mid */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/Des/des-21.jpg"
        className="absolute inset-0 w-full h-full object-cover object-top md:hidden"
      >
        <source src="/videos/drone-clip-mid.mp4" type="video/mp4" />
      </video>
    </>
  );
}
