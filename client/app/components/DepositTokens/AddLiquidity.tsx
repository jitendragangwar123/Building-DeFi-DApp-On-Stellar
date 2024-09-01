"use client";
import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";

const AddLiquidity: React.FC = () => {
  const [secretKey, setSecretKey] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>("");
  const [amountA, setAmountA] = useState<string>("");
  const [amountB, setAmountB] = useState<string>("");
  const [lpId, setLpId] = useState<string | null>(null);
  const [txnHash, setTxnHash] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      secretKey,
      tokenName,
      amountA,
      amountB,
    };

    try {
      const response = await fetch("https://building-defi-dapp-on-stellar-back-end.vercel.app/deposit-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("LPId:", result.liquidityPoolId);
        console.log("TxnHash:", result.transactionHash.hash);
        setLpId(result.liquidityPoolId);
        setTxnHash(result.transactionHash.hash);
        toast.success(`Deposit successful!`);
        setSecretKey("");
        setTokenName("");
        setAmountA("");
        setAmountB("");
      } else {
        const error = await response.json();
        toast.error(`Error during deposit tokens: ${error.error}`);
      }
    } catch (error) {
      toast.error("Error during deposit tokens");
      console.error("Error during deposit tokens", error);
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
            Add Liquidity
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
                  Token Name
                </label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="mt-1 block w-full h-[40px] bg-gray-100 text-black rounded-md px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Amount A
                </label>
                <input
                  type="number"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                  className="mt-1 block w-full h-[40px] bg-gray-100 text-black rounded-md px-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  min={0}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Amount B
                </label>
                <input
                  type="number"
                  value={amountB}
                  onChange={(e) => setAmountB(e.target.value)}
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
              Add Liquidity
            </button>
          </form>
          {lpId && txnHash && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600">
                Transaction Successful!
              </h3>
              <div className="mt-4">
                <p className="text-lg">
                  <strong>Liquidity Pool ID:</strong>
                  <span className="block truncate text-gray-800">{lpId}</span>
                </p>
                <button
                  onClick={() => copyToClipboard(lpId, "Liquidity Pool ID")}
                  className="mt-2 w-full py-2 bg-gray-800 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                >
                  Copy Liquidity Pool ID
                </button>
              </div>
              <div className="mt-4">
                <p className="text-lg">
                  <strong>Transaction Hash:</strong>
                  <span className="block truncate text-gray-800">{txnHash}</span>
                </p>
                <button
                  onClick={() => copyToClipboard(txnHash, "Transaction Hash")}
                  className="mt-2 w-full py-2 bg-gray-800 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                >
                  Copy Transaction Hash
                </button>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default AddLiquidity;
