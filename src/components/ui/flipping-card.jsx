function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 360,
  width = 330,
  style = {}
}) {
  return (
    <div
      className={cn("flipping-card-container", className)}
      style={{
        perspective: "1000px",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        maxWidth: "100%",
        ...style
      }}
    >
      <div
        className="flipping-card-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          background: "var(--bg-card)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Face */}
        <div
          className="flipping-card-front"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              transform: "translateZ(50px) scale(0.96)",
              width: "100%",
              height: "100%",
            }}
          >
            {frontContent}
          </div>
        </div>

        {/* Back Face */}
        <div
          className="flipping-card-back"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            background: "#0c0c12",
            color: "var(--text-primary)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "1px solid var(--border-color)",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              transform: "translateZ(50px) scale(0.96)",
              width: "100%",
              height: "100%",
            }}
          >
            {backContent}
          </div>
        </div>
      </div>

      <style>{`
        .flipping-card-container:hover .flipping-card-inner {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
