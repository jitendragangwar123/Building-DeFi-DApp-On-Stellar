import WithdrawTokens from "../components/WithdrawTokens/WithdrawTokens";
import Header from "../components/Header";
import React from "react";


export default async function Page() {
  return (
    <div className="">
      <Header/>
        <WithdrawTokens />
    </div> 
  );
}