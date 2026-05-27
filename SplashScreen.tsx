import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-sanjy-bg flex items-center justify-center z-50">
      <div className="text-center">
        <div className={`transition-all duration-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src="/Proyek_Baru_163_[62B7F69].png"
            alt="Sanjy"
            className="w-24 h-24 mx-auto mb-6 animate-fade-in"
          />
          <h1 className="text-3xl font-light tracking-wide text-sanjy-primary animate-slide-up">
            Sanjy AI
          </h1>
          <p className="text-sanjy-accent text-sm mt-2 font-light">Chat with Intelligence</p>
        </div>
      </div>
    </div>
  );
}
