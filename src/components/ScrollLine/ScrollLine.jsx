// src/components/ScrollLine.jsx

const ScrollLine = ({
  progress,
  side = "left",
  color = "#6366f1",
  width = "3px",
}) => (
  <div
    style={{
      position: "fixed",
      [side]: 0,
      top: 0,
      width: width,
      height: "100vh",
      background: "rgba(0,0,0,0.08)",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        width: "100%",
        height: `${progress}%`,
        background: color,
        transition: "height 0.1s ease",
      }}
    />
  </div>
)

export default ScrollLine