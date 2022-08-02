/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import AppLogo from "../../assets/logo/SHOPPE.svg";
import SearchIcon from "../../assets/icon/search.svg";
import ShoppingCartIcon from "../../assets/icon/shopping-cart.svg";
import ProfileIcon from "../../assets/icon/profile.svg";
import Menu from "../../assets/icon/menu.svg";
import Close from "../../assets/icon/closemenu.svg";
import { NavContext } from "../../store/context";

const Header: FC = () => {
  const { pathname } = useRouter();
  const navCtx = useContext(NavContext);
  const { showMenu, handleChangeMenu } = navCtx;

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", () => {
        const { innerWidth } = window;

        if (innerWidth > 640) {
          handleChangeMenu(false);
        }
      });
    }
  }, [handleChangeMenu]);

  useEffect(() => {
    
    if(showMenu) {
      document.body.classList.add('overflow-hidden')
      return
    }

    document.body.classList.remove('overflow-hidden')
  }, [showMenu]);

  return (
    <nav className="fixed h-[107px] w-full z-[100] bg-white/95">
      <div className="flex flex-row items-center justify-between h-full max-w-[1248px]  border-b-[1px] border-light-gray mx-auto desktop:max-w-[80%]">
        <div className="cursor-pointer">
          <Link href="/" passHref>
            <AppLogo />
          </Link>
        </div>

        {showMenu && (
          <div
            onClick={() => handleChangeMenu(false)}
            className="cursor-pointer fixed top-8 right-12 z-[101]"
          >
            <Close />
          </div>
        )}

        <div
          onClick={() => handleChangeMenu(true)}
          className="hidden mobile:flex cursor-pointer"
        >
          <Menu />
        </div>

        {showMenu && (
          <ul className="flex flex-col justify-center items-center fixed inset-0 bg-white/95 p-[10%] space-y-10">
            <Link href="/shop">
              <li
                onClick={() => handleChangeMenu(false)}
                className="cursor-pointer"
              >
                <h5 className="text-2xl">Shop</h5>
              </li>
            </Link>

            <Link href="/story" passHref>
              <li
                onClick={() => handleChangeMenu(false)}
                className="cursor-pointer"
              >
                <h5 className="text-2xl">Our Story</h5>
              </li>
            </Link>

            <Link href="/cart" passHref>
              <li
                onClick={() => handleChangeMenu(false)}
                className="cursor-pointer flex flex-row items-center space-x-2"
              >
                <h5 className="text-2xl">Cart</h5>
                <ShoppingCartIcon />
              </li>
            </Link>
          </ul>
        )}

        <div className="flex flex-row items-center h-full mobile:hidden">
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
