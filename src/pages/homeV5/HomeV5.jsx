import { useState, useEffect } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { Slider, SliderItem } from "../../common/slider/Slider";
import { useModal } from "../../utils/ModalContext";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import Layout from "../../common/layout";
import Header from "../../components/section/header/v2";
import Banner from "../../components/section/banner/v5";
import About from "../../components/section/about/v5";
import FAQ from "../../components/section/faq/v5";
import Mint from "../../components/section/mint/v1";
import MintNowModal from "../../common/modal/mintNowModal";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import StyleWrapper from "./StyleWrapper";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";

const provider = new Provider(Network.TESTNET);
const wallets = [
  new MartianWallet(),
  new PetraWallet(),
  new PontemWallet(),
  new TrustWallet(),
];

const HomeV5 = () => {
  const moduleAddress2 = "0x3562227119a7a6190402c7cc0b987d2ff5432445a8bfa90c3a51be9ff29dcbe3";
  const resourceAddress = "0xa943c5cdcea7e411768f10592f76e773b3f45803d7c061951e2e6d77bb305dc0";
  
  const { account } = useWallet();

  const [cmResourceArr, setCmResource] = useState("");
  const [isCollapse, setCollapse] = useState(true);
  const { visibility } = useModal();
  const [currentPage, setCurrentPage] = useState(0); // Track the current page

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
    speed: 200,
    autoplaySpeed: 200,
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

  useEffect(() => {
    setCollapse(true); // Collapse the menu when component mounts or current page changes
  }, [currentPage]);

  const handleChangePage = (index) => {
    setCurrentPage(index); // Update the current page when a new page is clicked
  };

  // Your useEffect and fetchList functions remain the same...

  return (
    <>
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <Layout>
          <GlobalStyles />
          {visibility && <MintNowModal />}
          <Header />
          <StyleWrapper>
            <Slider
              {...settings}
              className={`${isCollapse ? "slider_collapse" : ""}`}
              afterChange={handleChangePage} // Call handleChangePage after slider change
            >
              <SliderItem>
                <Banner cmResourceArr={cmResourceArr} />
              </SliderItem>
              <SliderItem>
                <About cmResourceArr={cmResourceArr}/>
              </SliderItem>
              <SliderItem>
                <FAQ />
              </SliderItem>
              <SliderItem>
                <Mint cmResourceArr={cmResourceArr}/>
              </SliderItem>
            </Slider>

            <div className="collapse_icon">
              <span onClick={handleCollapse}>
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
