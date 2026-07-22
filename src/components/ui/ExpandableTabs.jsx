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
      width: "1px",
      height: "18px",
      background: "rgba(255, 255, 255, 0.12)",
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
        alignItems: "center",
        gap: "3px",
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
              gap: isActive ? "6px" : "0px",
              borderRadius: "8px",
              padding: isActive ? "6px 12px 6px 8px" : "6px 8px",
              fontSize: "0.84rem",
              fontFamily: "var(--font-poppins)",
              fontWeight: 500,
              cursor: "pointer",
              background: isActive
                ? "rgba(255, 255, 255, 0.08)"
                : "transparent",
              border: isActive
                ? "1px solid rgba(255, 255, 255, 0.15)"
                : "1px solid transparent",
              color: isActive
                ? (activeColor || "#ffffff")
                : "var(--text-secondary)",
              whiteSpace: "nowrap",
              outline: "none",
              userSelect: "none"
            }}
            whileHover={{
              background: isActive
                ? "rgba(255, 255, 255, 0.12)"
                : "rgba(255, 255, 255, 0.05)",
              color: "#ffffff"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isActive ? (activeColor || "var(--accent-cyan)") : "#94a3b8",
                transition: "color 0.2s ease"
              }}
            >
              <Icon size={16} strokeWidth={2} />
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
                    fontSize: "0.82rem",
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
