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
    <nav className="fixed h-[107px] w-full z-50 bg-white/95">
      <div className="flex flex-row items-center justify-between h-full max-w-[1248px]  border-b-[1px] border-light-gray mx-auto desktop:max-w-[80%] ipad:hidden">
        <div className="cursor-pointer">
          <Link href="/" passHref>
            <AppLogo />
          </Link>
        </div>
        <div className="flex flex-row items-center h-full">
          <ul className="flex flex-row space-x-16 h-full">
            <Link href="/shop" passHref>
              <li
                className={`cursor-pointer flex items-center ${
                  pathname.slice(0, 5) === "/shop"
                    ? "border-b border-black"
                    : ""
                }`}
              >
                <h5>Shop</h5>
              </li>
            </Link>
            {/* <li
              className={`cursor-pointer flex items-center ${
                pathname === "/blog" ? "border-b border-black" : ""
              }`}
            >
              <Link href="/blog" passHref>
                <h5>Blog</h5>
              </Link>
            </li> */}
            <Link href="/story" passHref>
              <li
                className={`cursor-pointer flex items-center ${
                  pathname === "/story" ? "border-b border-black" : ""
                }`}
              >
                <h5>Our Story</h5>
              </li>
            </Link>
          </ul>
          <div className="bg-dark-gray w-[1px] h-[17px] mx-12" />
          <ul className="flex flex-row items-center space-x-10">
            {/* <li className="cursor-pointer">
              <SearchIcon />
            </li> */}
            <Link href="/cart" passHref>
              <li className="cursor-pointer">
                <ShoppingCartIcon />
              </li>
            </Link>
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
