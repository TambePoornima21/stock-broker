"use client"

import { useState, useEffect } from "react"
import Button from "./Button"
import Card from "./Card"

const Counter = () => {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([0])
  const [showHistory, setShowHistory] = useState(false)

  // Slightly buggy feature - sometimes the history gets too long
  useEffect(() => {
    if (history.length > 15) {
      // Arbitrary limit that feels human
      setHistory((prev) => prev.slice(-10)) // Keep last 10, not perfect logic
    }
  }, [history])

  const increment = () => {
    const newCount = count + 1
    setCount(newCount)
    setHistory((prev) => [...prev, newCount])
  }

  const decrement = () => {
    const newCount = count - 1
    setCount(newCount)
    setHistory((prev) => [...prev, newCount])
  }

  const reset = () => {
    setCount(0)
    setHistory([0]) // Reset history too
  }

  // Fun random increment - slightly unpredictable
  const randomIncrement = () => {
    const randomValue = Math.floor(Math.random() * 10) + 1
    const newCount = count + randomValue
    setCount(newCount)
    setHistory((prev) => [...prev, newCount])
  }

  return (
    <Card title="Interactive Counter 🔢">
      <div style={counterDisplayStyle}>
        <span style={countStyle}>{count}</span>
        <div style={subTextStyle}>
          {count === 0 ? "Starting point!" : count > 0 ? `+${count} from start` : `${count} below zero`}
        </div>
      </div>

      <div style={buttonGroupStyle}>
        <Button onClick={decrement} variant="secondary" size="medium">
          ➖ Decrease
        </Button>
        <Button onClick={increment} variant="primary" size="medium">
          ➕ Increase
        </Button>
        <Button onClick={randomIncrement} variant="success" size="medium">
          🎲 Random
        </Button>
      </div>

      <div style={controlsStyle}>
        <Button onClick={reset} variant="danger" size="small">
          🔄 Reset
        </Button>
        <Button
          onClick={() => setShowHistory(!showHistory)}
          variant="secondary"
          size="small"
          style={{ marginLeft: "10px" }} // Inline style mixing
        >
          {showHistory ? "📈 Hide History" : "📊 Show History"}
        </Button>
      </div>

      {showHistory && (
        <div style={historyStyle}>
          <h4 style={{ margin: "1rem 0 0.5rem 0", color: "#34495e" }}>Recent Values:</h4>
          <div style={historyListStyle}>
            {history.slice(-8).map(
              (
                value,
                index, // Show last 8 values
              ) => (
                <span
                  key={index}
                  style={{
                    ...historyItemStyle,
                    backgroundColor: value === count ? "#3498db" : "#ecf0f1",
                    color: value === count ? "white" : "#2c3e50",
                  }}
                >
                  {value}
                </span>
              ),
            )}
          </div>
          <p style={historyInfoStyle}>Total changes: {history.length - 1}</p>
        </div>
      )}
    </Card>
  )
}

// Styles with human-like inconsistencies
const counterDisplayStyle = {
  textAlign: "center",
  margin: "1.5rem 0 2rem 0",
  padding: "1rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  border: "2px dashed #bdc3c7", // Dashed border for fun
}

const countStyle = {
  fontSize: "3.2rem", // Slightly odd size
  fontWeight: "bold",
  color: "#2c3e50",
  display: "block",
  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
}

const subTextStyle = {
  fontSize: "0.9rem",
  color: "#7f8c8d",
  marginTop: "0.5rem",
  fontStyle: "italic",
}

const buttonGroupStyle = {
  display: "flex",
  gap: "0.8rem", // Slightly awkward gap
  justifyContent: "center",
  marginBottom: "1rem",
  flexWrap: "wrap", // Handle mobile better
}

const controlsStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
  paddingTop: "1rem",
  borderTop: "1px solid #ecf0f1",
}

const historyStyle = {
  marginTop: "1.5rem",
  padding: "1rem",
  backgroundColor: "#fdfdfd",
  borderRadius: "6px",
  border: "1px solid #e8e8e8",
}

const historyListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  marginBottom: "0.8rem",
}

const historyItemStyle = {
  padding: "4px 8px",
  borderRadius: "12px", // Pill shape
  fontSize: "0.85rem",
  fontWeight: "500",
  minWidth: "30px",
  textAlign: "center",
}

const historyInfoStyle = {
  fontSize: "0.8rem",
  color: "#95a5a6",
  margin: 0,
  textAlign: "right",
}

export default Counter
