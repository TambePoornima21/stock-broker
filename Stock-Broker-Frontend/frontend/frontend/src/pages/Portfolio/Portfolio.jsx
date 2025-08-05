import Navbar from "../../components/Navbar";
import "./Portfolio.css";

function Portfolio() {
  const ownedStocks = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      quantity: 20,
      avgPrice: 165.0,
      currentPrice: 170.25,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      quantity: 15,
      avgPrice: 410.0,
      currentPrice: 420.1,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      quantity: 10,
      avgPrice: 180.0,
      currentPrice: 185.5,
    },
  ];

  const calculateTotalValue = (stock) => stock.quantity * stock.currentPrice;
  const calculateProfitLoss = (stock) =>
    (stock.currentPrice - stock.avgPrice) * stock.quantity;

  const totalPortfolioValue = ownedStocks.reduce(
    (sum, stock) => sum + calculateTotalValue(stock),
    0
  );

  return (
    <div className="portfolio-page">
      <Navbar />
      <div className="page-content">
        <h1>My Portfolio</h1>
        <p>View your owned stocks and their current performance.</p>

        <div className="portfolio-summary card">
          <h2>
            Total Portfolio Value:{" "}
            <span className="total-value">
              ${totalPortfolioValue.toFixed(2)}
            </span>
          </h2>
        </div>

        {ownedStocks.length > 0 ? (
          <div className="owned-stocks-table-container card">
            <table>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>Avg. Price</th>
                  <th>Current Price</th>
                  <th>Total Value</th>
                  <th>P/L</th>
                </tr>
              </thead>
              <tbody>
                {ownedStocks.map((stock) => {
                  const totalValue = calculateTotalValue(stock);
                  const profitLoss = calculateProfitLoss(stock);
                  const profitLossClass =
                    profitLoss >= 0 ? "positive" : "negative";
                  return (
                    <tr key={stock.symbol}>
                      <td>
                        {stock.name} ({stock.symbol})
                      </td>
                      <td>{stock.quantity}</td>
                      <td>${stock.avgPrice.toFixed(2)}</td>
                      <td>${stock.currentPrice.toFixed(2)}</td>
                      <td>${totalValue.toFixed(2)}</td>
                      <td className={profitLossClass}>
                        ${profitLoss.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-stocks">You do not currently own any stocks.</p>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
