import { useContext, useEffect, useState } from "react";
import { ModalContext, useModal } from "../../../../utils/ModalContext";
import { Slider, SliderItem } from "../../../../common/slider/Slider";
import CoinInfoSlider from "../../coinInfoSlider";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";

import heartIcon from "../../../../assets/images/icon/v5-hart-icon.svg";
import thumb1 from "../../../../assets/images/nft/emoji-img1.png";
import thumb2 from "../../../../assets/images/nft/emoji-img2.png";
import thumb3 from "../../../../assets/images/nft/emoji-img3.png";

import particle1 from "../../../../assets/images/icon/v5-thunder-icon.svg";
import particle2 from "../../../../assets/images/icon/v5-star-icon.svg";
import particle3 from "../../../../assets/images/icon/v5-coin-icon.svg";
import nftLogo from "../../../../assets/images/nft/example.png";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";
export const provider = new Provider(Network.TESTNET);

const Banner = () => {
 
  const moduleAddress2 = "0x3562227119a7a6190402c7cc0b987d2ff5432445a8bfa90c3a51be9ff29dcbe3";
  const resourceAddress = "0xa943c5cdcea7e411768f10592f76e773b3f45803d7c061951e2e6d77bb305dc0";
  const { account } = useWallet();
  const { mintModalHandle } = useModal();
  const {cmResourceArr, setCmResource} = useContext(ModalContext);
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

  const fetchList = async () => {
    if (!account) return [];
    try {
      const cmResource = await provider.getAccountResource(
        resourceAddress,
        `${moduleAddress2}::petz_candymachine::CandyMachine`,
      );
      setCmResource(cmResource);
    } catch (e) {
      console.error("Error fetching resources:", e);
    }
  };

  useEffect(() => {
    fetchList();
  }, [account?.address]);
  
  const unixTimestamp = cmResourceArr?.data?.public_sale_mint_time; // Replace this with your Unix timestamp
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

  // Get the various components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-indexed, so we add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const pubicPrice = cmResourceArr?.data?.public_sale_mint_price * (Math.pow(10, -8))
  const prePrice = cmResourceArr?.data?.presale_mint_price * (Math.pow(10, -8))

  return (
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row banner_row">
          <div className="col-lg-6 order-1 order-lg-0">
            <div className="bithu_v5_baner_left">
              <h2>
                BUILD & MINT YOUR EVERY PetZ NFT <img src={heartIcon} alt="icon" />
              </h2>
              <h3>
                <span className="count">
                  {cmResourceArr?.data?.minted ? cmResourceArr?.data?.minted : "0"}
                </span>{" "}
                / {cmResourceArr?.data?.total_supply ? cmResourceArr?.data?.total_supply : "0"} Minted
              </h3>
              <div className="banner_buttons">
                <Button sm variant="mint" onClick={() => mintModalHandle()}>
                  {" "}
                  Mint now
                </Button>
              </div>
              <div className="coin-info">
                <span>Max 10 NFTs per wallet . Public Sale Price {pubicPrice} APT</span>
                <span>
                  PUBLIC SALE MINT IS LIVE{" "}
                  ON <span className="highlighted">2024-05-11 12:00:00 (UTC)</span>
                 {/*  <span className="highlighted">UNTIL {`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`}</span> */}
                </span>
                <span>Royalty Fee : 5%</span>
                {/* <span>Presale : {account ? prePrice : "NaN"} APT</span> */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-0 order-lg-1">
            <div className="bithu_v5_baner_right">
              <Slider {...settings}>
                {slideImages?.map((thumb, idx) => (
                  <SliderItem key={idx}>
                    <div className="banner_nft_thumb">
                      <img src={nftLogo} alt="thumb" />
                    </div>
                  </SliderItem>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <CoinInfoSlider />

      {/* particles  */}
      <span className="particle_star particle_1">
        <img src={particle1} alt="icon" />
      </span>
      <span className="particle_star particle_2">
        <img src={particle2} alt="icon" />
      </span>
      <span className="particle_star particle_3">
        <img src={particle3} alt="icon" />
      </span>
      {/* particles  */}
    </BannerV1Wrapper>
  );
};

export default Banner;
