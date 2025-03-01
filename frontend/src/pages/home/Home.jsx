import React from "react";
import Banner from "./Banner";
import Recommended from "./Recommended";
import Footer from "../../components/Footer";

function Home() {
  return (
    <>
      <div>
        <Banner />

        <Recommended />
        <div className="-my-6">
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
