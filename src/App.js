import React from "react";
import FlavanoidsStatistics from "./components/FlavanoidsStatistics ";
import GammaStatistics from "./components/GammaStatistics";

const AppLayout = () => {
  return (
    <div className="app">
      <FlavanoidsStatistics />
      <GammaStatistics />
    </div>
  );
};
export default AppLayout;
