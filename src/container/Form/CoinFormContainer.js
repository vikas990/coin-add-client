import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import CoinForm from "../../components/Form/CoinForm";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

const CoinFormContainer = () => {
  // States for storing the values
  const [coinName, setCoinName] = useState("");
  const [coinPrice, setCoinPrice] = useState("");
  const [coinData, setCoinData] = useState([]);
  // Data Fetching function
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/coin`
    );
    setCoinData(response?.data?.result);
  };

  // Running Data Fetching function on first load
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    io(ENDPOINT);
  }, []);

  // submitting data to the backend
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_URL}/coin`,
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
