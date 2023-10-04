import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import HomeV2 from "../pages/homeV2";
import HomeV3 from "../pages/homeV3";
import HomeV4 from "../pages/homeV4";
import HomeV5 from "../pages/homeV5";
import Blogs from "../pages/blogs";
import BlogDetails from "../pages/blogDetails";
import ComingSoon from "../pages/comingSoon";
import AboutPage from "../pages/about";
import RoadmapPage from "../pages/roadmap";
import Collections from "../pages/collections";
import ContactPage from "../pages/contact";
import MintPageOne from "../pages/mint-1";
import MintPageTwo from "../pages/mint-2";
import FAQPage from "../pages/faq";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeV5 />} exact />
    {/*   <Route path="/home-two" element={<HomeV2 />} />
      <Route path="/home-three" element={<HomeV3 />} />
      <Route path="/home-four" element={<HomeV4 />} />
      <Route path="/home-five" element={<HomeV1 />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/post" element={<BlogDetails />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/mint-1" element={<MintPageOne />} />
      <Route path="/mint-2" element={<MintPageTwo />} /> */}
    </Routes>
  );
}

export default App;
