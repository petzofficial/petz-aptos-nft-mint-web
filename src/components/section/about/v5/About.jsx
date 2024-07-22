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

  const moduleAddress2 = "0x704f1829d1a79e4ad14195dc82fc70be972bbeca80240ca37573899d1cb0ab2b";
  const resourceAddress = "0xf7cbce61f5907c3244e3be25765dd41b2ef220e9121d16fe32ad2d7f7af56065";
  const { account, signAndSubmitTransaction } = useWallet();

  const [cmResourceArr,setCmResource] = useState("")
  const { aboutDescription1, aboutDescription2 } = data;
  const fetchList = async () => {
    if (!account) return [];
    try {
      const cmResource = await provider.getAccountResource(
        resourceAddress,
        `${moduleAddress2}::petz_candymachine::CandyMachine`,
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
  const pubicPrice = cmResourceArr?.data?.public_sale_mint_price * (Math.pow(10, -8))
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

                <div className="col-span-12 mt-4" style={{display:"flex"}}>
          <a href="https://www.linkedin.com/company/petz-money" target="_blank" className="socailLogo cursor-pointer">
            <GrLinkedinOption color="white" size={"24px"}/>
          </a>
          {/* <a href="" className="socailLogo px-2">
            <SlSocialReddit color="white" size={"24px"}/>
          </a> */}
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

              
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about_right_item">
              <div className="counter_item">
                {/* <h3>
                  {cmResourceArr?.data?.total_supply}
                </h3> */}
                <h3>
                  3125
                </h3>
                <h6>Total Items</h6>
              </div>
              <div className="counter_item">
                <h3>
                  {pubicPrice}
                </h3>
                <h6>NFT Mint Price (APT)</h6>
              </div>
              <div className="counter_item">
                <h3>
                 {/*  <Counter
                    end={555}
                    decimal="."
                    decimals={555 % 1 !== 0 ? "2" : "0"}
                    suffix={"+"}
                  /> */}5
                </h3>
                <h6>Number of Attributes</h6>
              </div>
              <div className="counter_item">
                <h3>
                  {/* <Counter
                    end={25.5}
                    decimal="."
                    decimals={25.5 % 1 !== 0 ? "2" : "0"}
                    suffix={"K"}
                  /> */}10000+
                </h3>
                <h6>Community Members</h6>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </AboutStyleWrapper>
  );
};

export default About;
