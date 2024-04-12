import { useState, useEffect } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/mint-img.png";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";
import { toast } from 'react-toastify';
import nftLogo from "../../../assets/images/nft/example.png";

export const provider = new Provider(Network.TESTNET);

const MintNowModal = ({ cmResourceArr }) => {
  const moduleAddress2 = "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";
  const resourceAddress = "0x8484ec04e905df1987e0b378fbe8de1a6eaf8bd620f68b5dee3d0227974b022a";
  const { account, signAndSubmitTransaction } = useWallet();
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');
  const { mintModalHandle } = useModal();

  let totalItems = 9999;

  const increaseCount = () => {
    if(count >= 10){
      setMessage('Maximum minting amount exceeded!');
    } else {
      setCount(count + 1);
    }
  }

  const decreaseCount = () => {
    if(count < 1){
      setMessage('Minimum minting amount is 1.');
    } else {
      setCount(count - 1);
    }
  }

  const onChangeCount = (val) => {
    if(val >= 1 && val <= 10){
      setCount(val);
    } else {
      setMessage('Minting amount should be between 1 and 10.');
    }
  }

  const mintNow = async () => {
    if (!account) {
      toast.error('Please connect your wallet to mint NFTs.');
      return;
    }
    if (count < 1 || count > 10) {
      setMessage('Minting amount should be between 1 and 10.');
      return;
    }

    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress2}::candymachine::mint_script_many`,
      type_arguments: [],
      arguments: [resourceAddress, count],
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);
    } catch (error) {
      console.error("Error minting NFTs:", error);
      toast.error('An error occurred while minting NFTs.');
    }
  }

  return (
    <>
      <MintModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>Collect YOUR NFT before end</h2>
              <button onClick={mintModalHandle}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <div className="mint_img">
                <img src={nftLogo} alt="bithu nft mint" />
              </div>
              <div className="mint_count_list">
                <ul>
                  <li>
                    <h5>Remaining</h5>
                    <h5>
                      {cmResourceArr?.data?.minted ? cmResourceArr?.data?.minted : "0"}/<span>{cmResourceArr?.data?.total_supply ? cmResourceArr?.data?.total_supply : "0"}</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5>{cmResourceArr?.data?.public_sale_mint_price * (Math.pow(10, -8))} APT</h5>
                  </li>
                  <li>
                    <h5>Quantity</h5>
                    <div className="mint_quantity_sect">
                      <button onClick={decreaseCount}>-</button>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max="10"
                        value={count}
                        onChange={(e) => onChangeCount(parseInt(e.target.value))}
                      />
                      <button onClick={increaseCount}>+</button>
                    </div>
                    <h5>
                      <span>{count * (cmResourceArr?.data?.public_sale_mint_price * (Math.pow(10, -8)))}</span> APT
                    </h5>
                  </li>
                </ul>
              </div>
              { message && <p>{message}</p>}
              <div className="modal_mint_btn">
                <Button lg variant="mint" onClick={mintNow}>
                  Mint Now
                </Button>
              </div>
            </div>
            <div className="modal_bottom_shape_wrap">
              <span className="modal_bottom_shape shape_left">
                <img src={hoverShape} alt="bithu nft hover shape" />
              </span>
              <span className="modal_bottom_shape shape_right">
                <img src={hoverShape} alt="bithu nft hover shape" />
              </span>
            </div>
          </div>
        </div>
      </MintModalStyleWrapper>
    </>
  );
};

export default MintNowModal;
