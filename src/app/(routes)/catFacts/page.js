"use client";

import { useState, useEffect } from "react";
import RefreshBtn from "../../../components/RefreshBtn";

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDato = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const json = await response.json();
      setData(json.fact);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDato();
  }, []);

  const handleRefresh = () => {
    fetchDato();
  };

  if (loading) return <div className="text-center text-black">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-4xl mb-4 text-black font-bold">Cat Fact</h1>
        <p className="text-xl mb-4 text-black">{data}</p>
        <RefreshBtn onClick={handleRefresh} />
      </div>
    </div>
  );
};

export default DataFetcher;
