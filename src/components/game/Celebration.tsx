
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

interface CelebrationProps {
  trigger: boolean;
  duration?: number;
}

export function Celebration({ trigger, duration = 3000 }: CelebrationProps) {
  const [active, setActive] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (trigger) {
      setActive(true);
      
      // Stop the confetti after duration
      const timer = setTimeout(() => {
        setActive(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!active) return null;

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={200}
      recycle={false}
      colors={['#9b87f5', '#8B5CF6', '#7E69AB', '#1EAEDB', '#ea384c']}
    />
  );
}
