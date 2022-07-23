/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FC } from "react";

import AppLogo from "../../assets/SHOPPE.svg";
import SearchIcon from "../../assets/search.svg";
import ShoppingCartIcon from "../../assets/shopping-cart.svg";
import ProfileIcon from "../../assets/profile.svg";

const Header: FC = () => {
  return (
    <nav className="fixed h-[107px] w-full z-20 bg-white/95">
      <div className="flex flex-row items-center justify-between h-full max-w-[1248px] mx-auto desktop:max-w-[90%] ipad:hidden">
        <div>
          <AppLogo />
        </div>
        <div className="flex flex-row items-center">
          <ul className="flex flex-row space-x-16">
            <li className="cursor-pointer">
              <Link href="/shop">
                <h5>Shop</h5>
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/blog">
                <h5>Blog</h5>
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/story">
                <h5>Our Story</h5>
              </Link>
            </li>
          </ul>
          <div className="bg-dark-gray w-[1px] h-[17px] mx-12" />
          <ul className="flex flex-row items-center space-x-10">
            <li>
              <SearchIcon />
            </li>
            <li>
              <ShoppingCartIcon />
            </li>
            <li>
              <ProfileIcon />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
