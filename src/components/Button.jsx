"use client"

const Button = ({ children, onClick, variant = "primary", size = "medium", disabled = false }) => {
  const baseStyle = {
    border: "none",
    borderRadius: "6px", // Slightly more rounded than typical
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "500", // Not quite bold
    transition: "all 0.25s ease", // Odd timing
    fontFamily: "inherit",
    outline: "none",
  }

  const variants = {
    primary: {
      backgroundColor: "#3498db",
      color: "white",
      boxShadow: "0 3px 6px rgba(52, 152, 219, 0.3)", // Custom shadow
    },
    secondary: {
      backgroundColor: "#95a5a6", // Slightly off-gray
      color: "white",
      boxShadow: "0 2px 4px rgba(149, 165, 166, 0.3)",
    },
    success: {
      backgroundColor: "#27ae60", // Not the typical green
      color: "white",
      boxShadow: "0 3px 5px rgba(39, 174, 96, 0.25)",
    },
    danger: {
      backgroundColor: "#e74c3c",
      color: "white",
      boxShadow: "0 2px 6px rgba(231, 76, 60, 0.3)",
    },
  }

  const sizes = {
    small: {
      padding: "0.4rem 0.8rem", // Slightly awkward padding
      fontSize: "0.85rem",
    },
    medium: {
      padding: "0.6rem 1.2rem",
      fontSize: "1rem",
    },
    large: {
      padding: "0.8rem 1.6rem",
      fontSize: "1.1rem",
    },
  }

  const buttonStyle = {
    ...baseStyle,
    ...variants[variant],
    ...sizes[size],
    opacity: disabled ? 0.6 : 1,
  }

  return (
    <button
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.transform = "translateY(-1px)" // Subtle hover effect
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.transform = "translateY(0)"
        }
      }}
    >
      {children}
    </button>
  )
}

export default Button
