import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import CoinForm from "../../components/Form/CoinForm";

const CoinFormContainer = () => {
  const [coinName, setCoinName] = useState("");
  const [coinPrice, setCoinPrice] = useState("");
  const [coinData, setCoinData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://coin-add-backend.herokuapp.com/api/coin"
    );
    setCoinData(response?.data?.result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://coin-add-backend.herokuapp.com/api/coin",
        {
          coinName,
          coinPrice,
        }
      );
      if (response.status === 200) {
        swal.fire("Success", response?.data?.message, "success");
        fetchData();
      }
    } catch (err) {
      if (err?.response?.data?.length > 0) {
        swal.fire("Error", "Coin Already Exist!!", "error");
      } else {
        swal.fire("Error", err?.response?.data?.message, "error");
      }
    }
  };
  return (
    <>
      <CoinForm
        coinData={coinData}
        setCoinPrice={setCoinPrice}
        coinPrice={coinPrice}
        setCoinName={setCoinName}
        coinName={coinName}
        Submit={Submit}
      />
    </>
  );
};

export default CoinFormContainer;
