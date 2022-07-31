import { FC, ReactNode, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  clearStatus,
  popupStatus,
  setStatus,
} from "../../store/features/popup/popupSlice";

import SuccessIcon from "../../assets/icon/success.svg";
import { PopupStatus } from "../../store/features/popup/type";
import { cartList } from "../../store/features/cart/cartSlice";
import Link from "next/link";

const Popup: FC = () => {
  const popup = useAppSelector(popupStatus);
  const cartListStore = useAppSelector(cartList);
  const dispatch = useAppDispatch();

  const handleEject = () => {
    dispatch(clearStatus());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearStatus());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, popup.status]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full mt-[107px]">
      <div
        className={`${
          popup.status === PopupStatus.empty ? "w-0 hidden" : "w-full"
        } h-[68px] max-w-[1248px] mx-auto flex justify-between items-center px-6 bg-light-gray w-full`}
      >
        {popup.status === PopupStatus.success && (
          <>
            <div
              onClick={handleEject}
              className="flex flex-row space-x-4 items-center cursor-pointer"
            >
              <SuccessIcon />
              <h5>{popup.message}</h5>
            </div>
            <Link href="/cart" className="text-accent font-bold">
              <div className="cursor-pointer">
                ({cartListStore.length}) VIEW CART
              </div>
            </Link>
          </>
        )}

        {popup.status === PopupStatus.failed && (
          <h5 className="text-red-600">{popup.message}</h5>
        )}
      </div>
    </div>
  );
};

export default Popup;
