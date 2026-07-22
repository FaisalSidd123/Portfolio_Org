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
    paddingLeft: ".4rem",
    paddingRight: ".4rem",
  },
  animate: (isSelected) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "0.6rem" : ".4rem",
    paddingRight: isSelected ? "0.8rem" : ".4rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.05, type: "spring", bounce: 0, duration: 0.5 };

const Separator = () => (
  <div
    aria-hidden="true"
    style={{
      width: "1.2px",
      height: "22px",
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
        gap: "6px",
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
              borderRadius: "10px",
              paddingTop: "0.35rem",
              paddingBottom: "0.35rem",
              fontSize: "0.88rem",
              fontFamily: "var(--font-poppins)",
              fontWeight: 600,
              cursor: "pointer",
              background: isActive
                ? "rgba(0, 243, 255, 0.12)"
                : "transparent",
              border: isActive
                ? "1px solid rgba(0, 243, 255, 0.35)"
                : "1px solid transparent",
              color: isActive
                ? (activeColor || "var(--accent-cyan)")
                : "var(--text-secondary)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
              outline: "none",
              boxShadow: isActive
                ? "0 0 12px rgba(0, 243, 255, 0.25)"
                : "none"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: isActive
                  ? "rgba(0, 243, 255, 0.22)"
                  : "rgba(255, 255, 255, 0.05)",
                color: isActive ? "var(--accent-cyan)" : "#cbd5e1",
                transition: "all 0.25s ease",
                boxShadow: isActive
                  ? "0 0 8px rgba(0, 243, 255, 0.4)"
                  : "none"
              }}
            >
              <Icon size={16} strokeWidth={2.2} />
            </div>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    marginLeft: "4px"
                  }}
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
