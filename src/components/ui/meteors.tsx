import { cn } from "../../lib/utils";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorStyles = React.useMemo(() => {
    return new Array(number || 20).fill(true).map((_, idx) => ({
      top: Math.floor(Math.random() * -20) + "%",
      left: Math.floor(-20 + (idx * (140 / (number || 20))) + Math.random() * (140 / (number || 20))) + "%",
      animationDelay: (Math.random() * 8 - 4) + "s",
      animationDuration: Math.floor(Math.random() * (35 - 15) + 15) + "s",
    }));
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-white shadow-[0_0_0_1px_#ffffff10] rotate-[290deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#ffffff] before:to-transparent",
            className
          )}
          style={style}
        ></span>
      ))}
    </>
  );
};
