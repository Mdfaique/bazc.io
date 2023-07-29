import React, { createContext, useState } from "react";
import SidebarData from "../data/sidebar";

const SidebarDataContext = createContext();

const SidebarDataProvider = ({ children }) => {
  const [sidebarData, setSidebarData] = useState(
    localStorage.getItem("SidebarData")
      ? JSON.parse(localStorage.getItem("SidebarData"))
      : SidebarData
  );

  return (
    <SidebarDataContext.Provider value={{ sidebarData, setSidebarData }}>
      {children}
    </SidebarDataContext.Provider>
  );
};

export { SidebarDataContext, SidebarDataProvider };
