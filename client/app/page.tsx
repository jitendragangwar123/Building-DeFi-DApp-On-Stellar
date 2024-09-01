"use client";
import Image from "next/image";
import Header from "./components/Header";
import Link from "next/link";
import GithubIcon from "./svg/GithubIcon";
import UpRightArrowIcon from "./svg/UpRightArrowIcon";

export default function Home() {
 
  return (
    <main className="">
      <Header />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("/blockchaingif.gif")',
          filter: "blur(6px)",
        }}
      ></div>
      <div className="flex min-h-screen flex-col font-serif items-center justify-center py-14 mt-14 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-16 mb-5 text-center lg:text-left">
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-gray-200 animate-fadeIn transition duration-700 ease-in-out transform hover:scale-105">
              Welcome to
            </h1>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-800 dark:text-blue-500 animate-bounce transition duration-700 ease-in-out transform hover:scale-105">
              Flexi Mart
            </h2>
            <p className="text-lg md:text-2xl lg:text-xl text-white dark:text-white animate-fadeInDelay transition duration-700 ease-in-out transform hover:scale-105">
            A Comprehensive Liquidity Management Platform for Creating, Depositing, Withdrawing, and Swapping Tokens on Stellar Network
            </p>
            <div className="flex gap-4 z-0">
              <Link
                href="https://github.com/jitendragangwar123/Building-DeFi-DApp-On-Stellar"
                legacyBehavior
              >
                <a className="flex justify-center items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md font-medium border-2 border-blue-600 shadow-md hover:bg-blue-600 hover:shadow-lg active:bg-blue-800 active:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-700 ease-in-out">
                  <span>Welcome to FlexiMart </span>
                  <span>
                    <GithubIcon />
                  </span>
                </a>
              </Link>
              <Link href="/create-wallet" legacyBehavior>
                <a className="flex justify-center items-center gap-2 px-4 py-2 text-sm bg-white text-black rounded-md font-medium border-2 border-blue-600 shadow-md hover:bg-blue-600 hover:shadow-lg active:bg-white active:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-700 ease-in-out">
                  <span>Start Exploring</span>
                  <span>
                    <UpRightArrowIcon />
                  </span>
                </a>
              </Link>
            </div>
            
          </div>
          <div className="flex w-full lg:w-1/2 justify-center lg:justify-end">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] transition duration-700 ease-in-out transform hover:scale-105"
              src="/dashboard-fleximart.png"
              alt="hero page logo"
              width={600}
              height={150}
              priority
            />
          </div>
        </div>
      </div>
      
    </main>
  );
}
