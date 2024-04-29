import { useState } from "react";
import { ModalContext } from "./ModalContext";
import {
  connectWallet,
  connectWalletLocaly,
  isWalletConnected,
  disconnectWallet,
} from "../config";

const ContextProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [walletModalvisibility, setModalvisibility] = useState(false);
  const [shareModalVisibility, setShareModalvisibility] = useState(false);
  const [metamaskModalVisibility, setMetamaskModalVisibility] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [account, setAccount] = useState("");
  const [cmResourceArr, setCmResource] = useState("");

  const mintModalHandle = () => {
    setVisibility(!visibility);
  };
  const walletModalHandle = () => {
    setModalvisibility(!walletModalvisibility);
  };
  const shareModalHandle = (e) => {
    e.preventDefault();
    setShareModalvisibility(!shareModalVisibility);
  };

  const metamaskModalHandle = () => {
    setMetamaskModalVisibility(!metamaskModalVisibility);
  };

  const connectWalletModalHanlde = () => {
    try {
      if (!isWalletConnected()) {
        setConnectWalletModal(!connectWalletModal);
      }
    } catch (error) {}
  };

  const connectWalletHandle = async () => {
    try {
      const accounts = await connectWallet();
      setAccount(accounts);
      if (!isWalletConnected()) {
        connectWalletLocaly();
      }
      setModalvisibility(!walletModalvisibility);
    } catch (error) {}
  };

  const isWalletAlreadyConnected = async () => {
    try {
      if (isWalletConnected()) {
        const accounts = await connectWallet();
        setAccount(accounts);
      }
    } catch (error) {}
  };

  const disconnectWalletFromApp = () => {
    try {
      disconnectWallet();
      setAccount("");
    } catch (error) {}
  };

  return (
    <ModalContext.Provider
      value={{
        visibility,
        mintModalHandle,
        walletModalHandle,
        walletModalvisibility,
        shareModalVisibility,
        shareModalHandle,
        metamaskModalVisibility,
        metamaskModalHandle,
        account,
        connectWalletHandle,
        isWalletAlreadyConnected,
        disconnectWalletFromApp,
        connectWalletModalHanlde,
        connectWalletModal,
        cmResourceArr,
        setCmResource,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
