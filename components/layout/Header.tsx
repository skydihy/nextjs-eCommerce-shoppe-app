/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";

import AppLogo from "../../assets/logo/SHOPPE.svg";
import SearchIcon from "../../assets/icon/search.svg";
import ShoppingCartIcon from "../../assets/icon/shopping-cart.svg";
import ProfileIcon from "../../assets/icon/profile.svg";

const Header: FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className="fixed h-[107px] w-full z-20 bg-white/95">
      <div className="flex flex-row items-center justify-between h-full max-w-[1248px]  border-b-[1px] border-light-gray mx-auto desktop:max-w-[90%] ipad:hidden">
        <div className="cursor-pointer">
          <a href="/">
            <AppLogo />
          </a>
        </div>
        <div className="flex flex-row items-center h-full">
          <ul className="flex flex-row space-x-16 h-full">
            <li
              className={`cursor-pointer flex items-center ${
                pathname.slice(0, 5) === "/shop" ? "border-b border-black" : ""
              }`}
            >
              <Link href="/shop" passHref>
                <h5>Shop</h5>
              </Link>
            </li>
            <li
              className={`cursor-pointer flex items-center ${
                pathname === "/blog" ? "border-b border-black" : ""
              }`}
            >
              <Link href="/blog" passHref>
                <h5>Blog</h5>
              </Link>
            </li>
            <li
              className={`cursor-pointer flex items-center ${
                pathname === "/story" ? "border-b border-black" : ""
              }`}
            >
              <Link href="/story" passHref>
                <h5>Our Story</h5>
              </Link>
            </li>
          </ul>
          <div className="bg-dark-gray w-[1px] h-[17px] mx-12" />
          <ul className="flex flex-row items-center space-x-10">
            <li className="cursor-pointer">
              <SearchIcon />
            </li>
            <li className="cursor-pointer">
              <ShoppingCartIcon />
            </li>
            {/* <li className="cursor-pointer">
              <ProfileIcon />
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
