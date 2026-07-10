'use client';

import Image from 'next/image';

interface IPhoneMockupProps {
  image: string;
  title?: string;
  className?: string;
}

export default function IPhoneMockup({ image, title, className = '' }: IPhoneMockupProps) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 'clamp(200px, 55vw, 280px)', height: 'clamp(415px, 114vw, 580px)' }}>
      {/* iPhone Frame */}
      <div 
        className="absolute inset-0 rounded-[3rem] border-8 border-gray-900 bg-black overflow-hidden"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
      >
        {/* Screen */}
        <div className="absolute inset-1 rounded-[2.5rem] overflow-hidden bg-black">
          <Image 
            src={image} 
            alt={title || 'Content preview'} 
            fill 
            className="object-cover object-[25%_center]"
            sizes="280px"
          />
        </div>
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10" />
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full z-10" />
      </div>
    </div>
  );
}
