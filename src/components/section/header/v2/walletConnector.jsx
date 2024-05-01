"use client";
import { useState } from "react";
import WalletButton from "./walletButton";
import WalletsModal from "./walletModal";

// type WalletConnectorProps = {
//   networkSupport?: string,
//   handleNavigate?: () => void,
// };

export function WalletConnector({ networkSupport, handleNavigate }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <WalletButton
        method="notification"
        handleModalOpen={handleModalOpen}
        handleNavigate={handleNavigate}
      />
      <WalletsModal
        handleClose={handleClose}
        modalOpen={modalOpen}
        networkSupport={networkSupport}
      />
    </>
  );
}
