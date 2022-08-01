import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addCart, cartList } from "../../store/features/cart/cartSlice";
import { useClickAway } from "react-use";

import { productList } from "../../mockData";

import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/ui/ProductCard";
import InputField from "../../components/ui/InputField";
import SelectorDropdown from "../../components/ui/SelectorDropdown";

import Search from "../../assets/icon/search.svg";

import { IProductDetail } from "../../types/products";
import { setStatus } from "../../store/features/popup/popupSlice";
import { PopupStatus } from "../../store/features/popup/type";

export enum ShopSortings {
  Name = "Name (A-Z)",
  Prices = "Prices ($$-$)",
}

const Shop: NextPage = () => {
  const dispatch = useAppDispatch();
  const cartListStore = useAppSelector(cartList);

  const [searchValue, setSearchValue] = useState<string>("");
  const [productStaging, setProductStaging] =
    useState<IProductDetail[]>(productList);
  const [productDisplay, setProductDisplay] =
    useState<IProductDetail[]>(productStaging);

  const [showSelector, setShowSelector] = useState(false);
  const [sortBy, setSortBy] = useState<ShopSortings | null>(null);

  const selectorRef = useRef(null);

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
          link:'/cart'
        })
      );
    },
    [cartListStore, dispatch]
  );

  const renderProductList = useMemo(() => {
    return (
      <div className="grid grid-cols-3 gap-6 mobile:grid-cols-2">
        {productDisplay.map((details: IProductDetail) => (
          <ProductCard
            key={details.name}
            productItem={details}
            onAddCart={() => handleAddCart(details)}
          />
        ))}
      </div>
    );
  }, [handleAddCart, productDisplay]);

  useEffect(() => {
    handleSearch()
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
        <div className="mt-[96px] flex flex-row gap-[35px] mobile:flex-col">
          <div className="max-w-[262px] w-full mobile:max-w-full">
            <h1 className="font-medium mobile:text-center">Shop The Latest</h1>
            <div className="relative mt-[38.82px] mobile:w-full">
              <div
                className="absolute top-0 right-0 cursor-pointer"
                onClick={handleSearch}
              >
                <Search />
              </div>
              <InputField
                placeholder="Search..."
                className="pr-[2rem] mobile:w-full"
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
          <div className="mt-[82px] w-full mobile:mt-0">
            {renderProductList}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
