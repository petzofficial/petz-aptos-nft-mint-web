import { useEffect, useState } from "react";
import { useModal } from "../../../../utils/ModalContext";
import { FaWallet } from "react-icons/fa";
import Navigation from "./Navigation";
import Button from "../../../../common/button";
import HeaderStyleWrapper from "./Header.style";
import { isMetaMaskInstalled } from "../../../../config";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../../../assets/images/mint-logo.png";
import menuIcon from "../../../../assets/images/icon/mint-menu_icon.svg";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import buttonHoverShapeWhite from "../../../../assets/images/icon/hov_shape_s.svg";
import { WalletConnector } from "./walletConnector";

const Header = () => {
  const {
    walletModalHandle,
    metamaskModalHandle,
    account,
    isWalletAlreadyConnected,
    disconnectWalletFromApp,
  } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const { connected } = useWallet();
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  const substr = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) : str;
  };

  const handleWalletConnect = async () => {
    if (!isMetaMaskInstalled()) {
      metamaskModalHandle();
    } else {
      walletModalHandle();
    }
  };

  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    return () => {
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);

  useEffect(() => {
    isWalletAlreadyConnected();
  }, [isWalletAlreadyConnected]);
  const test = () => {
    return (
      <div>
        <img
          src={buttonHoverShapeWhite}
          className="hover-shape shape-right shape-white"
          alt="bithu nft button hover shape"
        />
        {connected ? "name" : "n"}
      </div>
    );
  };
  return (
    <>
      <HeaderStyleWrapper id="navbar">
        <div className="header_wrapper">
          <div className="header_left">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="header_right">
            <div className="bithu_menu_btns">
              {account ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="white"
                    id="dropdown-basic"
                    className="connect_btn"
                  >
                    {substr(account.toString(), 15)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="# "
                      onClick={() => disconnectWalletFromApp()}
                    >
                      Disconnect
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  {!connected && (
                    <div className="walletIcon">
                      <FaWallet />
                    </div>
                  )}
                  <WalletConnector />
                  {/* <WalletSelector className="wallet-button"></WalletSelector> */}
                  {/* <Button
                sm
                variant="hovered"
                className="connect_btn"
                onClick={() => handleWalletConnect()}
              >
                
                <FaWallet />
               
                Connect
              </Button> */}
                </>
              )}
              {/*   <Button
                variant="outline"
                className="menu_btn"
                onClick={() => handleMobileMenu()}
              >
                <img src={menuIcon} alt="menu bar icon" />
              </Button> */}
            </div>
          </div>
        </div>
      </HeaderStyleWrapper>
      {isMobileMenu && <Navigation mobileMenuHandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
