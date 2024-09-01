import CreateWallet from "../components/CreateWallet/CreateWallet";
import Header from "../components/Header";
import React from "react";


export default async function Page() {
  return (
    <div className="">
      <Header/>
        <CreateWallet/>
    </div> 
  );
}