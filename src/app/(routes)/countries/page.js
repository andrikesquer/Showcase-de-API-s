"use client";

import { useState, useEffect } from "react";
import RefreshBtn from "../../../components/RefreshBtn";

export default function RandomCountry() {
  const [pais, setPais] = useState(null);

  useEffect(() => {
    const fetchPais = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const paisAleatorio = data[Math.floor(Math.random() * data.length)];

        const paisData = {
          name: paisAleatorio.name.common,
          capital: paisAleatorio.capital ? paisAleatorio.capital[0] : "N/A",
          flag: paisAleatorio.flag,
          language: paisAleatorio.languages
            ? Object.values(paisAleatorio.languages)[0]
            : "N/A",
          googleMaps: paisAleatorio.maps.googleMaps,
        };

        setPais(paisData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchPais();
  }, []);

  if (!pais) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-4xl mb-4 text-black">Random Country</h1>
        <div className="text-6xl mb-4">{pais.flag}</div>
        <div className="text-2xl mb-2 text-black">
          <strong>Country:</strong> {pais.name}
        </div>
        <div className="text-2xl mb-2 text-black">
          <strong>Capital:</strong> {pais.capital}
        </div>
        <div className="text-2xl mb-2 text-black">
          <strong>Language:</strong> {pais.language}
        </div>
        <a
          href={pais.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-2xl hover:underline"
        >
          View on Google Maps
        </a>
        <RefreshBtn onClick={() => setPais(null)} />
      </div>
    </div>
  );
}
