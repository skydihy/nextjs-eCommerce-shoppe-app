import Image from "next/image";
import { useMemo } from "react";
import type { NextPage } from "next";

import { productList } from "../mockData";
import { formatPrices } from "../utils";

import Layout from "../components/layout/Layout";

import { IProductDetail } from "../types/products";

const Home: NextPage = () => {
  const renderProductList = useMemo(() => {
    return (
      <div className="grid grid-cols-3 gap-16 mt-10">
        {productList.map((productItem: IProductDetail) => {
          return (
            <div key={productItem.id} className="flex flex-col justify-start">
              <div className="aspect-square rounded-2xl w-full">
                <Image
                  src={productItem.image}
                  alt={productItem.name.toLocaleLowerCase()}
                  width={380}
                  height={380}
                  layout="responsive"
                  quality={95}
                />
              </div>
              <h3 className="inline-block mt-6">{productItem.name}</h3>
              <h4 className="text-accent inline-block mt-[1.125rem]">
                {productItem.priceSymbol} {formatPrices(productItem.prices)}
              </h4>
            </div>
          );
        })}
      </div>
    );
  }, []);

  return (
    <Layout>
      <div className="max-w-[1248px] mx-auto desktop:max-w-[90%] pt-[107px]">
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
            <div className="px-8 py-[.875rem] border-2 border-white rounded-[.375rem] cursor-pointer mt-12 hover:opacity-70 transition-all">
              <p className="text-xl font-bold text-center">VIEW PRODUCT</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex justify-between">
            <h1 className="font-medium">Shop The Latest</h1>
            <h4 className="font-medium text-accent">View All</h4>
          </div>
        </div>

        {renderProductList}
      </div>
    </Layout>
  );
};

export default Home;
