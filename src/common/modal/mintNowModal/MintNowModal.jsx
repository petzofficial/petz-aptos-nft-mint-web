import { useState } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/mint-img.png";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { totalMintCount, mint } from '../../../utils/web3mint';
import { useEffect } from "react";

const MintNowModal = () => {
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');
  const [remaining, setRemaining] = useState(0);
  const { mintModalHandle } = useModal();

  let totalItems = 9999;
  let price = 0.03;

  const increaseCount = () => {
    if(count >= 10){
      setMessage('Maximum minting ammount exceeding!');
    }else{
      setCount(count + 1);
    }
  }

  const dcreaseCount = () => {
    if(count < 1){
      setMessage('Minimum minting ammount 1.');
    }else{
      setCount(count - 1);
    }
  }

  const onChnageCount = (val) => {
    if(count >= 10){
      setMessage('Maximum minting ammount exceeding!');
    }else if(count < 1){
      setMessage('Minimum minting ammount 1.');
    }else{
      setCount(val);
    }
  }


  const mintNow = async () => {
    if(count >= 10){
      setMessage('Maximum minting ammount exceeding!');
    }else if(count < 1){
      setMessage('Minimum minting ammount 1.');
    }else{
      let txn = await mint(count);
      if(txn.length){
        setMessage('Minted successfully!');
      }
    }
  }
  

  useEffect(() => {
    const calculateRemainingItems = async () => {
      let totaltMintedItems = await totalMintCount();
      setRemaining(totalItems - totaltMintedItems);
    }

    calculateRemainingItems();
  },[totalItems]);

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
                <img src={mintImg} alt="bithu nft mint" />
              </div>
              <div className="mint_count_list">
                <ul>
                  <li>
                    <h5>Remaining</h5>
                    <h5>
                      {remaining}/<span>9999</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5>{price} ETH</h5>
                  </li>
                  <li>
                    <h5>Quantity</h5>
                    <div className="mint_quantity_sect">
                      <button
                        onClick={() =>
                          count > 1 ? dcreaseCount() : count
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        id="quantity"
                        value={count}
                        onChange={(e) => onChnageCount(e.target.value)}
                      />
                      <button onClick={() => increaseCount() }>+</button>
                    </div>
                    <h5>
                      <span>{ count * price }</span> ETH
                    </h5>
                  </li>
                </ul>
              </div>
              { message && <p>{message}</p>}
              <div className="modal_mint_btn">
                <Button lg variant="mint" onClick={() => mintNow() }>
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
