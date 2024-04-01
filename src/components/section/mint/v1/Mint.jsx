import { useState, useEffect } from "react";
import { useModal } from "../../../../utils/ModalContext";
import { Slider, SliderItem } from "../../../../common/slider/Slider";
import Button from "../../../../common/button";

import thumb1 from "../../../../assets/images/nft/emoji-img4.png";
import thumb2 from "../../../../assets/images/nft/emoji-img5.png";
import thumb3 from "../../../../assets/images/nft/emoji-img6.png";
import nftLogo from "../../../../assets/images/nft/example.png";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";
import MintStyleWrapper from "./Mint.style";

const provider = new Provider(Network.TESTNET);

const Mint = () => {
  const moduleAddress2 = "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";
  const resourceAddress = "0x8484ec04e905df1987e0b378fbe8de1a6eaf8bd620f68b5dee3d0227974b022a";
  
  const { account, signAndSubmitTransaction } = useWallet();

  const [cmResourceArr,setCmResource] = useState("")
  const [count, setCount] = useState(1);
  const { mintModalHandle } = useModal();

  const slideImages = [thumb1, thumb2, thumb3];

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 500,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleChenge = () => {};
  const handleMint = async () => {
    if (!account) return [];
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress2}::candymachine::mint_script_many`,
      type_arguments: [],
      arguments: [resourceAddress,count],
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      await provider.waitForTransaction(response.hash);
    } catch (error) {
      console.log("error", error);
    } finally {
      //setTransactionInProgress(false);
    }
    
  }
  
  const fetchList = async () => {
    if (!account) return [];
    try {
      // const transactionResource = await provider.getAccountTransactions(
      //   account?.address
      // );

      // const coinResource = await provider.getAccountResource(
      //   account?.address,
      //   `${moduleAddress}::coin::CoinStore<${moduleAddress}::aptos_coin::AptosCoin>`,
      // );

      // const cmResource2 = await provider.getAccountResource(
      //   account?.address,
      //   `${moduleAddress2}::candymachine::MintData`,
      // );

      // const nftResource = await provider.getOwnedTokens(
      //   account?.address
      // );

      // const faResource = await provider.getAccountCoinsData(
      //   account?.address
      // );

      // const resource = await provider.getAccountResources(
      //   account?.address
      // );
      const cmResource = await provider.getAccountResource(
        resourceAddress,
        `${moduleAddress2}::candymachine::CandyMachine`,
      );
      setCmResource(cmResource)
     console.log(cmResource)
    } catch (e) {
     
    }
  };
  useEffect(() => {
    fetchList();
  }, [account?.address]);
  //const pubicPrice = cmResourceArr?.data?.public_sale_mint_price / 100000000
  const pubicPrice = cmResourceArr?.data?.public_sale_mint_price * (Math.pow(10, -8))
  return (
    <MintStyleWrapper>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="mint_left">
              <Slider {...settings}>
                {slideImages?.map((thumb, idx) => (
                  <SliderItem key={idx}>
                    <div className="mint_thumb">
                      <img src={nftLogo} alt="thumb" />
                    </div>
                  </SliderItem>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mint_right">
              <ul className="mint_count_list">
                <li>
                  <h5>Remaining</h5>
                  <h5>
                  {cmResourceArr?.data?.minted ? cmResourceArr?.data?.minted : "0"}/<span>{cmResourceArr?.data?.total_supply ? cmResourceArr?.data?.total_supply : "0"}</span>
                  </h5>
                </li>
                <li>
                  <h5>Price</h5>
                  <h5>{pubicPrice} APT</h5>
                </li>
                <li>
                  <h5>Quantity</h5>
                  <div className="mint_quantity_sect">
                    <button
                      className="input_number_decrement"
                      onClick={() => (count > 1 ? setCount(count - 1) : count)}
                    >
                      -
                    </button>
                    <input
                      className="input_number"
                      type="text"
                      value={count}
                      onChange={handleChenge}
                    />
                    <button
                      className="input_number_increment"
                      onClick={() => (count > 0 ? setCount(count + 1) : count)}
                    >
                      +
                    </button>
                  </div>
                  <h5>
                    <span>{count * pubicPrice}</span> APT
                  </h5>
                </li>
              </ul>
              <Button lg variant="mint" onClick={() => handleMint()}>
                {" "}
                Mint now
              </Button>
              <p style={{color:"white"}}>
                By clicking “MINT”, You agree to our{" "}
                <a href="# ">Terms of Service</a> and our{" "}
                <a href="# ">Privacy Policy.</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MintStyleWrapper>
  );
};

export default Mint;
