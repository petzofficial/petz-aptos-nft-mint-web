import { useEffect, useState } from "react";
import { useModal } from "../../../../utils/ModalContext";
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
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";
import moment from 'moment';

export const provider = new Provider(Network.TESTNET);

const Banner = () => {
  const moduleAddress = "0x1";
  const moduleAddress2 = "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";
  const resourceAddress = "0x8484ec04e905df1987e0b378fbe8de1a6eaf8bd620f68b5dee3d0227974b022a";
  const { account, signAndSubmitTransaction } = useWallet();
  const { mintModalHandle } = useModal();
  const [cmResourceArr,setCmResource] = useState("")
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
        `${moduleAddress2}::candymachine::CandyMachine`,
      );
      setCmResource(cmResource)
    } catch (e) {
     
    }
  };

  const unixTimestamp = cmResourceArr?.data?.public_sale_mint_time; // Replace this with your Unix timestamp
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

  // Get the various components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-indexed, so we add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  useEffect(() => {
    fetchList();
  }, [account?.address]);
  console.log(cmResourceArr,'cmResourceArr')
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
                  {/* <Counter end={5555} duration={5555} /> */}
                  {cmResourceArr?.data?.minted ? cmResourceArr?.data?.minted : "0"}
                </span>{" "}
                / {cmResourceArr?.data?.total_supply ? cmResourceArr?.data?.total_supply : "0"} Minted
              </h3>
              <div className="banner_buttons">
                <Button sm variant="mint" onClick={() => mintModalHandle()}>
                  {" "}
                  Mint now
                </Button>
                <Button sm variant="outline">
                  Wishlist now
                </Button>
              </div>
              <div className="coin-info">
                <span>Max 2 NFTs per wallet . Price 0.0000{cmResourceArr?.data?.public_sale_mint_price} APT + gas</span>
                <span>
                  MINT IS LIVE{" "}
                  <span className="highlighted">UNTIL {`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`}</span>
                </span>
                <span>Presale : 0.0000{cmResourceArr?.data?.presale_mint_price ? cmResourceArr?.data?.presale_mint_price : ""}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-0 order-lg-1">
            <div className="bithu_v5_baner_right">
              <Slider {...settings}>
                {slideImages?.map((thumb, idx) => (
                  <SliderItem key={idx}>
                    <div className="banner_nft_thumb">
                      <img src={thumb} alt="thumb" />
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
