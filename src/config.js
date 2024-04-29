export const ethereum = window.ethereum;

// check if metamask extension is installed on the browser
export const isMetaMaskInstalled = () => {
  if (ethereum) {
    return true;
  }

  return false;
};

// connect to metakmask wallet
export const connectWallet = async () => {
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts;
  } catch (error) {
    console.log(error);
  }
};

// connect to metakmask wallet
export const connectAccount = async () => {
  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    return accounts;
  } catch (error) {
    console.log("this is error");
    console.log(error);
  }
};

// disconnect metamask wallet
export const disconnectWallet = () => {
  try {
    localStorage.removeItem("isWalletConnected");
    window.location.reload();
  } catch (error) {
    console.log("this is error");
    console.log(error);
  }
};

// check metamask on disconnect
export const onMetamaskDisconnect = () => {
  try {
    ethereum.on("disconnect", () => {
      console.log("Disconnected");
    });
  } catch (error) {
    console.log("this is error");
    console.log(error);
  }
};

// check metamask on connected
export const onMetamaskconnect = async () => {
  try {
    const chainId = await getChainId();
    ethereum.on("connect", () => {
      console.log(chainId);
    });
  } catch (error) {
    console.log("this is error");
    console.log(error);
  }
};

// on chain change
export const onChainChange = () => {
  ethereum.on("chainChanged", (_chainId) => {
    return parseInt(_chainId);
  });
};

export const getChainId = async () => {
  const chainId = await ethereum.request({ method: "eth_chainId" });

  return parseInt(chainId);
};

export const isWalletConnected = () => {
  try {
    if (localStorage.getItem("isWalletConnected") === "true") {
      return true;
    }

    return false;
  } catch (error) {
    console.log("this is error");
    console.log(error);
  }
};

export const connectWalletLocaly = () => {
  try {
    localStorage.setItem("isWalletConnected", true);
  } catch (error) {}
};
