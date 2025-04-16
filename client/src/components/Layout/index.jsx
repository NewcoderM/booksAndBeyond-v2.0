/* eslint-disable react/prop-types */
import Navbar from "../Base/Navbar";
import Footer from "../Base/Footer";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-rows-[1fr_9fr_1fr] h-screen">
      <div className="row-span-1 h-full">
        <Navbar />
      </div>

      <div className="row-span-1 h-full">{children}</div>
      <div className="row-span-1 h-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
