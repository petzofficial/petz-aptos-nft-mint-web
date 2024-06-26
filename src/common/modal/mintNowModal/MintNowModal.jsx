import { useState, useEffect } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/mint-img.png";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { totalMintCount, mint } from '../../../utils/web3mint';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";
import { toast } from 'react-toastify';
import nftLogo from "../../../assets/images/nft/example.png";

export const provider = new Provider(Network.TESTNET);

const MintNowModal = () => {

  const moduleAddress2 = "0x3562227119a7a6190402c7cc0b987d2ff5432445a8bfa90c3a51be9ff29dcbe3";
  const resourceAddress = "0xa943c5cdcea7e411768f10592f76e773b3f45803d7c061951e2e6d77bb305dc0";
  const { account, signAndSubmitTransaction } = useWallet();
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');
  const [remaining, setRemaining] = useState(0);
  const { mintModalHandle } = useModal();
  const [cmResourceArr,setCmResource] = useState(null);

  let totalItems = 9999;
  let price = 0.03;

  const increaseCount = () => {
    if(count >= 10){
      setMessage('Maximum minting amount exceeded!');
    }else{
      setCount(count + 1);
    }
  }

  const decreaseCount = () => {
    if(count < 1){
      setMessage('Minimum minting amount is 1.');
    }else{
      setCount(count - 1);
    }
  }

  const onChangeCount = (val) => {
    if(val >= 10){
      setMessage('Maximum minting amount exceeded!');
    }else if(val < 1){
      setMessage('Minimum minting amount is 1.');
    }else{
      setCount(val);
    }
  }


  const mintNow = async () => {
    if(count >= 10){
      setMessage('Maximum minting amount exceeded!');
    }else if(count < 1){
      setMessage('Minimum minting amount is 1.');
    }else{

    }
  }
  const handleMint = async () => {
    if (!account) {
      toast.error('Please connect your wallet to mint NFTs.');
      return;
    }
  
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress2}::petz_candymachine::mint_script_many`,
      type_arguments: [],
      arguments: [resourceAddress,count],
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response,'response')
      // wait for transaction
      await provider.waitForTransaction(response.hash);

      if(response.success === true){
        toast.success('Successfully minted NFTs.');
        mintModalHandle()
      }

    } catch (error) {
      console.log("error", error);
      toast.error('An error occurred while minting NFTs.');
    } finally {
      //setTransactionInProgress(false);
    }
  }
  
  useEffect(() => {
    const calculateRemainingItems = async () => {
      let totaltMintedItems = await totalMintCount();
      setRemaining(totalItems - totaltMintedItems);
    }

    calculateRemainingItems();
  },[totalItems]);
  const fetchList = async () => {
    if (!account) return [];
    try {
      const cmResource = await provider.getAccountResource(
        resourceAddress,
        `${moduleAddress2}::petz_candymachine::CandyMachine`,
      );
      setCmResource(cmResource)
      console.log(cmResource,'cmResource')
    } catch (e) {
     
    }
  };
  useEffect(() => {
    fetchList();
  }, [account?.address]);
  const publicPrice = cmResourceArr?.data?.public_sale_mint_price * (Math.pow(10, -8))
  return (
    <>
      <MintModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>Collect YOUR NFT before end</h2>
              <button onClick={() => mintModalHandle()}>
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
                      {account ? (cmResourceArr?.data?.minted ? `${cmResourceArr?.data?.minted}/${cmResourceArr?.data?.total_supply}` : "0/0") : "0/0"}
                    </h5>
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5>{publicPrice} APT</h5>
                  </li>
                  <li>
                    <h5>Quantity</h5>
                    <div className="mint_quantity_sect">
                      <button
                        onClick={() =>
                          count > 1 ? decreaseCount() : count
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        id="quantity"
                        value={count}
                        onChange={(e) => onChangeCount(e.target.value)}
                      />
                      <button onClick={() => increaseCount() }>+</button>
                    </div>
                    <h5>
                      <span>{ count * publicPrice }</span> APT
                    </h5>
                  </li>
                </ul>
              </div>
              { message && <p>{message}</p>}
              <div className="modal_mint_btn">
                <Button lg variant="mint" onClick={() => handleMint() }>
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