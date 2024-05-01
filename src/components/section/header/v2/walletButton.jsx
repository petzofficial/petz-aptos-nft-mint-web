"use client";
import { Avatar, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import WalletMenu from "./walletMenu";
import { AccountAddress } from "@aptos-labs/ts-sdk";

import React from "react";
import { AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon } from "@mui/icons-material";
// type WalletButtonProps = {
//     handleModalOpen: () => void;
//     handleNavigate?: () => void;
//     method: string,
// };
export const shortenString = (inputString) => {
  if (inputString?.length <= 9) {
    return inputString;
  } else {
    return (
      inputString?.substring(0, 5) +
      "..." +
      inputString?.substring(inputString?.length - 4)
    );
  }
};
export default function WalletButton({ handleModalOpen, handleNavigate }) {
  const { connected, account, wallet, disconnect } = useWallet();
  const [popoverAnchor, setPopoverAnchor] = useState("");
  const handleClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };
  const handleLogout = () => {
    disconnect();
    //  handlePopoverClose();
    // localStorage.removeItem("account")
    //  localStorage.removeItem("AptosWalletName");
    // window.location.reload();
  };
  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const onConnectWalletClick = () => {
    handlePopoverClose();
    handleModalOpen();
  };

  return (
    <>
      <button
        style={{
          height: "50px",
          minWidth: "150px",
          border: "none",
          marginLeft: "20px",
          background: "rgba(255, 255, 255, 0.2)",
          color: " rgb(255, 255, 255)",
          fontFamily: "Bakbak One",
          fontWeight: 400,
          fontSize: "16px",
          textTransform: "uppercase",
        }}
        onClick={connected ? handleLogout : onConnectWalletClick}
        className="user-icon  pl-3 pr-3 p-2    rounded-3 font-bold"
      >
        {connected ? shortenString(account?.address) : "CONNECT"}
      </button>
      <WalletMenu
        popoverAnchor={popoverAnchor}
        handlePopoverClose={handlePopoverClose}
        handleNavigate={handleNavigate}
      />
    </>
  );
}
