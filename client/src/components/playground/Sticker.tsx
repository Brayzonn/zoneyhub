import { useRef, ReactNode, MouseEvent, RefObject } from "react";
import { motion } from "framer-motion";

/* Movable piece: spring drop-in, momentum-free drag, click-through only
   when the pointer didn't drag */
const Sticker = ({
  spot,
  index,
  constraintsRef,
  duckWhileCycling = false,
  children,
}: {
  spot: { left: string; top: string; rotation: number };
  index: number;
  constraintsRef: RefObject<HTMLDivElement | null>;
  duckWhileCycling?: boolean;
  children: ReactNode;
}) => {
  const dragged = useRef(false);

  const suppressClickAfterDrag = (e: MouseEvent<HTMLDivElement>) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      data-sticker
      className={`absolute z-[110]${
        duckWhileCycling ? " group-data-[cycling=true]:z-[70]" : ""
      }`}
      style={{
        left: spot.left,
        top: spot.top,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.15}
        dragConstraints={constraintsRef}
        onDragStart={() => (dragged.current = true)}
        onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
        onClickCapture={suppressClickAfterDrag}
        initial={{ scale: 2.5, opacity: 0, rotate: spot.rotation }}
        animate={{ scale: 1, opacity: 1, rotate: spot.rotation }}
        whileDrag={{ scale: 1.05, zIndex: 120 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
          delay: 0.15 + index * 0.12,
        }}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Sticker;
