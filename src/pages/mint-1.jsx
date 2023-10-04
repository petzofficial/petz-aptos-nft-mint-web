import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v2";
import MetamaskModal from "../common/modal/metamaskModal/MetamaskModal";
import Mint from "../components/section/mint/v2";
import MintNowModal from "../common/modal/mintNowModal";
import WalletModal from "../common/modal/walletModal/WalletModal";

const MintPageOne = () => {
  const { visibility, metamaskModal, walletModalvisibility } = useModal();

  return (
    <>
      <Layout>
        <GlobalStyles />
        {metamaskModal && <MetamaskModal />}
        {visibility && <MintNowModal />}
        {walletModalvisibility && <WalletModal />}
        <Header />
        <Mint />
      </Layout>
    </>
  );
};

export default MintPageOne;
