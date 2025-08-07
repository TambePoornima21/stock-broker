"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "./Fund.css";

function Fund() {
  const userId = 1; // TODO: Replace with actual user ID from auth context or props
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");

  // Fetch current balance on mount
  useEffect(() => {
    axios
      .get(`http://localhost:8080/funds/balance/${userId}`)
      .then((response) => {
        setBalance(response.data);
      })
      .catch((error) => {
        setMessage("Failed to fetch balance");
        console.error(error);
      });
  }, []);

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid deposit amount.");
      return;
    }

    axios
      .post(`http://localhost:8080/funds/deposit`, null, {
        params: { userId, amount },
      })
      .then(() => {
        setBalance((prevBalance) => prevBalance + amount);
        setMessage(`Successfully deposited $${amount.toFixed(2)}.`);
        setDepositAmount("");
      })
      .catch((error) => {
        setMessage("Deposit failed.");
        console.error(error);
      });
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid withdrawal amount.");
      return;
    }

    axios
      .post(`http://localhost:8080/funds/withdraw`, null, {
        params: { userId, amount },
      })
      .then(() => {
        setBalance((prevBalance) => prevBalance - amount);
        setMessage(`Successfully withdrew $${amount.toFixed(2)}.`);
        setWithdrawAmount("");
      })
      .catch((error) => {
        setMessage("Withdrawal failed or insufficient balance.");
        console.error(error);
      });
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
