"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Counter from "../components/Counter"
import TodoList from "../components/TodoList"
import Card from "../components/Card"
import Button from "../components/Button"

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userName, setUserName] = useState("")
  const [showWelcome, setShowWelcome] = useState(true)

  // Update time every second (slightly inefficient but human-like)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Get user name from localStorage or prompt
  useEffect(() => {
    const savedName = localStorage.getItem("userName")
    if (savedName) {
      setUserName(savedName)
    } else {
      // Slightly annoying popup, but human developers do this
      setTimeout(() => {
        const name = prompt("What's your name? (Optional)")
        if (name && name.trim()) {
          setUserName(name.trim())
          localStorage.setItem("userName", name.trim())
        }
      }, 2000) // Delay for better UX
    }
  }, [])

  const clearUserName = () => {
    localStorage.removeItem("userName")
    setUserName("")
  }

  return (
    <div style={pageStyle}>
      <Header title="My React App 🚀" />

      <main style={mainStyle}>
        {/* Welcome section with slightly awkward styling */}
        {showWelcome && (
          <div style={welcomeStyle}>
            <h2 style={welcomeTitleStyle}>{userName ? `Welcome back, ${userName}! 👋` : "Welcome to My App! 🎉"}</h2>
            <p style={welcomeTextStyle}>
              Current time: {currentTime.toLocaleTimeString()}
              <br />
              <small style={{ color: "#7f8c8d" }}>(Updates every second because why not? 🕐)</small>
            </p>
            <div style={welcomeButtonsStyle}>
              {userName && (
                <Button onClick={clearUserName} variant="secondary" size="small">
                  Not {userName}?
                </Button>
              )}
              <Button
                onClick={() => setShowWelcome(false)}
                variant="danger"
                size="small"
                style={{ marginLeft: userName ? "8px" : "0" }}
              >
                ✕ Close
              </Button>
            </div>
          </div>
        )}

        {/* Main content grid with slightly uneven layout */}
        <div style={contentGridStyle}>
          <div style={leftColumnStyle}>
            <Counter />

            {/* Random tips section */}
            <Card title="💡 Random Dev Tips">
              <ul style={tipListStyle}>
                <li>Always console.log() when debugging 🐛</li>
                <li>CSS Grid is magic ✨</li>
                <li>useState is your friend 🤝</li>
                <li>Don't forget to handle edge cases... sometimes 😅</li>
                <li>Coffee helps with coding ☕</li>
              </ul>
              <p style={tipFooterStyle}>
                <em>Tips refreshed never because I forgot to implement it 🤷‍♂️</em>
              </p>
            </Card>
          </div>

          <div style={rightColumnStyle}>
            <TodoList />

            {/* Stats card with made-up numbers */}
            <Card title="📊 Totally Real Stats">
              <div style={statsGridStyle}>
                <div style={statItemStyle}>
                  <span style={statNumberStyle}>42</span>
                  <span style={statLabelStyle}>Components Built</span>
                </div>
                <div style={statItemStyle}>
                  <span style={statNumberStyle}>∞</span>
                  <span style={statLabelStyle}>Bugs Fixed</span>
                </div>
                <div style={statItemStyle}>
                  <span style={statNumberStyle}>3.14</span>
                  <span style={statLabelStyle}>Coffees Today</span>
                </div>
                <div style={statItemStyle}>
                  <span style={statNumberStyle}>99%</span>
                  <span style={statLabelStyle}>Stack Overflow Usage</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer section */}
        <footer style={footerStyle}>
          <p>
            Made with ❤️ and lots of trial & error •
            <a href="#" style={footerLinkStyle}>
              {" "}
              View Source
            </a>{" "}
            •
            <a href="#" style={footerLinkStyle}>
              {" "}
              Report Bug
            </a>
          </p>
          <p style={footerSmallStyle}>© 2024 My React App • Version 1.0.0-beta-probably-broken</p>
        </footer>
      </main>
    </div>
  )
}

// Styles with intentional human-like inconsistencies
const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#f5f6fa", // Slightly off-white
}

const mainStyle = {
  padding: "1.5rem",
  maxWidth: "1200px",
  margin: "0 auto",
}

const welcomeStyle = {
  backgroundColor: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
  marginBottom: "2rem",
  border: "1px solid #e8e8e8",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  textAlign: "center",
}

const welcomeTitleStyle = {
  margin: "0 0 1rem 0",
  color: "#2c3e50",
  fontSize: "1.6rem", // Slightly odd size
}

const welcomeTextStyle = {
  color: "#34495e",
  marginBottom: "1rem",
  lineHeight: "1.5",
}

const welcomeButtonsStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const contentGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1.2fr", // Slightly uneven columns
  gap: "1.5rem",
  marginBottom: "2rem",
}

const leftColumnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
}

const rightColumnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
}

const tipListStyle = {
  paddingLeft: "1.2rem",
  lineHeight: "1.8",
}

const tipFooterStyle = {
  marginTop: "1rem",
  fontSize: "0.85rem",
  color: "#95a5a6",
}

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
}

const statItemStyle = {
  textAlign: "center",
  padding: "1rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "6px",
  border: "1px solid #e9ecef",
}

const statNumberStyle = {
  display: "block",
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#3498db",
  marginBottom: "0.3rem",
}

const statLabelStyle = {
  fontSize: "0.85rem",
  color: "#7f8c8d",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}

const footerStyle = {
  textAlign: "center",
  padding: "2rem 1rem",
  borderTop: "1px solid #e8e8e8",
  marginTop: "2rem",
  color: "#7f8c8d",
}

const footerLinkStyle = {
  color: "#3498db",
  textDecoration: "none",
  marginLeft: "0.5rem",
}

const footerSmallStyle = {
  fontSize: "0.8rem",
  marginTop: "0.5rem",
  opacity: 0.8,
}

// Media query simulation (not perfect but human-like)
if (window.innerWidth < 768) {
  contentGridStyle.gridTemplateColumns = "1fr"
}

export default HomePage
