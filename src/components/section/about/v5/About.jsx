import { useEffect, useState } from "react";
import Counter from "../../../../common/counter";
import SectionTitle from "../../../../common/sectionTitle";
import data from "../../../../assets/data/about/dataV2";
import AboutStyleWrapper from "./About.style";
import { GrLinkedinOption } from "react-icons/gr";
import { RiTwitterXLine } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";
import { SlSocialReddit } from "react-icons/sl";
import { LiaTelegram } from "react-icons/lia";
import { BsFiletypeDoc } from "react-icons/bs";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";

const provider = new Provider(Network.TESTNET);

const About = () => {
  const moduleAddress = "0x1";
  const moduleAddress2 = "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";
  const resourceAddress = "0x8484ec04e905df1987e0b378fbe8de1a6eaf8bd620f68b5dee3d0227974b022a";
  const { account, signAndSubmitTransaction } = useWallet();

  const [cmResourceArr,setCmResource] = useState("")
  const { aboutDescription1, aboutDescription2 } = data;
  const fetchList = async () => {
    if (!account) return [];
    try {
      const transactionResource = await provider.getAccountTransactions(
        account?.address
      );

      const coinResource = await provider.getAccountResource(
        account?.address,
        `${moduleAddress}::coin::CoinStore<${moduleAddress}::aptos_coin::AptosCoin>`,
      );

      const cmResource2 = await provider.getAccountResource(
        account?.address,
        `${moduleAddress2}::candymachine::MintData`,
      );

      const nftResource = await provider.getOwnedTokens(
        account?.address
      );

      const faResource = await provider.getAccountCoinsData(
        account?.address
      );

      const resource = await provider.getAccountResources(
        account?.address
      );
      const cmResource = await provider.getAccountResource(
        resourceAddress,
        `${moduleAddress2}::candymachine::CandyMachine`,
      );
      setCmResource(cmResource)
      //console.log(cmResource2,'nftResource')
    } catch (e) {
     
    }
  };
  useEffect(() => {
    fetchList();
  }, [account?.address]);
  console.log(account,'cmResourceArrabout')
  return (
    <AboutStyleWrapper>
      <div className="container">
        <div className="row about_row">
          <div className="col-lg-6">
            <div className="v5_about_us_left_sect">
              <SectionTitle
                title="ABOUT US"
                subtitle="THE STORY "
                className="section_title"
              />
              <div className="v5_about_us_left_text">
                <p>{aboutDescription1}</p>
                <p>{aboutDescription2}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about_right_item">
              <div className="counter_item">
                <h3>
                  {cmResourceArr?.data?.minted}
                </h3>
                <h6>Total Items</h6>
              </div>
              <div className="counter_item">
                <h3>
                  0.0000{cmResourceArr?.data?.public_sale_mint_price}
                </h3>
                <h6>NFT Mint Price</h6>
              </div>
              <div className="counter_item">
                <h3>
                  <Counter
                    end={555}
                    decimal="."
                    decimals={555 % 1 !== 0 ? "2" : "0"}
                    suffix={"+"}
                  />
                </h3>
                <h6>Number of Attributes</h6>
              </div>
              <div className="counter_item">
                <h3>
                  <Counter
                    end={25.5}
                    decimal="."
                    decimals={25.5 % 1 !== 0 ? "2" : "0"}
                    suffix={"K"}
                  />
                </h3>
                <h6>Volume Traded (ETH)</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 mt-4" style={{display:"flex"}}>
          <a href="https://www.linkedin.com/company/petz-money" target="_blank" className="socailLogo cursor-pointer">
            <GrLinkedinOption color="white" size={"24px"}/>
          </a>
          <a href="" className="socailLogo px-2">
            <SlSocialReddit color="white" size={"24px"}/>
          </a>
          <a  href="https://twitter.com/PetzOfficial" target="_blank" className="socailLogo px-2">
            <RiTwitterXLine color="white" size={"24px"}/>
          </a> 
          <a  href="https://t.me/petz_money" target="_blank" className="socailLogo px-2">
            <LiaTelegram color="white" size={"24px"}/>
          </a>
          <a href="https://github.com/petzofficial" target="_blank" className="socailLogo px-2">
            <BsGithub color="white" size={"24px"}/>
          </a>
          <a href="https://docs.petz.money/" target="_blank" className="socailLogo px-2">
            <BsFiletypeDoc color="white" size={"24px"}/>
          </a>
        </div>
      </div>
    </AboutStyleWrapper>
  );
};

export default About;
