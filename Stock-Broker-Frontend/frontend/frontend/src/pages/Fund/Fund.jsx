"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./Fund.css";

function Fund() {
  const [balance, setBalance] = useState(5000.0); // Mock initial balance
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = Number.parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid deposit amount.");
      return;
    }
    setBalance((prevBalance) => prevBalance + amount);
    setMessage(`Successfully deposited $${amount.toFixed(2)}.`);
    setDepositAmount("");
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = Number.parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid withdrawal amount.");
      return;
    }
    if (amount > balance) {
      setMessage("Insufficient funds.");
      return;
    }
    setBalance((prevBalance) => prevBalance - amount);
    setMessage(`Successfully withdrew $${amount.toFixed(2)}.`);
    setWithdrawAmount("");
  };

  return (
    <div className="fund-page">
      <Navbar />
      <div className="page-content">
        <h1>Fund Management</h1>
        <p>Manage your account balance and transactions.</p>

        <div className="current-balance card">
          <h2>
            Current Balance:{" "}
            <span className="balance-amount">${balance.toFixed(2)}</span>
          </h2>
        </div>

        <div className="fund-actions-grid">
          <div className="deposit-section card">
            <h3>Deposit Funds</h3>
            <form onSubmit={handleDeposit}>
              <div className="form-group">
                <label htmlFor="deposit-amount">Amount:</label>
                <input
                  type="number"
                  id="deposit-amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
              <button type="submit">Deposit</button>
            </form>
          </div>

          <div className="withdraw-section card">
            <h3>Withdraw Funds</h3>
            <form onSubmit={handleWithdraw}>
              <div className="form-group">
                <label htmlFor="withdraw-amount">Amount:</label>
                <input
                  type="number"
                  id="withdraw-amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
              <button type="submit" className="withdraw-button">
                Withdraw
              </button>
            </form>
          </div>
        </div>

        {message && <p className="fund-message">{message}</p>}
      </div>
    </div>
  );
}

export default Fund;
