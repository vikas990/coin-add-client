import React from "react";

const CoinForm = ({
  coinData,
  coinPrice,
  setCoinPrice,
  setCoinName,
  coinName,
  Submit,
}) => {
  return (
    <div>
      <h1>Add Coin</h1>
      <form onSubmit={Submit}>
        <input
          type="text"
          placeholder="Enter Coin Name"
          value={coinName}
          onChange={(e) => setCoinName(e.target.value)}
          className="input"
        />
        <br />
        <input
          type="number"
          placeholder="Enter Price"
          value={coinPrice}
          onChange={(e) => setCoinPrice(e.target.value)}
          className="input"
        />
        <br />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <div>
        <table className="coinTable">
          <tr>
            <th>Coin Name</th>
            <th>Price</th>
            <th>Time</th>
          </tr>
          {coinData.map((data) => (
            <tr>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td>{data.time}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default CoinForm;
