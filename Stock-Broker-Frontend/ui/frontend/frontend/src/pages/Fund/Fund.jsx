"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "./Fund.css";

function Fund() {
  const userId = 1; // Replace this with actual logged-in user ID
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");

  // 🔁 Fetch balance on load
  useEffect(() => {
    axios
      .get(`http://localhost:8080/funds/balance/${userId}`)
      .then((res) => {
        setBalance(res.data);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to fetch balance.");
      });
  }, []);

  // 💰 Deposit Handler
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
        setBalance((prev) => prev + amount);
        setMessage(`Successfully deposited $${amount.toFixed(2)}.`);
        setDepositAmount("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Deposit failed.");
      });
  };

  // 🏧 Withdraw Handler
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
        setBalance((prev) => prev - amount);
        setMessage(`Successfully withdrew $${amount.toFixed(2)}.`);
        setWithdrawAmount("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Withdrawal failed or insufficient balance.");
      });
  };

  return (
    <div className="fund-page">
      <Navbar />
      <div className="page-content">
        <h1>Fund Management</h1>
        <p>Current Balance: <strong>${balance.toFixed(2)}</strong></p>

        <form onSubmit={handleDeposit} className="fund-form">
          <label>
            Deposit Amount:
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              required
            />
          </label>
          <button type="submit">Deposit</button>
        </form>

        <form onSubmit={handleWithdraw} className="fund-form">
          <label>
            Withdraw Amount:
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              required
            />
          </label>
          <button type="submit">Withdraw</button>
        </form>

        {message && <p className="fund-message">{message}</p>}
      </div>
    </div>
  );
}

export default Fund;
