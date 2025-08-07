"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./Fund.css";

function Fund({ balance, deposit, withdraw }) {
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
    deposit(amount);
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
    withdraw(amount);
    setMessage(`Successfully withdrew $${amount.toFixed(2)}.`);
    setWithdrawAmount("");
  };

  return (
    <div className="fund-page">
      <Navbar />
      <div className="page-content">
        <h1>Fund Management</h1>
        <p>Current Balance: <strong>${balance.toFixed(2)}</strong></p>
        <form onSubmit={handleDeposit} style={{ marginBottom: "20px" }}>
          <label>
            Deposit Amount:&nbsp;
            <input
              type="number"
              min="1"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              style={{ width: "100px" }}
            />
          </label>
          <button type="submit">Deposit</button>
        </form>
        <form onSubmit={handleWithdraw}>
          <label>
            Withdraw Amount:&nbsp;
            <input
              type="number"
              min="1"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              style={{ width: "100px" }}
            />
          </label>
          <button type="submit">Withdraw</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Fund;
