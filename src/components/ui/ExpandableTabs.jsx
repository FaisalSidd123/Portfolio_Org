import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const transition = { duration: 0.2, ease: [0.25, 1, 0.5, 1] };

const Separator = () => (
  <div
    aria-hidden="true"
    style={{
      width: "1.2px",
      height: "22px",
      background: "rgba(255, 255, 255, 0.16)",
      margin: "0 6px",
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
            onClick={() => handleSelect(index)}
            layout
            transition={transition}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isActive ? "8px" : "0px",
              borderRadius: "10px",
              padding: isActive ? "7px 14px 7px 10px" : "7px 10px",
              fontSize: "0.88rem",
              fontFamily: "var(--font-poppins)",
              fontWeight: 600,
              cursor: "pointer",
              background: isActive
                ? "rgba(0, 243, 255, 0.15)"
                : "transparent",
              border: isActive
                ? "1px solid rgba(0, 243, 255, 0.35)"
                : "1px solid transparent",
              color: isActive
                ? (activeColor || "var(--accent-cyan)")
                : "#cbd5e1",
              whiteSpace: "nowrap",
              outline: "none",
              userSelect: "none"
            }}
            whileHover={{
              background: isActive
                ? "rgba(0, 243, 255, 0.2)"
                : "rgba(255, 255, 255, 0.08)",
              color: "#ffffff"
            }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isActive ? (activeColor || "var(--accent-cyan)") : "#cbd5e1",
                transition: "color 0.2s ease"
              }}
            >
              <Icon size={18} strokeWidth={2.2} />
            </div>
            <AnimatePresence initial={false} mode="wait">
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={transition}
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                    fontSize: "0.86rem",
                    lineHeight: 1
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
