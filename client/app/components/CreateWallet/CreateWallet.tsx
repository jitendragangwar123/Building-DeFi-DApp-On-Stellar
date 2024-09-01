"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CopyButton from "../CopyButton";

interface WalletData {
  [key: string]: string;
}

const CreateWallet = () => {
  const [animate, setAnimate] = useState(false);
  const [walletData, setWalletData] = useState<WalletData>({});
  const [keypair, setKeypair] = useState({ publicKey: "", secret: "" });
  const [publicKeyToFund, setPublicKeyToFund] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setAnimate(false);
    setTimeout(() => {
    }, 400);
  };

  useEffect(() => {
    setAnimate(true);
    generateKeypair();
  }, []);

  const handleAttributeChange = (attribute: string, value: string) => {
    setWalletData((prevData) => ({ ...prevData, [attribute]: value }));
  };

  const generateKeypair = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://building-defi-dapp-on-stellar-back-end.vercel.app/generate-key-pair", {
        method: "GET",
      });
      const data = await response.json();
      setKeypair({
        publicKey: data.publicKey,
        secret: data.secretKey,
      });
      setPublicKeyToFund(data.publicKey);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating keypair:", error);
      toast.error("Error generating keypair");
      toast.dismiss();
      setIsLoading(false);
    }
  };

  const fundXLMTokens = async () => {
    try {
      setIsLoading(true);
      toast.loading("Wait for Transactions.....");
      const response = await fetch("https://building-defi-dapp-on-stellar-back-end.vercel.app/fund-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey: publicKeyToFund }),
      });
      const data = await response.json();
      toast.dismiss();
      toast.success("Wallet Created!");
      closeModal();
      setIsLoading(false);
    } catch (error) {
      console.error("Error funding account:", error);
      toast.error("Error funding account.");
      toast.dismiss();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
       <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/blockchaingif.gif")',
          filter: "blur(6px)",
        }}
      ></div>
      <div className="relative max-w-lg w-full mx-auto p-8 mt-12 mb-12 bg-gray-200 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-center text-4xl font-bold text-blue-600 mb-8">
          Create a Wallet
        </h2>

        <label
          className="block text-gray-700 text-lg font-medium mb-2"
          htmlFor="publicKey"
        >
          Public Key
        </label>
        <div className="flex items-center border border-gray-300 rounded-md mb-4">
          <input
            type="text"
            id="publicKey"
            value={keypair.publicKey}
            onChange={(e) =>
              handleAttributeChange("PUBLIC_KEY", e.target.value)
            }
            className="p-3 rounded-l-md border-0 w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Public Key"
          />
          <CopyButton data={keypair.publicKey} />
        </div>

        <label
          className="block text-gray-700 text-lg font-medium mb-2"
          htmlFor="privateKey"
        >
          Private Key
        </label>
        <div className="flex items-center border border-gray-300 rounded-md mb-6">
          <input
            type="text"
            id="privateKey"
            value={keypair.secret}
            onChange={(e) =>
              handleAttributeChange("PRIVATE_KEY", e.target.value)
            }
            className="p-3 rounded-l-md border-0 w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Private Key"
          />
          <CopyButton data={keypair.secret} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            type="button"
            className={`bg-blue-600 py-3 px-6 rounded text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={generateKeypair}
            disabled={isLoading}
          >
            Generate New Keys
          </button>

          <button
            onClick={fundXLMTokens}
            className={`bg-blue-600 py-3 px-6 rounded text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${!keypair.publicKey ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!keypair.publicKey}
          >
            Fund Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;
