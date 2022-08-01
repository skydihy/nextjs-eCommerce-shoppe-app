import { FC, ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Popup from "./Popup";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Popup />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
