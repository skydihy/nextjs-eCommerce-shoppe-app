import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { productList } from "../../mockData";

import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/ui/ProductCard";
import InputField from "../../components/ui/InputField";
import SelectorDropdown from "../../components/ui/SelectorDropdown";

import Search from "../../assets/icon/search.svg";

import { IProductDetail } from "../../types/products";
import { useClickAway } from "react-use";

export enum ShopSortings {
  Name = "Name",
  Prices = "Prices",
}

const Shop: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [productStaging, setProductStaging] =
    useState<IProductDetail[]>(productList);
  const [productDisplay, setProductDisplay] =
    useState<IProductDetail[]>(productStaging);

  const [showSelector, setShowSelector] = useState(false);
  const [sortBy, setSortBy] = useState<ShopSortings | null>(null);

  const selectorRef = useRef(null);

  const renderProductList = useMemo(() => {
    return (
      <div className="grid grid-cols-3 gap-6">
        {productDisplay.map((details: IProductDetail) => (
          <ProductCard key={details.name} productItem={details} />
        ))}
      </div>
    );
  }, [productDisplay]);

  const handleSearch = () => {
    const findValue = searchValue.trim().toLowerCase();

    if (!findValue) {
      // set to default
      setProductStaging(productList);
      return;
    }

    const result = productList
      .slice()
      .filter((product) => product.name.toLowerCase().includes(findValue));

    setProductStaging(result);
  };

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleShowSelector = () => {
    setShowSelector((prev) => !prev);
  };

  const handleSort = (value: ShopSortings | null) => {
    setSortBy(value);
    setShowSelector(false);
  };

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }, [searchValue]);

  useEffect(() => {
    switch (sortBy) {
      case ShopSortings.Name: {
        const sorted = productStaging
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
        setProductDisplay(sorted);
        break;
      }

      case ShopSortings.Prices: {
        const sorted = productStaging
          .slice()
          .sort((a, b) => +b.prices - +a.prices);
        setProductDisplay(sorted);
        break;
      }

      default: {
        setProductDisplay(productStaging);
        break;
      }
    }
  }, [productStaging, sortBy]);

  useClickAway(selectorRef, () => {
    setShowSelector(false);
  });

  return (
    <Layout>
      <div className="max-w-[1248px] mx-auto desktop:max-w-[90%] pt-[107px]">
        <div className="mt-[96px] flex flex-row gap-[35px]">
          <div className=" max-w-[262px] w-full">
            <h1 className="font-medium">Shop The Latest</h1>
            <div className="relative mt-[38.82px]">
              <div
                className="absolute top-0 right-0 cursor-pointer"
                onClick={handleSearch}
              >
                <Search />
              </div>
              <InputField
                placeholder="Search..."
                className="pr-[2rem]"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
              />

              <div className="mt-10">
                <SelectorDropdown
                  value={sortBy}
                  optionList={[ShopSortings.Name, ShopSortings.Prices]}
                  placeholder="Sort By"
                  show={showSelector}
                  onShow={handleShowSelector}
                  onSelect={handleSort}
                  ref={selectorRef}
                />
              </div>
            </div>
          </div>
          <div className="mt-[82px] w-full">{renderProductList}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
