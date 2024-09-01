import SwapTokens from "../components/SwapTokens/SwapTokens";
import Header from "../components/Header";
import React from "react";


export default async function Page() {
  return (
    <div className="">
      <Header/>
        <SwapTokens />
    </div> 
  );
}