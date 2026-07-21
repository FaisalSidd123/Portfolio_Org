import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

// Lightweight utility to join class names (replaces shadcn's `cn`)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

const Separator = () => (
  <div
    aria-hidden="true"
    style={{
      width: "1.2px",
      height: "24px",
      background: "var(--border-color)",
      margin: "0 4px",
      flexShrink: 0,
    }}
  />
);

export function ExpandableTabs({
  tabs,
  className,
  activeColor,
  onChange,
}) {
  const [selected, setSelected] = React.useState(null);
  const outsideClickRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index) => {
    setSelected(index);
    onChange?.(index);
  };

  return (
    <div
      ref={outsideClickRef}
      className={cn("expandable-tabs", className)}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isActive = selected === index;

        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isActive}
            onClick={() => handleSelect(index)}
            transition={transition}
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "8px",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              fontSize: "0.85rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              cursor: "pointer",
              background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
              border: "none",
              color: isActive
                ? (activeColor || "var(--accent-cyan)")
                : "var(--text-secondary)",
              transition: "background 0.2s ease, color 0.2s ease",
              whiteSpace: "nowrap",
              letterSpacing: "0.04em",
              outline: "none",
            }}
          >
            <Icon size={18} />
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  style={{ overflow: "hidden", display: "inline-block" }}
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
