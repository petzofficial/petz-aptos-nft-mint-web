import { useState, useEffect } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { Slider, SliderItem } from "../../common/slider/Slider";
import { useModal } from "../../utils/ModalContext";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import Layout from "../../common/layout";
import Header from "../../components/section/header/v2";
import Banner from "../../components/section/banner/v5";
import About from "../../components/section/about/v5";
//import RoadMap from "../../components/section/roadMap/v5";
import FAQ from "../../components/section/faq/v5";
//import Team from "../../components/section/team/v5";
import Mint from "../../components/section/mint/v1";
import MintNowModal from "../../common/modal/mintNowModal";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
//import WalletModal from "../../common/modal/walletModal/WalletModal";
//import MetamaskModal from "../../common/modal/metamaskModal/MetamaskModal";
//import ConnectWallet from "../../common/modal/metamask/ConnectWallet";
import StyleWrapper from "./StyleWrapper";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";
//import MintStyleWrapper from "./Mint.style";

const provider = new Provider(Network.TESTNET);
const wallets = [
  new MartianWallet(),
  new PetraWallet(),
  new PontemWallet(),
  new TrustWallet(),
];


const HomeV5 = () => {
  const moduleAddress = "0x1";
  const nftModuleAddress = "0x3";
  const moduleAddress2 = "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";
  const resourceAddress = "0x8484ec04e905df1987e0b378fbe8de1a6eaf8bd620f68b5dee3d0227974b022a";
  
  const { account, signAndSubmitTransaction } = useWallet();

  const [cmResourceArr,setCmResource] = useState("")
  const [isCollapse, setCollapse] = useState(true);
  const { visibility,
    walletModalvisibility, 
    metamaskModalVisibility, 
    connectWalletModal, } = useModal();
  const menuData = [
    "01. Home",
    "02. About",
    "03. FAQ",
    "04. Mint",
  ];

  const settings = {
    swipe: false,
    dots: true,
    arrows: false,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 500,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => <span>{menuData[i]}</span>,
  };

  const handleCollapse = () => {
    setCollapse(!isCollapse);
  };
  // useEffect(() => {
  //   const listItems = document.querySelectorAll(".slick-dots li");
  //   for (let i = 0; i <= listItems.length - 1; i++) {
  //     listItems[i].addEventListener("click", (e) => { 
  //       setCollapse(!isCollapse);
  //     });
  //   }
  // }, [isCollapse]);
  const fetchList = async () => {
    if (!account) return [];
    try {
      const cmResource = await provider.getAccountResource(
        resourceAddress,
        `${moduleAddress2}::candymachine::CandyMachine`,
      );
      setCmResource(cmResource)
     console.log(cmResource,'cmResource')
    } catch (e) {
     
    }
  };
  useEffect(() => {
    fetchList();
  }, [account?.address]);
  return (
    <>
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <Layout>
        <GlobalStyles />
        {visibility && <MintNowModal />}
      {/*   {walletModalvisibility && <WalletModal />}
        {metamaskModalVisibility && <MetamaskModal/> }
        {connectWalletModal && <ConnectWallet/> } */}
        <Header />
        <StyleWrapper>
          <Slider
            {...settings}
            className={`${isCollapse ? "slider_collapse" : ""}`}
          >
            <SliderItem>
              <Banner cmResourceArr={cmResourceArr} />
            </SliderItem>
            <SliderItem>
              <About cmResourceArr={cmResourceArr}/>
            </SliderItem>
           {/*  <SliderItem>
              <RoadMap />
            </SliderItem>
            <SliderItem>
              <Team />
            </SliderItem> */}
            <SliderItem>
              <FAQ />
            </SliderItem>
            <SliderItem>
              <Mint cmResourceArr={cmResourceArr}/>
            </SliderItem>
          </Slider>

          <div className="collapse_icon">
            <span onClick={() => handleCollapse()}>
              {isCollapse ? <BsChevronUp /> : <BsChevronDown />}
            </span>
          </div>
        </StyleWrapper>
      </Layout>
      </AptosWalletAdapterProvider>
    </>
  );
};

export default HomeV5;
