import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommended from "./Recommended";

function Home() {
  return (
    <>
      <div>
        <Banner />
        <TopSellers />
        <Recommended />
      </div>
    </>
  );
}

export default Home;
