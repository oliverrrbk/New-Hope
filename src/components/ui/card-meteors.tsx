import { cn } from "../../lib/utils";
import React from "react";

export const CardMeteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorStyles = React.useMemo(() => {
    return new Array(number || 20).fill(true).map(() => ({
      top: Math.floor(Math.random() * 100) - 100 + "px",
      // Start heavily staggered across X-axis, plus they travel randomly.
      left: Math.floor(Math.random() * (1200 - -200) + -200) + "px",
      // Random delay across a massive 15 seconds so they never spawn all at once!
      animationDelay: Math.random() * 15 + "s",
      animationDuration: Math.floor(Math.random() * (40 - 18) + 18) + "s",
    }));
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-card absolute top-[-50px] h-[2px] w-[2px] rounded-[9999px] bg-white shadow-[0_0_0_2px_rgba(251,191,36,0.6)] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[70px] before:h-[1.5px] before:bg-gradient-to-r before:from-[#fbbf24] before:to-transparent",
            className
          )}
          style={style}
        ></span>
      ))}
    </>
  );
};
