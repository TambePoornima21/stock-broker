const Header = ({ title }) => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <nav>
        <ul style={navStyle}>
          <li>
            <a href="#home" style={linkStyle}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" style={{ ...linkStyle, marginLeft: "18px" }}>
              About
            </a>
          </li>{" "}
          {/* Slightly off spacing */}
          <li>
            <a href="#contact" style={{ ...linkStyle, marginLeft: "15px" }}>
              Contact
            </a>
          </li>{" "}
          {/* Different spacing again */}
        </ul>
      </nav>
    </header>
  )
}

const headerStyle = {
  backgroundColor: "#2c3e50", // Slightly different shade than typical
  color: "white",
  padding: "1.2rem 1rem", // Uneven padding
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)", // Added shadow for depth
}

const titleStyle = {
  margin: 0,
  fontSize: "1.8rem", // Not a round number
  fontWeight: "600", // Not quite bold, not quite normal
  letterSpacing: "0.5px",
}

const navStyle = {
  listStyle: "none",
  display: "flex",
  gap: "0.8rem", // Slightly awkward gap
  margin: 0,
  padding: 0,
}

const linkStyle = {
  color: "#ecf0f1",
  textDecoration: "none",
  padding: "8px 12px", // Inconsistent with other paddings
  borderRadius: "3px",
  transition: "background-color 0.2s ease", // Shorter transition
  fontSize: "0.95rem",
}

export default Header
