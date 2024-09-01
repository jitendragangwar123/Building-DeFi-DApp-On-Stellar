"use client";
import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";

const SwapTokens: React.FC = () => {
  const [secretKey, setSecretKey] = useState<string>("");
  const [destAssetCode, setDestAssetCode] = useState<string>("");
  const [issuerAddress, setIssuerAddress] = useState<string>("");
  const [sendMax, setSendMax] = useState<string>("");
  const [destAmount, setDestAmount] = useState<string>("");
  const [txnHash, setTxnHash] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      secretKey,
      destAssetCode,
      issuerAddress,
      sendMax,
      destAmount,
    };

    try {
      const response = await fetch("https://building-defi-dapp-on-stellar-back-end.vercel.app/swap-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Result:", result.transactionHash);
        setTxnHash(result.transactionHash.hash);
        toast.success(`Swap successful!`);
        setSecretKey("");
        setDestAssetCode("");
        setIssuerAddress("");
        setSendMax("");
        setDestAmount("");
      } else {
        const error = await response.json();
        toast.error(`Error during swap: ${error.error}`);
      }
    } catch (error) {
      toast.error("Error during swap");
      console.error("Error during swap", error);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-200">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/blockchaingif.gif")',
          filter: "blur(6px)",
        }}
      ></div>
      <div className="relative max-w-2xl w-full mx-auto p-8 mt-[90px] mb-[20px] bg-gray-300 bg-opacity-90 rounded-lg shadow-lg">
        <>
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">
            Swap Tokens
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Secret Key
                </label>
                <input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="mt-1 block w-full h-[40px] bg-gray-100 text-black rounded-md px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Destination Asset Code
                </label>
                <input
                  type="text"
                  value={destAssetCode}
                  onChange={(e) => setDestAssetCode(e.target.value)}
                  className="mt-1 block w-full h-[40px] bg-gray-100 text-black rounded-md px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Issuer Address
                </label>
                <input
                  type="text"
                  value={issuerAddress}
                  onChange={(e) => setIssuerAddress(e.target.value)}
                  className="mt-1 block w-full h-[40px] bg-gray-100 text-black rounded-md px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Send Max
                </label>
                <input
                  type="number"
                  value={sendMax}
                  onChange={(e) => setSendMax(e.target.value)}
                  className="mt-1 block w-full h-[40px] bg-gray-100 text-black rounded-md px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  min={0}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Destination Amount
                </label>
                <input
                  type="number"
                  value={destAmount}
                  onChange={(e) => setDestAmount(e.target.value)}
                  className="mt-1 block w-full h-[40px] bg-gray-100 text-black rounded-md px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  min={0}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Swap Tokens
            </button>
          </form>
          {txnHash && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600">
                Transaction Successful!
              </h3>
              <p className="mt-2 text-lg">
                <strong>Transaction Hash:</strong>
                <span className="block truncate text-gray-800">{txnHash}</span>
              </p>
              <button
                onClick={() => txnHash && copyToClipboard(txnHash, "Transaction Hash")}
                className="mt-4 w-full py-2 bg-gray-800 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                Copy Transaction Hash
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default SwapTokens;
