import Image from "next/image";
import { useCallback, useMemo } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store";
import { addCart, cartList } from "../store/features/cart/cartSlice";

import { productList } from "../mockData";
import { formatPrices } from "../utils";

import Layout from "../components/layout/Layout";

import { IProductDetail } from "../types/products";
import ProductCard from "../components/ui/ProductCard";
import { setStatus } from "../store/features/popup/popupSlice";
import { PopupStatus } from "../store/features/popup/type";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const cartListStore = useAppSelector(cartList);

  const handleAddCart = useCallback(
    (item: IProductDetail) => {
      const cartMatched = cartListStore.find(
        (cart) => cart.product.id === item.id
      );

      if (cartMatched) {
        if (cartMatched.amount === item.stockTotal) {
          dispatch(
            setStatus({
              status: PopupStatus.failed,
              message:
                "The amount in the cart exceeds the number of products available.",
            })
          );

          return;
        }
      }

      dispatch(
        addCart({
          product: item,
          amount: 1,
        })
      );

      dispatch(
        setStatus({
          status: PopupStatus.success,
          message: "The item added to your Shopping bag.",
          link: "/cart",
        })
      );
    },
    [cartListStore, dispatch]
  );

  const renderProductList = useMemo(() => {
    return (
      <div className="grid grid-cols-3 gap-16 mt-10 mobile:grid-cols-2 smobile:grid-cols-1">
        {productList.map((details: IProductDetail) => (
          <ProductCard
            key={details.id}
            productItem={details}
            onAddCart={() => handleAddCart(details)}
          />
        ))}
      </div>
    );
  }, [handleAddCart]);

  return (
    <Layout>
      <div className="max-w-[1248px] mx-auto desktop:max-w-[80%] pt-[107px]">
        <div className="relative w-full h-max flex flex-col items-center justify-start">
          <Image
            className="rounded-2xl absolute inset-0 z-0"
            src="/images/section/hero/cover.png"
            alt="Gold big hoops"
            width={1248}
            height={648}
            quality={95}
          />
          <div className="absolute flex flex-col gap-4 z-[1] top-1/2 left-10 text-white transform -translate-y-1/2">
            <h1 className="font-medium">Gold big hoops</h1>
            <h2>$ {formatPrices("68")}</h2>
            <div className="px-8 py-[.875rem] border-2 border-white rounded-[.375rem] cursor-pointer mt-12 opacity-100 ease-in-out hover:opacity-70 transition-opacity mobile:px-4 mobile:py-[.625rem]">
              <p className="text-xl font-bold text-center mobile:text-sm">
                VIEW PRODUCT
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex justify-between">
            <h1 className="font-medium">Shop The Latest</h1>
            <Link href={"/shop"}>
              <h4 className="font-medium text-accent cursor-pointer">
                View All
              </h4>
            </Link>
          </div>
        </div>

        {renderProductList}
      </div>
    </Layout>
  );
};

export default Home;
