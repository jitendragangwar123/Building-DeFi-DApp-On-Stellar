import DepositTokens from "../components/DepositTokens/AddLiquidity";
import Header from "../components/Header";
import React from "react";


export default async function Page() {
  return (
    <div className="">
      <Header/>
        <DepositTokens />
    </div> 
  );
}