import React, { createContext, ReactNode, useState } from "react";

export const NavContext = createContext({
  showMenu: false,
  handleChangeMenu: (state: boolean) => {},
});

const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleChangeMenu = (state: boolean) => {
    setShowMenu(state);
  };

  const initialValue = {
    showMenu: showMenu,
    handleChangeMenu: handleChangeMenu,
  };
  return (
    <NavContext.Provider value={initialValue}>{children}</NavContext.Provider>
  );
};

export default NavContextProvider;
