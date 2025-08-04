const Card = ({ children, title, className = "" }) => {
  return (
    <div style={cardStyle} className={className}>
      {title && <h3 style={titleStyle}>{title}</h3>}
      <div style={contentStyle}>{children}</div>
    </div>
  )
}

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "1.5rem",
  margin: "1rem 0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", // Softer shadow
  border: "1px solid #e8e8e8", // Very subtle border
  transition: "box-shadow 0.3s ease, transform 0.2s ease",
}

const titleStyle = {
  margin: "0 0 1rem 0",
  color: "#2c3e50",
  fontSize: "1.3rem", // Slightly odd size
  fontWeight: "600",
  borderBottom: "2px solid #3498db", // Underline accent
  paddingBottom: "0.5rem",
  display: "inline-block",
}

const contentStyle = {
  lineHeight: "1.6",
}

export default Card
